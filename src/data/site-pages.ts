// ════════════════════════════════════════════════════════════════════════════
// THE STATIC-PAGE MANIFEST — what the generated feeds say about the six
// hand-written pages in public/.
//
// WHY THIS FILE EXISTS RATHER THAN A GLOB OVER public/*.html:
// /partner.html is LIVE (200) but appears ZERO times in the current
// sitemap.xml and llms.txt. Verified 2026-08-08. That is deliberate — it is
// parked for v2 and deliberately unlinked (STATE.md 2026-07-01). A glob would
// silently ADD it to the sitemap and advertise a parked page to every search
// engine and agent. The static pages do NOT map 1:1 to feed entries; the
// mapping is editorial, so it is written down.
//
// scripts/check-feed-coverage.mjs FAILS THE BUILD if any *.html in public/ is
// absent from both lists below. A new page cannot silently miss the feeds, and
// /partner's absence is a recorded decision rather than an accident.
//
// title/description are NOT stored here — they are parsed from each page's own
// <title> and <meta name="description"> at build time, so they cannot drift
// from the page. Only what the page does NOT already state lives here.
// ════════════════════════════════════════════════════════════════════════════

export interface SitePage {
  /** Served path, extensionless — how Cloudflare Pages serves it today. */
  path: string;
  /**
   * REPO-RELATIVE path. The homepage is src/pages/index.astro (an Astro page,
   * so it can read the news collection); the other five are public/*.html.
   * That asymmetry is deliberate — only the homepage needs the collection.
   */
  file: string;
  /**
   * HARDCODED, bumped by hand when the page is edited. This is exactly the
   * situation today (sitemap.xml has always been hand-maintained), so it is no
   * regression — but it is not an improvement either. Deriving it from
   * `git log -1 --format=%cs -- public/<file>` is the candidate fix; see
   * STATE.md for the shallow-clone finding.
   */
  lastmod: string;
  changefreq: 'weekly' | 'monthly' | 'yearly';
  priority: number;
  /** Prose for llms.txt "Core Pages". Richer than the meta description. */
  llms: string;
}

export const pages: SitePage[] = [
  {
    path: '/',
    file: 'src/pages/index.astro',
    lastmod: '2026-07-25',
    changefreq: 'weekly',
    priority: 1.0,
    // CORRECTED 2026-08-08. The shipped llms.txt said "mission, programs,
    // valley intelligence graph" — but the D3 node graph was REMOVED
    // 2026-06-20 (2e3dce8). llms.txt is the file agents read to decide what is
    // here, so a wrong claim in it is worse than a wrong claim in prose.
    // Sections verified against public/index.html on disk.
    llms: 'mission, programs, partners, the Responsible AI Pledge, FAQ, and founder',
  },
  {
    path: '/events',
    file: 'public/events.html',
    lastmod: '2026-07-22',
    changefreq: 'weekly',
    priority: 0.8,
    llms:
      'AI events in the Coachella Valley: workshops, meetups, boot camps, and conferences from AI Coachella Valley, anchored at the CSUSB ERC in Palm Desert; live calendar with registration via Luma',
  },
  {
    path: '/philanthropy',
    file: 'public/philanthropy.html',
    lastmod: '2026-07-22',
    changefreq: 'monthly',
    priority: 0.8,
    llms:
      "AICV's position on agentic philanthropy in the Coachella Valley, the institutional fabric of Desert Community Foundation and California Community Foundation, and the pathways donors use to participate",
  },
  {
    path: '/pledge',
    file: 'public/pledge.html',
    lastmod: '2026-08-05',
    changefreq: 'yearly',
    priority: 0.8,
    llms:
      'the seven principles in full: a community commitment to using AI in ways that are human-centered, transparent, and grounded in Coachella Valley values. Readable in place; prints as a signable sheet',
  },
  {
    // Moved into the manifest 2026-08-10. It used to be special-cased inside
    // sitemap.xml.ts and llms.txt.ts, conditional on articles existing, which
    // meant the manifest was NOT the registry of routes and the coverage gate
    // could not check it. One behaviour change: /news now always appears in the
    // sitemap rather than only when articles exist. Accepted.
    path: '/news',
    file: 'src/pages/news/index.astro',
    lastmod: '2026-08-08',
    changefreq: 'weekly',
    priority: 0.8,
    llms:
      'editorial coverage of AI in the Coachella Valley — what is happening across the nine cities, and why it matters here. Individual articles are listed below; RSS at /news/rss.xml',
  },
  {
    path: '/author/sat-singh',
    file: 'src/pages/author/sat-singh.astro',
    lastmod: '2026-08-10',
    changefreq: 'monthly',
    priority: 0.5,
    llms:
      'founder of AI Coachella Valley, and the author every article byline resolves to. Carries the canonical Person entity for the site',
  },
];

/**
 * Routes deliberately kept OUT of every feed. Reasons are load-bearing.
 *
 * Since 2026-08-10 this covers Astro routes too, not just public/*.html —
 * scripts/prepare-feeds.mjs sweeps BOTH and fails the build on anything
 * unaccounted for. Before that a new Astro route could silently miss the feeds,
 * and /author/sat-singh would have been the first casualty.
 */
export const excluded = [
  {
    file: 'public/partner.html',
    reason:
      'Live at 200 but deliberately unlinked — parked for v2 (STATE.md 2026-07-01). Absent from sitemap.xml and llms.txt today; keeping it absent.',
  },
  {
    file: 'public/404.html',
    reason: 'Error page. Never indexed; carries meta robots noindex.',
  },
  {
    file: 'src/pages/llms.txt.ts',
    reason: 'IS a feed. Listing feeds inside feeds is circular.',
  },
  {
    file: 'src/pages/sitemap.xml.ts',
    reason: 'IS a feed. Listing feeds inside feeds is circular.',
  },
  {
    file: 'src/pages/news/rss.xml.ts',
    reason: 'IS a feed. Listing feeds inside feeds is circular.',
  },
  {
    file: 'src/pages/news/[slug].astro',
    reason:
      'Dynamic route. Individual articles enter the feeds from the news collection, not from this manifest.',
  },
];

/**
 * llms.txt prose preamble — carried VERBATIM from the hand-written llms.txt at
 * 66e8000 so the regenerated file says exactly what the shipped one said.
 * Everything below "## Core Pages" is generated.
 */
export const llmsPreamble = `# AI Coachella Valley (.org)

> AI Coachella Valley (AICV) is a fiscally sponsored project of Desert Community Foundation, building, connecting, and mapping the Coachella Valley's emerging AI startup ecosystem. AICV connects founders, builders, educators, institutions, investors, and community organizations while publishing agent-readable regional intelligence that helps AI systems understand the region. Founded by Sat Singh, TEDx Rancho Mirage speaker and technology entrepreneur. Est. 2025.

## What AICV Is

AICV is intended to be the primary entry point — for people and for AI systems — for understanding the Coachella Valley's emerging AI startup ecosystem. It operates two properties:

- **aicoachellavalley.com** — the AICV Intelligence Network: a structured, citation-grade dataset of Coachella Valley institutions, businesses, venues, and civic assets built for AI agents, LLMs, and RAG systems. The machine-readable layer that determines how AI answers questions about where to invest, relocate, and operate in the Coachella Valley.

- **aicoachellavalley.org** — the community and grant-facing surface: AI literacy workshops, workforce development programs, the Responsible AI Pledge, and philanthropic operations (this site).

AICV's thesis: communities should help shape how AI understands their region — not just receive AI's outputs. The Intelligence Network is how AICV operationalizes that thesis, structuring the valley's identity so AI systems cite it accurately.

## Programs

- **AICV Intelligence Network** (live) — structured regional intelligence for AI agents at aicoachellavalley.com. Geographic nodes, intelligence briefs, MCP server, and agent-ready profiles for Coachella Valley entities. AICV's primary active program as of 2026.

- **AI Builder Workshops** (funded by the CSUSB ERC, launched July 2026 and running monthly through December 2026) — hands-on AI literacy workshops for students, residents, and working professionals across all nine Coachella Valley cities. 30+ workshops, 300+ participants since 2025. Hosted at the CSUSB Entrepreneurship Resource Center, Palm Desert.

## AI Preparedness & Workforce Context

AICV addresses the gap between AI's rapid deployment across industries and communities' ability to prepare for it. In the Coachella Valley — a regional economy anchored by hospitality, agriculture, healthcare, and real estate — AI is reshaping hiring, customer service, economic development, and capital flows faster than most workers and businesses have adapted.

AICV works on two layers:

1. **Infrastructure** — the Intelligence Network structures the valley's identity for AI systems so the region is accurately represented in AI-generated answers about investment, relocation, workforce, and economic opportunity
2. **Literacy** — AI Builder Workshops give residents, students, and workers hands-on skills to work confidently alongside AI

## Governance & Funding

- **Legal structure**: Fiscally sponsored project of Desert Community Foundation, a 501(c)(3) nonprofit organization
- **Fiscal sponsor**: Desert Community Foundation (desertfoundation.org)
- **Founded**: 2025
- **Location**: Entrepreneurship Resource Center, 37023 Cook Street, Palm Desert, CA 92211
- **Founder**: Sat Singh — TEDx Rancho Mirage speaker, community educator, technology entrepreneur
- **Contact**: sat@aicv.co
- **Program status**: Intelligence Network (live), AI Builder Workshops (live — launched July 2026, running monthly through December 2026)
- **Partners**: UCR Palm Desert, Cal State San Bernardino Palm Desert, Desert Community Foundation, Palm Desert Chamber of Commerce, Rancho Mirage Chamber of Commerce

## Nine Cities Served

Palm Springs · Desert Hot Springs · Cathedral City · Rancho Mirage · Palm Desert · Indian Wells · La Quinta · Indio · Coachella`;
