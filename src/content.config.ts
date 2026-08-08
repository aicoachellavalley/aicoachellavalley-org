import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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
    tags: z.array(z.string()).min(1).max(5),
    author: z.string().default('Sat Singh'),
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
  }),
});

export const collections = { news };
