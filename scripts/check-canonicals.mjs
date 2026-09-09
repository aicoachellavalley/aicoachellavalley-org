// ════════════════════════════════════════════════════════════════════════════
// CANONICAL TARGETS GATE (2026-09-09). Every `canonical_url` in src/content
// must resolve on the wire. A canonical pointing at a 404 is worse than no
// canonical — search engines may drop both copies — and this is exactly the
// sequencing failure the port plan was built to avoid.
//
// FAILS on 404 / 410 (the target is definitively gone).
// WARNS on network errors, timeouts and 5xx (the target may be fine; the
// build must not depend on aicv.news being up at the second .org builds).
// ════════════════════════════════════════════════════════════════════════════
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dir = 'src/content/news';
const targets = [];
for (const f of readdirSync(dir)) {
  if (!f.endsWith('.mdx')) continue;
  const fm = (readFileSync(join(dir, f), 'utf8').match(/^---\n([\s\S]*?)\n---/) || [])[1] || '';
  const m = fm.match(/^canonical_url:\s*"?([^"\n]+)"?\s*$/m);
  if (m) targets.push({ file: f, url: m[1].trim() });
}
if (targets.length === 0) { console.log('✓ canonicals: none set (all self-canonical)'); process.exit(0); }
let gone = 0, warned = 0;
for (const t of targets) {
  try {
    const res = await fetch(t.url, { method: 'HEAD', redirect: 'manual', signal: AbortSignal.timeout(15000) });
    if (res.status === 404 || res.status === 410) { console.error(`✗ canonical target GONE (${res.status}): ${t.url}  ← ${t.file}`); gone++; }
    else if (res.status !== 200) { console.warn(`⚠ canonical target ${res.status}: ${t.url}  ← ${t.file}`); warned++; }
  } catch (e) { console.warn(`⚠ canonical target unreachable: ${t.url}  ← ${t.file} (${e.name})`); warned++; }
}
if (gone) { console.error(`✗ canonicals: ${gone} of ${targets.length} targets are gone — fix before shipping`); process.exit(1); }
console.log(`✓ canonicals: ${targets.length} external targets, ${targets.length - warned} verified 200${warned ? `, ${warned} unverified (network)` : ''}`);
