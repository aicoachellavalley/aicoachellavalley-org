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
import { resolve, dirname } from 'node:path';
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

const onDisk = readdirSync(publicDir).filter((f) => f.endsWith('.html'));
if (onDisk.length === 0) fail('found zero *.html in public/ — the six pages should be there');

const missing = onDisk.filter((f) => !declared.includes(f));
const phantom = declared.filter((f) => !onDisk.includes(f));

if (missing.length)
  fail(
    `these pages exist in public/ but are in neither \`pages\` nor \`excluded\`:\n` +
      missing.map((f) => `    - ${f}`).join('\n') +
      `\n\n  Add each to src/data/site-pages.ts — to \`pages\` to publish it in the\n` +
      `  sitemap and llms.txt, or to \`excluded\` with the reason it stays out.`,
  );

if (phantom.length)
  fail(
    `the manifest names files that are not in public/:\n` +
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

const meta = {};
for (const file of feedFiles) {
  const html = readFileSync(resolve(publicDir, file), 'utf8');
  const t = html.match(/<title>([\s\S]*?)<\/title>/i);
  const d = html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']\s*\/?>/i);

  if (!t) fail(`no <title> in public/${file}`);
  if (!d) fail(`no meta description in public/${file}`);

  const title = decode(t[1]);
  const description = decode(d[1]);
  if (!title) fail(`empty <title> in public/${file}`);
  if (!description) fail(`empty meta description in public/${file}`);

  meta[file] = { title, description };
}

writeFileSync(outPath, JSON.stringify(meta, null, 2) + '\n');

console.log(
  `✓ prepare-feeds: ${onDisk.length}/${onDisk.length} pages in public/ accounted for; ` +
    `metadata extracted for ${Object.keys(meta).length}`,
);
