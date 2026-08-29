#!/usr/bin/env node
// ════════════════════════════════════════════════════════════════════════════
// PREBUILD — runs as the first half of `npm run build`. Does two things:
//
//   1. COVERAGE GATE. Every *.html in public/ must be accounted for: either in
//      the sitemap and llms.txt (site-pages.ts `pages`), or its absence is a
//      recorded decision (`excluded`). Anything unaccounted for FAILS THE
//      BUILD. This exists because /partner.html is live at 200 but
//      deliberately absent from both feeds — without the gate, the next person
//      to add a page discovers months later that agents never saw it.
//
//   2. METADATA EXTRACTION. Reads each page's own <title> and
//      <meta name="description"> into src/data/static-meta.json, which the
//      feed routes import. Deriving these means the feeds cannot drift from
//      the pages.
//
// WHY A SCRIPT AND NOT node:fs INSIDE THE ROUTE:
// Tried that first; it fails. Astro bundles routes into dist/.prerender/
// chunks, so `import.meta.url` resolves to the BUILT location and
// `new URL('../../public/', import.meta.url)` becomes dist/public/ — ENOENT.
// Reading disk in a prebuild script and importing the JSON is the pattern
// already proven on .com (generate-stats.mjs -> stats.json).
// ════════════════════════════════════════════════════════════════════════════

import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname, relative, sep } from 'node:path';
// `basename` was dropped 2026-08-29 with gate 5's layoutCarriers list — the
// completeness check resolves import PATHS now, so no filename is ever compared.
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = resolve(root, 'public');
const manifestPath = resolve(root, 'src/data/site-pages.ts');
const outPath = resolve(root, 'src/data/static-meta.json');

const fail = (msg) => {
  console.error(`\n✗ prepare-feeds: ${msg}\n`);
  process.exit(1);
};

// ── 1. coverage gate ────────────────────────────────────────────────────────
const manifest = readFileSync(manifestPath, 'utf8');

// Regex over the source, not an import: this runs BEFORE vite, so there is no
// TypeScript loader available.
const declared = [...manifest.matchAll(/file:\s*'([^']+)'/g)].map((m) => m[1]);
if (declared.length === 0) fail('parsed zero `file:` entries from the manifest — the regex broke');

// Paths in the manifest are REPO-RELATIVE.
//
// EXTENDED 2026-08-10 to sweep src/pages/** as well as public/*.html.
// The previous version swept public/ only, on the reasoning that "an Astro page
// cannot silently fail to be noticed, because it is a route". That was wrong in
// the way that matters: a route IS noticed by visitors, but it can silently
// miss sitemap.xml and llms.txt, because both build from this manifest.
// /author/sat-singh would have been the first casualty of exactly that.
//
// Every routable file must be declared — in `pages` to publish it, or in
// `excluded` with the reason it stays out. Same discipline that caught
// /partner; now it covers both halves of the site.
const walk = (dir, out = []) => {
  // ⚠ TOLERATES A MISSING DIRECTORY, deliberately. src/components/ does not exist
  // yet; gate 5 sweeps it anyway so that a footer component is gated the moment
  // someone creates one, with nothing to remember. Without this guard readdirSync
  // throws ENOENT and the build dies on a directory whose absence is normal.
  if (!existsSync(dir)) return out;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const full = resolve(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
};

const staticPages = readdirSync(publicDir)
  .filter((f) => f.endsWith('.html'))
  .map((f) => `public/${f}`);
if (staticPages.length === 0)
  fail('found zero *.html in public/ — the five static pages should be there');

const pagesDir = resolve(root, 'src/pages');
const astroRoutes = walk(pagesDir)
  .map((f) => relative(root, f))
  // .astro pages and .ts endpoints are both routable and both must be declared.
  .filter((f) => f.endsWith('.astro') || f.endsWith('.ts'))
  .map((f) => f.split(sep).join('/'));
if (astroRoutes.length === 0) fail('found zero routes in src/pages — the sweep is broken');

const onDisk = [...staticPages, ...astroRoutes];

const missing = onDisk.filter((f) => !declared.includes(f));
const phantom = declared.filter((f) => !onDisk.includes(f));

if (missing.length)
  fail(
    `these routes exist on disk but are in neither \`pages\` nor \`excluded\`:\n` +
      missing.map((f) => `    - ${f}`).join('\n') +
      `\n\n  Add each to src/data/site-pages.ts — to \`pages\` to publish it in the\n` +
      `  sitemap and llms.txt, or to \`excluded\` with the reason it stays out.\n` +
      `  A route that is in neither is live but invisible to every agent.`,
  );

if (phantom.length)
  fail(
    `the manifest names files that do not exist on disk:\n` +
      phantom.map((f) => `    - ${f}`).join('\n') +
      `\n\n  A sitemap entry for a missing file would publish a URL that 404s.`,
  );

// ── 2. metadata extraction ──────────────────────────────────────────────────
const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#160;|&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

// Only pages that actually appear in the feeds need metadata; excluded pages
// are never rendered into sitemap.xml or llms.txt.
const feedFiles = [...manifest.matchAll(/path:\s*'([^']+)',\s*\n\s*file:\s*'([^']+)'/g)].map(
  (m) => m[2],
);
if (feedFiles.length === 0) fail('parsed zero path/file pairs — the `pages` regex broke');

// SCOPE THE COUNT. `feedFiles.length === 0` only catches TOTAL regex failure.
// It does not catch a PARTIAL one — and on 2026-08-11 a comment written between
// `path:` and `file:` made exactly one entry invisible to the pairing regex.
// The build got as far as rendering llms.txt before failing, and the only clue
// was "metadata verified for 5" where 6 was correct. Anchor the pair count to
// the `path:` count so a page that silently drops out fails HERE, by name.
const pathCount = [...manifest.matchAll(/^\s*path:\s*'/gm)].length;
if (feedFiles.length !== pathCount)
  fail(
    `the manifest declares ${pathCount} \`path:\` entries but only ${feedFiles.length} ` +
      `path/file PAIRS could be parsed.\n` +
      `  The two are matched by a regex that requires them on ADJACENT lines — a\n` +
      `  comment or blank line between \`path:\` and \`file:\` hides that entry from\n` +
      `  every feed while leaving the page live.`,
  );

const meta = {};
for (const file of feedFiles) {
  const src = readFileSync(resolve(root, file), 'utf8');

  // TWO SHAPES, both routable:
  //   1. raw markup — public/*.html and index.astro (converted from HTML, it
  //      still carries its own <head>). Read <title> / <meta description>.
  //   2. layout-using Astro pages — /news, /author/*. Their title and
  //      description are frontmatter consts passed as props to NewsLayout, so
  //      there is no <title> in the file to find. Read the consts instead.
  // Either way the check is the same: this route still declares a title and a
  // description. A feed entry with neither is worse than a failed build.
  let title, description;

  const t = src.match(/<title>([\s\S]*?)<\/title>/i);
  const d = src.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']\s*\/?>/i);

  if (t && d) {
    title = decode(t[1]);
    description = decode(d[1]);
  } else {
    const ct = src.match(/^const\s+title\s*=\s*[`'"]([\s\S]*?)[`'"]\s*;/m);
    const cd = src.match(/^const\s+description\s*=\s*\n?\s*[`'"]([\s\S]*?)[`'"]\s*;/m);
    if (!ct) fail(`${file}: no <title> and no \`const title\` — cannot verify it declares one`);
    if (!cd)
      fail(`${file}: no meta description and no \`const description\` — cannot verify it declares one`);
    title = decode(ct[1]);
    description = decode(cd[1]);
  }

  if (!title) fail(`empty title in ${file}`);
  if (!description) fail(`empty description in ${file}`);
  meta[file] = { title, description };
}

// ── 3. identity assertion: index.astro founder node vs src/data/people.json ─
//
// index.astro's JSON-LD is a hand-maintained `is:inline` block and CANNOT
// import people.ts — Astro does not interpolate inside is:inline. So the two
// are kept in step by this check rather than by import: edit people.ts and the
// build fails until index.astro matches, and vice versa.
//
// Converting index's whole @graph to a templated object would remove the need
// for this, but that is a large diff on the site's most important page and
// belongs in its own session. Recorded as the endgame; this is the guard until
// then.
{
  // people.json, not people.ts: this script runs before vite and cannot import
  // TypeScript. The first version regex-parsed the .ts and broke on template
  // literals — parsing source with regex is the trap, JSON.parse is the fix.
  const people = JSON.parse(readFileSync(resolve(root, 'src/data/people.json'), 'utf8'));
  const sat = people['sat-singh'];
  if (!sat) fail('people.json has no "sat-singh" entry');

  const idxSrc = readFileSync(resolve(root, 'src/pages/index.astro'), 'utf8');
  const founder = idxSrc.match(/"founder":\s*(\{[\s\S]*?\n\s{8}\})/);
  if (!founder) fail('could not locate the "founder" node in index.astro — the regex broke');

  let node;
  try {
    node = JSON.parse(founder[1]);
  } catch (e) {
    fail(`index.astro "founder" node is not valid JSON: ${e.message}`);
  }

  // DERIVED from people.json, not hardcoded.
  //
  // The previous version listed five field names by hand, and `image` was in
  // people.json and on the ProfilePage but missing from index.astro — unguarded,
  // because nobody had added it to the list. That is the mirror of the subset
  // bug fixed the day before, and hardcoding guarantees it recurs.
  //
  // Now every key in people.json is checked. Add a field there and it is
  // guarded on the next build with nothing to remember. `slug` is internal
  // routing, not a JSON-LD property; `id` is emitted as `@id`.
  const NOT_EMITTED = new Set(['slug']);
  const JSONLD_KEY = { id: '@id' };
  const want = Object.fromEntries(
    Object.keys(sat)
      .filter((k) => !NOT_EMITTED.has(k))
      .map((k) => [JSONLD_KEY[k] ?? k, sat[k]]),
  );
  // ONE deep comparison covering every derived field — scalars, arrays and
  // nested objects alike. Key order is normalised so a reordering is not
  // reported as drift; only a real difference in content is.
  //
  // This replaced three separate checks (five hardcoded scalars, then sameAs,
  // then a hand-listed set of nested objects). Each of those lists had to be
  // remembered, and `image` proved they would not be: it sat in people.json and
  // on the ProfilePage while missing from index.astro, guarded by nothing.
  const canon = (v) =>
    Array.isArray(v)
      ? v.map(canon)
      : v && typeof v === 'object'
        ? Object.fromEntries(Object.keys(v).sort().map((k) => [k, canon(v[k])]))
        : v;
  const show = (v) => (typeof v === 'string' ? v : JSON.stringify(canon(v)));

  for (const [k, v] of Object.entries(want)) {
    if (v === undefined || v === null) fail(`people.json is missing a value for \`${k}\``);
    if (JSON.stringify(canon(v)) !== JSON.stringify(canon(node[k]))) {
      fail(
        `index.astro founder.${k} has drifted from src/data/people.json:\n` +
          `    people.json: ${show(v)}\n` +
          `    index.astro: ${show(node[k])}\n\n` +
          `  These describe the same person and must agree. Update index.astro's\n` +
          `  hand-written JSON-LD, or people.json, so both say the same thing.`,
      );
    }
  }

  console.log(
    `✓ identity: index.astro founder node matches people.json ` +
      `(${Object.keys(want).length} fields, derived from people.json)`,
  );
}

// ── 4. the events record: src/data/events.json ──────────────────────────────
//
// This file is the SOLE record of 28 events that appear on no public surface.
// Luma exposes no export and no API on this calendar, and its own past view
// lists 14 of the 42. There is no upstream to re-derive it from and nothing
// detects drift from Luma, by design — past events do not change, and the live
// calendar owns upcoming events via the iframe. That makes these gates the only
// thing standing between the file and silent corruption.
{
  const raw = readFileSync(resolve(root, 'src/data/events.json'), 'utf8');

  let ev;
  try {
    ev = JSON.parse(raw);
  } catch (e) {
    fail(`src/data/events.json is not valid JSON: ${e.message}`);
  }

  // ROUND-TRIP IDEMPOTENCE. This is what makes the file safely APPENDABLE: if
  // re-serialising it reproduces it byte-for-byte, then adding one event
  // produces a diff of exactly that event. Without this, a writer with slightly
  // different formatting reformats all 42 rows and buries the real change.
  // YAML was rejected for this file precisely because it cannot hold this
  // property — the synopses were folded scalars, and any round-trip would have
  // rewritten every one of them on the first append.
  const canonical = JSON.stringify(ev, null, 2) + '\n';
  if (canonical !== raw)
    fail(
      `src/data/events.json is not in canonical form.\n` +
        `  Re-serialising it does not reproduce it byte-for-byte, so the next append\n` +
        `  would reformat the whole file instead of adding one row.\n` +
        `  Fix: write it back as JSON.stringify(data, null, 2) + '\\n'.`,
    );

  const events = ev.events;
  if (!Array.isArray(events) || events.length === 0) fail('events.json has no events array');

  const REQUIRED = ['date', 'title', 'series', 'synopsis'];
  // OPTIONAL by ruling 2026-08-11: the 42 hand-assembled rows carry no Luma
  // IDs and no start times, and backfilling them means revisiting 42 pages by
  // hand. New rows may carry them; these validate only when present, so a
  // future watcher-added row needs no migration and no reformat.
  const OPTIONAL = ['id', 'start_at'];

  const seenKey = new Set();
  const seenId = new Set();
  for (const [i, e] of events.entries()) {
    const where = `events[${i}] (${e.date ?? '?'})`;
    for (const k of REQUIRED)
      if (typeof e[k] !== 'string' || !e[k].trim()) fail(`${where}: missing or empty \`${k}\``);
    for (const k of Object.keys(e))
      if (!REQUIRED.includes(k) && !OPTIONAL.includes(k)) fail(`${where}: unexpected field \`${k}\``);

    if (!/^\d{4}-\d{2}-\d{2}$/.test(e.date)) fail(`${where}: date is not ISO yyyy-mm-dd`);
    if ('id' in e && !/^evt-/.test(e.id)) fail(`${where}: id does not start with \`evt-\``);
    if ('start_at' in e && Number.isNaN(Date.parse(e.start_at)))
      fail(`${where}: start_at is not a parseable ISO datetime`);

    // \x00 AS AN ESCAPE, NEVER A RAW BYTE. This delimiter used to be a literal
    // NUL in the source. It made the whole FILE read as binary, so plain `grep`
    // silently matched NOTHING here -- on the file carrying the coverage gate AND
    // the identity gate. A session concluded the identity gate had been deleted
    // because of it, and only `grep -a` disproved that. The escape compiles to the
    // exact same U+0000 (verified), and the file stays greppable text.
    const key = `${e.date}\x00${e.title}`;
    if (seenKey.has(key)) fail(`${where}: duplicate (date, title) — the record's only key`);
    seenKey.add(key);

    // Event @id is /events#event-<date>. Dates happen to be unique across the
    // 42, but that is a property of this sample and NOT a guarantee — two
    // events on one day is entirely ordinary. Fail loudly rather than let two
    // events silently collapse onto one @id.
    if (seenId.has(e.date))
      fail(
        `${where}: a second event shares this date, so both would generate the\n` +
          `  same JSON-LD @id (/events#event-${e.date}). Give the @id a discriminator\n` +
          `  before adding same-day events.`,
      );
    seenId.add(e.date);
  }

  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const seriesNames = [...new Set(events.map((e) => e.series))];
  const slugs = new Map();
  for (const n of seriesNames) {
    const s = slug(n);
    if (slugs.has(s)) fail(`series "${n}" and "${slugs.get(s)}" both slug to "${s}" — @id collision`);
    slugs.set(s, n);
  }

  // ── claim guards ──────────────────────────────────────────────────────────
  // NO DIGITS in any synopsis. All 42 verified digit-free when this gate was
  // added, so it costs nothing today and makes the file watcher-ready: the
  // drafting constraint for any future automation is "no numbers of any kind",
  // and this is that constraint, enforced at the file rather than trusted to a
  // prompt.
  for (const e of events)
    if (/\d/.test(e.synopsis))
      fail(
        `events[${e.date}]: synopsis contains a digit.\n` +
          `  Synopses carry no numbers — no counts, no attendance, no capacity.`,
      );

  const BLOCKED = ['sold out', 'sold-out', 'packed', 'at capacity', 'record turnout', 'largest', 'biggest'];
  for (const e of events)
    for (const term of BLOCKED)
      if (e.synopsis.toLowerCase().includes(term))
        fail(`events[${e.date}]: synopsis contains the blocked fullness claim "${term}"`);

  // "Monthly" is the cadence claim the record does NOT support in aggregate:
  // six of the sixteen months in span are empty. It is true of exactly one
  // series. Rather than hardcode which, assert that at most one series makes
  // the claim — a second one appearing is the drift worth catching, and naming
  // the series here would just be another string to keep in step.
  const monthly = [...new Set(events.filter((e) => /monthly/i.test(e.synopsis)).map((e) => e.series))];
  if (monthly.length > 1)
    fail(
      `"monthly" is claimed by ${monthly.length} series: ${monthly.join(', ')}.\n` +
        `  The record does not support a monthly cadence in aggregate — 6 of the 16\n` +
        `  months in span have no events. Scope the claim to the one series that runs\n` +
        `  monthly, or remove it.`,
    );

  // ── index.astro's session counts — EVERY ONE, not one phrasing ────────────
  // INTERIM. index.astro's JSON-LD is `is:inline`, which Astro does not
  // interpolate, so these counts cannot be derived the way llms.txt derives its
  // own — they are written, and guarded here instead. The @graph-templating
  // session retires this check along with the identity guard above.
  //
  // ⚠ WIDENED 2026-08-21, AFTER THE ANCHORED VERSION MISSED A REAL SECOND COUNT.
  // This used to match /Has hosted (\d+) sessions since/ — one phrasing, and
  // `.match()` without /g, so ONE occurrence of it. The ecosystem copy pass then
  // added "We've held 42 sessions since April 2025" to an FAQ answer, which lands
  // TWICE (visible DOM + the is:inline JSON-LD mirror). Three unguarded counts,
  // one guarded, build green. The gate reported coverage it did not provide —
  // §7.6, and the same class as the metadata pair-count trap in section 1.
  //
  // So the sweep is now PHRASING-AGNOSTIC: any "<number> sessions" in the file
  // must equal the record. Nothing to keep in step, and a fourth phrasing is
  // covered on the day it is written.
  //
  // ⚠ IT SWEEPS COMMENTS TOO, DELIBERATELY. A comment asserting a stale count is
  // still a stale claim in the repo — 6f5917b had to correct exactly that. A
  // comment that must cite a HISTORICAL number therefore has to say it in a form
  // this regex cannot match: see the HOME BASE note, whose venue sentence was
  // reworded to carry no count precisely because it records the state at
  // 2026-08-12 and must NOT track the record. Founder ruling, 2026-08-21.
  const idxSrc = readFileSync(resolve(root, 'src/pages/index.astro'), 'utf8');

  // ⚠ WIDENED AGAIN 2026-08-28, FROM ONE FILE TO ALL OF src/ — because a
  // refactor MOVED TWO GUARDED CLAIMS OUT FROM UNDER THE GATE and it stayed
  // green. Session B lifted the fourteen FAQ entries out of index.astro into
  // src/data/faq.ts; one of them is "We've held 42 sessions since April 2025".
  // Before the move that claim was swept twice (visible DOM + JSON-LD mirror);
  // after it, ZERO times — and the only visible symptom was this gate's own
  // count line dropping from 4 to 2 while still printing ✓. A shrinking scope
  // that reports success is the §7.6 failure, and it is the SECOND time this
  // gate has had it.
  //
  // The lesson is not "remember to add faq.ts". It is that an enumerated scope
  // silently narrows whenever content moves, so the scope is now DERIVED: every
  // .astro / .ts / .mjs under src/. Move a claim anywhere inside the source tree
  // and it stays guarded, with nothing to remember. This also picked up
  // positioning.ts, which asserts "All 42 sessions to date ran at one venue" in
  // a comment and had never been swept at all.
  const countCarriers = walk(resolve(root, 'src'))
    .filter((f) => /\.(astro|ts|mjs)$/.test(f))
    .map((f) => [relative(root, f).split(sep).join('/'), readFileSync(f, 'utf8')]);
  const counts = countCarriers.flatMap(([rel, src]) =>
    [...src.matchAll(/(\d+)\s+sessions\b/g)].map((m) => ({ rel, src, n: m[1], index: m.index, len: m[0].length })),
  );

  // ZERO MATCHES IS A FAILURE, NEVER A PASS. Without this, a regex that stops
  // matching — a rename, a reflow, a claim deleted — passes silently over files
  // it is no longer checking. Same hole as `feedFiles.length === 0` in section 1.
  if (counts.length === 0)
    fail(
      'src/: found zero session counts.\n' +
        '  Either the sweep is broken or every count claim was deleted. Both are\n' +
        '  failures: this gate cannot pass by having nothing to check.',
    );

  const wrong = counts.filter((c) => Number(c.n) !== events.length);
  if (wrong.length)
    fail(
      `${wrong.length} session count(s) under src/ disagree with ` +
        `src/data/events.json (${events.length}):\n` +
        wrong
          .map((c) => {
            const ctx = c.src.slice(Math.max(0, c.index - 60), c.index + c.len + 30);
            return `    - ${c.rel} claims ${c.n}: …${ctx.replace(/\s+/g, ' ').trim()}…`;
          })
          .join('\n') +
        `\n\n  Every session count in the source tree is the same number and they must agree.`,
    );

  // The homepage @graph is deliberately 6 nodes: Organization, WebSite and four
  // Service nodes. The 49 nodes this pass adds live on /events and must never
  // leak into it.
  //
  // ⚠ WAS 7 UNTIL 2026-08-28, and the seventh was a FAQPage. It was REMOVED, not
  // lost: the homepage now shows four questions where it used to show fourteen,
  // and a FAQPage node there would have gone on claiming all fourteen — telling
  // agents something no visitor to that page could see. /faq is the page whose
  // main content the FAQ is, and it carries the only FAQPage node for those
  // questions.
  //
  // ⚠ IF THIS GATE FAILS AT 5, THE FIX IS NOT TO ADD A NODE. A node went missing
  // from a hand-maintained is:inline block; find which and restore it. If it
  // fails at 7, something was ADDED — most likely a FAQPage coming back. The
  // homepage links /faq; it does not re-describe it.
  const graphBlock = idxSrc.match(/<script type="application\/ld\+json" is:inline>([\s\S]*?)<\/script>/);
  if (!graphBlock) fail('index.astro: could not locate the JSON-LD block');
  let graph;
  try {
    graph = JSON.parse(graphBlock[1]);
  } catch (e) {
    fail(`index.astro JSON-LD does not parse: ${e.message}`);
  }
  if (graph['@graph']?.length !== 6)
    fail(`index.astro @graph has ${graph['@graph']?.length} nodes; the invariant is 6`);

  console.log(
    `✓ events: ${events.length} sessions across ${seriesNames.length} series, canonical form, ` +
      `digit-free synopses; all ${counts.length} session counts under src/ agree; homepage @graph 6`,
  );
}

writeFileSync(outPath, JSON.stringify(meta, null, 2) + '\n');

console.log(
  `✓ coverage: ${onDisk.length}/${onDisk.length} routes accounted for ` +
    `(${staticPages.length} static + ${astroRoutes.length} astro); ` +
    `metadata verified for ${Object.keys(meta).length}`,
);

// ── 5. positioning: every footer carrier agrees with src/data/positioning.ts ─
//
// The line is hardcoded in SEVEN files and cannot be otherwise: four of them are
// hand-written HTML in public/ that ships byte-for-byte and can import nothing.
// So this gate does not distribute the value — it makes divergence impossible to
// commit. Added 2026-08-17, the day the copy pass left all seven in agreement:
// a gate installed on a correct state locks it, where one installed later has to
// adjudicate a drift it cannot resolve.
//
// ⚠ THREE TIERS, BECAUSE THE LINE APPEARS IN THREE SHAPES. A single equality
// check would be wrong in both directions — it would miss the head entirely and
// fail on the H1 forever:
//   T1 EXACT      footer__desc === `${line} ${fiscal}`, footer__tagline === sub
//   T2 CONTAINS   <title>/og:title/twitter:title carry the line behind an "AICV — "
//                 prefix and without its full stop; the descriptions OPEN with sub
//                 and continue. Equality here fails on correct copy.
//   T3 TAG-JOINED the H1 is split by <span class="accent"> and does NOT grep as
//                 one string (§7.13). Compared with tags stripped.
//
// ⚠ WHAT T3 DELIBERATELY DOES NOT CATCH, proven by negative control: removing
// the <span class="accent"> entirely and rejoining the words passes, because the
// tag-joined text is unchanged and THE POSITIONING IS INTACT. That is a styling
// regression (the hero loses its volt second line), not a positioning one, and
// this gate asserts the WORDS. Adding a markup-shape assertion here would make a
// copy gate fail on legitimate design edits — the same category error as gating
// the JSON-LD prose below. If the accent treatment needs protecting, it needs its
// own check; see the queued source-order/style-check item in playbook STATE.md.
//
// ⚠ THE JSON-LD Organization AND WebSite DESCRIPTIONS ARE DELIBERATELY UNGATED,
// and this is a decision, not an oversight. Both embed the positioning as prose
// ("preparing the Coachella Valley for the AI economy — and serving as the
// region's front door…"), not as the bare line. A `contains` check would pass on
// almost any rewrite, including one that changed the claim; an `equals` check
// would fail on every legitimate edit to the surrounding sentence. A guard that
// cannot fail meaningfully is worse than no guard, because it REPORTS COVERAGE IT
// DOES NOT PROVIDE — the §7.6 failure one level up. If they are ever to be
// guarded, the claim has to be extracted into its own field first.
{
  const posPath = resolve(root, 'src/data/positioning.ts');
  const posSrc = readFileSync(posPath, 'utf8');
  // Regex over the source, not an import — same reason as the manifest above:
  // this runs BEFORE vite, so there is no TypeScript loader.
  const grab = (name) => {
    const m = posSrc.match(new RegExp(`export const ${name} = '([^']*)'`));
    if (!m) fail(`src/data/positioning.ts: could not parse \`${name}\` — the regex broke or the export was renamed`);
    return m[1];
  };
  const line = grab('line');
  const sub = grab('sub');
  const fiscal = grab('fiscal');

  const flat = (s) => s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

  // SCOPE IS DERIVED, NEVER LISTED. Any file that renders a footer is a carrier,
  // found by looking. Add an eighth surface with a footer and it is covered on
  // the next build with nothing to remember (§7.6).
  const footerSearchRoots = [
    ...readdirSync(publicDir).filter((f) => f.endsWith('.html')).map((f) => resolve(publicDir, f)),
    ...walk(resolve(root, 'src/pages')).filter((f) => f.endsWith('.astro')),
    ...walk(resolve(root, 'src/layouts')).filter((f) => f.endsWith('.astro')),
    // src/components/ is swept BEFORE it exists. A shared footer component is the
    // obvious next step, and the failure it would otherwise cause is silent: the
    // component would hold the positioning line and nothing would check it.
    ...walk(resolve(root, 'src/components')).filter((f) => f.endsWith('.astro')),
  ];
  // ⚠ MATCH THE MARKUP, NOT THE CLASS NAME. `.footer__tagline` also appears in
  // every carrier's stylesheet, so a bare substring test called a page a carrier
  // on the strength of its CSS after its footer had been deleted — and reported
  // "no parseable footer__tagline" instead of the completeness failure that was
  // actually true. Found by the negative control, not by review.
  const CARRIES = /class="footer__tagline"/;
  const carriers = footerSearchRoots.filter((f) => CARRIES.test(readFileSync(f, 'utf8')));
  if (carriers.length === 0) fail('positioning: found zero footer carriers — the sweep is broken');

  for (const f of carriers) {
    const s = readFileSync(f, 'utf8');
    const rel = relative(root, f).split(sep).join('/');
    const d = s.match(/class="footer__desc"[^>]*>([\s\S]*?)<\/p>/);
    const t = s.match(/class="footer__tagline"[^>]*>([\s\S]*?)<\/div>/);
    if (!d) fail(`positioning: ${rel} has a footer__tagline but no footer__desc`);
    if (!t) fail(`positioning: ${rel} has no parseable footer__tagline`);
    const wantDesc = `${line} ${fiscal}`;
    if (flat(d[1]) !== wantDesc)
      fail(
        `positioning: ${rel} footer__desc has drifted from src/data/positioning.ts:\n` +
          `    positioning.ts: ${wantDesc}\n` +
          `    ${rel}: ${flat(d[1])}\n\n` +
          `  Every surface states the same positioning. Edit the surface, or edit\n` +
          `  positioning.ts and every carrier, but they may not disagree.`,
      );
    if (flat(t[1]) !== sub)
      fail(
        `positioning: ${rel} footer__tagline has drifted from src/data/positioning.ts:\n` +
          `    positioning.ts: ${sub}\n` +
          `    ${rel}: ${flat(t[1])}`,
      );
  }

  // COMPLETENESS — closes the shrinking-scope hole. Without this, deleting a
  // footer makes the gate pass over a smaller site and report success for it.
  // A routable HTML surface must carry the positioning line, or reach something
  // that does.
  //
  // ⚠ REWRITTEN 2026-08-29 TO RESOLVE THE IMPORT GRAPH, because the old model
  // could not see one hop further than a layout. It asked: does this file carry
  // a footer, or does its text contain the FILENAME of a layout that does? That
  // answers "page -> layout" and nothing else. Extract the footer into
  // src/components/Footer.astro and the real chain becomes
  //
  //     news/index.astro  ->  NewsLayout.astro  ->  Footer.astro
  //
  // — two hops. news/index.astro never mentions Footer.astro, so the old check
  // failed SIX of ten routable surfaces, four of which nobody had edited. Proved
  // on a scratch copy 2026-08-29 before this rewrite; the shared-footer work is
  // the reason it exists, and it lands FIRST so that migration is a copy change
  // rather than a copy change plus a gate change plus six confusing failures.
  //
  // ⚠ RESOLVED PATHS, NOT FILENAMES. The old `s.includes(`${L}.astro`)` was
  // satisfied by the string appearing anywhere — a comment naming a layout would
  // have counted as importing it. This resolves each specifier against the
  // importing file's own directory and requires the target to exist on disk.
  //
  // ⚠ THE `seen` SET IS NOT DEFENSIVE PROGRAMMING — IT IS THE TERMINATION
  // CONDITION. Two components importing each other is a cycle, and astro would
  // reject it, but this gate runs BEFORE astro: it must terminate on input astro
  // has not seen yet, or the build hangs with no output instead of failing with
  // a message. Keyed on resolved absolute paths so two different relative
  // specifiers for one file are one node.
  const astroImportsOf = (file) =>
    [...readFileSync(file, 'utf8').matchAll(/from\s+['"]([^'"]+\.astro)['"]/g)]
      .map((m) => resolve(dirname(file), m[1]))
      .filter((p) => existsSync(p));

  const reachesCarrier = (file, seen = new Set()) => {
    const key = resolve(file);
    if (seen.has(key)) return false;
    seen.add(key);
    if (CARRIES.test(readFileSync(file, 'utf8'))) return true;
    return astroImportsOf(file).some((dep) => reachesCarrier(dep, seen));
  };

  const routable = [
    ...readdirSync(publicDir).filter((f) => f.endsWith('.html')).map((f) => resolve(publicDir, f)),
    ...walk(resolve(root, 'src/pages')).filter((f) => f.endsWith('.astro')),
  ];
  for (const f of routable) {
    const rel = relative(root, f).split(sep).join('/');
    if (!reachesCarrier(f))
      fail(
        `positioning: ${rel} renders HTML but neither carries the positioning line nor\n` +
          `  imports anything that does, at any depth.\n\n` +
          `  It would ship without the positioning line, and this gate would not have\n` +
          `  noticed. Give it a footer, or have it import a layout or component that\n` +
          `  carries one.`,
      );
  }

  // T2 + T3 — the homepage is the only surface carrying the line in its head and
  // its H1. Other pages have their own page-specific titles by design.
  const idx = readFileSync(resolve(root, 'src/pages/index.astro'), 'utf8');
  const bare = line.replace(/\.$/, '');
  for (const [label, re] of [
    ['<title>', /<title>([\s\S]*?)<\/title>/],
    ['og:title', /<meta property="og:title" content="([^"]*)"/],
    ['twitter:title', /<meta name="twitter:title" content="([^"]*)"/],
  ]) {
    const m = idx.match(re);
    if (!m) fail(`positioning: index.astro has no ${label}`);
    if (!m[1].includes(bare))
      fail(`positioning: index.astro ${label} does not carry the positioning line\n    want (substring): ${bare}\n    got: ${m[1]}`);
  }
  for (const [label, re] of [
    ['description', /<meta name="description" content="([^"]*)"/],
    ['og:description', /<meta property="og:description" content="([^"]*)"/],
    ['twitter:description', /<meta name="twitter:description" content="([^"]*)"/],
  ]) {
    const m = idx.match(re);
    if (!m) fail(`positioning: index.astro has no ${label}`);
    if (!m[1].startsWith(sub))
      fail(`positioning: index.astro ${label} does not OPEN with the sub line\n    want (prefix): ${sub}\n    got: ${m[1].slice(0, 90)}`);
  }
  const h1 = idx.match(/<h1 class="h1 hero__headline">([\s\S]*?)<\/h1>/);
  if (!h1) fail('positioning: index.astro hero H1 not found');
  if (flat(h1[1]) !== line)
    fail(
      `positioning: index.astro hero H1 has drifted from src/data/positioning.ts.\n` +
        `    positioning.ts: ${line}\n` +
        `    index.astro   : ${flat(h1[1])}\n\n` +
        `  ⚠ The H1 is SPLIT by <span class="accent"> and does not grep as one\n` +
        `  string. This tier compares with tags stripped, which is why it catches\n` +
        `  what a source search would miss.`,
    );

  console.log(
    `✓ positioning: ${carriers.length} footer carriers agree with src/data/positioning.ts; ` +
      `homepage head + H1 carry the line`,
  );
}

// ── 6. shared chrome: no surface may re-declare what public/styles/shared.css owns ─
//
// Design-system pass 1 (2026-08-19) pulled 41 byte-identical chrome rules + the
// token block out of six hand-written surfaces into ONE file. This gate is what
// keeps them out. Without it the duplication returns one paste at a time — it had
// already drifted once before extraction (index carried a 40th token the other
// five did not).
//
// SCOPE IS DERIVED, NOT LISTED (§7.6): the shared selectors are read FROM
// shared.css at build time, and every surface carrying a <style> block is checked
// against them. Add a rule to shared.css and it is guarded on the next build; add
// a seventh surface and it is swept with nothing to remember.
//
// ⚠ WHAT IS ALLOWED: a surface may declare a selector shared.css also declares,
// PROVIDED the declarations differ — that is a deliberate per-surface override
// (.hero, .hero::before, .section, .faq-* are DIFFERENT COMPONENTS sharing a
// name; see the naming-collision queue item in playbook STATE.md). What is
// forbidden is re-declaring it IDENTICALLY, which is duplication returning.
{
  const sharedPath = resolve(root, 'public/styles/shared.css');
  const sharedSrc = readFileSync(sharedPath, 'utf8');
  const strip = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '');
  const rulesOf = (css, ctx = '') => {
    const out = []; let i = 0;
    while (i < css.length) {
      const b = css.indexOf('{', i); if (b === -1) break;
      const sel = css.slice(i, b).trim();
      let depth = 1, j = b + 1;
      while (j < css.length && depth) { if (css[j] === '{') depth++; else if (css[j] === '}') depth--; j++; }
      const body = css.slice(b + 1, j - 1);
      if (sel.startsWith('@') && body.includes('{')) out.push(...rulesOf(body, (ctx + ' ' + sel).trim()));
      else out.push([ctx, sel.replace(/\s+/g, ' '),
        body.split(';').map((x) => x.trim().replace(/\s+/g, ' ')).filter(Boolean).join(';')]);
      i = j;
    }
    return out;
  };
  const sharedRules = rulesOf(strip(sharedSrc));
  if (sharedRules.length === 0) fail('shared.css: parsed zero rules — the parser broke or the file is empty');
  const sharedMap = new Map(sharedRules.map(([c, s, d]) => [`${c}||${s}`, d]));

  const surfaces = [
    ...readdirSync(publicDir).filter((f) => f.endsWith('.html')).map((f) => resolve(publicDir, f)),
    ...walk(resolve(root, 'src/pages')).filter((f) => f.endsWith('.astro')),
    ...walk(resolve(root, 'src/layouts')).filter((f) => f.endsWith('.astro')),
  ];
  let checked = 0;
  for (const f of surfaces) {
    const src = readFileSync(f, 'utf8');
    // ⚠ CSS HIDES IN TWO PLACES, and a negative control caught the gate seeing
    // only one. The four static pages put it BETWEEN <style> and </style>. The
    // two Astro pages put it INSIDE the tag, in a template literal on
    // `set:html={sharedCss + `...`}` — so a between-the-tags reader parsed an
    // empty string for them and would have waved through any duplicate.
    // ⚠ Also: match the LAST <style> before each </style>, not the first.
    // events.astro mentions "<style>" inside a // comment, and a first-match
    // regex swallowed 7KB of frontmatter — it inflated that file's measured CSS
    // by 41% before anyone noticed.
    // TWO PASSES, IN THIS ORDER. The Astro pages put their CSS INSIDE the tag, on
    // `set:html={sharedCss + \`...\`}`, and a naive `<style[^>]*>` cannot find that
    // tag's end because the CSS itself contains `>` (e.g. `a > b`). Reading between
    // the tags first therefore produced a chunk starting MID-TEMPLATE, and the
    // selector parsed as "`}> .footer__copy" — which matches nothing, so an
    // injected duplicate sailed through. Caught by a negative control, not review.
    // So: lift the set:html templates out FIRST, blank them, then read the rest.
    const chunks = [];
    let scan = src;
    for (;;) {
      const at = scan.indexOf('set:html={');
      if (at === -1) break;
      let k = at + 'set:html={'.length, depth = 1;
      while (k < scan.length && depth) { if (scan[k] === '{') depth++; else if (scan[k] === '}') depth--; k++; }
      const expr = scan.slice(at, k);

      // ⚠ AN UNTERMINATED TEMPLATE LITERAL DOES NOT EMPTY THE SWEEP — IT POISONS
      // IT, and that is a worse failure than the one the completeness check
      // below catches. Proved 2026-08-29 by a negative control: removing
      // events.astro's closing backtick did NOT drop it from the sweep. The
      // brace matcher ran past the intended `}`, the backtick regex paired the
      // literal's opener with an unrelated backtick further down, and the gate
      // happily parsed a chunk of FRONTMATTER COMMENT PROSE as this page's CSS
      // — non-empty, so it passed every emptiness test, and matching nothing in
      // shared.css, so it reported no duplicates. Six surfaces, one tick, and
      // the real stylesheet never read.
      //
      // index.astro breaks the other way on the same mutation (empty chunk, the
      // surface drops out) purely because of where its backticks sit. Same
      // cause, two symptoms, and only one of them is visible as a count.
      //
      // Parity is the invariant: a well-formed expression closes every literal
      // it opens. Escaped backticks are discounted so a legitimate \` inside the
      // CSS cannot trip it — there are none today, and this is why adding one
      // will not surprise anyone.
      //
      // This also front-runs the build: the same missing backtick kills astro a
      // step later with an esbuild error naming a line inside an unrelated
      // comment, which is a much worse place to start reading.
      const backticks = (expr.match(/`/g) || []).length - (expr.match(/\\`/g) || []).length;
      if (backticks % 2 !== 0)
        fail(
          `${relative(root, f).split(sep).join('/')} has an UNTERMINATED template literal inside ` +
            `\`set:html={…}\` — ${backticks} backticks, which is odd.\n\n` +
            `  The CSS for this surface is assembled in that literal. Unbalanced, the\n` +
            `  sweep reads the wrong bytes as this page's stylesheet: it can parse\n` +
            `  frontmatter comments as CSS and still report success.\n\n` +
            `  Almost always a deletion that took the closing backtick with it, e.g.\n` +
            `  the last CSS rule and the \`\`}></style>\` that follows it.`,
        );
      for (const t of expr.matchAll(/`([\s\S]*?)`/g)) chunks.push(t[1]);
      // ⚠ the placeholder must NOT contain 'set:html={' or this loop never ends.
      scan = scan.slice(0, at) + '__SET_HTML_LIFTED__' + scan.slice(k);
    }
    for (const m of scan.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) chunks.push(m[1]);
    // ⚠ PARSE EACH CHUNK SEPARATELY, never joined. Joining let junk at the end of
    // one chunk become the head of the next chunk's SELECTOR: an injected duplicate
    // parsed as "__SET_HTML_LIFTED__ /> <style is:inline ...> .footer__copy",
    // matched nothing, and passed. (The junk exists because events.astro mentions
    // the style tag inside // comments, so a tag regex finds those too.)
    const rel = relative(root, f).split(sep).join('/');

    // ── COMPLETENESS — closes the shrinking-scope hole, added 2026-08-29 ──
    //
    // ⚠ THIS GATE ONCE WATCHED A SURFACE LEAVE ITS OWN SWEEP AND CALLED IT
    // SUCCESS. On 2026-08-28 a deletion in index.astro ate the closing backtick
    // of its `set:html={sharedCss + \`...\`}` template literal. The parser then
    // extracted one chunk containing nothing, this loop `continue`d, and the
    // success line went from "6 surfaces carry no duplicate" to "5" — with a
    // tick. Any duplicate rule on the landing page would have been invisible,
    // and nothing in the build said a surface had stopped being checked.
    //
    // The fix is GATE 5's, one gate over: do not assert a COUNT, assert a
    // PROPERTY of every file, so a surface that drops out fails BY NAME. Gate 5
    // derives its routable population independently of its carrier list and
    // requires each member to carry a footer or import a layout that does. The
    // analogue here: a file that DECLARES a style block must yield CSS to the
    // parser. Declaring and parsing nothing is not a quiet skip — it is this
    // gate losing a surface.
    //
    // ⚠ THE EXPECTED COUNT IS DERIVED, NEVER TYPED. It is 6 today (four static
    // pages + events.astro + index.astro); the other five candidate surfaces
    // carry no <style> block at all and get their CSS by import, which this gate
    // does not police. A literal 6 is precisely the thing that decays — add a
    // seventh inline-CSS surface and someone has to remember. Nobody does.
    //
    // ⚠ DETECTED WITH /<style[\s>]/ AND NOT /<style[^>]*>/, deliberately. The
    // malformed case leaves CSS containing `>` inside the tag, so a greedy
    // tag-close match is exactly what fails there. This asks only whether the
    // tag exists at all.
    //
    // KNOWN FALSE POSITIVE, accepted: a file mentioning the literal tag inside a
    // comment while declaring no CSS would fail here. None does — events.astro's
    // comment deliberately avoids writing it, and says so. The direction is
    // safe: this fails loudly and tells you to look, rather than passing over
    // less than it claims.
    const declaresCss = /<style[\s>]/.test(src);
    const parsedCss = chunks.some((c) => c.trim());
    if (declaresCss && !parsedCss)
      fail(
        `${rel} declares a <style> block but the shared-chrome sweep parsed ZERO CSS from it.\n\n` +
          `  This surface has silently left gate 6's coverage — a duplicate rule on it\n` +
          `  would now be invisible, and the only symptom would be this gate's own\n` +
          `  surface count getting smaller while still printing a tick.\n\n` +
          `  Most likely the CSS is malformed rather than absent. On index.astro and\n` +
          `  events.astro the usual cause is the \`set:html={sharedCss + \\\`...\\\`}\` template\n` +
          `  literal losing its closing backtick, which also breaks the astro build a\n` +
          `  step later with an unrelated-looking esbuild error.`,
      );
    if (!parsedCss) continue;
    checked++;
    for (const [c, s, d] of chunks.flatMap((chunk) => rulesOf(strip(chunk)))) {
      const k = `${c}||${s}`;
      if (sharedMap.has(k) && sharedMap.get(k) === d)
        fail(
          `${rel} re-declares a rule that public/styles/shared.css already owns, identically:\n` +
            `    ${c ? c + ' ' : ''}${s}\n\n` +
            `  Delete it here — the surface inherits it (static pages <link> shared.css;\n` +
            `  index.astro and events.astro inline it via ?raw). A per-surface OVERRIDE is\n` +
            `  allowed and must actually differ; an identical copy is the duplication this\n` +
            `  extraction removed, coming back.`,
        );
    }
  }
  // A total parser failure must fail too — `checked` reaching zero is the
  // shrinking-scope hole taken to its limit, and would otherwise print a tick
  // over a site it swept none of.
  if (checked === 0)
    fail(
      'shared chrome: parsed CSS from ZERO surfaces.\n' +
        '  Four static pages and two Astro pages carry inline CSS; finding none means\n' +
        '  the sweep is broken, not that the duplication is gone.',
    );
  console.log(
    `✓ shared chrome: ${sharedRules.length} rules owned by shared.css, ${checked} surfaces ` +
      `carry no duplicate; every surface declaring CSS was parsed`,
  );
}

// ── 7. font coverage: a surface that USES a family must REQUEST it ──────────
//
// Pass 2 put Bebas on every heading via shared.css. Six of seven surfaces did not
// request Bebas — they would have fallen back to Impact, RENDERED FINE, looked
// wrong, and passed every other gate. Same class as the silent font substitution
// that made a raster tool unusable for the OG card: the failure reports success.
//
// DERIVED, NOT ENUMERATED (§7.6): the families are read out of the shared
// stylesheets at build time. Put a new face in shared.css and every surface is
// checked for it on the next build, with nothing to remember here.
{
  const familiesIn = (css) => {
    const out = new Set();
    for (const m of css.matchAll(/font-family:\s*([^;}]+)/g)) {
      const first = m[1].split(',')[0].trim().replace(/^['"]|['"]$/g, '');
      // generic keywords are never web-font requests
      if (!/^(inherit|initial|unset|sans-serif|serif|monospace|cursive|system-ui|-apple-system)$/i.test(first))
        out.add(first);
    }
    return out;
  };
  const sharedFamilies = familiesIn(readFileSync(resolve(root, 'public/styles/shared.css'), 'utf8'));
  if (sharedFamilies.size === 0) fail('font coverage: parsed zero font families from shared.css — the regex broke');

  // Every surface that renders HTML and pulls in shared chrome.
  const surfaces = [
    ...readdirSync(publicDir).filter((f) => f.endsWith('.html')).map((f) => resolve(publicDir, f)),
    ...walk(resolve(root, 'src/pages')).filter((f) => f.endsWith('.astro')),
    ...walk(resolve(root, 'src/layouts')).filter((f) => f.endsWith('.astro')),
  ];
  let checked = 0;
  for (const f of surfaces) {
    const src = readFileSync(f, 'utf8');
    const req = src.match(/fonts\.googleapis\.com\/css2\?([^"']+)/);
    if (!req) continue;                       // no font request at all = not a rendering surface
    const requested = [...req[1].matchAll(/family=([^&"']+)/g)].map((m) => decodeURIComponent(m[1]).replace(/\+/g, ' ').split(':')[0]);
    const rel = relative(root, f).split(sep).join('/');
    checked++;
    // Only assert families this surface can actually inherit: it either links
    // shared.css, inlines it via ?raw, or imports chrome.css (which imports it).
    const inherits = src.includes('styles/shared.css') || src.includes('styles/chrome.css');
    if (!inherits) continue;
    for (const fam of sharedFamilies) {
      if (!requested.includes(fam))
        fail(
          `${rel} inherits shared.css but never REQUESTS "${fam}".\n` +
            `    requested: ${requested.join(', ') || '(none)'}\n\n` +
            `  The page would render in a fallback face — it would look wrong and pass\n` +
            `  every other gate. Add &family=${fam.replace(/ /g, '+')} to its fonts.googleapis.com link.`,
        );
    }
  }
  console.log(`✓ font coverage: ${[...sharedFamilies].join(' + ')} requested on all ${checked} rendering surfaces`);
}
