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

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname, relative, sep } from 'node:path';
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

    const key = `${e.date} ${e.title}`;
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

  // ── index.astro's session count ───────────────────────────────────────────
  // INTERIM. index.astro's JSON-LD is `is:inline`, which Astro does not
  // interpolate, so this count cannot be derived the way llms.txt derives its
  // own — it is written, and guarded here instead. The @graph-templating
  // session retires this check along with the identity guard above.
  const idxSrc = readFileSync(resolve(root, 'src/pages/index.astro'), 'utf8');
  const m = idxSrc.match(/Has hosted (\d+) sessions since/);
  if (!m) fail('index.astro: could not find the "Has hosted N sessions since" claim — the regex broke');
  if (Number(m[1]) !== events.length)
    fail(
      `index.astro claims ${m[1]} sessions; src/data/events.json holds ${events.length}.\n` +
        `  These are the same number and must agree.`,
    );

  // The homepage @graph is deliberately 7 nodes. The 49 nodes this pass adds
  // live on /events and must never leak into it.
  const graphBlock = idxSrc.match(/<script type="application\/ld\+json" is:inline>([\s\S]*?)<\/script>/);
  if (!graphBlock) fail('index.astro: could not locate the JSON-LD block');
  let graph;
  try {
    graph = JSON.parse(graphBlock[1]);
  } catch (e) {
    fail(`index.astro JSON-LD does not parse: ${e.message}`);
  }
  if (graph['@graph']?.length !== 7)
    fail(`index.astro @graph has ${graph['@graph']?.length} nodes; the invariant is 7`);

  console.log(
    `✓ events: ${events.length} sessions across ${seriesNames.length} series, canonical form, ` +
      `digit-free synopses; index.astro count agrees; homepage @graph 7`,
  );
}

writeFileSync(outPath, JSON.stringify(meta, null, 2) + '\n');

console.log(
  `✓ coverage: ${onDisk.length}/${onDisk.length} routes accounted for ` +
    `(${staticPages.length} static + ${astroRoutes.length} astro); ` +
    `metadata verified for ${Object.keys(meta).length}`,
);
