import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { PEOPLE_KEYS } from './data/people';

// ════════════════════════════════════════════════════════════════════════════
// news — editorial pieces for HUMANS, 600–1500 words.
//
// Deliberately NOT .com's brief shape. .com briefs are agent-facing regional
// surveillance with an "Agent Signal" section; these are articles people read.
// Do not add Agent Signal / Related Nodes here.
//
// STRUCTURE (ruled 2026-08-08, "light convention"):
//   · unheaded lede — 1–2 paragraphs
//   · free `##` headings as the piece needs
//   · ONE rule: the piece must answer why it matters in the Coachella Valley
// A structure nobody follows is worse than none.
//
// The length bounds are enforced, not advisory: a title that breaks the card
// layout or a description that truncates in search fails the build instead of
// shipping.
// ════════════════════════════════════════════════════════════════════════════

const news = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/news' }),
  schema: z.object({
    title: z.string().min(10).max(70),
    description: z.string().min(70).max(160),
    date: z.coerce.date(),
    // The DECK — the line under the headline. Distinct from `description`,
    // which is the meta/social claim; 13 of the 20 ported pieces that carry a
    // standfirst say something their description does not, so [slug].astro
    // does NOT fall back to description when this is absent.
    //
    // OPTIONAL because 20 of 32 ported pieces have one and 12 do not. Bounds
    // keep it to a single line: shorter reads as a fragment, longer becomes a
    // second description.
    standfirst: z.string().min(40).max(220).optional(),
    tags: z.array(z.string()).min(1).max(5),
    // REQUIRED, and deliberately NOT defaulted. A default would let a
    // mis-sorted piece land silently in the wrong bucket; required means the
    // build fails, which is the gate doing its job. The signals→news /
    // blog→views map is a real editorial call made per piece on register, so
    // it must not be defaultable — and it is a hard blocker on all 32 ported
    // files, which is the intent. A failing build beats 32 pieces silently
    // landing in one bucket.
    category: z.enum(['news', 'views']),
    // A KEY into src/data/people.ts, not a display name. A typo fails the
    // build instead of silently minting a second author with no page and no
    // @id — which is what a free string did until 2026-08-10. The key resolves
    // to the person's name, canonical @id and author-page URL, so a byline
    // always has somewhere to land.
    author: z.enum(PEOPLE_KEYS).default('sat-singh'),
    // Drives sitemap <lastmod> when present; otherwise `date` is used.
    updated: z.coerce.date().optional(),
    // Drafts are excluded from EVERY feed (sitemap, llms.txt, RSS) and from
    // the /news index, but still build to a URL so they can be previewed.
    draft: z.boolean().default(false),
    image: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .optional(),
    // ────────────────────────────────────────────────────────────────────────
    // FAQ — ONE SOURCE for the FAQPage JSON-LD and (later) the visible section.
    //
    // Added 2026-08-12, ahead of the 32-file port from sunshine.fm, so those
    // pieces arrive single-sourced instead of as new mirror pairs. The pattern
    // to avoid is already on this site: the homepage FAQ is 14 questions
    // hand-maintained in TWO places — visible markup and `is:inline` JSON-LD —
    // guarded by nothing. Porting 81 answers that way would have quadrupled it.
    //
    // [slug].astro generates the FAQPage node from this array. When the visible
    // section lands it renders from THE SAME array, so there is no second copy
    // and nothing to keep in step — no guard is needed because no mirror exists.
    //
    // ⚠ TWO DECISIONS HERE ARE EXPENSIVE TO REVERSE, and they are what make the
    // visible render a template edit rather than a 22-file migration:
    //   1. `question`/`answer`, not `q`/`a`. This frontmatter is hand-edited by
    //      a non-developer; self-documenting keys read better than terse ones in
    //      a file that is written once and read many times. Renaming later
    //      touches 22 files and 81 entries.
    //   2. Answers are PLAIN STRINGS, not markdown. Measured across all 81
    //      ported answers: zero HTML tags, zero entities, zero newlines. So the
    //      render is `{f.answer}` — no markdown pipeline, no set:html, no
    //      sanitisation. Markdown would be additive later if ever needed.
    //
    // Optional at the field level, deliberately: the port is blog 20/20 but
    // signal 2/12. Ten pieces have no FAQ and must not be forced to invent one.
    //
    // Bounds sit just outside the measured range (questions 13–129 chars,
    // answers 249–855, three to five per file) on the same principle as `title`
    // and `description` above — enforced, not advisory.
    // ────────────────────────────────────────────────────────────────────────
    faq: z
      .array(
        z.object({
          question: z.string().min(10).max(160),
          answer: z.string().min(180).max(1000),
        }),
      )
      .min(2)
      .max(6)
      .optional(),
  }),
});

export const collections = { news };
