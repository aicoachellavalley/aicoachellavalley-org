import data from './people.json';

// ════════════════════════════════════════════════════════════════════════════
// PEOPLE — the canonical identity registry.
//
// WHY THIS EXISTS:
// Before 2026-08-10 there were five Person nodes for one human across .org and
// .com, and the only @id that existed (#sat-singh) was referenced by nothing.
// Article bylines emitted an anonymous Person and linked nowhere. The data
// below is the single definition; everything else REFERENCES it.
//
// WHY THE DATA IS IN people.json AND NOT IN THIS FILE:
// scripts/prepare-feeds.mjs has to read these values to assert that
// index.astro's hand-written JSON-LD still matches them. It runs BEFORE vite,
// so it cannot import TypeScript — the first version regex-parsed this file
// and broke immediately on template literals, which is the fragile
// literal-parsing trap. JSON is parsed by both sides with no regex at all.
//
// WHO USES IT:
//   src/pages/author/sat-singh.astro — the full Person, as ProfilePage.mainEntity
//   src/pages/news/[slug].astro      — a bare { "@id" } reference, not a copy
//   src/content.config.ts            — the `author` enum keys (typo = build error)
//   scripts/prepare-feeds.mjs        — the index.astro drift assertion
//
// ⚠ index.astro's JSON-LD is a hand-maintained `is:inline` block and CANNOT
// import this — Astro does not interpolate inside is:inline. The build fails if
// the two disagree. Converting index's whole @graph to a templated object is
// the endgame; it is a large, risky diff on the site's most important page and
// belongs in its own session with its own verification.
// ════════════════════════════════════════════════════════════════════════════

export interface Person {
  /** URL slug -> /author/<slug>. Also the `author` key in article frontmatter. */
  slug: string;
  name: string;
  /** Canonical JSON-LD @id. Stable forever — other nodes reference this. */
  id: string;
  /** Absolute URL of the person's own page. */
  url: string;
  jobTitle: string;
  /** Mirrors index.astro's founder node. Asserted equal at build time. */
  description: string;
  /** Identity links. ONLY URLs that genuinely represent THIS PERSON. */
  sameAs: string[];
  image?: string;
}

export const PEOPLE: Record<string, Person> = data;

/** Frontmatter `author` keys. A typo fails the build instead of silently
 *  minting a second author — see src/content.config.ts. */
export const PEOPLE_KEYS = Object.keys(PEOPLE) as [string, ...string[]];

export const person = (slug: string): Person => {
  const p = PEOPLE[slug];
  if (!p) throw new Error(`[people] unknown person slug: ${slug}`);
  return p;
};

// NOTE ON sameAs, 2026-08-10:
//   · x.com/CoachellaAI is Sat's PERSONA account — his avatar, first-person
//     voice. It doubles as AICV coverage, but the person is behind it and the
//     organization does not post. It was moved here FROM Organization.sameAs
//     on index.astro; asserting it was another representation of the
//     ORGANIZATION was a category error pointing the other way.
//   · The Organization does not lose the connection — its `founder` property
//     points at this Person's @id, so an agent following that chain still
//     reaches the account. The relationship is expressed, not collapsed.
//   · InformedIE has NO public URL yet (expected Sept/Oct 2026). When it
//     exists it belongs in sameAs above AND as a link in the author-page prose.
//     Until then it stays plain text — a dead link is worse than a plain noun.
//   · .com carries 3 more Person nodes with no @id at all (index.astro:114,
//     :239, get-agent-ready.astro:284, all also asserting x.com as the
//     ORGANIZATION's sameAs). Cross-repo follow-on: unify on this @id with its
//     own deploy and verification.
