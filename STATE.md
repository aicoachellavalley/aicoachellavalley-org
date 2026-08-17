# org/ operational state

> Operational state only. Strategic state lives in `aicv-playbook/STATE.md`.
> **Fresh session? Read `HANDOFF.md` first** (tight orientation), then this file for full detail. Current HEAD: **.org is an ASTRO HYBRID, LIVE IN PRODUCTION since 2026-08-09 (`5d354d4`) — FOUR hand-written pages live in `public/` and still ship byte-for-byte, TWO are Astro pages (`index.astro`, `events.astro`), `dist/` is the deploy directory, and there IS a build step. Run `npm run build` locally before every push.** **`/events` carries a DATED RECORD as of 2026-08-11 (`4d75ebc`, `94c5f13`)**: 42 sessions across six series rendered from `src/data/events.json`, with 49 JSON-LD nodes. Before this the page contained ZERO events — a hero and a Luma iframe, invisible to every agent. ⚠ **That file is the sole copy of 28 of those events; Luma has no export and no API, and its public calendar lists only 14. Never regenerate it from Luma.** **The homepage STATS BAND was removed 2026-08-13 (`9eb3f9b`)** — three of its four cells were unsupportable ("300+ students", "12+ partners", "9 cities" framed as delivery) and the fourth contradicted `/events`. The session count now derives from `events.json` in the founder prose; only the `is:inline` JSON-LD keeps a guarded constant. ⚠ **Verify claims against RENDERED output with tags joined, not against source** — `30<em>+</em>` does not grep as "30+", and that is why the claim survived two prior fixes. **THE 32-PIECE PORT LANDED 2026-08-14 (`bbaffd9`) as noindexed drafts** — `/news/<slug>` resolves for all 32, none appears in any feed, and nothing is public until `draft` flips. ⚠ **Re-derive every count on use**: four this week were carried rather than re-measured and all four were wrong — see the 2026-08-14 entry. **THE CALLOUT SPLIT AND THE MOBILE CLAMP FLOOR CLOSED 2026-08-15** — `.callout--related` is a third rule (42 = **20** pull-quotes + 4 related + 18 briefs; "24 pull-quotes" was itself a miscount), and the index entry title now restates its ramp at a **28px** floor in news.css while `--fs-headline` stays 34px in chrome.css for `.article__title`. ⚠ **The standalone type harness UNDER-COUNTS** — it measures a 333px box where the real title sets in 285px, and it was wrong at every floor; measure on the real index with the draft filter off, then revert. `/news/` is a generated publishing surface; `sitemap.xml` and `llms.txt` are generated routes, not files. **Author page live (2026-08-10)**: `/author/sat-singh` is a ProfilePage carrying the canonical Person `@id`; article bylines link to it and reference that `@id` rather than emitting an anonymous Person. `src/data/people.json` is the single definition and a build gate keeps index.astro's hand-written JSON-LD in step. The coverage gate now sweeps `src/pages/**`, not just `public/`. **Phase 2 (2026-08-09) ended byte-identity**: the homepage is now `src/pages/index.astro` (the other five stay static HTML in `public/` — deliberate asymmetry), News is in the nav/drawer/footer on all six, and the homepage carries a recent-articles section. ⚠ `index.astro`'s style block MUST keep `is:inline`. The site is SIX static pages, `/pledge` is live, the rebrand backlog is EMPTY, the CSS is fully swept, and the token names match BRAND.md §4 (2026-08-06). Operational docs 404 via a Pages Function. Step 5 (regenerate the pledge deck) and the X-Frame-Options item are both CLOSED BY REMOVAL — the deck and the lightbox no longer exist. Fiscal wording is canon-aligned on "project". `/pledge` is in the nav, drawer and footer on all six pages. The fiscal inventory is CUT: 24 placements to 14, and both "initiative" and "under Desert Community Foundation" are now zero sitewide. No known wording divergence remains. *(This pointer had been stale at `f86f83e`/2026-07-01 for five weeks — bump it every session.)*

## Current

- **HYBRID.** **Four** hand-written pages live in `public/` and ship byte-for-byte via Vite's `copyFileSync`. **TWO are now Astro pages** — the homepage (`src/pages/index.astro`, because it reads the news collection) and `/events` (`src/pages/events.astro`, because it derives the record from `src/data/events.json`). That asymmetry is deliberate; see the 2026-08-09 Phase 2 and 2026-08-11 events entries. **There IS a build step.** `npm run build` locally before every push: Pages silently serves the last good build behind a failed one.
- **SIX** pages. **Astro:** `src/pages/index.astro`, `src/pages/events.astro`. **Static:** `public/philanthropy.html`, `public/partner.html`, `public/pledge.html`, `public/404.html`. **`partner.html` is live at 200 but deliberately unlinked** (parked for v2 — see the 2026-07-01 entry) and is absent from both feeds by recorded decision; it carries the nav and footer, so it is in scope for anything site-wide and is easy to forget. (`ai-readiness.html` was RETIRED in `e519554`; `philanthropy.html` added in `456dede`; `events.html` became an Astro page 2026-08-11 and git tracked it as a rename.)
  - ⚠ **Per-page line counts were DELETED here 2026-08-11. Do not re-add them.** They had drifted twice and, the second time, silently: all four static pages sat 2 lines high from the nav pass (`bfd95d6`) onward, because taking "The Pledge" out of `nav__links` and `nav__drawer` costs each file exactly 2 lines, and nothing announced it. The rule that replaced them: **guard counts that make public claims, drop counts that only describe the repo.** "42 sessions" is an assertion to a grants officer and an LLM, so it earns a build gate. A line count changes no decision and is one `wc -l` away — it was never the only source, just the only stale one. What stays here is what sessions actually act on and what does not decay per edit: which pages exist, Astro vs static, and that `partner.html` is live-but-unlinked.
- **`src/data/events.json` (271 lines) is the SOLE record of 28 events** that appear on no public surface. Luma has no export and no API on this calendar. **Never regenerate it from Luma** — see the 2026-08-11 events entry.
- Supporting files: `robots.txt` (hand-written, in `public/`), PDFs. **`sitemap.xml` and `llms.txt` are GENERATED** — they are Astro routes, not files, and cover the four public static pages plus every article automatically.
- Agent endpoints: `/.well-known/api-catalog` (RFC 9727 linkset), `/.well-known/mcp/server-card.json`
- `_headers`: security headers on `/*` + `Link: </.well-known/api-catalog>; rel="api-catalog"` + CORS + Content-Type overrides for agent endpoints
- Deploy: auto-deploy on push to `main`; manual `wrangler pages deploy` available as fallback.
- Zone: Cloudflare Free plan. Markdown for Agents NOT enabled — requires Cloudflare Pro / Transform Rules; deferred (see Agent-Readiness below).

## Functional role

Community and nonprofit face of AICV. Mission, programs, AICV Pledge, events, philanthropy. Audience: grants officers, community partners, workshop alumni, valley residents. Distinct from .com which is the agent-native intelligence layer. (The homepage D3 node graph was REMOVED 2026-06-20 — see that entry; the corpus lives on `.com`, "Intelligence Network ↗" is the pointer.)

---

## 2026-04-22 — Comprehensive uplift (four commits)

### Commits (most recent first)

- **dc28e2a** — feat: add Intelligence Layer card, expand Valley Wide graph band. Third program card added (AICV Intelligence Layer, LIVE status, "Built for agents. Powered by humans."). Valley Wide D3 band expanded from h:80 to h:140; all city zones shifted +60px; SVG viewBox grew 900 → 960.
- **d964a52** — fix(graph): repoint fetch to nodes.json, replace Mintlify parser. Graph had been silently 404ing for ~2 months — DOCS_URL pointed to a retired GitHub raw file. Fixed: NODES_URL → aicoachellavalley.com/nodes.json, Mintlify nav tree-walker replaced with flat-array iterator.
- **f2d3047** — feat: program truth + Content Signals. AI Builder Workshops marked paused with Luma signup; Community Build Sprints removed; Workforce Bridge Marketplace renamed to "AI Talent & Job Board (planned)"; partnership list corrected (UCR, CSUSB, DCF, Palm Desert Chamber, Rancho Mirage Chamber, IE Journalism Hub; College of the Desert removed); TEDx link added as founder credibility signal; four FAQPage answers updated; Organization + WebSite schema descriptions fixed for truth consistency; Content-Signal added to robots.txt.
- **e58ffa7** — feat: agent-readiness + social hygiene uplift. OG/Twitter meta on both pages; FAQPage schema added to @graph; WebSite description expanded; robots.txt and llms.txt published; six hardcoded dates refreshed to 2026-04-22.

### Schema on homepage (as of 2026-04-22)

`@graph` with 4 objects: Organization + NGO, WebSite (with description), EducationalOrganization, FAQPage (6 questions). All descriptions reflect current program truth.

### Agent surfaces (as of 2026-04-22)

- `/robots.txt` — Content-Signal: ai-train=yes, search=yes, ai-input=yes
- `/llms.txt` — AICV nonprofit-side summary, cross-references .com as intelligence layer
- `/sitemap.xml` — two URLs (homepage, events)

---

## D3 Node Graph — REMOVED 2026-06-20 (`2e3dce8`)

> The homepage D3 node graph was deleted entirely (mount + D3 CDN lib + the ~470-line IIFE + the `.com/nodes.json` fetch). Rationale: it wasn't agent-legible, the node corpus lives on `.com`, and "Intelligence Network ↗" is the honest pointer. The homepage is now D3-dependency-free with no cross-domain fetch. **The two debts below are now MOOT** (no graph to drift or fail) — retained only as history.

~~Live on homepage. Fetches `https://aicoachellavalley.com/nodes.json` (CORS-enabled) and renders ~80 nodes in zone bounding boxes for 9 cities + Valley Wide + Adjacent bands.~~

### ~~Known debt — ZONE_MAP / SUB_MAP drift~~ (MOOT — graph removed)

~~`ZONE_MAP`/`SUB_MAP` hardcoded in `index.html`, last synced `2ab7408`; nodes added to `.com` after that render unpositioned.~~ (At removal time the drift was near-nil: 80/81 nodes positioned.)

### ~~Known debt — silent fetch failure~~ (MOOT — graph removed)

~~The graph fetch used `.catch(console.warn)` only — a failed fetch produced a blank SVG with no error state.~~

---

## Programs section (as of 2026-04-22)

> ⚠️ FULLY SUPERSEDED 2026-06-30 — see the **2026-06-30 Programs reshape** entry below. The three cards listed here NO LONGER EXIST. AI Builder Workshops is no longer a Programs card (it survives as a service in schema + FAQ Q3/Q9 + /events); the AI Talent & Job Board concept is **RETIRED**. Current cards are **AI Tinkerers Coachella Valley · AIQnA · AICV Intelligence Network** (all Live). Do not restore a talent/job board — it was deliberately retired. Block retained only as history.

Three cards (HISTORICAL — removed 2026-06-30):
1. **AI Builder Workshops** (Currently paused) — hosted at CSUSB ERC Palm Desert, resumes 2026, Luma signup https://luma.com/aicv
2. **AI Talent & Job Board** (Planned initiative) — not yet live, expected when .com intelligence layer matures
3. **AICV Intelligence Network** (LIVE) — "Built for agents. Powered by humans." Links to aicoachellavalley.com

If any program changes status: update index.html cards + FAQPage answers + Organization/WebSite schema descriptions + llms.txt "What AICV does" section. All must stay in sync.

## Partnership list (canonical as of 2026-04-22)

- UC Riverside Palm Desert
- Cal State San Bernardino (CSUSB), Palm Desert
- Desert Community Foundation (fiscal sponsor)
- Palm Desert Chamber of Commerce
- Rancho Mirage Chamber of Commerce
- Inland Empire Journalism Hub and Fund

TEDx Rancho Mirage is NOT in the partnership list — it's a founder credibility signal with link to Sat's talk (https://www.youtube.com/watch?v=oYG2kFC2_D4) in the founder section.

---

## 2026-04-23 — Program pills + agent discovery (commit 70915fe)

- Status pill badges (Live/Paused/Planned) + `.prog-dimmed` card treatment for inactive programs
- `_headers` added: security headers (`/*`) + CORS + correct Content-Type for agent endpoints
- `/.well-known/api-catalog` (RFC 9727 linkset) — points to .com JSON feeds + shared MCP
- `/.well-known/mcp/server-card.json` — points to `mcp.aicoachellavalley.com`, 5 tools
- `llms.txt` updated: workshop copy reflects paused status + Saturday Summer Series proposal
- `FAQPage` schema: `datePublished: 2026-04-23` added
- Deployed: https://7a7f62ea.aicoachellavalley-org.pages.dev

---

## 2026-06-02 — Agent-readiness scan closure (three commits)

### Commits (most recent first)

- **54d5c9b** — feat(schema): operationalStatus PropertyValue added to Organization node (machine-readable partial-active summary); Service @id renamed `#service-intelligence-layer` → `#service-intelligence-network` (aligns with confirmed naming convention).
- **131cd97** — feat: 404.html added. Cloudflare Pages was serving index.html at HTTP 200 for all unmatched paths (no 404.html = Pages fallback). Real 404 status now returned; clears phantom "HTML instead of JSON" scanner flags on correctly-absent `/.well-known/*` paths (openid-configuration, oauth-authorization-server, etc.). Chrome matches site identity — same tokens, nav, footer as events.html. No JS redirect or meta-refresh.
- **a477354** — feat(headers): `Link: </.well-known/api-catalog>; rel="api-catalog"` added to `_headers` `/*` rule (RFC 9727). Closes Discoverability 2/3 gap from the April 23 scan.

### Schema on homepage (as of 2026-06-02)

`@graph` with 6 objects: Organization + NGO (with operationalStatus PropertyValue), WebSite, Service × 3 (Intelligence Network / live, AI Builder Workshops / paused, AI Talent & Job Board / planned — each with operationalStatus PropertyValue), FAQPage (6 questions). `EducationalOrganization` node removed in a prior session; replaced by the three typed Service objects.

### Agent surfaces (as of 2026-06-02)

- `/robots.txt` — Content-Signal + explicit Allow for all major AI crawlers; no Disallow rules
- `/llms.txt` — nonprofit summary, program statuses, cross-reference to .com
- `/sitemap.xml` — two URLs (homepage, events); `lastmod` dates stale at 2026-04-22
- `/.well-known/api-catalog` — RFC 9727 linkset; CORS open; advertised via Link response header
- `/.well-known/mcp/server-card.json` — 5 tools, points to `mcp.aicoachellavalley.com`
- `404.html` — branded 404 page; unmatched paths now return genuine 404 status

---

## 2026-06-09 — Naming repair + /events split (four commits)

> SUPERSEDED 2026-06-20: BOTH outcomes of this entry were later reversed. `/ai-readiness` (scaffolded here) was RETIRED in `e519554`; its funder-facing role is gone, replaced by `/philanthropy`. `/events` (reduced to calendar-only here) was REBUILT into the Idea Labs conversion page (`5a6af69`+). This entry is retained as history; for current page truth see the 2026-06-16 → 06-20 entry.

### Commits (most recent first)

- **fe0c38f** — refactor: reduce /events to calendar-only surface. Strip SECTIONS 1, 2, 5, 6, 7 from events.html. h2 → h1 promotion on Luma section heading with .h1--lt cream-override rule added. /events meta last-modified + sitemap /events lastmod → 2026-06-09. llms.txt /events entry rewritten to "calendar of upcoming AI events in the Coachella Valley". Schema EventSeries preserved (page remains factually an event series). 860 lines.
- **479760d** — chore: scaffold /ai-readiness route with migrated content from /events. New ai-readiness.html (~916 lines) carries SECTIONS 1, 2, 5, 6, 7, 8 verbatim from pre-strip events.html. Schema stripped (would have lied on a non-events page). Metadata/title/canonical/og rebound to /ai-readiness. sitemap.xml gains /ai-readiness entry at priority 0.8, monthly changefreq.
- **a9d64c2** — docs: update .org deploy mechanism — auto-deploy on push is default, manual wrangler is fallback. Test push of 40507d6 created Cloudflare deployment without wrangler invocation; auto-deploy confirmed live as of 2026-06-09. STATE.md previously documented manual.
- **40507d6** — fix: align naming to Intelligence Network across events.html and 404.html. Both files' nav + drawer + footer references updated from "Intelligence Layer" → "Intelligence Network" to match index.html.

### /events ↔ /ai-readiness audience split

Structural separation: /events serves the AICV calendar (audience: valley participants browsing programs); /ai-readiness serves the durable funder-facing surface (audience: AI-impact philanthropic funders). Page voice on /ai-readiness still reads participant-recruitment; copy session will shift to funder-evidence framing. Meta/OG/Twitter descriptions, schema, dead CSS, llms.txt /ai-readiness entry, and entry-point discoverability from index.html all deferred to copy session.

### Agent surfaces (as of 2026-06-09)

- `/sitemap.xml` — three URLs (homepage, events, ai-readiness); /events + /ai-readiness lastmod = 2026-06-09; homepage lastmod stale at 2026-04-22 (deferred to next index.html touch)
- `/llms.txt` — /events entry updated to reflect calendar-only purpose; /ai-readiness entry pending copy session
- Other agent surfaces unchanged from 2026-06-02

---

## 2026-06-16 → 06-20 — Four-surface rebuild (homepage reframe, /events rebuild, nav propagation, /philanthropy 3.0)

Commit arc from `adcf16a` forward (all live). NOTE: HEAD has since advanced to `6ecb093` via the 2026-06-20 homepage-cleanup pass (separate entry below); this section covers `adcf16a`→`1a52d78`.

### Commits (most recent first)

- **1a52d78** — feat: rebuild /philanthropy — "Philanthropy 3.0". Prose wall → locked sourced copy + prescriptive design. Hero "Philanthropy 3.0 starts here." (terracotta-italic accent). Two DIFFERENTIATED on-ramp cards: CV Giving Day (warm terracotta wash / "give now" / heart icon → cvgivingday.org) and Desert Community Foundation (dusk navy / "go deeper" / columns icon → desertfoundation.org). 7-question icon-led FAQ ACCORDION (chat-bubble glyphs). Added `FAQPage` JSON-LD (7 Q&A, answers parity-matched to DOM verbatim) alongside the WebPage node. Inline-SVG icons (currentColor, no dependency). Sourced figures: $3M+ raised by CVGD over 4 yrs / $1M single-day first in 2026 / 149 orgs / 200+; DCF $121M AUM / Charity Navigator 4-star / $25M+ distributed / since 1999, CCF-seeded. CVGD url corrected cvgd.org → cvgivingday.org. Footer "age of AI" lines → ecosystem framing. Meta/OG updated to "Philanthropy 3.0".
- **ef61af3** — feat: propagate six-item nav across all four pages. Unified menu everywhere: **Philanthropy · Programs · Events · The Pledge · About · Intelligence Network ↗**. "Get Involved" removed from all nav/drawer/footer menus (the `#get-involved` CTA *section* stays on the homepage). Philanthropy is FIRST and the nav CTA (`.nav__cta` button on pages where it isn't current; on philanthropy.html the active state wins). Per-page anchor forms preserved (homepage bare-hash, sub-pages back-ref). Active states: Events on events.html, Philanthropy on philanthropy.html. Nav is inlined per-page (NOT a shared include) → multi-file edit. Footer Navigate keeps its fuller labels + Philanthropy + Events − Get Involved.
- **bf238dd** — fix: homepage hero H1 break (`display:block` on `.accent` → "AI Startup Ecosystem" on its own line, graceful mobile wrap) + Partners restructured from stacked text to two side-by-side cards (`.partners-grid`/`.partner-card`). Subhead font confirmed working-as-designed (DM Sans 300, same as body) — no change.
- **54933cb** — refactor: card-ify /events Tickets band. Labeled groups (Single Session / Season Pass) + season tier visually distinguished (warm terracotta tint + accent). Replaced run-on prose divider with eyebrow labels.
- **fea4257** — refactor: tighten /events layout + design pass. 5 bands → 4 (hero / indigo featured-event anchor / tickets / combined Series+Location tail). Dusk treatment moved to the featured July-18 band as the visual anchor; uniform type; tighter rhythm; iframe 450→620px to surface the Luma registration affordance in the narrower column. Removed orphaned `checkout-button.js`.
- **5a6af69** — feat: rebuild /events into the Idea Labs conversion landing page. Replaced calendar-only stub with hero + in-page Luma event iframe (`evt-5czB0wpW6R66spG`, July 18, 10am–1pm, CSUSB ERC) + four-tier ticket ladder (GA $25 / Premium $75 online; GA Pass $100 / Premium Pass $300 in-person). `EventSeries` schema upgraded with a dated `subEvent` `Event` (offers). New asset `idea-labs-cover.png` (OG). llms.txt + sitemap refreshed.
- **adcf16a** — feat: reframe homepage identity → **"The Coachella Valley's AI Startup Ecosystem"** (infrastructure demoted from identity to method). Subhead "AI is making founders out of everyone. This is where we build." Why-Now band rewritten (founder-barrier thesis); FAQ Q1/Q3/Q4/Q7/Q8 reframed + new Q13 → **13-question FAQPage**, schema + DOM in sync. Title trio, 3 meta descriptions, footer, Org/WebSite schema descriptions, Programs card 3 aligned to "agentic intelligence network" + LLMs.

### Current page truth (as of 2026-06-20)

- **index.html** — anchored on "The Coachella Valley's AI Startup Ecosystem". H1 break + Partners as two cards. FAQPage now 13 questions. Programs pills read **Live · Planned · Live** (AI Builder Workshops are **LIVE / resuming July 1**, NOT paused — supersedes the 2026-04-22 "paused" note below). (Further changed in the 2026-06-20 cleanup: hero now H1-only, "Two properties" band removed, D3 graph removed, About/Founder relocated to the page tail — see that entry.)
- **events.html** — the **Saturday Morning AI: Idea Labs** conversion page (NOT calendar-only — that 2026-06-09 description is superseded). Featured event `evt-5czB0wpW6R66spG`, July 18; four-tier pricing; `EventSeries` + dated `Event` subEvent schema; in-page Luma embed (height 620).
- **philanthropy.html** — "Philanthropy 3.0" (see `1a52d78` above). Replaces the retired `/ai-readiness`.
- **404.html** — branded chrome, six-item nav matching the others.

### Agent surfaces (as of 2026-06-20)

- `/sitemap.xml` — three URLs: homepage (lastmod 2026-06-20 ✓), `/events` (2026-06-16 ✓), `/philanthropy` (2026-06-19 ✓). All current as of the 2026-06-20 cleanup (`d907632` fixed the homepage + philanthropy stale dates). No `/ai-readiness` entry (correctly removed).
- `/llms.txt` — `/events` entry = Idea Labs series; `/philanthropy` entry = agentic-philanthropy position. Both current. No ai-readiness entry.
- Two JSON-LD blocks now on philanthropy.html (WebPage + FAQPage); homepage @graph FAQPage = 13 Q.

### Traps logged this arc (see project memory `project_aicv_agent_readiness.md`)

- **CF email-obfuscation parity trap** — Cloudflare rewrites visible-DOM emails into `__cf_email__` spans but leaves JSON-LD untouched; run schema↔DOM parity on SOURCE, not CDN-served HTML.
- **Source-order CSS cascade trap (caught 3×)** — these single-file pages define some base layout rules AFTER their `@media` blocks / modifier rules, so a later base rule silently wins; put responsive/modifier overrides AFTER the base rule (or use a compound selector). Render-check mobile after any responsive CSS add.

### Queued (record in canon, non-urgent)

- ~~**Shipment 4** — `/network` D3 page~~ **KILLED 2026-06-20.** Not built; instead the *existing* homepage D3 graph was removed. Rationale: a D3 graph isn't agent-legible, the node corpus lives on `.com`, and "Intelligence Network ↗" is the honest pointer. No `/network` route exists or should be created. (Recon confirmed zero dangling `/network` references anywhere.)
- **AIQnA-as-Program-2** — strategy conversation.
- **DCF + CV Giving Day agentic rebuilds** — the bigger play; `/philanthropy` is now their front door.
- **events GA phone walk-through** — register for July 18 GA on the live page to confirm no wallet-verification wall (only-Sat, Monday-critical).
- **Backlog** — homepage OG-image still `sat-tedx.png` (swap); dead CSS on events/philanthropy (orphaned `.three-col-grid` etc.).

---

## 2026-06-20 — Homepage cleanup pass (subtraction)

HEAD now **`6ecb093`**. Theme: subtraction — removing the decorative/duplicative rather than building. (Shipment 4 flipped from "build `/network`" to "kill the existing graph".) All live, clean tree, pushed.

### Commits (most recent first)

- **6ecb093** — feat: relocate About/Founder section to page tail. Moved the Founder section (TEDx photo + bio + pull-quote) from between Programs and Stats → between CTA and footer, as a closing founder sign-off. New tail alternates CTA (terracotta) → About (cream) → footer (dusk); old spot now closes Programs (sand) → Stats (dusk) cleanly. `id="founder"` unique; all 4 nav/footer "About"/"Founder" `#founder` anchors still resolve (now scroll near-bottom, fine).
- **2e3dce8** — feat: remove homepage D3 graph + restore Programs→Founder alternation. Deleted the graph entirely: mount section, D3 CDN `<script>`, the ~470-line IIFE, and the `.com/nodes.json` cross-domain fetch (graph was its sole consumer). Homepage now D3-dependency-free, no cross-domain fetch, −481 lines. Seam fix: recolored Founder sand→cream so Programs(sand)→Founder(cream)→Stats(dusk) alternation held (Founder later relocated in `6ecb093`). All "Intelligence Network ↗" `.com` links + Programs card 3 preserved.
- **9105860** — feat: remove "Two properties. One mission." band from homepage. The About-aicoachellavalley.com section (`id="intelligence-network"`) was meta-info interrupting the pitch; FAQ Q4 already covers the .com/.org split. No links referenced the anchor; the JSON-LD `#service-intelligence-network` Service `@id` (separate abstract identifier) preserved.
- **d907632** — feat: homepage hero — remove subhead, tighten to Why-Now + sitemap currency. Hero now H1-only ("The Coachella Valley's AI Startup Ecosystem"); the `.hero__mission` subhead removed from the visible hero (og/twitter share hooks keep the "making founders out of everyone" line — intentionally separate). Hero bottom-padding 110→48px + zeroed orphaned `.hero__headline` margin → 96px hand-off to Why-Now (both dusk). Dead `.hero__mission` CSS stripped. sitemap lastmods fixed (homepage→2026-06-20, /philanthropy→2026-06-19); index meta last-modified→2026-06-20.
- **f313bec** — docs: STATE.md session-start resync (brought canon current through the four-surface rebuild).

### Current homepage section rhythm (top→bottom)

hero (dusk) · why-now (dusk) · programs (sand) · stats (dusk) · partners (sand) · pledge (dusk) · faq (sand) · cta (terracotta) · **about/founder (cream)** · footer (dusk). No D3 graph. FAQ `.faq-a` capped at `70ch` (deliberate reading measure — confirmed not a bug).

### What did NOT change (protected)

"Intelligence Network ↗" external links (nav/drawer/footer → `.com`) and Programs card 3 "AICV Intelligence Network" — all the honest pointers to where the corpus lives — untouched throughout.

---

## 2026-06-30 — Programs reshape: AI Tinkerers + AIQnA (three commits)

HEAD now **`43c2e3f`**. Theme: the Programs grid now reflects the two new live community programs; the planned AI Talent & Job Board is retired. Plus a follow-on legibility polish (`9724b65`) and a tagline-color revert to token (`43c2e3f`). Each a separate single-purpose commit, render-gated (desktop 1280 + mobile 375), approval-before-commit, and **verified in live edge bytes** (not inferred from push). All `index.html` only. Build couriers came from the strategy thread.

### Commits (most recent first)

- **43c2e3f** — feat(programs): tagline color `#F7D9BF` → `var(--c-cream)`. Reverted the apricot one-off from `9724b65` to the on-palette cream token (Sat's call): on-palette, clears legibility on terracotta (same reason `.pill-live` reads), orphan hex removed. Featured tagline + 80%-cream body share hue now; the italic EB-Garamond keeps the tagline distinct as its own line (render-gate confirmed not-muddy, mobile full-scale read). Retires the "apricot is a tuned one-off / tokenize?" open item.
- **9724b65** — feat(programs): card legibility + consistency polish. Card ① (AI Tinkerers) gained a tagline ("Demos, not decks. Builders, not spectators.") so all three cards share title→tagline→body→CTA. CSS: featured CTA pills (`.prog-card--featured .prog-tag`) restyled muddy `rgba(168,68,31,0.28)`/ghost-l → **cream bg + terracotta text, mirroring `.pill-live`** (light chip bookends top+bottom); featured tagline lifted to a warm apricot tier (`.prog-card--featured .prog-tagline { color: #F7D9BF }`) so the three per-card tiers (cream chips / apricot tagline / white body) all read on terracotta. Base `.prog-tagline` color (`--c-ink-l`) left intact for future light cards (mirrors the `.prog-body` featured-override pattern). NOTE: `#F7D9BF` was **reverted to `--c-cream` in `43c2e3f`, orphan hex removed** (see that bullet). Row-level tonal variation still NOT addressed (deferred). `.prog-card--featured .prog-num` keeps `rgba(168,68,31,0.28)` — that's the watermark digit, intentional.
- **ee4242a** — feat(faq): add "I already build with AI — is there anything here for me?" Q at position #8 (right after "Who does AICV serve?"). Added to BOTH the DOM `<details>` list and the FAQPage JSON-LD `mainEntity`, answer text character-identical (parity checked on source, per the CF email-obfuscation trap). FAQ count 13→14. Q3 left as-is (smallest-fix, deliberate). Points existing builders to AI Tinkerers.
- **3251fbe** — feat(about): founder bio para 3 trailing clause "…while planning the AI Talent & Job Board…" → "…while bringing the AI Tinkerers community to the desert: gathering the region's strongest builders to mentor the next generation and train the trainers." (comma+colon punctuation to avoid stacked em-dashes; "to the desert" avoids valley/valley repetition).
- **c4edf1f** — feat(programs): reshape cards + schema truth. Card ① "AI Builder Workshops" → **AI Tinkerers Coachella Valley** (→ coachella-valley.aitinkerers.org, Sat browser-confirmed CV chapter). Card ② "AI Talent & Job Board" (Planned/dimmed) → **AIQnA** (Live/featured, tagline "Question. Answer. Collective intelligence.", → aiqna.org). In-place SWAP (not delete+append) so `prog-num` watermarks stay 1/2/3, grid unchanged (`repeat(3,1fr)`). Card ③ untouched. Programs intro "paid work" → "real opportunity". Schema: removed `#service-job-board`; added `#service-aitinkerers` + `#service-aiqna` (both Live/InStock); dropped the job-board clause from Org / operationalStatus / WebSite descriptions (operationalStatus "Partially active" → "Active"). `#service-workshops` left intact (workshops still real).

### Current Programs composition (as of 2026-06-30) — CANONICAL

Three cards, all **Live** (all `prog-card--featured` terracotta now — no dimmed/planned card remains):
1. **AI Tinkerers Coachella Valley** — CV chapter of the global hands-on AI builders' community; → https://coachella-valley.aitinkerers.org ("Join the chapter →"). First demo night this fall.
2. **AIQnA** — "A conversation, not a survey." Talk with Sage; → https://aiqna.org ("Add your voice →"). Tagline "Question. Answer. Collective intelligence."
3. **AICV Intelligence Network** — unchanged; "Built for agents. Powered by humans." → https://aicoachellavalley.com

If any program changes status: update index.html cards + FAQ answers + Org/WebSite/operationalStatus schema + the matching `#service-*` node + llms.txt. All must stay in sync.

### Retired / notes

- **AI Talent & Job Board — RETIRED.** Removed from cards, schema (`#service-job-board` deleted), founder bio, and all three schema description strings. Do not restore. Only the *workshops* survive (as `#service-workshops` + FAQ Q3/Q9 + /events), not the job board.
- **Dead CSS (backlogged, deliberate):** `.prog-pill.pill-planned` + `.prog-card.prog-dimmed` (index.html ~990–998) are now orphaned — no card uses them. Left in place: harmless, part of the existing dead-CSS sweep (with `.three-col-grid` on events/philanthropy per HANDOFF), AND optionally load-bearing — `prog-dimmed` is the existing hook if tonal variation is ever wanted in the three-terracotta row. Sweep deliberately during the full CSS pass, tied to that row-variation decision — not as a drive-by.

### What did NOT change (protected)

Card ③ "AICV Intelligence Network" + all "Intelligence Network ↗" `.com` pointers; FAQ Q3 (smallest-fix); `#service-workshops`; `.faq-a` 70ch reading measure.

---

## 2026-07-01 — Partner intake form (STAGING; goes public in Commit 3)

HEAD now **`f86f83e`**. Replaces the broken "Partner with AICV" CTA (a Cloudflare email-obfuscation casualty — its `mailto` is rewritten to `/cdn-cgi/l/email-protection` on the live edge; obfuscation stays ON) with an owned intake form on our own stack. **This is the `.org`'s first Pages Function + D1 + Turnstile.** Architecture = Shape 2 (D1 capture now, native email as fast-follow) because recon found AIQnA's email path is native CF Email Sending but **inert/unproven** (see [[project_aiqna]]). Pattern mirrors the verified live aiqna-agent partner-signup.

### Commits (most recent first)

- **f86f83e** — feat: `/api/partner` Pages Function (backend). `functions/api/partner.js`. POST captures name/email/note → D1 `inquiries` (self-healing table) behind honeypot → Turnstile `siteverify` → IP-hash soft rate-limit (≤5/24h). GET is a **key-gated read** (day-one stopgap; **fails closed** on unset/empty/mismatched `INQUIRY_KEY`) so leads pull with zero email dependency. Native-email notify is a marked fast-follow (row is the guaranteed capture; email non-fatal). **Live-verified inert-but-safe:** GET no/empty key → 401; POST no bindings → 500 "backend isn't configured yet, email sat@aicv.co". Adding `functions/` made Pages start compiling Functions automatically — no build-config change.
- **3434dbf** — feat: `/partner` page (frontend). New `partner.html` (grantor-legible "Partner with AICV" + 3-field form + Turnstile + honeypot; error state preserves the typed note; `ContactPage` JSON-LD). Built from the events scaffold for nav/footer/token parity, then **trimmed ~330 lines of unused event-page CSS** (1043→713). Orphan page (CTA not repointed yet); posts to `/api/partner`. Turnstile uses the **test site key** as a placeholder. Live: `/partner` → 200 (`/partner.html` → 308 clean-URL).

### Sat's dashboard switch-ons — ORDER MATTERS

Set the secrets **before or with** the D1 binding (not after) so there's no exposure window. Four items on the `.org` Pages project:
1. **`TURNSTILE_SECRET`**, **`INQUIRY_KEY`**, **`SALT`** (env vars) — first.
2. **D1** database bound as **`DB`** (production **and** preview).
3. **Turnstile widget** for `aicoachellavalley.org` → **site key** (goes into `partner.html` in Commit 3) + the secret above.

### Close condition (the real bar — run with Sat)

Not "endpoint returned 200." It's: a **live Turnstile'd submit → row lands in D1 → Sat pulls it back through the key-gated read** (`GET /api/partner?key=…`). Sat may need to do the Turnstile'd submit (behind the widget), like the Luma walk-through.

### Pending

- **Commit 3 (public go-live) — ONLY after the close condition passes:** repoint the closing CTA `mailto` → `/partner`, swap the Turnstile **test** site key → the **real** one, add `/partner` to `sitemap.xml`. Everything before Commit 3 is staging.
- **Fast-follow:** native CF Email Sending notify to `sat@aicv.co` (drop-in at the marked slot once a sending domain is onboarded + `send_email` binding added).
- **Deferred (separate commit, flagged not bundled):** FAQ Q10 institutional-inquiry email + footer contact `mailto` → repoint to `/partner` (retires the other two obfuscated mailtos).
- **Turnstile keys = the lingering [[project_aiqna]] "real Turnstile keys" open item.** Standing up this form is the forcing function — when Sat generates them, **mark that item DONE in canon** (here + aiqna notes) so the next session doesn't rediscover it as open.

---

## 2026-07-15 — /events evergreen cleanup (Luma embed = canonical truth)

HEAD now **`719a634`**. All live + edge-verified. Sat's call: the Luma event is the truthful source; the page had drifted (hard-coded "10 AM–1 PM", July 18/HeyGen framing, restated single-session prices). Cleanup makes the page evergreen about the SERIES while the embed carries what's-next + registration. **The Luma iframe (`evt-5czB0wpW6R66spG`, line 921) is byte-identical across the whole arc** — verified zero occurrences in the cumulative diff, and live-edge screenshots confirm the embed loads with the July 18 event + ticket picker (desktop 1280 + mobile 375). Committed straight on `main` under Sat's blanket plan approval (no branch loop this pass).

**Timing correction logged:** the courier's "page time is wrong" claim was itself wrong — Luma's time field IS 10:00–1:00 (the "Morning" string was prose description, not the time field). Times were accurate; the prose time was removed as a *duplicate copy of a fact*, not an error fix. The schema's 10:00–13:00 is correct.

### Commits (most recent first)

- **719a634** — sitemap: bump `/events` lastmod → 2026-07-15 (per the standing bump-on-touch rule; closes that item for /events).
- **6b7f0f4** — events: evergreen meta/OG/Twitter descriptions + last-modified → 2026-07-15. "July 18: AI Avatars with HeyGen" dropped from all three descriptions → series-level copy. Titles + og:image (`idea-labs-cover.png` = evergreen "NO CODE" art, pixel-checked) unchanged.
- **837279a** — events: Series blurb "July kicks off with AI avatars" → "Each month brings a new theme and a new guest" (last dated body-prose line).
- **ddaba3e** — events: single-session tier cards (GA $25 / Premium $75) REMOVED — the embed sells + describes these. Tickets H2 → "The Season Pass."; one wayfinding line ("Single-session tickets are in the registration card above."), no prices restated. ~~Season passes ($100/$300) KEPT — the page's only commerce~~ **SUPERSEDED same-day — see the Season Pass correction entry below: the passes never existed; the whole section was removed in `43767a0`.** No CSS newly dead (season cards reuse every class).
- **76665fb** — events: featured band copy → evergreen "Next Lab / See what's coming. Grab your seat." Perks line KEPT in full — **Sat confirmed lunch is provided at every lab** (series-level fact, so `.event-perks` stays alive).

### Deliberately DEFERRED to after Sat 7/18 (approved, not yet built)

1. **Schema reshape → pure evergreen `EventSeries`**: drop the dated `subEvent` (July 18 date/times + both offers). Left untouched this week ON PURPOSE — the dated Event is earning the July-18 rich result during peak registration. Tradeoff already accepted by Sat: after the reshape, no per-event rich results until dated subEvents return (calendar-era move, once real dates exist). Series description's "Six workshops July through December 2026" also gets softened then.
2. **Dead-CSS sweep on events.html** — large PRE-EXISTING orphan layer (unused today): `.event-card`, `.empty-state`, `.past-block`, `.luma-wrap`, `.luma-subline`, `.partner-groups*`, `.location-block`, `.where-band*`, `.where-section*`, `.tool-strip*`, `.three-col-grid` (+ its 860px media rule), `.three-col-card--cream`, `.btn` family, `.hero__ghost`, `.hero__proof`, `.hero__body--browse`, `.h1--lt`, `.body--lt`, `.section--sm/--dark/--sand/--alt`. Touches the responsive block → source-order cascade trap applies; zero user value during registration week.
3. **NOT NOW / later move:** no calendar embed until Sat has the other dates — a one-event calendar is worse than the single-event embed.

### Page truth after this arc

`events.html` = evergreen series page: hero (series pitch) → "Next Lab" band (evergreen copy + untouched Luma iframe = date/theme/single-session tickets) → ~~"The Season Pass." (the one hand-managed commerce block)~~ *(removed same-day, see below)* → Series/Location → footer. Only remaining dated content on the page is inside the JSON-LD subEvent (deliberate, see Deferred #1). `llms.txt` /events line was already series-level — still true, untouched.

---

## 2026-07-15 (later) — CORRECTION: the Season Pass never existed. Removed.

HEAD now **`43767a0`**, live + edge-verified. Sat's correction, same day as the evergreen cleanup: **the season passes DO NOT EXIST** — no $100 GA Season Pass, no $300 Premium Pass; not sold, not reservable, not real. The page had been advertising a nonexistent product with an email invitation to reserve it — a **false offer**, not a drift/duplication issue. This supersedes every earlier "season passes = Sat's highest-value products / the page's one hand-managed commerce" framing in this file (the 06-16 four-tier ladder in `5a6af69`, the 06-20 card-ification in `54933cb`, and this morning's `ddaba3e`).

- **43767a0** — events: the entire Tickets/"The Season Pass." section deleted (heading, both season cards, reserve-by-email note, wayfinding line). **The page now carries ZERO commerce — Luma is the sole ticketing surface.** Nothing hand-managed, nothing to keep in sync. Bonus: one fewer CF-obfuscated mailto. Iframe + JSON-LD untouched; embed live-verified (July 18 + Get Tickets rendering).
- **Newly orphaned CSS → added to the post-Saturday sweep:** `.tickets-grid` (+ its rule in the 640px media block — the block itself stays; it also sets the mobile `--gutter`), `.three-col-card`, `.ticket-card--season`, `.card-label`, `.card-body`, `.ticket-group__label`, `.ticket-group__sub`, `.ticket-note`, **`.section` and `.wrap`** (the Tickets section was their only body user; the `.section--*` variants were already orphaned).
- **Sitemap lastmod already correct** (2026-07-15, bumped this morning — same-day rule satisfied).
- **SHIPPED same courier, after Sat approved the drafted wording** (`3f53c38` + `ddea7c7`, live + edge-verified):
  - **3f53c38 (Commit B)** — Series section: "Six labs, July through December." → **"Hands-on AI for the Coachella Valley."**; body drops the six-workshops/two-pop-ups promise, now describes the variety (hands-on labs in AI, agents, and agentic training), AICV + CSUSB ERC attribution kept. **"Monthly" kept deliberately** — Sat stands behind the cadence (hero says it too).
  - **ddea7c7 (Commit C)** — JSON-LD **EventSeries `description` string ONLY**: "Six workshops July through December 2026 plus two pop-up sessions" → evergreen series description (prose/schema parity — agents must not cite a count Sat doesn't back). subEvent verified byte-identical on the live edge (startDate/endDate/offers 25/75 intact); rich-result risk judged negligible since no Event fields changed.
  - **Page truth now:** Nav → Hero → Next Lab band + embed → The Series ("Hands-on AI for the Coachella Valley.") + Location → Footer. Zero commerce, zero counts, zero timeframe claims outside the dated subEvent (deliberate, post-7/18). Nothing hand-managed, nothing to keep in sync with Luma. No count claims anywhere in prose (edge-grepped 0).
- **Tooling note:** `org-static` dev-server entry added to `~/AICV/.claude/launch.json` (python http.server :8431, serves `core/org`) for local render-gating of this repo's static pages.

---

## 2026-07-15 (third pass) — /events IDENTITY CHANGE: single-program landing → AI events calendar page

HEAD now **`fb36582`** (+ docs), all live + edge-verified. Sat's call: `/events` stops being an Idea Labs landing page (it said the same thing three times) and becomes **the AI events page for the Coachella Valley** — a lean frame around a centered Luma **calendar** embed that holds workshops, meetups, boot camps, and conferences as they come. Timing safe: the July 18 poster drives to `luma.com/aicv` (the calendar), NOT `/events`, so this page wasn't the registration funnel this week.

### Commits

- **69a1fdf** — the restructure. Page = Nav → H1 "AI events in the Coachella Valley." + one approved paragraph → centered calendar embed → Footer. Old hero copy, Next Lab band, perks line, Series section, and Location section all removed (venue survives in body prose as the NAP/local-SEO signal). **Embed swap:** single-event iframe → `https://luma.com/embed/calendar/cal-123s6rDFxeKQjJd/events?lt=light` (calendar = luma.com/aicv, verified rendering before commit; **`?lt=light` added because the dark default read as a bolted-on black slab on cream** — the see-it call Sat approved), height 560, centered 900px column, ghost hairline + 12px radius, new minimal `.calendar-band` CSS placed before the responsive block (cascade trap respected).
- **88ea7b6** — meta/OG/title → general AI-events identity (Sat-approved copy). **og:image still `idea-labs-cover.png` ("NO CODE" art) — FLAGGED: no longer matches the page; replacement is Sat's call, later; an event poster would reintroduce monthly hand-surgery.**
- **fb36582** — llms.txt events line: **removed two FALSE claims that had survived the earlier sweeps** ("six workshops July–December 2026" + "season-pass tickets") → new general-events description. Lesson: agent surfaces (llms.txt) must be greped in every claims-removal pass, not just page prose + schema.

### Newly orphaned CSS (joins the post-Saturday sweep)

`.eyebrow`, `.eyebrow--lt`, `.event-band`, `.event-split`, `.event-split__copy`, `.event-perks`, `.event-card-light`, `.h2`, `.h2--lt`, `.body`, `.body--lead`, `.context-band`, `.context-band__inner`, `.context-col__heading`, `.hero__body`, `.hero__body--wide`, `.link`, plus the 860px media rules for `.event-split`/`.context-band__inner`. (Still used: `.hero`, `.hero--cream`, `.hero__inner`, `.h1`, `.hero__subhead`, `.calendar-band*`, nav/footer chrome.)

### Post-Saturday schema commit — SCOPE EXPANDED (was: drop subEvent; now also: reshape identity)

The JSON-LD is untouched and deliberately **narrower than the new page identity for 3 days** (series-specific `EventSeries` + dated July-18 `subEvent` on a general events page — narrower isn't false; Idea Labs IS the running series and July 18 IS the next event, and the subEvent is earning the rich result during registration week). The queued post-7/18 commit now does BOTH: (1) drop the dated `subEvent` + offers, AND (2) reshape the top level to match the general-events identity (the `EventSeries` `name`/`description` are Idea-Labs-specific — decide whether the page-level schema becomes an events `CollectionPage`/`WebPage` + the Idea Labs `EventSeries` as one entry, or stays a single broader node — design it in that session with fresh eyes).

### Sitemap / last-modified

Both already `2026-07-15` from the morning commits — standing rule satisfied, no bump needed.

---

## 2026-07-21 — Post-event truth pass (3 commits; the parked schema item is now DONE)

HEAD now **`e3b028f`**, all live + edge-verified. Tuesday after the July 18 lab. Two agent-facing truth bugs had gone live once Saturday passed; both fixed. **Sat's canonical fact:** the AI Builder Workshops series **launched July 2026 and runs monthly through December 2026** — running now. The earlier "resuming July 1, 2026" was stale AND wrong: it conflated the ERC funding-renewal date (genuinely July 1) with the workshop launch. Do not reintroduce "resuming," "July 1," or future-tense "beginning/resuming" for the *workshops*.

### Commits

- **bf09bc4** — index.html: fixed all **four** workshop-timing claims in the JSON-LD (Organization `description` + `PropertyValue`, Service `description` + `PropertyValue`) → "launched July 2026… running monthly through December 2026." 2025 retrospective (30+/300+) preserved. last-modified + homepage sitemap lastmod → 2026-07-21. Schema-only edits (no visible-DOM twin for these four), page render-confirmed.
- **9860a32** — events.html: **the queued post-7/18 schema reshape — now executed.** Dropped the entire dated July-18 `subEvent` + both offers (GA 25 / Premium 75) — it was a past event still marked `EventScheduled`/`InStock`. Renamed top-level `EventSeries` `name` "Saturday Morning AI: Idea Labs" → **"AI events in the Coachella Valley"** (single broader node — Sat ruled AGAINST a CollectionPage wrapper). Description already evergreen (`ddea7c7`), organizer intact. JSON-LD validated; last-modified + sitemap → 07-21.
- **e3b028f** — llms.txt: same tense fix, both instances (program list line + program-status line).

**Live-edge verified:** "resuming July 1" = 0 sitewide (home/events/llms.txt); "launched July 2026" ×4 on home; events `2026-07-18`/`subEvent`/`InStock`/`HeyGen` = 0; events schema name = "AI events in the Coachella Valley".

### Deliberately LEFT (flagged, not rewritten — per Sat's "only workshop timing changes" rule)

- **The two "beginning July 1" clauses in the funding FAQ** (index.html schema ~L308 + DOM twin ~L1713) tie July 1 to **funding terms** — the ERC 2026 funding renewal and the IEJIH+F twelve-month term — NOT workshop timing. Genuine fiscal dates, correctly preserved (edge-verified still present ×2). **Open call for Sat:** as of 07-21 "beginning July 1" is 3 weeks past — if the *funding* tense wants a present-tense touch too, that's a separate, deliberate decision; not assumed here.

### DISCOVERED stale items (NOT fixed this pass — flagged for Sat)

1. **llms.txt L41 still lists "AI Talent & Job Board (planned)"** — but that concept was **RETIRED** on index.html (2026-06-30, "Do not restore a talent/job board"). llms.txt is the straggler still advertising it to agents. A retired-concept removal (different fix than the tense pass), so left for a scoped follow-up. Same file also carries "30+ workshops / 300+ participants in 2025" (true retrospective) and the older "Next Cleanup Cycle" flag to fact-check that count.
2. **events calendar embed now shows "No Upcoming Events"** — July 18 passed and no new dates exist on `luma.com/aicv` yet. NOT a bug: the honest live state, and exactly why the self-updating calendar was the right architecture. Repopulates automatically when Sat adds dates to Luma.

### Post-7/18 queue status after this pass

- ✅ **Schema reshape — DONE** (was Deferred #1 in the 2026-07-15 evergreen entry).
- ⏳ **Dead-CSS sweep — STILL QUEUED** (Deferred #2; the pre-existing orphan layer + the ticket classes + `.section`/`.wrap` + the third-pass additions). Not touched this pass.
- Backlog unchanged: og:images (`sat-tedx.png` on home/philanthropy, `idea-labs-cover.png` on events); "first demo night this fall" left (still literally true); SiteNavigationElement/BreadcrumbList skipped (flat site, low leverage).

---

## 2026-07-21 (later) — funding-copy correction + job-board removal (2 commits)

HEAD now **`3a7c9a5`**, live + edge-verified. Follow-on to the post-event truth pass. Three fact corrections from Sat; scope was **broader than the courier expected** — the two "beginning July 1" clauses that the morning pass deliberately LEFT (as "genuine funding dates") turned out to be **wrong dates AND a grant Sat wants private**.

### The corrected facts (from Sat)

- **ERC funding began July 18, 2026** — same day as the first workshop, NOT July 1. The old "beginning July 1" was simply wrong (it wasn't even the right fiscal date). Now reads "2026 funding renewed and active since July 18."
- **IEJIH+F grant (Inland Empire Journalism Innovation Hub & Fund): real and active — approved Apr 9 2026, term Jul 1 2026 – Nov 1 2027 — but Sat is keeping it PRIVATE.** ⚠️ **DO NOT re-add it to any public surface.** A future session "helpfully" restoring the funder name/terms would breach Sat's call. It was named in **three** public spots, all now removed (see below).
- **AI Talent & Job Board: RELOCATING to the Tinkerers Coachella Valley pages — moved, not dead.** ⚠️ So its reappearance on a *Tinkerers* property is EXPECTED, not a straggler to re-clean. Removed from .org surfaces only.

### Commits

- **596246c** — index.html: ERC date "beginning July 1" → "active since July 18" in the funding FAQ (schema `#faq` + visible DOM twin, edited to **identical** text — parity verified on source). Removed the entire IEJIH+F clause (both sentences incl. the Google-for-Nonprofits detail) from that FAQ, AND removed "Inland Empire Journalism Innovation Hub & Fund" from the **Academic & Workforce partners card** (card now lists CSUSB ERC + UCR Palm Desert). last-modified + homepage sitemap already 2026-07-21 (bf09bc4) — no bump.
- **3a7c9a5** — llms.txt: removed the AI Talent & Job Board from all **three** mentions (Programs entry, the "economic mobility" layer → list adjusted **three layers → two**, and the program-status line), and removed "Inland Empire Journalism Hub and Fund" from the partners list. No other retired stragglers found.

**Live-edge verified:** "IEJIH" / "beginning July 1" / "AI Talent & Job Board" / "Journalism Innovation" = 0 sitewide (home, events, llms.txt, philanthropy); ERC reads "active since July 18"; FAQ schema↔DOM parity intact on source.

### LEFT deliberately — flagged for Sat (does NOT name the grant, but adjacent)

The **institutional-partnerships FAQ** on index.html (schema ~L316 + DOM twin ~L1717) still says: *"…research collaboration on AI adoption and workforce readiness in the Inland Empire, joint programming with academic and journalism institutions…"* — a **generic partnership-pathways** description that does NOT name IEJIH+F (fails all of Sat's grep terms: no "IEJIH", no "twelve-month", no "July 1"). But it thematically echoes the private grant's activity (AI-adoption research + Inland Empire + journalism). **Not touched** — deleting generic pathway copy is a judgment call about privacy-by-implication that's Sat's to make. **If Sat wants the grant fully invisible, this clause is the remaining hint.** Separately, the geographic *"delivered programs … across the broader Inland Empire"* (mission-area FAQ, ~L300/1709) is pure service-area and clearly fine.

---

## 2026-07-22 (positioning pass) — .org becomes the ecosystem front door (6 commits)

HEAD now **`073f6e0`**, all live + edge-verified. Sat's strategic repositioning: the homepage stops being primarily "a nonprofit website" and becomes the **canonical front door to the Coachella Valley AI startup ecosystem, for humans and AI systems**. Consistent message everywhere: **AICV is building, connecting, and documenting the ecosystem — NOT claiming to BE it** (the H1 "The Coachella Valley's AI Startup Ecosystem" stays — the recorded June ownable-term decision — and the new closing copy "AICV is one part of a growing regional network" does the not-claiming-to-be-it work).

### Commits

- **1e50309** — nav "Programs" → **"Build"**, LABEL ONLY (15 spots: desktop nav + mobile drawer + footer × 5 pages), plus the homepage section eyebrow "What We Do" → "Build" (h2 "What we're building." already carried it). ⚠️ **The `id="programs"` and every `#programs` / `/#programs` href were LEFT UNCHANGED ON PURPOSE** (Sat's ruling): hash anchors can't be redirected, and inbound links / agent citations to `…/#programs` live in surfaces OUTSIDE this repo (`.com`, `llms-full.txt`, published briefs) we can't audit. The label/id mismatch is invisible to humans and agents, trivially changeable later. **Do not "fix" the mismatch by renaming the id.** Verified nav on all 5 pages incl. 404; "Build" still resolves to the section (click → scroll 0→5141).
- **5d50344** — closing section: "Help Shape the Future of Work…" → **"Start Here. Build From Here."** + Sat's invitation copy. **"Partner with AICV" button REMOVED, no replacement** — Sat's framing: this is now an invitation, not a CTA. `.cta__sub` margin-bottom zeroed so the buttonless band stays balanced (desktop + mobile gated). Footer untouched. **`/partner` + `functions/api/partner.js` are PARKED for v2 — do NOT delete, do NOT link.**
- **891d9bf** — metadata: description + og + twitter all → Sat's front-door copy ("Start here to understand, build, invest in, or join…"). Title unchanged.
- **aee75ef** — structured data + FAQ: Org + WebSite descriptions and FAQ Q1/Q3 reframed to building/connecting/documenting + front door. **NGO type + DCF parentOrg + DCF FAQ (Q2) all preserved** (emphasis change, not deletion of credibility facts). Q1/Q3 edited via identical schema+DOM replacement — parity verified True on source.
- **073f6e0** — llms.txt opening (blockquote + "What AICV Is" intro) → same positioning (DCF kept).

### ⚠️ PHANTOM SWEEP — sprints / office hours / "founder programs" NEVER EXISTED (do-not-re-add)

Same class as the retired **job board** and the nonexistent **season passes**: a false claim that had spread across MULTIPLE surfaces. Sat confirms AICV has **NO sprints and NO office hours** — they don't exist — and **"founder programs" as a named line of work is retired**. Swept from every surface: FAQ Q3 (schema+DOM) "Founder programs — meetups, sprints, and office hours", FAQ Q1, the WebSite node, and the meta/og descriptions. **DO NOT let a future session "helpfully" restore sprints, office hours, or a formal "founder programs" line of work.**

- **Informal meetups exist but are DELIBERATELY NOT LISTED anywhere as a static claim.** When formalized they become **dated events on the Luma calendar**, which already flows to `/events` (humans) + structured data (agents). A dated event self-maintains; a static "we do meetups" claim rots. **Do not add a meetups claim to prose/schema.**
- **KEPT + flagged:** the `/events` page + its `llms.txt` line say the AI-events *calendar* holds "workshops, meetups, boot camps, and conferences" — this is the deliberate calendar-page category framing (the dynamic surface Sat pointed to for meetups), NOT a static formal-program claim. Left as-is; flagged here so it's a conscious keep, not an oversight. One word from Sat removes it if wanted.
- **Kept:** "Idea Labs" (the Saturday Morning AI: Idea Labs workshop series is real and running) — only sprints/office-hours/"founder programs" went.

### Not bumped / not touched / follow-ups

- `last-modified`/sitemap were left at `2026-07-21` here — **mistaken: this pass was actually 2026-07-22** (git author-dates), the "July 21" carried forward from an earlier day in a multi-day thread. Corrected 2026-07-23 (see the date-correction entry below).
- **`.com` / Intelligence Network language alignment — OUT OF SCOPE (different repo), queued as a follow-up.** Sat wants the "building/connecting/documenting, one part of the network" language consistent on `.com` too; that's a separate `~/AICV/core/com` pass.
- Orphaned by the button removal: **`.btn--cream`** (index.html only) → joins the queued dead-CSS sweep (with the events.html orphan layer + `.section`/`.wrap` etc.). Not swept now.
- Still deferred: dead-CSS sweep; og:images (`sat-tedx.png`); "first demo night this fall" (still true).

---

## 2026-07-23 — Programs cards get screenshots + copy trim + "since 2025" (3 commits)

HEAD now **`ddeab7f`**, all live + edge-verified. The three Programs cards (AI Tinkerers / AIQnA / Intelligence Network) were text-only and text-heavy; added a product screenshot to each as visual proof and balanced the copy.

### Commits

- **0d55533** — screenshots + Intelligence Network copy trim. One optimized screenshot per card, inserted between tagline and body, structurally identical: **AI Tinkerers = the GLOBAL aitinkerers.org page** (deliberate — the CV chapter page is sparse; the global "Cities (247)" scale is the credibility signal), **AIQnA**, **aicoachellavalley.com**. Displayed via `.prog-shot`: uniform **16/9** box, `object-fit: cover` + `object-position: top` (hero headline legible, not a squeezed strip). **⚠️ `height: auto` is load-bearing** — without it the HTML `height` attr acts as a presentational hint that silently overrides `aspect-ratio`, rendering three different heights (caught at the render gate). `alt` required + descriptive (agent-legibility). `loading="lazy"` + `width`/`height` → no layout shift. Cards stay equal height (547px); gated desktop 1280 + mobile 375. Intelligence Network card trimmed 2 prog-body paragraphs → 1 (approved copy) for grid balance.
- **ddeab7f** — workshop retrospective **"in 2025" → "since 2025"** swept across all 4 surfaces (schema desc L140, stats label L1584, founder bio L1775, llms.txt L19); figures 30+/300+ unchanged. Resolves the "Next Cleanup Cycle" fact-check item (marked done above).

### Image handling (do-not-redo notes)

- **Optimized: 745KB → 84KB total.** Sat placed full-size desktop PNGs (~1300px, spaces in filenames) in the repo root (the image dir, alongside `sat-tedx.png`). I resized to 640px wide (2× the ~312px card display) + pngquant, and committed **clean hyphenated names only**: `tinkerers-homepage.png` (51KB), `aiqna-homepage.png` (14KB), `aicv-network-homepage.png` (19KB). **The 4 space-named source PNGs are left UNTRACKED** (`ait homepage.png`, `aiqna homepage.png`, `aicv com homepage.png`, `mirage homepage.png`) — Sat can delete them; do NOT commit them.
- **AIQnA screenshot = Sat's Option A (deliberate).** The image is aiqna.org's real homepage, which leads with the **"FOR LOCAL MEDIA · FOUNDING PARTNERS"** pitch, NOT a resident "talk with Sage" view. Sat's call: stronger storytelling (a real product with partners + a model). Alt text was matched to the image: *"…a weekly AI question packaged as a ready-to-publish kit for local media partners"* — do NOT "fix" it back to a resident-conversation description the screenshot doesn't show.
- **`mirage homepage.png`** (a SunshineFM "MIRAGE" project page) was a 4th untracked PNG, not in spec — correctly unused/uncommitted.
- New CSS `.prog-shot`; no orphaned CSS. (`last-modified`/sitemap: this work was actually **2026-07-23** — index bumped to 07-23 in the date-correction entry below.)

---

## 2026-07-23 — Date correction + metadata accuracy (dates were carried forward from an earlier day)

⚠️ **STANDING DISCIPLINE (new): courier-stated dates are inferred, not canon — verify against the system clock, same as paths and counts.** This thread spans **multiple days** (started ~2026-07-15 reasoning "three days before Saturday"; a courier corrected the date to "Tuesday July 21"; the thread then carried into **Thursday 2026-07-23**). Several couriers kept saying "today is July 21" after that had gone stale, and I took it at face value and stamped it into `last-modified`, sitemap, and STATE headings without checking. Two independent clocks (Sat's + the iMac) read 07-23. **The ground truth is `git log --format='%ai'` (author timestamps), not the courier prose.**

**What git author-dates actually show (verified this pass):**
- **2026-07-21** — post-event truth pass (`bf09bc4`…`28692a4`) + funding-copy correction (`596246c`,`3a7c9a5`,`99c2e78`). Those STATE entries are **accurate** — left as-is.
- **2026-07-22** — the "positioning pass" (`1e50309`…`ebec9ea`) + the closing-section left-align (`84452bf`). Was mislabeled "2026-07-21"; **heading re-dated → 07-22**. The `1e50309` nav relabel (Programs→Build) touched **all 5 pages**, so events/philanthropy/partner last changed 07-22.
- **2026-07-23** — Programs cards + since-2025 sweep (`0d55533`,`ddeab7f`,`9f33c3b`). Was mislabeled "2026-07-21"; **heading re-dated → 07-23**.

**Metadata corrected to git-verified actual last-change dates (this commit):**
- `last-modified`: index.html **→ 2026-07-23** (touched today); events.html, philanthropy.html, partner.html **→ 2026-07-22** (their last real change was the 07-22 nav relabel — dates had been stale at 07-21 / 06-19 / 07-01). `404.html` has no `last-modified` meta.
- `sitemap.xml` lastmod: `/` **→ 07-23**, `/events` **→ 07-22**, `/philanthropy` **→ 07-22**.
- Older STATE entries genuinely dated 07-21 (post-event, funding) were **not** rewritten — only the two provably-misdated headings + their internal "no bump" lines were corrected. History for 07-21 stands.

---

## 2026-07-25 — AI beat bridge + the "daily radio" retirement (2 commits)

HEAD now **`15d1d7a`**, live + edge-verified. Sat writes the **AI beat for the Inland Empire** (grant-funded via the Inland Empire Journalism Hub & Fund). The Desert Sun is likely to write about him and link here, and `.org` said nothing about him as a writer. This adds a **bridge that points outward** — not a content section.

### Commits

- **9182500** — bridge line (founder bio closing paragraph, Sat-approved copy verbatim) + **Person schema** extended with `@id`, `description`, and `sameAs → https://sunshine.fm/`. New scoped `.founder-bio a` rule (the base `a { color: inherit }` would have rendered the link invisible). `last-modified` + homepage sitemap → 2026-07-25.
- **15d1d7a** — the "daily AI radio" sweep (below).

### ⚠️ ARCHITECTURE — written content stays OFF `.org` (do not propose a blog)

`.org` = citation-grade / institutional. **SunshineFM = human voice, opinion, byline.** The bridge acknowledges the beat and points to SunshineFM; the writing itself never lands here. **Do NOT add a blog, news section, article listing, or RSS to `.org`.** This is deliberate architecture, not an oversight.

### ⚠️ DO-NOT-ADD — "Informed IE" (same class as the private IEJIH+F grant)

The **Informed IE** app is in **closed beta, members-only, not public**. It is deliberately absent from `.org` prose AND schema. The Journalism Hub and the grant are likewise absent from schema. **Do NOT "helpfully" add the platform name, "app coming soon," or the funder.** Edge-verified: `Informed IE` / `IEJIH` / `Journalism Innovation` all return **0** sitewide.

**Queued five-word edit (do NOT do early):** once Informed IE is public *and Sat confirms with the Hub*, the bio line becomes "…writes the AI beat for the Inland Empire **at Informed IE**" + link. No rework needed.

### ⚠️ DO-NOT-RESTORE — "daily AI radio" was ASPIRATIONAL

**"Daily" was the plan, never the practice.** SunshineFM moved to **weekend radio for Palm Springs Coachella** to launch sooner, so the page had been asserting a cadence that does not exist — same phantom class as the **season passes** and the **sprints / office hours / "founder programs."** Swept all three surfaces in one pass, not spot-fixed:

1. **Founder bio ¶2** — SunshineFM clause dropped entirely (¶4 now introduces it properly *with a link*; a second unlinked mention four lines up was redundant as well as contradictory).
2. **FAQ answer — schema (`#faq`)** and 3. **its visible DOM twin** — "a daily AI radio program from Rancho Mirage" → "weekend radio for Palm Springs Coachella", edited identically, **parity re-verified True on source**.

Zero `daily radio` claims remain sitewide (edge-verified).

### GEOGRAPHY RULING — both framings are true, don't collapse them

**Rancho Mirage = where Sat builds from. Palm Springs Coachella = the market SunshineFM serves.** They answer different questions. The FAQ now uses the **market** framing (more useful to a reader); **Rancho Mirage is untouched everywhere it describes Sat's base or the TEDx talk** (9 occurrences intact). Do not "correct" one into the other.

### Judgment call recorded (the weekend show launches soon, hasn't aired)

Asked whether the FAQ over-asserts an un-aired show. **Ruling: it does not.** The wording is `Sat hosts SunshineFM, weekend radio for Palm Springs Coachella` — the verb attaches to **SunshineFM, which exists and is live** (sunshine.fm returns 200), and the cadence sits in an appositive **describing the property's format**, not claiming episodes aired. Present tense is fine. **Re-check after first broadcast** if the framing ever shifts to per-episode claims.

### Verification

Live edge: bridge paragraph serves ✓ · `https://sunshine.fm/` link present and **resolves 200** ✓ · Person `@id`/`sameAs` in served bytes ✓ · JSON-LD parses ✓ · FAQ schema↔DOM parity True ✓ · `last-modified` + sitemap `2026-07-25` ✓ (one PoP briefly served a stale 07-23 sitemap; 6/6 re-fetches confirmed 07-25). **SunshineFM URL was reconned, not guessed** — `.org` previously linked only the beehiiv *newsletter*; the sunshine-fm repo's own `rel=canonical` + `og:url` declare `https://sunshine.fm/`.

---

## 2026-08-04 — Dead-CSS sweep: terracotta 108 → 78 (rebrand step 1 of 6)

HEAD **`bfc5418`**. **Zero colour changes.** Pure deletion: **314 lines removed, 0
inserted** across `index.html`, `events.html`, `philanthropy.html`, `partner.html`.
`404.html` untouched — it had no dead rules at all.

**Terracotta declarations 108 → 78.** index 30→25, events 20→8, philanthropy 29→20,
partner 18→14, 404 11→11. 72 rules deleted: every terracotta-bearing dead rule, the
dark-surface families named for this sweep (`.section--dark`, `.event-band`,
`.where-band*`, `.tool-strip*`, `.where-section*` per page), orphaned `:hover` and
descendant rules stranded by those deletions, and 5 section banner comments whose
entire contents were removed.

**⚠️ Recon's "29 dead" was five low. The verified figure is 34** — index 5, events 12,
philanthropy 12, partner 5. The five it missed (events `.eyebrow`; philanthropy
`.nav__cta`, `.nav__drawer .drawer-cta`; partner `.link`, `.nav__links a.is-active`)
were each confirmed against the page's own DOM, with six live controls run to prove
the method. **Treat prior recon counts as starting points, never authority.**

**30 swept, not 34 — four dead NAV rules were deliberately left in place**
(philanthropy `.nav__cta`, `.nav__cta:hover`, `.nav__drawer .drawer-cta`; partner
`.nav__links a.is-active`). All provably dead — philanthropy uses `.is-active` for
its own nav link, partner is not in the nav at all — but the nav ruling is pending
and restoring a `nav__cta` on philanthropy later would silently find no CSS.
**Held for the nav decision; do not sweep them without it.**

**⚠️ Canon's pre-written list at `STATE.md:283` covers `events.html` ONLY.** That
deferred item is titled "Dead-CSS sweep on events.html" and names a *different,
broader* set (`.event-card`, `.empty-state`, `.luma-wrap`, the `.btn` family,
`.section`, `.wrap`…). It says nothing about index, philanthropy or partner — so
**those three pages' deletions rest on this session's DOM verification, not on prior
approval.** Do not describe the whole sweep as pre-approved.

### Proof

**Primary:** all 72 deleted selectors match **ZERO elements** on their own page's live
DOM. A rule matching nothing contributes nothing to any element's computed style, so
the deletion is a no-op by construction.

**Differential:** every element's full computed style and bounding rect, before vs
after — 5 pages × 2 widths (1280/375) plus 6 toggled states (mobile drawer on all
five pages, pledge lightbox on index). **16 comparisons, 0 mismatches**, identical
element counts and document heights throughout.

**⚠️ TRAP — the first harness lied, and its results were discarded.** An initial
computed-style comparison returned "0 mismatches" across ten comparisons while being
**nondeterministic**: `loading="lazy"` images in an offscreen iframe plus the `fadeUp`
keyframes meant the two sides were sampled at different moments. A control run exposed
it. The rebuilt harness freezes `animation`/`transition` and fixes image boxes
identically on both sides, and was validated before its output was trusted —
repeatability 0, a single-element `.nav__mark` colour change detected as exactly 1,
and a rule targeting only deleted selectors correctly detected as 0. **Standing rule:
a differential test that has not been shown capable of failing proves nothing. Run the
positive control first.** (Second trap inside that: injecting a `<style>` node to
mutate shifts every element index — append to an existing style node instead.)

### Remaining dead layer — a separate future sweep, same proof method

Rigorous analysis found far more dead CSS than the terracotta subset:
**index 59 dead selectors, events 93, philanthropy 61, partner 27, 404 zero.** Only
the in-scope rules were removed, which leaves visible residue: on events the whole
`.btn` family is dead but only `.btn--primary`/`.btn--cream` carried terracotta, so
`.btn` and `.btn--ghost` survive as orphans. Same shape for `.location-block` and the
`.aud-*` family on index. Not urgent, fully mechanical, and provable the same way.

Nav, wordmark and `id="programs"` untouched — no diff line references them. No token
added, renamed or revalued. The source-order cascade question was left alone: it
belongs to step 2.

---

## 2026-08-04 (later) — rgba refactor + accent split (rebrand steps 2 and 3)

**Zero visual change across the entire session.** 282 insertions / 127 deletions, 5
files. No hex value changed. Verified by 21 differential comparisons against HEAD
`713cce8`, all zero.

### Step 2 — rgba refactor

**75 token-equivalent rgba literals** converted to token-derived syntax (recon said
~86; the dead-CSS sweep had already removed 11 — **re-derive, never trust a carried
count**). Breakdown: cream 56, ghost 15, terracotta-d 2, dusk 1, ink-l 1.

Approach: **five `-rgb` triplet tokens**, e.g. `rgba(var(--c-cream-rgb),0.7)`.
Chosen over `color-mix(in srgb, var(--c-cream) 70%, transparent)` — color-mix is a
single source of truth and would have been more elegant, but it is a newer feature
and `.org` ships raw with **no build step, no autoprefixer and no staging**. An
unsupported `color-mix` is an invalid declaration, which silently drops the colour.
`rgba(var(--x-rgb), a)` needs only custom-property support and is provably identical.
**Cost of that choice: a palette change must update BOTH the hex and its `-rgb`
triplet.** Both lines carry a keep-in-sync comment. Revisit color-mix once support is
a non-issue.

Also converted: the **7 rocket-divider SVG strokes** (`stroke="#C8552A"` →
`stroke="var(--c-accent-text)"` after step 3 — `var()` in an SVG presentation
attribute works, and the harness proves it: a forced stroke change moves 6 elements)
and the hardcoded `rgba(251,247,238,0.7)` in the inline pledge-replica style.

**Left alone, deliberately — genuinely achromatic (16 literals):**
`rgba(255,255,255,…)` ×14 (hero scanline + ghost letterform), `rgba(0,0,0,0.3)`,
`rgba(8,12,24,0.94)` (lightbox scrim). These carry no brand hue and must not be
tokenised.

### `#F3DDCF` ruling — NAMED, not mapped

After the sweep it had **one** instance left (`philanthropy .onramp-card--give`; the
`events` one died with `.ticket-card--season`). Now `--c-blush`.

**Named rather than mapped, because mapping would move pixels.** It sits **7/255 on
G and B** from `--c-ghost-l` `#F2E4D6` — close enough to look like drift, far enough
that collapsing them is a visible change. Nearest neighbours measured:
ghost-l Δ7 · sand-d Δ8 · ghost Δ15 · sand Δ18 · cream Δ31.
**Whether to collapse `--c-blush` into `--c-ghost-l` is a deliberate design decision,
not a refactor — it belongs to Sat, not to a zero-pixel step.** Declared on all five
pages to keep the `:root` blocks byte-identical (see invariant below); unused on four.

### Step 3 — the accent split

Four role tokens, **all four aliasing the current terracotta** so nothing changes
colour: `--c-accent-fill` and `--c-accent-text` (→ `--c-terracotta`),
`--c-accent-fill-h` and `--c-accent-text-d` (→ `--c-terracotta-d`).

**87 accent declarations total** (85 `var(--c-terracotta*)` — the 78 carried from
step 1 plus the 7 newly-tokenised SVG strokes — plus 2 `rgba(var(--c-terracotta-d-rgb))`).

| Bucket | Count |
|---|---|
| `--c-accent-fill` (backgrounds) | **6** |
| `--c-accent-fill-h` (hover backgrounds) | **2** |
| `--c-accent-text` (text, borders, SVG strokes) | **42** |
| `--c-accent-text-d` (darker accent text) | **2** |
| **Split subtotal** | **52** |
| Nav/wordmark — deliberately NOT split | **33** |
| Role unruled — awaiting Sat | **2** |

Recon's pre-sweep guess was 35 fill / 67 text / 6 border. **The real split is far more
lopsided: 8 fill vs 44 text-family.** The fill surface is small and concentrated
(`.btn--primary`, `.prog-card--featured`, `.founder-credential`, `.cta`, the pledge
replica header, `404 .btn--primary`) — which is good news for the rebrand, because
volt-as-fill touches only 8 places.

**⚠️ `--c-accent-text-d` has no counterpart in `playbook/BRAND.md` §4's target spec.**
It exists because two declarations use the darker accent as *static text for contrast*,
not as a hover state (`philanthropy .onramp-tag`, `partner .pform-error`). Mapping them
to `--c-accent-text` would have changed `#A8441F` → `#C8552A`. **Step 6 needs a value
assigned for it.**

### OPEN — three rulings for Sat

1. **Nav and wordmark excluded from the split (33 declarations).** `.nav__mark`,
   `.nav__cta`(+hover), `.drawer-cta`, `.nav__links a:hover`, `.nav__links a.is-active`,
   `.nav__drawer a:hover` — all still on `var(--c-terracotta*)`. The session brief lists
   "nav, wordmark, `id=programs` untouched" as a **verify criterion**, and it was honoured
   literally, as in the dead-CSS sweep. **Consequence: step 6 is NOT a two-line edit until
   these are ruled on** — it would be two lines plus 33 nav declarations. Including them
   is mechanical and zero-pixel; it needs one word.
2. **Two tone-on-tone watermarks, role genuinely ambiguous** — marked in place with
   `/* ROLE UNRULED (step 3) */`: `index .cta__ghost` (`rgba(td-rgb,0.2)` over the
   terracotta `.cta` band) and `.prog-card--featured .prog-num` (`rgba(td-rgb,0.28)` over
   the terracotta card). They are set via `color:` (text-shaped) but are **decoration
   derived from the fill they sit on**. At rebrand they should probably follow the fill,
   not the text — but that is a design call, so they were left unassigned rather than guessed.
3. **`--c-blush` vs `--c-ghost-l`** — collapse or keep (see above).

### Invariant worth protecting

**All five `:root` blocks remain byte-identical — 22 `--c-*` declarations, md5 match.**
That is what keeps step 6 a single `sed` across five files. New tokens were added to all
five even where unused, specifically to preserve it. All 4 accent declarations sit far
above each page's first `@media` (lines 56–155 vs 375–1364), so the cascade trap is clear.

### ⚠️ HARNESS TRAP — custom properties inflate the fingerprint

The first step-2 comparison reported **every element mismatched** (284/284, 101/101,
197/197) while element counts and document heights were identical. Not a regression:
`getComputedStyle` enumerates **custom properties**, and custom properties **inherit to
every element** — so adding 6 tokens to `:root` grew every element's property list by 6.
Measured directly: 32 → 38 custom props on a probe element, with its rendered colour
byte-identical (`rgb(200,85,42)` both sides).

**Fix, now standing: a rendered-state fingerprint must skip `--*` properties.** A custom
property only reaches the screen through `var()` resolution, which lands in a standard
property. Harness v2 also adds `::before`/`::after`/`::marker` capture — v1 would have
missed a pseudo-element change entirely (the new control detects 14).

**Controls that must pass before any zero is trusted** (all did): repeatability 0 ·
single-element `.nav__mark` change → exactly 1 · SVG stroke → 6 · pseudo-element → 14 ·
`--c-accent-fill` → 7 · `--c-accent-text` → 43 · nonexistent selector → 0.

**Second trap logged:** a differential test whose injected CSS references a token that
exists in only one tree will always mismatch. Two hover checks failed that way before
being rewritten to apply **each tree's own expression** (`var(--c-terracotta-d)` before,
`var(--c-accent-fill-h)` after) — both resolve to `#A8441F`, 0 mismatches, and a control
using a genuinely wrong colour correctly returns 1.

---

## 2026-08-04 (later still) — three rulings applied: the accent split is now COMPLETE

**Zero visual change.** 90 insertions / 55 deletions, 5 files, **CSS-only — 0 markup
lines changed.** Verified by 20 differential comparisons against `e0e0078`, all zero,
with the positive controls run first.

Sat's rulings on the three items step 3 left open:

**1. Nav and wordmark ARE split (33 declarations).** *"Nav untouched" meant structure
and labels, not role assignment.* 15 → `--c-accent-fill` (`.nav__mark`, `.nav__cta`,
`.drawer-cta`), 5 → `--c-accent-fill-h` (`.nav__cta:hover`), 13 → `--c-accent-text`
(`.nav__links a:hover`, `.nav__links a.is-active`, `.nav__drawer a:hover`).
**Structure, labels and the wordmark glyph are untouched** — the diff changes colour
token names only, and nav labels still read
`Philanthropy · Build · Events · The Pledge · About · Intelligence Network ↗`,
`id="programs"` intact, `class="nav__mark">AI` intact.

**2. The two watermarks follow the FILL.** `.cta__ghost` and
`.prog-card--featured .prog-num` → new `--c-accent-on-fill-rgb`, aliasing
`--c-terracotta-d-rgb` today. `ROLE UNRULED` markers removed. **Step 6 sets it to
pine `27,67,50`, giving pine-on-volt.** Triplet form because both are used at low
alpha (0.2 / 0.28); a hex token could not carry them.

**3. `--c-accent-text-d` → `#2D6A4F` at step 6** (pine-light, the same value as the
caption tier). Recorded in `playbook/BRAND.md` §4, which previously had no entry for it.

**`--c-blush` stays named.** Collapsing it into `--c-ghost-l` is a design decision for
after the palette lands, not before.

### The accent surface is now 100% role-assigned

| Token | Uses |
|---|---|
| `--c-accent-fill` | **21** |
| `--c-accent-fill-h` | **7** |
| `--c-accent-text` | **55** |
| `--c-accent-text-d` | **2** |
| `--c-accent-on-fill-rgb` | **2** |
| **TOTAL** | **87** |

**Zero `var(--c-terracotta*)` remains outside the five `:root` aliases.** All five
`:root` blocks stay byte-identical (**23** `--c-*` declarations, md5 match). That is
the invariant that makes step 6 one `sed` across five files — protect it.

### Verification

Controls first, all passing: repeatability 0 · single-element `.nav__mark` change → **1**
· `--c-accent-fill` → **10** (was 7 before the nav split — proof the nav additions are
live) · `--c-accent-text` → **43** · `--c-accent-on-fill-rgb` → **4** · pseudo-element
→ **14** · nonexistent selector → **0**.

Then 20 comparisons, all zero: 5 pages × 2 widths, drawer on all five, lightbox and
drawer+lightbox on index, and nav-hover resolution on index/events/404. The nav-hover
checks apply **each tree's own expression** (`var(--c-terracotta-d)` before,
`var(--c-accent-fill-h)` after) because a test that injects a token existing in only one
tree always mismatches — with a wrong-colour control correctly returning 1.

### Deploy note — partial propagation is normal, verify across PoPs

The steps 2+3 push (`e0e0078`) initially served **mixed** content: `partner` had the new
build while `index`/`events`/`philanthropy`/`404` were still pre-push, and a single
`events` re-fetch went stale again *after* four pages had converged. **A single
cache-busted fetch is not proof.** Confirmed with 3 fetches per page and 12 consecutive
on `events` (12/12 new) before declaring it live. Same shape as the 2026-07-30 `llms.txt`
and 2026-07-25 sitemap PoP notes.

---

## 2026-08-05 — THE VISIBLE ONE: steps 4 + 6, pine/volt is live

**The site's appearance changed.** Steps 1–3 were zero-pixel; this is not. 313
insertions / 213 deletions, 5 files. **Only 2 markup lines changed** (the pledge
replica's inline styles) — everything else is CSS.

**Shipped as ONE commit, deliberately.** Step 4 alone is a *regression* on the warm
palette: flipping button text to dark drops the hover-fill pair from 5.59:1 to
3.12:1 on `#A8441F`. Only step 6 makes it right (7.71:1 on `#C2E600`). Committing
them separately would have put a knowingly-worse state in history.

### Step 4 — 25 flips, every light value on an accent fill became dark

`--c-cream` → `--c-ink` on `.btn--primary` ×2, `.nav__mark` ×5, `.nav__cta` ×5,
`.drawer-cta` ×5, `.prog-title`, `.prog-tagline`, `.founder-credential`,
`.cta__headline`, and the pledge replica title. Alpha-derived light values moved to a
new `--c-ink-rgb`: `.prog-body` @0.8, `.cta__sub` @0.75, pledge eyebrow @0.7.
**Zero light values remain on any fill surface.**

### Step 6 — palette swapped, per BRAND.md §4

`--c-terracotta`, `--c-terracotta-d` and `--c-terracotta-d-rgb` were **deleted** —
once the accent aliases became literals nothing referenced them. All 5 `-rgb`
triplets updated in lockstep with their hexes. `--c-blush` untouched per ruling.
Token block: **21 declarations, byte-identical across all five pages.**

### ⚠ NAMING DEBT — deliberate, and recorded

Values were swapped; **names were not**. `--c-cream` is now paper-white, `--c-dusk` a
near-black green, `--c-ink` pine. A rename touches ~300 usages and would have mixed a
mechanical change into a visible one, so it is queued as its own zero-pixel step.
**This is the identical defect `.com` carries on `--sand`** (BRAND.md §3) — do not let
it sit for three months.

### Verification

**Layout provably unmoved.** 5 pages × 2 widths: element counts, document heights, and
**every element's bounding rect** identical before and after. `geometry_moved: 0` on
all ten. Only colour changed.

**Contrast, measured on the real rendered pairs** (not the theoretical matrix) —
compositing translucent backgrounds and walking up for the effective background:

| | before | after |
|---|---|---|
| index | 54 failing | **17** |
| events | 10 | **6** |
| philanthropy | 13 | **6** |
| partner | 11 | **6** |
| 404 | 11 | **6** |

**62 contrast failures fixed. ZERO new failures.** Every one of the 41 remaining was
already failing on the warm palette.

**Doctrine holds: `--c-accent-fill*` appears as `background` and nothing else** — zero
uses as colour, border or stroke. Volt is never text on light.

### ⚠ THREE THINGS FOR SAT — flagged, NOT fixed

1. **Accent text on the dark ground went 3.38:1 → 1.60:1.** `.eyebrow` (index hero),
   `.stats__label`, and `.footer__mark` (**all five pages**) put `--c-accent-text`
   (pine `#1B4332`) on `--c-dusk` (`#081C15`). Both are dark now, so it is effectively
   invisible — visible in the screenshots. Already failing before (3.38), so not a new
   failure, but a material degradation. **§4's spec assumed accent text sits on light
   surfaces; these three selectors do not.** Fix is a dark-ground variant using volt
   (volt on ground = 15.35:1, and BRAND.md §1 permits volt as text on dark — .com
   already does this in the how-we-do-this modal). Needs a token and a ruling.
2. **`--c-blush` `#F3DDCF` is now the one warm value on the site** and reads as an
   off-brand pink card next to `.onramp-card--deep`. Clearly visible in the
   philanthropy screenshot. Kept per ruling; flagged as predicted.
3. **Pledge replica eyebrow lands at 4.30:1** (9px, needs 4.5). Raising alpha 0.7 →
   0.75 gives 4.89:1 and matches `.cta__sub`. One-character change, not made.

### Watermarks — pine-on-volt, confirmed not muddy

`.cta__ghost` **improved** 1.06 → 1.42:1 and `.prog-num` reads as a clean darker-pine
numeral on volt. The fill-family ruling was right.

### KNOWN GAP — accepted, not a defect

**The pledge deck PDF stays warm.** `aicv-pledge-deck.pdf` is baked with the old
palette, and its HTML thumbnail recolours automatically — so the thumbnail no longer
matches the document it previews. Accepted; regeneration is step 5.

---

## 2026-08-05 (later) — post-swap corrections: dark nav, cards off volt, blush gone

**Layered onto `fb204fd`. NOT pushed — the live site is still terracotta; we publish
once, when it's right.** CSS-only, zero markup changed.

### 1. Text-on-ground token family — the gap, closed once

It had surfaced three times (footer mark, hero eyebrow + stats label, then the whole
nav). Defined in `:root` on all five pages:

| Token | Value | Role | On ground |
|---|---|---|---|
| `--c-on-ground` | `#E0EDD2` | body-weight text on dark | **14.50:1** |
| `--c-on-ground-m` | `#C8DDB4` | muted labels and eyebrows | **12.18:1** |
| `--c-on-ground-hi` | `#D8FF00` | marks + active states on dark | **15.35:1** |

**⚠ I added the third token, which the brief did not name.** The brief says
`.footer__mark` → volt, and nav hover/active → volt. Using `--c-accent-fill` for that
would have broken the invariant that the fill token is **background-only** — the
invariant the whole accent split exists to protect, and the one the doctrine check
tests. `--c-on-ground-hi` carries volt-as-text-on-dark under its own name, with the
"dark only" warning attached. **Verified: `--c-accent-fill*` still has zero
non-background uses.**

**⚠ ALL THREE ARE DARK-ONLY** — on paper they measure 1.17 / 1.39 / 1.10. Audited:
**zero instances of the family landing on a light surface.**

Reassigned: `.footer__mark` → `-hi` (5 pages) · `.stats__label` → `-m` ·
`.hero .eyebrow` → `-m`, **scoped to index only** — it is the single plain `.eyebrow`
on a dark ground (every other page uses `.hero--cream`, and the other eyebrows sit on
light sections where they must stay `--c-accent-text`). A global `.eyebrow` change
would have made every light-surface eyebrow 1.39:1.

### 2. Nav is dark on all five pages

Background → `--c-dusk`, matching the footer. `.nav__links a`, `.nav__name` and the
hamburger bars → `--c-on-ground`; hover and `.is-active` → `--c-on-ground-hi`.
Drawer given the same treatment (background, links, hover, dividers). `.nav__mark`
stays a volt tile with pine text — the mockup. **Markup untouched: labels, order,
hrefs, `id="programs"` and the wordmark are byte-identical.**

**⚠ THE NAV BORDER — reporting, as asked.** It was `1px solid var(--c-ghost)`,
sized as separation against cream. On ground that measures **12.18:1 — a bright mint
rule**, clearly wrong. I set it to `rgba(var(--c-ghost-rgb),0.14)` = **1.39:1**, a
hairline that reads on dark without shouting. The ladder, if you want a different
weight: `0.30` → 2.23:1 · `0.20` → 1.66:1 · `0.14` → 1.39:1 · `0.10` → 1.25:1.
**The honest alternative is removing it entirely** — the footer has no top border and
separates by darkness alone. It only matters on index, where the dark nav meets the
dark hero; everywhere else the nav sits on light content and the edge is already hard.
One line either way.

**`.nav__cta` kept as a fill, as instructed** — a volt pill with pine text inside the
dark bar. It reads as the strongest thing in the nav, which is right for the
Philanthropy CTA, but it is now competing with the volt wordmark tile two inches to
its left. On philanthropy itself the CTA is absent and `.is-active` renders as volt
*text*, which is quieter and arguably better. Worth a look in the screenshots.

### 3. Program cards off volt

`.prog-card--featured` → `--c-sand-d` `#E0EDD2`. Pine text on it is **9.08:1**. The
volt moved to the card's button (`.prog-card--featured .prog-tag`), pine on volt
**9.61:1**. **No border accent added** — `.prog-grid` already frames the cards in
`--c-ghost` with 2px gutters, so they separate without one. Say the word if you want
the accent anyway.

**Volt as a LARGE fill now exists once per page: the `.cta` band on index.**
Everything else volt is a small control — `.nav__mark` (32px), `.nav__cta`,
`.drawer-cta`, `.btn--primary`, `.founder-credential`, the program buttons, and the
pledge-replica header.

### 4. Philanthropy cards, and `--c-blush` is gone

`--give` → `--c-sand-d`, `--deep` → `--c-dusk-m` (off pure ground). They now read as
siblings: 9.08:1 apart, both against a paper section. **`--c-blush` and `#F3DDCF`
deleted entirely.** **Zero warm hex values remain anywhere in the tree** — verified
across all five files with comments stripped.

### Verification

- **Contrast: 0 new failures, 7 fixed.** index 17 → 14, the other four 6 → 5 each.
- **Zero pine-on-dark-ground text remains** — the check that motivated item 1.
- **Zero on-ground-family tokens on a light surface.**
- **Layout identical** across 12 combinations (5 pages × 2 widths + drawer open on two):
  element counts, document heights and every bounding rect unchanged.
- Token block: **23 declarations, byte-identical across all five pages.** Braces balanced.

### ⚠ THE 16 REMAINING FAILURES ARE ONE FAMILY, AND NOW CHEAPLY FIXABLE

All pre-existing, all the same shape: **low-alpha cream on the dark ground.**
`.footer__desc` 3.44 · `.footer__col-label` 2.44 · `.footer__copy` 2.20 ·
`.footer__tagline` 1.84 · `.stats__affil` 2.62 · `.stats__l` 4.29 ·
`.pledge-thumb__hint` 3.83. Plus two decorative watermarks (fine) and the pledge
eyebrow at 4.29 flagged earlier.

**`--c-on-ground-m` fixes most of them outright — it is 12.18:1 where those are 2–4:1.**
These are the "four already-failing pairs" BRAND.md §4 has carried as open since the
audit. The tool to close them now exists. Not done here: out of scope, and the footer
type hierarchy is a design call, not a substitution.

---

## 2026-08-05 (final) — the site passes: 31 contrast failures closed, nav finished

Four rulings applied. **.org now audits at ZERO failing text elements on four of
five pages.** Index retains two, both decorative watermarks (see below).

### 1. The 31 failures — closed, §4's oldest open item

They were all one pattern: **low-alpha cream on the dark ground.** 29 declarations
substituted for the `--c-on-ground` family across footer, stats and pledge-thumb on
all five pages.

| | before | after |
|---|---|---|
| `.footer__links a` | 4.75 | **14.50** |
| `.footer__desc` | 3.43 | **12.18** |
| `.footer__col-label` | 2.44 | **12.18** |
| `.footer__copy` | 2.21 | **12.18** |
| `.footer__tagline` | 2.44 | **12.18** |
| `.stats__l` | 4.30 | **11.46** |
| `.stats__affil` | 2.64 | **12.18** |
| `.stats__affil strong` | 5.03 | **14.50** |
| `.pledge-thumb__hint` | 3.81 | **11.04** |

**Hierarchy moved from opacity to role + weight + size**, which is the durable form.
Two tiers: `--c-on-ground` for what reads first (interactive links, stat captions,
emphasised runs); `--c-on-ground-m` for supporting and fine print. Within the muted
tier, separation comes from the existing 10/12/13px sizes, 300/500 weights, the
uppercase letter-spacing on `.footer__col-label` and the italic serif on
`.footer__tagline`.

**One weight change was required.** `.footer__copy` had no `font-weight` and inherited
400 while `.footer__desc` is 300. Once both became solid, the copyright line would
have read *heavier* than the description above it — an inverted hierarchy. Set to 300.
It is the only typographic change in this pass.

**Also fixed:** the pledge-replica eyebrow, `rgba(ink,0.7)` → `0.75` on volt,
**4.30 → 4.89**. One character. It was the last non-decorative element under 4.5:1,
and leaving it would have meant the site did not actually pass.

### 2–3. Nav finished

**Border deleted.** The footer separates by darkness alone and nothing misses a rule
there. On index the nav now merges into the dark hero; the hero photograph lands next
session and restores that edge naturally.

**`.nav__cta` is an outline, not a fill** — volt border, volt text, transparent
ground; hover fills volt with pine text. **The wordmark tile is now the only volt
block in the bar**, which is right: it is the brand mark. Volt on ground is 15.35:1,
so the outline still reads as the strongest control without shouting.

**Padding was reduced 7px/16px → 6px/15px to absorb the new 1px border**, so the
pill's outer box is unchanged at **109×31** — verified.

### 4. `--c-on-ground-hi` confirmed

Stays as defined. Reaching for `--c-accent-fill` would have broken the
background-only invariant the accent split exists to protect.

### Verification

- **Contrast: 0 new failures, 31 fixed.** index 14 → 2, events/philanthropy/partner/404
  **5 → 0** each.
- **The 2 remaining are `.hero__ghost` (380px) and `.cta__ghost` (280px)** — watermark
  letterforms, `pointer-events:none`, `user-select:none`. They are decoration, not
  content; making them pass would defeat their purpose. **Every real text element on
  the site passes.**
- **Layout moved by exactly 1px, fully accounted:** deleting the nav border took `.nav`
  from 61 → 60px, which shifts 220 elements down-page by 1. The only other delta is
  `.footer__copy` 473 → 468px wide from the weight change — same height, no reflow.
  **Zero unexplained movement.** `.nav__cta` and `.nav__mark` boxes identical.
- Token block: **23 declarations, byte-identical across five pages.** Braces balanced.
  Zero warm hex values.

### Still deliberately kept

The drawer's dividers (`.nav__drawer`, `.nav__drawer a` at `rgba(ghost,0.14)`) were
**not** deleted — they give the mobile link list its structure, which is a different
job from the nav's bottom edge. The drawer CTA stays a volt fill; it is the only volt
in the drawer body and has no wordmark competing beside it.

---

## 2026-08-05 (favicon) — the icon gap is closed; hero BLOCKED on the asset

**Favicon shipped. The hero photograph did not — the image file was never on disk.**
See the blocker at the end.

### Favicon — closed, recon's oldest structural gap

Recon found **no `<link rel="icon">` on any page**. Four assets now serve from root,
wired into all five pages (`<head>` only — 45 insertions, 0 deletions, 9 lines each):

| File | Bytes | Notes |
|---|---|---|
| `favicon.svg` | **407** | primary, scalable |
| `favicon-32.png` | 621 | |
| `favicon-16.png` | 313 | |
| `apple-touch-icon.png` | 2,973 | 180×180, iOS |

**~4.3 KB total.** Verified serving with correct MIME types and dimensions; the SVG
decodes and paints (495 pine pixels in the tile — the glyphs render, not just the
ground).

**It is the `.nav__mark` treatment**, built from that rule's actual spec: volt
`#D8FF00` tile, `--c-ink` `#1B4332` serif "AI", Georgia — the local fallback in the
mark's own `'EB Garamond', Georgia, serif` stack, and the one that renders identically
without a webfont round-trip.

**One deliberate deviation: type scale.** The nav mark is 14px in a 32px tile (0.44).
At favicon sizes that renders about 7px — illegible. The icon uses **19px in 32
(0.59)**, so it holds at 16px. Same treatment, scaled for the medium.

**⚠ INTERIM, as instructed.** This is the CURRENT mark. It is **not** the AiCV/sun
wordmark — that exists only inside a hero mockup (`~/Downloads/aicv org hero draft
page.png`) as composited pixels, not as artwork. **When that wordmark is drawn
properly, the favicon should be re-exported from it.** Do not treat this as final.

**Also added: `<meta name="theme-color" content="#081C15">`** on all five pages —
recon found none, and mobile browser chrome now matches the dark nav. Not requested;
one line; say the word and it comes out.

### ⚠ BLOCKED — the hero photograph was never handed over as a file

The image is visible in the session but **exists nowhere on disk.** Searched
`~/Downloads`, `~/Desktop`, `~/Documents`, `~/Pictures`, and the session scratch. The
two hero-named files in Downloads are **mockups, not sources**:

- `aicv org hero draft page.png` (1672×941) — a full-page comp with the headline,
  buttons, feature bar and the AiCV/sun wordmark **baked in**, over a scrim that is
  already composited. Cropping a hero out of it would ship someone else's flattened
  layout at half the resolution needed for a 1920w asset.
- `aicv hero page.png` (2730×1536) — same class.

**Nothing was guessed or substituted.** Items 1 and 2 are untouched: no image
prepped, no `.hero` CSS changed, `.hero::before` and `.hero__ghost` left exactly as
they are pending a judgement that needs the real photograph behind them.

**What is needed:** the source file (JPEG/PNG/HEIC, ideally ≥2400px wide) dropped
anywhere on disk with the path named. Tooling is confirmed ready — `sips` encodes
WebP (`org.webmproject.webp`), `rsvg-convert` handles vector, so srcset generation is
a short pass once the file exists.

**Standing consequence:** the index nav/hero edge that deleting the nav border gave up
is **still open** until this lands.

---

## 2026-08-05 (hero) — the photograph is in; the index nav/hero edge is restored

**Index only.** The other four pages use `.hero--cream` and have **zero diff lines.**
Closes the dependency deleting the nav border created two sessions ago: the dark nav
now meets a LIGHT photograph, so the edge reads without a rule.

### Assets — hand-optimised, no build step

| File | Dimensions | Bytes | Target |
|---|---|---|---|
| `hero-sunrise-1920.webp` | 1920×1080 | **81 KB** | ~250 KB |
| `hero-sunrise-1920.jpg` | 1920×1080 | 189 KB | fallback |
| `hero-sunrise-960.webp` | 960×751 | **26 KB** | ~120 KB |
| `hero-sunrise-960.jpg` | 960×750 | 74 KB | fallback |

**Three to four times under budget** — the frame is mostly smooth gradient, which WebP
handles extremely well. q=88; checked for banding rather than assumed: a vertical
sample through the sky gives a max step of 1.01 and **zero steps ≥2.0**.

**Mobile is a genuine crop, not a resize** — `-crop 0 0 1966 1536` drops the right 28%
of the frame, taking the sun blowout out entirely while keeping the palm line.

**JPEG fallbacks are kept.** With `<picture>` only one source is ever fetched, so they
cost modern visitors nothing and only serve the rare non-WebP client.

**⚠ TOOLING CORRECTION.** An earlier session recorded that `sips` encodes WebP. **It
does not** — `sips --formats` lists `org.webmproject.webp` **without** the `Writable`
flag; it reads WebP only. ffmpeg here has the decoder but no `libwebp` encoder either.
**`brew install webp` was run** to get `cwebp` 1.6.0. Small, standard, reversible
(`brew uninstall webp`), and the only way to meet the WebP spec on this machine.

### Hero treatment

`<picture>` with an `<img>` — not a CSS background — because `fetchpriority` and
`loading` are image attributes. **LCP element confirmed: the hero `<img>` at 647,680
px² visible, four times the next candidate (the H1 at 164,498).** It carries
`loading="eager"`, `fetchpriority="high"`, `decoding="async"`, explicit `width`/`height`.

**Both old dark-hero devices are gone, and both were judged rather than swept:**

- **`.hero::before`** was a 1.1%-white diagonal scanline — texture for a flat dark
  field, invisible over a photograph. **Repurposed as the scrim** rather than deleted,
  so the pseudo-element count is unchanged.
- **`.hero__ghost`** was a 380px "AI" at 2.5% white, bottom-right. Over a photo it is
  invisible, redundant now the image carries the interest, and it sat exactly where the
  sun blows out. **Removed.**

**Type inverted** — this hero is now light: `.hero .h1` → `--c-ink`, `.accent` →
`--c-accent-text-d`, and the eyebrow override was **dropped entirely** so it inherits
the same pine every other eyebrow on the site uses.

### ⚠ THE SCRIM IS TWO DIFFERENT GRADIENTS, AND MOBILE IS WHY

Desktop is the left-to-right paper gradient the brief specified — type sits left, the
photo and the sun stay open on the right.

**That does not work on mobile, and measuring caught it.** At 375 the type spans the
full width, so a horizontal scrim protects nothing: the headline's last line ran
straight into the palm silhouettes at `rgb(67,60,12)`, where pine measures **1.00:1** —
literally invisible. Mobile therefore gets its own `@media (max-width: 700px)` block:
a **vertical** gradient covering the type band and clearing for the palms, a taller
hero (`min-height: 460px`) that drops the palm line below the text, and
`object-position: 50% 72%`.

**The media query is placed immediately after the base rules it overrides** — the
source-order cascade trap this file has hit three times.

**⚠ Measured, not assumed, and the first answer was wrong.** The raw haze gives pine
5.03:1 at the mean but **4.25:1** against the darkest 2nd percentile — under AA, which
is what forced a scrim at all.

### Verification — composited, at nine breakpoints

Contrast measured by rasterising the actual painted result: image with its real
`object-fit`/`object-position`, then the real computed gradient, sampled under **tight
glyph rects** (`Range.getClientRects` on text nodes, not element boxes).

| vp | src | hero | scrim | eyebrow | h1 | accent |
|---|---|---|---|---|---|---|
| 1440 | 1920 | 1425×560 | horiz | 9.59 | 6.57 | 3.79 |
| 1280 | 1920 | 1265×512 | horiz | 9.59 | 6.44 | 3.72 |
| 1024 | 1920 | 1009×410 | horiz | 9.59 | 6.19 | 3.81 |
| 768 | 1920 | 753×380 | horiz | 9.18 | 6.20 | 3.81 |
| 700 | 960 | 685×460 | vert | 10.11 | 9.88 | 5.70 |
| 600 | 960 | 585×460 | vert | 10.11 | 9.89 | 5.70 |
| 430 | 960 | 415×460 | vert | 10.11 | 9.72 | 5.60 |
| 375 | 960 | 360×460 | vert | 10.11 | 7.87 | 4.54 |
| 320 | 960 | 305×460 | vert | 10.05 | 6.46 | 3.73 |

**All pass.** Tightest margin **+0.72** over threshold (was +0.03 before the mobile
scrim was lifted a second time).

**CLS = 0.** Element count 292 → 292 and **zero geometry movement** when the image
lands, at both 1280 and 375 — the `<img>` is absolutely positioned inside a
`min-height` container, so it cannot shift anything.

**Correct source selection verified:** 1920 at ≥768, 960 at ≤700.

### Harness notes worth keeping

- **Setting `iframe.src` before appending to the DOM breaks `<picture>`** — the element
  resolves at parse time against the iframe's default 300px box and picks the mobile
  source at every viewport. Append first, then set `src`. This produced a false
  "mobile image at 1280" reading before it was caught.
- **CSS drops `to bottom` from computed gradient values** because it is the default.
  Testing for it inverts the direction; test for `to right` instead. This produced a
  false failure on mobile.

---

## The port — 32 pieces from sunshine.fm, and what the review found — 2026-08-14

`9ee8cd2` (infrastructure), `bbaffd9` (32 pieces + 10 PNGs), `7263267`
(cross-links), plus the description normalisation below. All live; every
ported piece is `draft: true`, so nothing is public.

**32 pieces landed as noindexed drafts**: 10 news / 22 views, 22 FAQPage nodes
carrying 81 questions, 42 callout blocks, 10 banner PNGs at `/images/`. Absent
from sitemap, llms.txt, RSS and the index; each addressable at
`/news/<slug>` for review.

### ⚠ FOUR MISCOUNTS THIS WEEK, ALL THE SAME SHAPE

A number measured once, reported as fact, and carried forward without being
re-derived. Recorded together because the pattern is the finding, not any one
instance:

| claimed | actual | whose |
|---|---|---|
| palette "55 uses" of `--c-accent-text` | 20 — and **17 of 17** palette counts wrong across 6 files | inherited |
| PORT_DAY "42 pull-quotes + 18 briefs" | **42 total**, 18 carrying both classes → 24 pull-quotes | other side |
| PORT_DAY "71 in-body cross-links" | **40** — 37 to `/news/<slug>`, 3 to root | other side |
| "8 news lowercase, 17 views not" | **32 of 32 titles lowercase**; 7 of 33 descriptions | MINE |

The last one is the instructive one: it was wrong on every axis, and it was
mine, made while cataloguing the other three. **A count is only true at the
moment it is measured.** Re-derive on use.

### The 40-not-71

The conversion had ALREADY rewritten the cross-links — but to ABSOLUTE
`https://aicoachellavalley.org/...` URLs. So the redirect-chain problem
PORT_DAY flagged was already solved, and what remained was this site's own
convention (recorded in `[slug].astro`): every internal link is relative,
because an absolute one sends local-preview clicks to production. Forty
absolute self-links would have done exactly that. All 40 were in BODIES and
none in frontmatter — checked before touching anything, because a FAQ answer's
URL feeds JSON-LD and must stay absolute.

Left absolute deliberately: the single `sunshine.fm/journal/` link (sealed
archive, PORT_DAY rules it stays) and 125 `.com` references (cross-property).
Nothing pointed at a sunshine.fm path outside the 32.

### Review-window findings — measured against 33 real entries

The surface had only ever been judged against one placeholder and three
fixtures. **The type system was tuned on titles of 4, 9 and 12 words; the
corpus runs to 97 characters.** Fixtures said Bebas worked; the corpus showed
where it doesn't. That gap is the case for landing drafts and looking.

Run as a LOCAL build with the draft filter off, then reverted — not a
temporary preview surface, which is a thing to build, verify, and remember to
delete, and forgetting it is how a draft-visible index reaches production.

- **Desktop holds.** 4×1-line, 24×2, 5×3; cards 228–335px.
- **⚠ MOBILE IS THE PROBLEM, and it is not one outlier.** At the 34px clamp
  floor, **7 of 33 titles run four or more lines**, four of them five, worst
  card 385px. A fifth of the corpus. The bound cannot fix this — no title
  length that admits the real headlines would — so it is a TYPE decision.
- **⚠ `.callout` is doing two jobs.** Of 24 plain callouts, **20 are genuine
  pull-quotes and 4 are "Related:" pointers**, rendering identically in EB
  Garamond italic. A link set as a quotation. Split ruled; treatment proposed
  separately.
- **Lowercase is a description problem, not a title problem.** Bebas renders
  every title in caps, so title casing is invisible on both surfaces. The only
  place it showed was the description: 7 of 33 lowercase in a column where 26
  were not, not tracking category. Normalised to sentence case — properly, not
  by capitalising the first letter, which would have left "anthropic" and
  "claude" lowercase mid-sentence and been worse.

### Still open, deliberately

~~The mobile clamp floor (rendered at 34/30/28/26 for a judgment call), the
callout split treatment~~ — **BOTH CLOSED 2026-08-15, see the entry below.**
Still open: whether the ported titles stay lowercase if the face ever changes
from Bebas.

---

## QUEUED — the positioning copy sweep (founder ruling 2026-08-15)

Strategic ruling lives in `core/playbook/STATE.md` → "FOUNDER RULING — `.org`
positioning". **Not started. Nothing on any surface has changed.** The
operational half, measured here at `26d4b71` so the next session does not
re-derive it:

The new line is **"Preparing the Coachella Valley for the AI economy."** with
the sub *"AI training and in-person events across the valley since 2025."*

⚠ **`.org` is currently running TWO taglines, and the sweep converges them.**

- **A — "Building the Coachella Valley's AI Startup Ecosystem"**: 5 source
  files, 5 built surfaces. `src/pages/index.astro` (×6),
  `src/pages/events.astro` (×3), `public/partner.html` (×2),
  `public/philanthropy.html` (×2), `public/pledge.html` (×2). **Replaced.**
- **B — "Preparing the Coachella Valley for the future of work in the age of
  AI."**: only 2 source files — `public/404.html` (×1) and
  `src/layouts/NewsLayout.astro` (×1) — but **36 of the 41 built pages**, since
  every `/news/*` and `/author/*` page inherits it from that one layout.
  **Tightened, not replaced** — it is already most of the way there.

No surface carries both. **Seven source files.** Scoping this as "change the
hero tagline" touches five and leaves thirty-six pages saying something else.

⚠ `src/data/static-meta.json` also contains A. It is **GENERATED** by
`scripts/prepare-feeds.mjs` from the static pages' own `<meta>` — it corrects
itself on the next build. Do not hand-edit it.

⚠ **Two of A's occurrences are split across tags** and do not grep as one
string. Count on rendered output with tags joined — the trap already recorded
in the 2026-08-13 homepage entry. Also in scope and NOT yet enumerated: meta
descriptions, OG/Twitter tags and the Organization/WebSite JSON-LD, which
carry the positioning independently of the visible footer.

Also open, and it rides with this pass rather than ahead of it: the 20-file
markdown `Related:` footer row on `/news` (see the 2026-08-15 entry below).

---

## Callout split + clamp floor — and a harness that lied — 2026-08-15

The two items the review left open. Both shipped; the drafts did NOT flip.

### ⚠ THE FINDING IS THE MEASUREMENT, NOT THE FLOOR

A standalone harness had been built to render titles at candidate floors. It
was wrong at every floor, always in the same direction — **it under-counts.**
Re-measured on the real index (local build, draft filter off, then reverted),
33 titles, 375px, a **285px** title text box:

| floor | 4+ lines | at 5 lines | worst card | median card |
|---|---|---|---|---|
| 34px (was) | **7** | 4 | 385px | 321px |
| 32px | 7 | 2 | 376px | 315px |
| 30px | 6 | **0** | 338px | 309px |
| **28px (shipped)** | **4** | 0 | **330px** | 277px |
| 26px | 3 | 0 | 323px | 273px |
| 24px | 1 | 0 | 315px | 269px |

The harness predicted 34px → 5 titles and a 278px worst card; the real index
gives 7 and 385px. It predicted 28px → 1 title and 255px; the real index gives
4 and 330px. It predicted 26px → zero; the real index gives 3. **No floor in
the judged range reaches zero.**

The cause is a box, not a bug in anyone's counting. The harness measured into
a **333px** box — the card's content width. The title is not that wide: at
≤640px `.news-item__title` carries `padding: 0 var(--s-3)`, so the text sets in
**285px**. 48px narrower, every title, every floor. A harness that models the
container but not the padding will always read short, and it will look right
while doing it.

Confidence check before believing any of this: the same method re-measured the
OLD floor and returned 7 of 33, four at five lines, worst card 385px — matching
the 2026-08-14 live measurement exactly, digit for digit. The method agrees
with the reference where the reference exists.

**28px kept, on a different argument than the harness gave.** Not "1 title at
4+ lines" — that was never true. It is where the FIVE-line tier is already gone
(30px does that) and where the median card falls hardest (309 → 277, the
biggest single step in the ladder). Below 28px the curve flattens: 26px buys
one title and 4px of median for a visible loss of display weight. 28px is the
knee. ⚠ **Four titles still set four lines.** That is a known, accepted state,
not an oversight — the corpus runs to 97 characters and no floor that keeps
Bebas legible removes them.

### The clamp is NOT a token edit — read this before "fixing" it

`--fs-headline` in chrome.css stays `clamp(34px, 4.4vw, 56px)`.
`.news-item__title` restates the ramp in news.css with a 28px floor.

`--fs-headline` has TWO consumers and only the index was measured.
`.article__title` sets on a 720px reading measure, not a 285px card. Moving the
token would have resized the article on the strength of an index measurement —
the exact move this file keeps catching. Paired comments sit at both ends. Only
the floor differs, so only viewports under ~772px change at all; above that
4.4vw already exceeds both floors and the two ramps are identical.

### The split — 42 = 20 + 4 + 18

`.callout--related` added as a sibling of `--briefs`, not of the quote: both
are pointers, briefs at a set, related at one thing. Same family, smaller voice
(`--s-3` vertical against briefs' `--s-4`).

⚠ **The count moved again, and this is the third time.** PORT_DAY said 42
pull-quotes. 2026-08-14 corrected it to 24. Both were counts of a CLASS, not of
a thing: 4 of those 24 were "Related:" pointers set in EB Garamond italic — a
link rendered as a quotation. **20 pull-quotes.** Re-derived from disk this
pass, not carried.

**The kicker is generated, and that is a deliberate divergence from briefs.**
Briefs styles a real `<strong>` in the markup. Related cannot: the ruling
stripped "Related:" out of the prose in all four blocks, because a label above
plus the words in the sentence reads twice. Nothing is left to hang a rule on,
so `::before { content: 'Related' }` carries it. **Consequence: those four
blocks are identified ONLY by their class.** Drop `callout--related` from one
and it silently reverts to a pull-quote with its opening words missing. No
colon, where briefs has one — briefs' label leads into a list and earns it; a
standalone word at 0.2em tracking pushes the colon off the D.

⚠ **12 of the 20 pull-quotes also open with `<strong>…:</strong>`** ("The
uncomfortable truth:", "Note:", "The two failure modes:"). The split therefore
cannot key on `<strong>`, and no bare `.callout strong` rule may be written in
news.css — it would restyle those twelve.

### Flagged, NOT touched — the other "Related:"

**20 files carry a second, unrelated `Related:`** — a plain-markdown link row
in the article footer, after the `---`, alongside Source and Analysis. It is
not a callout and was outside the ruling. All four related-callout articles now
show the word twice per PAGE (kicker + footer row), which was equally true
before this change. The two read as different objects — a bordered card versus
an inline prose row — so it does not land as a repetition. Recorded because it
is a 20-file editorial decision, not a four-file one, and it should be made
deliberately if it is made.

### Verified

Build clean, `@graph` 7, 32/32 still `draft: true`, zero draft slugs in
sitemap / llms.txt / rss.xml / news.html. Three treatments confirmed BY EYE on
`player-coach-coachella-valley` in one frame. chrome.css carries a comment-only
edit and the bundler strips comments — the served CSS is byte-unchanged by it.
`src/pages/news/index.astro` is absent from the diff; the draft filter was
reverted before commit.

⚠ **Local build with the filter off is the only way to measure this surface**,
and it must be reverted in the same session. Production `/news` renders exactly
ONE entry (`placeholder.mdx`) — a post-deploy check there can confirm the floor
computes at 28px and nothing more.

---

## Homepage claim sweep — a correction to a correction — 2026-08-13

`9eb3f9b`. The stats band is gone; the workshop count derives; the participant
and partner claims are deleted.

### ⚠ THE CHAIN — read this rather than the outcome

Three passes at one claim. **Dates verified against `git log`, not carried
forward** — two of the three in circulation were wrong, including one this file
was already publishing:

| When | Commit | What it did — and what it left |
|---|---|---|
| **2026-07-23** | `ddeab7f` | Reworded `"in 2025"` → `"since 2025"`. Tense fixed. **Both figures still unsourced.** |
| **2026-08-11** | `4d75ebc` | Corrected the **JSON-LD copy only** — one line, `#service-workshops`. |
| **2026-08-13** | `9eb3f9b` | Found the **visible** copies. Band deleted, count derived. |

⚠ **The date error has the SAME SHAPE as the claim error, and it is the third
instance.** The 2026-07-23 date-correction entry above already caught that this
pass was mislabeled "2026-07-21" — and re-dated the **heading** only. The
cleanup-cycle item kept 07-21, so the wrong date survived there, and the session
writing the 2026-08-11 entry below copied it forward. A correction scoped to one
occurrence of a value that lives in several is the defect this whole chain is
about, and it happened to a **date** while we were busy fixing it happening to a
**number**. Both corrected 2026-08-13; both re-derived from `git log`.

**Why pass two was incomplete: the ruling named a NODE when the defect was a
CLAIM living in four places.** `#service-workshops` was fixed and
`llmsPreamble` was fixed, which felt like completion. The stats band and the
founder prose — both visible, both on the same page — were never in scope,
because the scope had been written as a node rather than as a claim. For a
day and a half the homepage told a human **"30+ workshops"** and a machine
**"42 sessions"** in the same document, while `/events` said 42.

### ⚠ §7.7 COROLLARY — a number split by markup does not grep as a number

This is a REPRESENTATION failure, not a scope failure, and it is the reason the
visible copies survived a sweep that was actively looking for them. The band
rendered:

```html
<div class="stats__n">30<em>+</em></div>
<div class="stats__l">AI workshops<br>hosted since 2025</div>
```

Three natural search shapes, three misses — all measured, not supposed:

| Search | Result |
|---|---|
| literal `"30+"` | **1 hit in the entire repo** — a code comment. Not the claim. |
| line-scoped regex (number near label) | number and label are **4 lines apart** |
| strip tags to **spaces** | renders `"30 +"` — slips a third time |

**The only reliable test JOINS tags in the rendered output**
(`re.sub(r'<[^>]+>', '', html)`), turning `30<em>+</em>` into `30+`. Verify
claims against what the page RENDERS, not against what the source says. Applies
to any number a designer has styled — a superscript `+`, a `<sup>`, a unit in
its own span.

### What came out, and on what evidence

- **"300+ Students in attendance"** — unsourced, same class as "sold out".
  Deleted, **not replaced with a smaller number.**
- **"12+ Community & school partners"** — no source anywhere on disk. This
  page's own Partners section names **six** (CSUSB, UCR Palm Desert, DCF, City
  of Palm Desert, Palm Desert Chamber, Rancho Mirage Chamber); `llmsPreamble`
  names five; the canonical Partnership list in this file names six. **Nothing
  names twelve**, and no file distinguishes a "school partner" from a workshop
  venue.
- **"9 Cities across the Valley"** — true as MISSION SCOPE, false as delivery.
  Under an "On the ground… Since 2025" header, between workshops-hosted and
  students-in-attendance, it read as delivery. **All 42 sessions were at ONE
  venue in Palm Desert.** The seven mission-scope uses of "nine cities"
  elsewhere on the site are correctly framed and STAY.
- **The band itself.** One number in a four-cell frame is a design saying
  nothing. The count moved to the founder prose, derived from `events.json`,
  linking to `/events`. **No `+` suffix** — the file holds exactly 42, so "42+"
  would be false.

**KEPT: the `Home base:` affiliation line.** A fact, not a claim, and the only
VISIBLE copy of the street address on the page — the other two are inside
JSON-LD. Its container was slimmed; that padding framed a four-cell grid. Seven
now-dead CSS rules removed with the markup.

### Where the count lives now

| Surface | Mechanism |
|---|---|
| founder prose (homepage) | **derived** — ordinary Astro markup interpolates |
| `llms.txt` | **derived** — `site-pages.ts` is a real module |
| `#service-workshops` JSON-LD | **guarded constant** — `is:inline` cannot interpolate |
| `/events` | **derived** |

### Verification, and one thing NOT claimed

Verified against **rendered output with tags joined**: `30+`, `300+` and `12+`
all absent from `dist/index.html`; homepage, `/events` and the JSON-LD all state
42; the seven mission-scope "nine cities" survive; the address survives.

⚠ **No screenshot.** The browser pane began returning blank frames after a
scroll timeout and did not recover across a reload. The band was verified
structurally and geometrically instead — `.stats` renders 100px tall,
background `rgb(8,28,21)`, 40px padding, `innerText` exactly the address line.
That is good evidence it is not broken; **it is not visual confirmation and was
not recorded as such.**

### ⚠ NEW HAZARD — local config drift between parallel sessions

`~/AICV/.claude/launch.json` is NOT in any git repo, so nothing detects a
concurrent session changing it. On 2026-08-12 at 13:01 another session reduced
it from six configurations to one, removing `org-dist` — the only way to serve
`core/org/dist` for visual verification. Today's restore was **additive**: the
other session's entry was left untouched.

Check `launch.json` before assuming a preview target exists, and add rather than
replace. This belongs in House Rules too; it was not written there because the
playbook has had other sessions in it.

---

## /events — the record: 42 sessions, six series, Event JSON-LD — 2026-08-11

Two commits: `4d75ebc` (the record) and `94c5f13` (third title normalisation).
Both live, verified with a 10×4 URL matrix and two content-asserted sweeps.

**`/events` contained ZERO events.** Its body was a hero and a single Luma
iframe, and iframe content is not in the HTML — so no crawler, no LLM and no
citation had ever seen an AICV event. Two years of work were invisible to agents
on a site whose whole thesis is agent-readability. This was **not a migration**;
it created a record that had never existed.

Proof, both directions, from the same tool: before the pass, `WebFetch` on the
Luma embed returned literally the word "Luma" and nothing else. After it, the
same fetch on `/events` reads back all six series with correct counts, dated
events, venue and range.

### ⚠ `src/data/events.json` IS THE ONLY COPY OF 28 EVENTS

**Luma exposes no export and no API on `cal-123s6rDFxeKQjJd`.** The API exists
(`GET /v1/calendars/events/list`, `x-luma-api-key`; `before`/`after` take
unrestricted ISO datetimes, so past events *are* retrievable) but requires **Luma
Plus**, which this calendar does not have. Verified against
`public-api.luma.com/openapi.json`, not against docs prose.

**Luma's own public past view lists 14 of the 42.** Verified in a real browser at
a real viewport, scrolled to a stable bottom across five rounds — an earlier read
returned 14 with a 0-height viewport, so the number was re-taken once the viewport
was real. The other **28 — all AI Super Users, all AI Weekly, six early Launchpad,
and the 2026-04-25 AI Agent Meetup — appear on no public surface anywhere.**

**A future session that "syncs from Luma" or regenerates this file from the
calendar destroys 28 events that cannot be recovered from any source.** Treat the
file as canon, never as a cache. Append only.

The file was assembled BY HAND. No re-export was possible, so `id` and `start_at`
are **OPTIONAL and absent from all 42** — backfilling them means revisiting 42
Luma pages by hand. A new row carrying them needs no migration. Consequences
recorded rather than solved: no stable per-event ID, no start times (`startDate`
is date-only), no registration URLs on past events.

### What the record disproved

The JSON-LD claimed **"a monthly hands-on AI workshop series."** Six of the
sixteen months in span have no events at all — none Sep 2025, none Jan–Mar 2026,
none May–Jun 2026. "Monthly" is true of exactly one series (Idea Labs, launched
2026-07-18) and now appears **exactly once on the page**, inside that series'
synopsis where it is sourced. The six `EventSeries` nodes carry **no description
at all** rather than restate a cadence the record contradicts.

Also removed: **"a sold-out hands-on session"** — the only attendance claim in 42
rows, not sourceable retrospectively, and precisely the sentence any future
automation would be gated to refuse.

Two claims elsewhere collided with the record and were corrected in the same pass:
`llms.txt` said the workshops **"launched July 2026, running monthly through
December 2026"** (contradicting a record that starts April 2025, and a
forward-dated claim that expires), while the same file claimed **"30+ workshops,
300+ participants since 2025."** The participant figure is gone entirely —
unsourced, same class as "sold out". The count is now **sessions**, not workshops,
because **no field distinguishes a workshop from a meetup** and inventing a
taxonomy to justify an unsourced number is the trap. (By plain meaning only ~20 of
the 42 are workshops; "30+" either undercounted sessions or overcounted workshops.)
This supersedes item 2 of *Next .org Cleanup Cycle*, which had been "resolved" in
`ddeab7f` by reframing the same unsourced figures rather than sourcing them.

### Structured data — 49 nodes on /events, homepage untouched

One `Place` referenced by `@id` from all 42 events (never repeated), six
`EventSeries`, 42 `Event` with `superEvent` references, `eventStatus:
EventScheduled`, date-only `startDate`, no `endDate` invented. **The homepage
`@graph` is still exactly 7 and is now asserted on every build.**

Series order is **first-event-date descending**, ruled after recon found AI Weekly
(Wednesdays) and Launchpad (Saturdays) ran **concurrently** through summer 2025 —
which makes "most recent first" ambiguous between them and scrambles the
maturation arc. First-date ordering reverses cleanly into it.

### Conversion — and why NOT NewsLayout

`public/events.html` became `src/pages/events.astro`; **git tracked it as a rename
(74% similarity)**. Head, nav, drawer, footer and the whole 15KB `<style>` block
carry over verbatim — everything outside the three intended changes is
byte-identical once the inter-tag whitespace Astro collapses is normalised.

⚠ **JSON-LD uses `set:html`, not `is:inline`.** `index.astro` proved Astro will not
interpolate inside `is:inline`, which is why the identity guard exists at all.
`<style>` stays `is:inline` for the opposite reason — `is:global` externalises it
to `/_astro/*.css`.

⚠ **NewsLayout was deliberately NOT adopted.** Its footer says "Preparing the
Coachella Valley for the future of work…" and links the SunshineFM newsletter,
where this page says "Building the Coachella Valley's AI Startup Ecosystem." and
links News RSS. Adopting it would have silently rewritten three pieces of footer
copy. **Consequence for every future chrome check: nav and drawer assert
cross-file canonical equality; the FOOTER asserts per-file against its own
before-state.** A cross-file footer assertion fails on a correct edit.

### ⚠ LATENT DEFECT FIXED — `path:`/`file:` must stay on adjacent lines

`scripts/prepare-feeds.mjs` pairs `path:` and `file:` with a regex requiring
adjacent lines. A comment written between them made one manifest entry **invisible
to the pairing regex: the page stayed live while dropping out of `sitemap.xml` and
`llms.txt` entirely.** The build got as far as rendering `llms.txt` before failing,
and the only clue was `metadata verified for 5` where 6 was right.

The pair count is now **anchored to the `path:` count**, so a partial regex failure
fails by name instead of silently publishing less than the manifest declares.
`feedFiles.length === 0` only ever caught *total* failure. This trap predates the
pass and is the same class as House Rules §7.7 — scope the count to the thing you
are checking.

### Gates added

**Round-trip idempotence** (`JSON.stringify(parse(x), null, 2) + '\n' === x`) is
what makes the file safely appendable: the next added event diffs as one row
instead of reformatting all 42. **YAML was rejected for exactly this reason** — its
folded scalars cannot survive a round-trip, and a writer would have rewritten every
synopsis on the first append.

Also gated: required/optional fields, ISO dates, `(date,title)` uniqueness, `@id`
collision on same-day events (date-uniqueness is a property of this sample, **not**
a guarantee), series slug collisions, blocked fullness claims, at most one series
claiming "monthly", and **no digits in any synopsis** — all 42 verified digit-free,
so it costs nothing today and constrains anything that writes here later.

⚠ **INTERIM:** `index.astro`'s "42 sessions" is a **written constant guarded by a
build assertion**, not a derived value, because its JSON-LD is `is:inline`. The
`@graph`-templating session retires this guard alongside the identity guard beside
it. `llms.txt` derives its count properly — `site-pages.ts` is a real module.

### Titles — three normalisations, each ruled rather than inherited

Luma's real titles carry emoji (🌟, 🚀); these do not. Five ALL-CAPS rows were
title-cased. The `(AICV)` suffix was dropped from AI Super Users — on AICV's own
site it added nothing, and dropping it makes `title == series` so the **derived**
suppression rule handles them with no new conditional. **A title renders only where
it differs from its series name: 24 of 42 shown.** Launchpad, Idea Labs and AI
Super Users suppress entirely.

### Verification

Matrix 10 URLs × 4 fetches, zero unstable. Two content-asserted sweeps 45s apart,
24 assertions each, both clean: `/events` **200 direct** and `/events/` 308 (the
inverted-slash convention holds), 42 rows, 6 groups, 49 nodes with every `location`
and `superEvent` reference resolving, CSS still inline, `is-active` intact, footer
unchanged, homepage `@graph` 7.

⚠ **Two of the session's own assertions over-reached** — the venue check counted
the pre-existing hero line as a violation, and the byte-identity check flagged
whitespace Astro legitimately collapses. Both were checker faults, not code faults.
§7.7 in the wild, twice in one session.

### Recon findings not acted on

- **AI Tinkerers stays out of the record** — different platform, first demo night
  2026-10-28. The 2026-04-25 AI Agent Meetup is on neither the Luma calendar nor
  the Tinkerers surface, and stays in as an AICV event.
- **The 2026-08-22 event did not exist on the calendar.** Resolved out of band:
  moved to 2026-09-26 ("Saturday Morning AI: En Español", $25), which is the
  calendar's only upcoming entry.
- **The watcher is deprioritised.** With no Luma API, automation would mean
  scraping a JS-rendered calendar that shows 14 of 42. Revisit after this ships;
  the honest version may be a reminder rather than an agent. If the API ever opens:
  `description` is **not** in `list-events` — it needs a second call to `GET
  /v1/events/get?event_id=evt-…`, which also returns `guest_counts`, the attendance
  data that must never reach the page.

---

## Person node — identity claims, and the guard rewrite — 2026-08-11

Two commits: `73f4db6` (claims + guard extension) and `7f3e761` (description +
derived guard). Both live, both verified with the full matrix and two
content-asserted sweeps.

### What the identity arc actually settled

**Four unsupportable claims came down.** September 2023 (nothing published then —
no domain, no URL, no dated artifact); King.com *employment* (the source says the
studio was acqui-hired, not that he worked there, so `alumniOf` stayed out);
"office hours" (no surface anywhere); "spent the past decade" (unsourced, and in
FOUR places not the three predicted).

**Three went up, each with a third-party source.** April 2025 as an ACTIVITY date
(ERC series, Luma, contemporaneous); the TEDx talk (official TEDx channel,
uploaded 2025-09-04); co-organizer (the AI Tinkerers chapter's own public root,
"Organizers: Craig & Sat" — first-name-only, a weak citation in isolation and not
in isolation).

**One published affiliation overstatement corrected.** See the ERC item below.

### ⚠ THE GUARD IS DERIVED, NOT HARDCODED — the real output of this session

Recorded in full as House Rules §7.6. The short form: the assertion keeping
`index.astro`'s hand-written JSON-LD in step with `people.json` used to enumerate
five field names by hand. **Two subset bugs surfaced on consecutive days in
opposite directions** — the ProfilePage emitting a subset, then `image` missing
from `index.astro` — and neither was caught by the guard whose job it was.

The assertion now derives its field list from `people.json` itself. Add a field
there and it is guarded on the next build. **Control D is the proof: a brand-new
field fails the build until `index.astro` matches.** Controls were re-run after
the rewrite, because controls validate an implementation, not an intention.

### ⚠ LIVE DEFECT — the ERC name, 10 instances on the homepage right now

`.org` calls the venue the "CSUSB Entrepreneurship Resource Center". Per the
operator's own site it is the **"Entrepreneurial Resource Center / ERC Palm
Desert"** — Entrepreneur*ial* — at 37023 Cook Street Suite 102, "powered by The
City of Palm Desert and the County of Riverside" and "led by CSUSB's Randall W.
Lewis Center for Entrepreneurship". It is **across the street from the campus,
not part of it.**

Commit 2 corrected the Person description only. **10 instances remain live on the
homepage** in body copy and FAQ answers, several of them *funding* claims
("Funded by the CSUSB Entrepreneurship Resource Center"). This is an affiliation
overstatement on a fiscally sponsored project's public surface — a correctness
defect, not a naming inconsistency. `.com` uses the correct form; `.org` drifted.
"Randall W. Lewis Center for Entrepreneurship" is a real but DIFFERENT entity and
is never a synonym.

### Dating evidence, for the record

- Earliest self-published artifact: **2026-04-05** asserted (committed 04-09);
  earliest `.com` content commit 2026-04-06. **127 of 174 briefs are
  retrospective** — frontmatter dates are EVENT dates, not publication dates.
- Earliest documented work: **2025-04-01**, the ERC series, externally corroborated.
- Earliest third-party publication: **2025-09-04**, the TEDx upload.
- **Wayback: ZERO snapshots of sunshine.fm in 2024.** Earliest modern 200 is
  **2025-02-21**, an operating site. The **2001–2009 snapshots are a PRIOR OWNER
  of the domain and must never be cited** as evidence of this work.

### Queue

- **ERC correction pass** across `.com` and `.org` — 8 variants, 10 live
  instances on the `.org` homepage. Correction priority, not cosmetic.
- **Guard the mirrored FAQ pair** — JSON-LD `"text"` ↔ rendered `<p class="faq-a">`
  are kept in step by hand today.
- **PSAI Expo organizing role** — sourced by the TEDx description, on disk nowhere.
- `OPERATING_INSTRUCTIONS.md:103` on the SunshineFM side still asserts September
  2023. April 2025 is the defensible replacement.
- **Never pipe `npm run build` to head/tail** — SIGPIPE kills it *after* Astro
  has emptied `dist`.

---

## Author page + byline resolution — 2026-08-10

Built BEFORE the SunshineFM port so 32 incoming pieces get a byline that lands somewhere, rather
than being reprocessed later.

### The defect this fixed

Five Person nodes for one human across `.org` and `.com`. The only `@id` that existed
(`#sat-singh`) was **referenced by nothing** — it appeared exactly once, its own definition.
Article bylines emitted an anonymous `{"@type":"Person","name":"Sat Singh"}` with no `@id`, so to a
machine **the article's author and the site's founder were two unrelated people who shared a name**.
The byline was plain text and linked nowhere.

### The architecture

`src/data/people.json` is the single definition. Everything else REFERENCES it:

| where | emits |
|---|---|
| `/author/sat-singh` | **full** Person, as `ProfilePage.mainEntity` — the canonical definition |
| `news/[slug].astro` | bare `{ "@id": "…#sat-singh" }` — a reference, not a copy |
| `index.astro` founder | kept nested in `@graph[0]`, **gained `url`** |

**ProfilePage, not AboutPage:** AboutPage describes the organisation behind a site (that is what a
future `/about` would be); ProfilePage is the type for a person profile and the one search engines
document for author pages. Verified live: all three `@id`s are identical, `@graph` still 7 nodes.

**⚠ The data is in people.JSON, not people.ts, on purpose.** `prepare-feeds.mjs` must read these
values and runs before vite, so it cannot import TypeScript. The first version regex-parsed
`people.ts` and **broke immediately on template literals** — the fragile literal-parsing trap this
engagement has hit before. JSON is parsed by both sides with no regex.

### sameAs — a category error, corrected

`x.com/CoachellaAI` was asserted as the **Organization's** `sameAs`. It is Sat's persona account —
his avatar, first-person voice; it doubles as AICV coverage but the organization does not post. So
it moved to the **Person**. Ruling and reasoning are Sat's (2026-08-10).

Within `.org` there were 8 occurrences: **7 ordinary footer links** (`@CoachellaAI ↗`, untouched)
and **exactly 1 structured-data claim**. Organization keeps `sameAs: ["https://aicoachellavalley.com"]`
— not empty, and a true claim. The connection is not lost: `Organization.founder` points at the
Person's `@id`, so an agent following that chain still reaches the account. **The relationship is
expressed rather than collapsed.**

`description` was also aligned to the 2026-08-09 rendered bio — the machine-readable half had been
a version behind, the same defect class as the llms.txt "valley intelligence graph" line.

### ⚠⚠ THE COVERAGE GATE NOW SWEEPS src/pages/** — and this was the point

The old gate swept `public/*.html` only, on the reasoning that "an Astro page cannot silently fail
to be noticed, because it is a route." **That was wrong in the way that matters.** A route is
noticed by visitors, but it can silently miss `sitemap.xml` and `llms.txt`, because both build from
the manifest. `/author/sat-singh` would have been the first casualty of exactly that bug.

Every routable file — `public/*.html`, `src/pages/**/*.astro`, `src/pages/**/*.ts` — must now be
declared in `pages` or `excluded`. The three feed endpoints are `excluded` with the reason "IS a
feed; listing feeds inside feeds is circular", and `news/[slug].astro` as "dynamic; articles enter
from the collection".

**`/news` moved into the manifest**, ending its special-case inside `sitemap.xml.ts` and
`llms.txt.ts`. One accepted behaviour change: it now always appears in the sitemap rather than only
when articles exist.

**Both gates were proven capable of failing, four controls:**

| control | result |
|---|---|
| undeclared `.astro` at top level | exit **1**, names the file; exit **0** once removed |
| undeclared `.astro` nested in subdirectories | exit **1**, names the full path |
| drift `people.json` `jobTitle` | exit **1**, prints both values |
| drift `people.json` `sameAs` | exit **1**, prints both arrays |

### `author` is now a KEY, not a free string

`z.enum(PEOPLE_KEYS)` instead of `z.string()`. Frontmatter is `author: 'sat-singh'`, which resolves
to name, `@id` and page URL. A typo now fails the build instead of silently minting a second author
with no page and no `@id`. **Migrated at 1 article; after the port it would have been 32.**

### Two bugs caught in verification

1. **`.h2` had no rule in the news-layout CSS.** `chrome.css` was extracted from `404.html`, which
   has no `<h2>`, so the author page's "Writing" heading would have fallen back to browser default
   sizing with no colour. Added, copied from the canonical `.h2` in index.astro. Blast radius
   checked: `/news` and articles use zero `class="h2"`, so nothing else moved.
2. **The byline href was absolute.** `person().url` is the absolute form JSON-LD needs; using it in
   the markup would have sent local-preview clicks to production. Byline uses `/author/${slug}`.

Also fixed as briefed: `NewsLayout` hardcoded `is-active` on News, which would have shipped the
author page with News highlighted as the current page. It is now a `navActive` prop.

### Differential

Five static pages in `public/`: **byte-identical, 5/5**, and `public == dist` for each — this build
touched only Astro routes. `/pledge`'s print sheet is therefore untouched by construction.
`index.html` **with the JSON-LD block stripped is byte-identical** (same sha256), so the homepage's
rendering cannot have changed; the only diff is the 4 intended structured-data edits. The article
page changed in exactly 2 places: the byline link and the CSS bundle hash.

### ⚠ STANDING LESSON — differentials verify CHANGE, not CORRECTNESS

**A new page has no before-state, so the differential has nothing to compare it against. New
surfaces need a visual check.**

The `.h2` bug is the case in point. The differential across the five static pages and the homepage
was flawless — byte-identical, zero unexplained diffs — and it was *structurally incapable* of
noticing that the brand-new author page rendered its "Writing" heading at browser-default size.
Only opening the page in a browser caught it.

Applies to every future surface: the differential proves nothing moved that shouldn't have; it
proves nothing at all about whether the new thing is right.

### KNOWN GAP — /author 404s, there is no index route

`/author/sat-singh` exists; **`/author` itself returns 404** because no `src/pages/author/index.astro`
was created. That is fine while there is exactly one author.

**It becomes a real gap the moment there is a second** — which the InformedIE grant work could
produce. At that point `/author` should list contributors, `people.json` gains entries (the
`z.enum` already scales — new keys are picked up automatically), and each new person needs a page
declared in the manifest or the coverage gate will fail the build, by design.

### Follow-on, recorded

**`.com` carries 3 Person nodes with no `@id` at all** (`index.astro:114`, `:239`,
`get-agent-ready.astro:284`) and asserts `x.com/CoachellaAI` as the ORGANIZATION's `sameAs` in the
same places — the identical category error. Unifying on `#sat-singh` is a cross-repo change with
its own deploy and verification.

**Endgame:** converting index.astro's `@graph` to a templated object would remove the need for the
drift assertion entirely. It is a large diff on the site's most important page and belongs in its
own session.

---

## PHASE 2 — News nav propagation + homepage articles — 2026-08-09

**This phase deliberately ENDED the byte-identity of the six static pages.** That was Phase 1's
proof. From here the proof is the differential.

### What changed

- **18 nav blocks** — News added to nav, mobile drawer and footer Navigate on all six pages.
  Order: Philanthropy · Build · **Events · News** · The Pledge · About · Intelligence Network ↗.
  News sits after Events because both are the site's only time-based surfaces.
- **Homepage articles section** — three most recent, after the `.stats` band and before Partners.
  Placed there, not after `#programs`, because the stats band ("30+ AI workshops hosted since
  2025") is *evidence for* the programs; inserting between them split a tight pair.
- **`public/index.html` → `src/pages/index.astro`.** See the asymmetry note below.
- **Footer Beehiiv link → `/news/rss.xml`** ("News RSS ↗") on all six pages.
- **Founder bio** replaced with Sat's final copy (InformedIE / AICV News / SunshineFM).

### ⚠ THE HOMEPAGE IS AN ASTRO PAGE. THE OTHER FIVE ARE NOT. THIS IS DELIBERATE.

Only the homepage needs the news collection, and a static file in `public/` cannot read it at
build time. **Do not "fix" the asymmetry by converting the other five** — that is a separate
decision with its own verification, and they have no reason to know about the collection.

Rejected alternatives, with reasons, so this is not relitigated:
- *prebuild script rewriting `public/index.html`* — mutates a tracked source file on every build;
  "the file you edit is the file that ships" becomes "the file you edit gets rewritten".
- *inject into `dist/` post-build* — the deployed homepage stops being the file you edit.
- *client-side fetch* — invisible to agents. The D3 graph was removed in `2e3dce8` for exactly
  this reason; repeating it would be a regression of the site's purpose.
- *hand-write the cards* — guaranteed drift, the class of bug the feed gate exists to stop.

### ⚠⚠ `src/pages/index.astro` — THE STYLE BLOCK MUST KEEP `is:inline`

Two failure modes, **both observed, not theorised**:

| directive | what actually happens |
|---|---|
| `<style>` (plain) | Astro **SCOPES** it. Every rule stops matching the hand-written markup; the page renders unstyled. |
| `<style is:global>` | Not scoped — but Astro **EXTRACTS** the CSS to `/_astro/*.css`. Verified: the page shipped with **0 bytes inline** and a render-blocking `<link>`, while the other five carry 15–24KB inline. An extra round trip before first paint, on the landing page. |
| `<style is:inline>` | **Correct.** Opts out of all Astro processing. Verified: source and output style blocks are byte-identical (33,960 B, same sha256). |

The JSON-LD `<script>` likewise carries `is:inline` so the 7-node `@graph` is emitted verbatim.

### Differential — the proof that replaced byte-identity

Positive control FIRST: two identical captures diffed to **0/0/0** (deterministic), and one
injected nav `<li>` produced 2 added / 13 changed, **all localised to NAV** (sensitive). Only then
was the real differential run.

Six pages × {1280, 375, drawer-open} = 18 comparisons. The pre-change state was reconstructed from
`8cbc9b5` rather than trusted from memory.

**Result: ZERO non-size changes on every page in every state.** No colour, font, spacing, display
or border moved anywhere. Every diff is `width`/`height` reflow attributable to: the News nav item
(+60px nav width), the footer News item (+35.5px footer height), the news section (+587px), or the
longer founder bio (+26.25px on `#founder`).

### Three harness artifacts — none were site bugs

Recorded because each first appeared as a page-wide regression:

1. **Scrollbar presence.** The iframe was 3000px tall; pages taller than that got a scrollbar and
   a **1265px** viewport, pages shorter got **1280px**. That 15px moved every centred element and
   read as "the whole page shifted". Fixed by sizing the iframe to 15000px so nothing ever
   scrolls. **Check `BODY` width before believing a page-wide diff.**
2. **Positional-path renumbering.** Inserting a `<section>` renumbers every later sibling
   (`SECTION[7]`→`SECTION[8]`), so a path-keyed diff reported 128 added / 111 removed for one
   inserted section. Diff by **content identity** (`tag|id|class|text`), not by path, and exclude
   the inserted subtree so bucket pairing stays aligned.
3. **Turnstile widget IDs.** `/partner` carries `<input id="cf-chl-widget-XXXXX_response">` with a
   **random ID per page load**. This is the FIFTH nondeterminism source in this engagement, after
   lazy images, animations, webfonts and the Cloudflare email re-keying.

### `sameAs` — reported, unchanged, and one item pending

Before any edit, the JSON-LD carried exactly two `sameAs` arrays:
- **Organization** `#organization` — `aicoachellavalley.com`, `x.com/CoachellaAI`
- **Person** `#sat-singh` — `https://sunshine.fm/`

**Neither was changed.** InformedIE has no URL yet, so it is plain text in the bio. **When the URL
exists it is a two-line change**: the bio link, and the Person `sameAs` array — the machine-readable
half of the same claim.

### Still true after this phase

`/partner` remains absent from `sitemap.xml` and `llms.txt` (6 sitemap URLs, gate enforced); the
`.md` guard, `/api/partner`, `robots.txt` and the `@graph[7]` are untouched.

---

## Astro hybrid MERGED TO PRODUCTION — 2026-08-09

`astro-hybrid` → `main`, fast-forward `66e8000..5d354d4`, all 26 file moves recorded as renames at
100% similarity. Production build green on the first attempt. **Two consecutive wholly-clean
verification sweeps.**

### Cloudflare dashboard — the settings this now depends on

| setting | value |
|---|---|
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | *(empty)* |
| `NODE_VERSION` | `22` — set on **both** Production and Preview |
| Build system | v3 |

**A future session changing any of these breaks the deploy.** Output directory `dist` in
particular: reverting it to `/` would serve the repo root, where the six pages no longer live.

### Verification actually run

- **Preview first, production untouched throughout.** The branch built a preview at
  `5176a103.aicoachellavalley-org.pages.dev` and was verified there before anything merged.
- **The preview zone does NOT apply Cloudflare email obfuscation; production does.** That is why
  preview verification could use EXACT byte comparison against `public/` with nothing masked —
  `/` served 81718B, exactly the disk size of `index.html`. A strictly stronger test than the
  normalised one. Remember this asymmetry: **preview bytes ≠ production bytes for any page
  containing the contact email**, and that is expected, not a regression.
- **Production matrix, 41 baseline URLs × 8 fetches, normalisation restored: 0 failures.** Every
  pre-existing page's normalised hash matches the pre-migration baseline exactly.
- **Deep multi-fetch: 12 URLs × 15-fetch content-asserted streak, run twice, 0 stale.** Content
  assertions, not consistency alone — a self-consistent stale PoP would pass a hash check and
  fail the assertion.
- **`/api/partner`: 8 non-mutating probes captured PRE-merge and re-run POST-merge — byte
  identical.** See the limit below.

### ⚠ THE ONE THING NOT PROVEN: the D1 binding

`/api/partner` POST cannot be proven end-to-end without writing a row. The `env.DB` check sits at
`partner.js:87`, **after** Turnstile verification at line 82; the next thing past it is the
`INSERT` at line 108. So there is no request that reaches D1 and stops.

What WAS proven, pre- and post-merge identically: `onRequestPost` executes (400 `missing` and
400 `email` come from lines 73–78), the honeypot short-circuit returns 200 storing nothing
(line 67), the key-gated GET fails closed with 401 on absent/empty/wrong key, and the nested
`functions/api/partner.js` still takes precedence over the catch-all `[[path]].js` **with a build
in play**. Routing and handler execution are confirmed; only the D1 round-trip is not.

**The clean way to close it, read-only:** a GET with the real `INQUIRY_KEY` runs `ensureTable` +
`SELECT` (lines 132–135) and proves the binding without writing anything. Sat holds the key.
A test row was deliberately NOT inserted into a live table of real partner inquiries.

### Three harness bugs, none of them site bugs

Recorded because each would have read as a site failure:

1. **The normaliser was incomplete.** Cloudflare re-keys the email obfuscation in **two** places —
   `data-cfemail="…"` *and* `href="/cdn-cgi/l/email-protection#…"`. Stripping only the first left
   8/8 paths with unstable hashes. Both rules are required; with both, 8/8 stable.
2. **`_headers` / `_redirects` 404 by design.** Pages consumes them as build-time configuration
   and never serves them as files. Production 404s them identically — unchanged behaviour. Assert
   their *effects* (X-Frame-Options, Referrer-Policy, nosniff, api-catalog `Link`, CORS,
   content-type overrides, the `/ai-readiness` 301), never their bytes.
3. **A wrong assertion fails 100%, a stale PoP fails intermittently.** An assertion on `/news`
   using `&#39;` failed 75/75 — Astro emits a plain ASCII apostrophe (0x27), verified by hexdump.
   The page was correct the whole time. **Consistency of failure is the tell.**

### Build-safety facts worth keeping

- A **fresh clone + `npm ci` + `npm run build`** was run before pushing, because
  `src/data/static-meta.json` is gitignored and Cloudflare's tree does not contain it. Exit 0, and
  the resulting `dist/` was 26/26 byte-identical to pre-migration disk. Do this before any push
  that touches the build.
- **git-derived `lastmod` is DEAD — tested, twice-failed, do not revisit.** (a) Cloudflare clones
  shallow: a `--depth 1` clone has exactly **1 commit**, so every file reports the same date.
  (b) Even with full history it is wrong after any structural commit — all four pages reported
  `2026-08-08` because the migration renamed them, and `--follow` does not help. Static-page
  `lastmod` stays hand-set in `src/data/site-pages.ts`.

---

## Astro hybrid + /news/ publishing surface — 2026-08-08 (PHASE 1)

**The biggest structural change .org has had.** Purely additive: nothing that was live changed.

### The shape

Six hand-written pages moved to `public/`; Astro builds to `dist/`; `functions/` stays at the repo
root, outside the build. `public/` is source, `dist/` is disposable and gitignored.

**Proof it was non-destructive: all 26 shipping files are byte-identical from disk through
`dist/`** — six pages, both PDFs, nine images, four hero variants, `robots.txt`, `_headers`,
`_redirects`, and both `.well-known` endpoints. Vite copies `public/` with `fs.copyFileSync`, so
"the file you edit is the file that ships" survives as "the file you edit is copied verbatim into
the artifact that ships."

### ⚠ outDir MUST be `dist/`, never the repo root

`astro build` empties `outDir` on every build:

```js
if (settings.config?.vite?.build?.emptyOutDir !== false)
  emptyDir(settings.config.outDir, new Set(".git"));
```

`new Set(".git")` is built from a **string**, so it holds the characters `.`, `g`, `i`, `t` — not
the string `.git`. `has(".git")` is **false**. Re-verified in the installed 6.1.3 AND in 7.2.0 on
2026-08-08; not fixed upstream. outDir at the repo root would delete the six pages, `functions/`,
`_headers`, `_redirects` and **the git repository itself**.

### Versions are PINNED EXACT

`astro 6.1.3`, `@astrojs/mdx 5.0.3`, `@astrojs/rss 4.0.19` — matching `.com` exactly. **`^6.1.3`
resolves to 6.4.8**, which would have put the two repos on different Astro versions, the opposite
of the rule the pin exists to serve. Bump both repos together, deliberately.

### What is generated vs hand-maintained

- **Schema-validated** (build fails on violation): article `title` (10–70), `description`
  (70–160), `date`, `tags` (1–5), `author`, `updated`, `draft`.
- **Derived**: article URLs, `NewsArticle` JSON-LD, sitemap entries, llms.txt lines, RSS items.
  Static-page `title`/`description` are parsed from each page's own `<title>` and meta description,
  so the feeds cannot drift from the pages.
- **Hand-maintained**: static-page `lastmod`, `changefreq`, `priority`, llms.txt prose preamble
  (carried verbatim from `66e8000`), and the include/exclude decision itself.

### `/partner` is deliberately absent from the feeds — and now that is enforced

`/partner.html` is live at 200 but appears **zero** times in the shipped `sitemap.xml` and
`llms.txt`. A glob over `public/*.html` would have silently added it, advertising a parked page.
`src/data/site-pages.ts` records the decision; `scripts/prepare-feeds.mjs` **fails the build** if
any `*.html` in `public/` is in neither `pages` nor `excluded`. Positive control run: the gate
exits 1 on an unaccounted page and 0 once it is removed.

### Three bugs caught in verification, all fixed

1. **`node:fs` inside an Astro route does not work the way it looks.** Astro bundles routes into
   `dist/.prerender/chunks/`, so `import.meta.url` resolves to the *built* location and
   `new URL('../../public/', import.meta.url)` became `dist/public/` — ENOENT, build failed.
   Fixed by moving the read into a prebuild script that writes JSON the routes import — the
   pattern already proven on `.com` (`generate-stats.mjs` → `stats.json`).
2. **RSS emitted URLs that do not exist.** `@astrojs/rss` appends a trailing slash by default, so
   every item linked `/news/placeholder/` while the page is served at `/news/placeholder`. Fixed
   with `trailingSlash: false`; must stay false while `trailingSlash: 'never'`.
3. **Near-white text on near-white.** `.h1` and `.hero__subhead` in the chrome CSS are coloured
   for the **dark** hero (`--c-paper` on `--c-ground`); reused on a paper background they were
   invisible. Replaced with `.page__title` / `.page__lede`. Measured on `--c-paper` #FAFAF7:
   `--c-text` **10.59:1**, `--c-text-l` **6.11:1** — both clear 4.5:1.

### Costs, stated

- **`.org` can now fail to deploy.** It could not before. Pages serves the last good build behind
  a failure and the site looks healthy (playbook CLAUDE.md:402, confirmed 2026-06-03 when four
  commits stalled behind an MDX error). `npm run build` locally before every push.
- **A seventh chrome copy.** Only 38 CSS rules (4,865 B) are common to all six pages after the
  dead-CSS sweep, so there was no shared base to reuse; `src/styles/chrome.css` is lifted from
  `404.html`. Phase 1 makes the duplication worse. Extracting one real stylesheet is the fix and
  it belongs in a later phase, because it would edit all six pages.
- **`/news/` has no inbound human link.** The nav lives inside all six pages; adding "News" would
  edit them and destroy the byte-identity proof. The news pages carry it in their own nav. Phase 2
  propagates it.

### CROSS-REPO ITEM — Astro security advisories, deliberately NOT actioned here

`npm audit` on the pinned 6.1.3 reports **2 high, 1 moderate, 1 low**. All are fixed only by
astro 7.2.0, so **`.com` on 6.1.3 carries identical exposure** — this is a two-repo item, not a
`.org` item.

Assessed exposure for `.org`, which is why it was not actioned:

- 3 × Astro XSS (GHSA-4g3v-8h47-v7g6, GHSA-f48w-9m4c-m7f5, GHSA-7pw4-f3q4-r2p2) — all require
  View Transitions, hydrated islands, or spread attributes. `.org` is `output: 'static'` with
  **zero JS islands** and none of those features. Not reachable.
- esbuild GHSA-g7r4-m6w7-qqqr — dev server only, Windows only. Not reachable.
- sharp / libvips — `sharp` ships with astro but is **unused**: the hero images are hand-optimised
  in `public/` and nothing uses `astro:assets`. Not reachable.

**Ruling 2026-08-08: stay on 6.1.3 through this migration.** Changing Astro versions mid-migration
would mix two variables. The upgrade is a deliberate JOINT `.org` + `.com` change, on its own,
with its own verification.

### Phase 2 — the nav-and-homepage pair

These two are one job, because both edit the six pages' chrome and the homepage, and both destroy
the byte-identity proof that Phase 1 rests on. They were deliberately excluded from Phase 1 for
exactly that reason.

1. **Propagate the "News" nav link** to all six static pages — nav *and* mobile drawer *and*
   footer. Until this lands, `/news/` has **no inbound human link**: it is reachable only by direct
   URL, `sitemap.xml`, `llms.txt` and RSS. The news pages carry the link in their own chrome, so
   the nav is inconsistent between `/news/` (has it) and the six (do not). Deliberate and
   temporary.
2. **Homepage recent-articles section.** Deferred from Phase 1 because `index.html` shipping
   byte-identical was the strongest available proof the migration changed nothing, and editing it
   would have destroyed that proof exactly where it mattered most.

### Unexpected improvement

`STATE.md`, `HANDOFF.md` and `README.md` are **no longer in the deployed output at all** — they
stay at the repo root, which is no longer the deploy directory. The Pages Function guard is now
belt-and-braces rather than the only defence.

---

## FINDING — STATE.md, HANDOFF.md and README.md are PUBLICLY SERVED — 2026-08-06

Surfaced while verifying the CSS sweep, by checking whether this file is fetchable
before committing a note into it. It is.

| file | live | size |
|---|---|---|
| `/STATE.md` | **HTTP 200** | 145,154 B |
| `/HANDOFF.md` | **HTTP 200** | 14,360 B |
| `/README.md` | **HTTP 200** | 1,311 B |
| `/CLAUDE.md` | 404 | (not in this repo) |

Every file in the repo root deploys, and there is no `_headers` or `_redirects` rule
excluding `.md`. `robots.txt` then compounds it: `Allow: /` for `*`, plus explicit
`Allow: /` for GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, Claude-SearchBot,
Claude-User, anthropic-ai, Googlebot, GoogleOther and BingBot — and
`Content-Signal: ai-train=yes, search=yes, ai-input=yes`.

**So the full operational history is not merely reachable, it is explicitly invited
for AI training and search indexing.** That includes every session log, commit hash,
founder ruling, internal debt note, and 8 lines mentioning prospect / budget /
revenue / cost figures.

Nothing here is a credential or a secret. But it was never written to be read by
funders, partners, or a model that will repeat it. **This is a disclosure question,
not a security one**, and it is the founder's call, so nothing was changed.

Options, none taken:
1. `_headers` rule returning `X-Robots-Tag: noindex` for `/*.md` — cheapest, but the
   files stay fetchable.
2. `_redirects` rule 404ing `/STATE.md`, `/HANDOFF.md` — removes public access while
   keeping the files in the repo where every session expects them.
3. Move operational docs out of the deploy root into a non-deployed directory —
   cleanest, but breaks the "read STATE.md at session start" convention that every
   session in this repo relies on, and every prior session's path references.

Recommendation: **option 2**. It removes the exposure without moving anything or
touching the session convention. `robots.txt` needs no change — a 404 is not
indexable.

## Print sheet now fits one page — 2026-08-06

**Letter 1291px → 895px against a 935px printable area. A4 → 911px against 1002.
Fits both, with 40px and 91px to spare.** The on-screen claim that it "lays out clean
on one sheet" is now true; it had been false since the page was built.

**Letter is the binding constraint, not A4** — 935 vs 1002 usable height at
`@page margin: 16mm 14mm`. Every candidate was measured at **710px** (Letter's
printable width) and 688px (A4's), never against an iframe's own height, which
measures nothing and is what hid this in the first place.

**The size decision was made against measurements, not taste.** The seven principles
were 750px of the 1321 — 57% of the sheet — so that is where the reduction had to come
from. The trade is direct, and every row here was measured:

| body | padding | Letter | verdict |
|---|---|---|---|
| 10pt | 10pt | 1291 | baseline, over by 356 |
| 9pt | 7pt | 938 | over by 3 |
| 9pt | 6pt | 922 | fits, 13px headroom |
| 9pt | 5pt | 917 | fits, 18px |
| 9pt | 4pt | 901 | fits, 34px — but 11px between principles, 3 bodies still 3 lines |
| **8.5pt** | **8pt** | **895** | **fits, 40px — all 7 bodies 2 lines, 21px between principles** |
| 8.5pt | 9pt | 937 | over by 2 |

**At 10pt every body ran to 3 lines; at 8.5pt all seven run to 2.** That makes the
seven items visually even AND leaves room for generous padding. The alternative —
holding 9pt — forces padding down to 4pt for the same headroom, which gives 11px
between principles and leaves three bodies ragged at 3 lines. **Half a point of type
buys the separation, so it was spent there.** This is a signable one-page artifact;
even, well-separated items matter more on paper than half a point of body size.

**Screen is provably unchanged.** Screen and print are separate media blocks, and
everything in the file before `@media print` is byte-identical to the previous commit.
Positive control first (1 mismatch on a single-property change), then pledge at 1280
and 375: **0 mismatches, 160/160 elements, document heights identical at 3267 and
4545.**

**Print integrity re-checked after the retune:** 7 principles, 2 signature lines,
nav/drawer/footer/workshop hidden, attribution shown, volt tile still reverting to
transparent.

**Headroom is deliberate, not incidental.** 40px on Letter is 4.3%. Print engines
differ from screen layout by a percent or two on font hinting at print DPI, so a
13px or 18px margin — which two of the candidates offered — is not safe. Anything
added to this sheet later must be re-measured against 935 at 710px.

## --s-7 fixed, and the print sheet does not fit one page — 2026-08-06

**RULING: `--s-6` (48px).** Not a taste call once measured. Every internal hairline
on `/pledge` already has 48px on both sides — `.principle` carries
`padding: var(--s-6) 0`, so consecutive principles sit 48 above and 48 below their
shared rule. The preamble's rule had 48 above and **0** below. `--s-6` restores that
symmetry rather than inventing a value. `--s-8` would have made this one rule uniquely
looser than the seven beneath it, and 64px is already doing real work as the
last-principle-to-Sign-the-Pledge break.

**The whole shorthand was replaced, not just the bottom.** `var(--s-7)` being invalid
drops the entire `margin` declaration at computed-value time — `margin-top` and the
left/right zeros go with it. Patching one side would have left the shorthand broken
and looking fixed.

**`--s-7` did not slip in twice.** Swept all six pages for any `var()` referencing an
undeclared custom property, scale and colour: **one defect, now zero.** `--fs-pull` on
pledge is undeclared but supplies a fallback, which is deliberate — index is the only
page that declares it.

**Verified — the shift is exactly the intended one.** Five untouched pages: 0
mismatches at 1280 and 375, identical counts and heights. On pledge: **nothing above
the rule moves**, 84 elements below it shift by exactly **48px**, and **zero x or
width change** anywhere. Document height +48 at both widths.

**HARNESS DEFECT FOUND MID-RUN — webfont race.** philanthropy@375 reported **154
mismatches and +295px** on a file that is byte-identical between the two trees
(md5 `fd0966b7dc` both). Cause: the two frames sampled on either side of EB Garamond /
DM Sans resolving, which moves every text metric on the page. Fixed by awaiting
`document.fonts.ready` in each frame before sampling; three consecutive re-runs then
gave 0 / 0 / 0 with `fonts=loaded/loaded`. **This is the third distinct source of
nondeterminism this harness has needed closing — lazy images, then animations, now
fonts. The md5 check is what proved it was the instrument and not the page; without
comparing the files first this reads as a real 154-element regression.**

**SEPARATE DEFECT — FIXED in the follow-on commit. The print sheet had never fitted
one page, and the page said it did.** Measured at true printable width (`@page margin: 16mm 14mm`):

| | printable area | content | overflow |
|---|---|---|---|
| A4 | 688 x 1002 | **1291px** before / 1321 after | 289 → 319 |
| Letter | 710 x 935 | **1291px** before / 1321 after | 356 → 386 |

It spilled to a second page from the day it was built; `--s-6` adds ~30px to an
existing ~290px overflow and is not the cause. But `.pledge-print-hint` on screen
reads *"Print this page to sign it — it lays out clean on one sheet."* **That claim is
false and was false when written.** Either the print block tightens until it fits —
the levers are `.principle` padding (10pt), `.principle__body` size (10pt) and
`.principles` margin-top (14pt) — or the copy stops promising one sheet. A document
people are asked to sign should not misdescribe itself. Left for its own commit
because it is a design decision, not a mechanical fix.

## Token rename — the naming debt is paid — 2026-08-06

**23 colour tokens became 20. 374 `var()` references rewritten. Zero visual change.**

The 2026-08-04 swap changed VALUES and deliberately kept the warm names so a
mechanical rename would not ride along with a visible change. This is that rename.
The mapping was **not invented** — BRAND.md §4 has specified it verbatim since
2026-08-04, so this was executing canon, not designing it.

| was | now | value | refs |
|---|---|---|---|
| `--c-cream` | `--c-paper` | `#FAFAF7` | 46 |
| `--c-sand` | `--c-surface` | `#F3F7EB` | 3 |
| `--c-sand-d` | `--c-surface-d` | `#E0EDD2` | 3 |
| `--c-ghost` | `--c-border` | `#C8DDB4` | 21 |
| `--c-ghost-l` | `--c-border-l` | `#DDE7CC` | 6 |
| `--c-ink` | `--c-text` | `#1B4332` | 49 → **67** |
| `--c-ink-l` | `--c-text-l` | `#2D6A4F` | 7 |
| `--c-dusk` | `--c-ground` | `#081C15` | 26 |
| `--c-dusk-m` | `--c-card` | `#1B4332` | 1 |
| `--c-cream-rgb` | `--c-paper-rgb` | `250,250,247` | 18 |
| `--c-ghost-rgb` | `--c-border-rgb` | `200,221,180` | 19 |
| `--c-ink-rgb` | `--c-text-rgb` | `27,67,50` | 2 |

**Three tokens went rather than moved.**
- `--c-ink-m` **deleted**, its 18 references retargeted to `--c-text`. Both held
  `#1B4332`, and the token's own comment already said "COLLAPSED into --c-ink: §4
  rules three text tiers become two". Renaming it would have resurrected a tier
  canon retired two days earlier. That is why `--c-text` ends at 67 refs, not 49.
- `--c-dusk-rgb` and `--c-ink-l-rgb` **deleted** — declared on all six pages,
  referenced by nothing. `dusk-rgb` lost its last caller when the stats band was
  reverted. Renaming them would have shipped two new names nothing uses.

**FOUR value collisions were NOT collapsed, and the reasoning matters more than the
result.** `#1B4332` is held by `--c-card` and `--c-accent-text`; `#E0EDD2` by
`--c-surface-d` and `--c-on-ground`; `#C8DDB4` by `--c-border` and `--c-on-ground-m`;
`#2D6A4F` by `--c-text-l` and `--c-accent-text-d`; `#D8FF00` by `--c-accent-fill` and
`--c-on-ground-hi`; `27,67,50` by `--c-text-rgb` and `--c-accent-on-fill-rgb`.
**Same value today, different jobs.** BRAND.md is explicit on the volt pair —
"deliberately a SEPARATE token so the fill-is-never-text invariant holds" — and the
`-rgb` pair was de-aliased at step 6 on purpose. Collapsing on value alone couples
roles that are designed to diverge. Only `ink`/`ink-m` shared a role as well as a value.

**Role tokens untouched** — all eight still describe what they do.

**PRE-EXISTING BUG FOUND — FIXED 2026-08-06 in the follow-on commit. `pledge.html`
used `var(--s-7)` with no fallback, and `--s-7` is declared nowhere.** The spacing scale runs 1,2,3,4,5,6,8,10,14.
The declaration is invalid at computed-value time, so `.pledge-preamble`'s
`margin-bottom` silently computes to 0 and the spacing comes from `padding-bottom`
alone. **I introduced it in the 2026-08-05 volt session.** Left in place because
fixing it moves pixels and this session is zero-change. It is a real defect and wants
its own commit — `--s-6` or `--s-8`, decided by eye.

**Verification.**
- **Bidirectional grep.** Zero old token names anywhere in code — CSS, comments,
  inline styles, config, Functions. And zero undefined `var()` on all six except the
  pre-existing `--s-7` above. A missed rename shows up as an undefined variable, so
  both directions had to be clean; checking one would have proven nothing.
- **Reference arithmetic reconciles:** 219 renamed + 155 role = **374**, exactly the
  pre-rename count.
- **`:root` parity:** the five sub-pages are byte-identical (md5 `92bf46389c`, 5971 B,
  39 declarations). `index` differs by `--fs-pull` and its annotations — as it has
  since before this session, not something the rename introduced.
- **Differential, positive control FIRST:** a single-property change gave exactly 1
  mismatch and a `::before`-only change exactly 1. Then six pages x 1280/375 with
  drawer, hamburger, `details[open]` and unhidden form panels all applied:
  **0 mismatches, identical element counts, identical document heights.**
- **Print sheet:** `@media print` promoted to screen and diffed prev-vs-live at both
  widths — **0 mismatches**, 7 principles, 2 signature lines, nav/footer/workshop
  hidden, attribution shown, and the volt tile correctly reverting to transparent.
- Brace balance 0 on all six.

**Comments were rewritten, not just renamed.** The `:root` header carried a NAMING
DEBT warning describing the rename as queued; it now records it as paid. The `-rgb`
block said "ALL SIX UPDATED IN LOCKSTEP" when there are now three. **A comment that
survives a rename unchanged is usually a comment that has started lying.**

**STATE.md:** zero forward-looking token references existed — all 25 mentions sit
inside dated entries, which stay as written per the ruling. Records, not guidance.

## Dead CSS sweep — full, DOM-derived — 2026-08-06

**202 rules removed across six pages. 25,716 bytes of CSS. Zero visual change.**

| page | rules before | after | removed | CSS before | after | saved |
|---|---|---|---|---|---|---|
| index | 200 | 149 | **51** | 38,145 | 31,919 | 6,226 |
| events | 119 | 61 | **58** | 23,312 | 15,314 | 7,998 |
| philanthropy | 148 | 105 | **43** | 26,740 | 19,997 | 6,743 |
| partner | 103 | 81 | **22** | 19,875 | 18,021 | 1,854 |
| 404 | 60 | 59 | **1** | 14,910 | 14,864 | 46 |
| pledge | 134 | 107 | **27** | 25,128 | 22,279 | 2,849 |
| **total** | **764** | **562** | **202** | | | **25,716** |

**Method — DOM-derived, and every tool validated before it was trusted.**

1. **A CSS block parser** that round-trips each file byte-identically before any
   deletion. Proven on all six (441/271/343/229/135/259 items reassembled exactly).
   This is what made surgical rule removal safe; the 2026-08-04 sweep worked from a
   recon list and left two dead `.pledge-preview` rules behind.
2. **A liveness detector** run against each page's own live DOM, with every toggled
   state applied first: `is-open` on `.nav__hamburger` and `.nav__drawer`, `open` on
   every `<details>`, and `hidden` stripped from partner's form panels. Pseudo-elements
   and interaction pseudo-classes are stripped before testing, so `.x:hover` counts as
   live when `.x` exists.
3. **The detector was itself controlled first** — injected known-dead selectors
   (`.zzz-definitely-dead`, a dead `:hover`, a dead descendant under `.is-open`) and
   known-live ones, and confirmed it separated them. A detector that has not been shown
   able to say "dead" proves nothing when it says "live".

**events.html was half dead.** 58 of 119 rules. Its body is only nav + drawer + hero +
calendar-band + footer — it has **no** `.wrap`, `.section`, `.body`, `.h2` or `.btn` at
all. I flagged this as implausible mid-run and checked the markup before trusting it;
the detector was right and my instinct was wrong. That resolves the residue the brief
named: the whole `.btn` family, `.location-block` and the `.aud-*` group are gone rather
than left as orphans.

**One partially-dead comma group, split rather than left:** `pledge.html` had
`.hero::before, .hero__ghost` — the first part is live (a pseudo-element on a live
`.hero`), the second dead. Kept `.hero::before`, dropped the orphan. It was the only
such group across all six pages.

**Orphan closure verified by re-running the detector on the swept files: 0 dead rules
remain on every page.**

**Proof — the differential harness, controlled first.** Positive control ran before any
comparison: a single-property change on one element produced exactly **1** mismatch, and
a `::before`-only change produced exactly **1**. Only then were the zeros trusted.

The harness freezes animations and transitions, forces images eager and fixed-size,
skips `--*` custom properties (they inherit to every element and swamp the signal),
captures `::before`/`::after`/`::marker`, and applies every toggled state. **12
comparisons — six pages x 1280/375 — all returned 0 mismatches, identical element
counts, identical document heights.**

**The toggled states were proven non-vacuous, not assumed.** Drawer renders at
`display:flex`, 375-388px tall on all six. `details[open]` fires its `::after` marker.
Partner's form panels compute to `display:block`. The hamburger initially read as an
identity transform, which looked like a missed rule — it is a transition sampled at
t=0. With the harness's freeze applied it reaches `matrix(0.707107, …)` and span-2
opacity 0, i.e. the settled open state. Checked against the file: all hamburger rules
are byte-identical before and after.

**CONSEQUENCE — RULED, AND QUEUED.** Per-page pruning is correct for a site with no
build step and no shared stylesheet, but it has made the six `<style>` blocks
structurally divergent. `pledge.html` was built three sessions ago by extracting
`partner.html`'s shared base wholesale — **that base no longer exists in reusable
form**, because each page now carries only what it uses. A seventh page cannot be
created the same way.

> **QUEUED ITEM — canonical base block in the playbook.** Founder ruling 2026-08-06:
> keep a canonical `<style>` base block in `core/playbook` as the starting point for
> any new `.org` page. **Not built this session, deliberately.** Whoever picks it up
> should note that the base cannot simply be lifted from any current page — all six
> are now pruned to their own usage. It has to be composed from the union of what the
> shared components actually need: the `:root` token block (still byte-identical
> across the sub-page family), the reset, type scale, `.nav` / `.nav__drawer` /
> `.nav__hamburger`, `.footer` family, `.wrap` / `.section` / `.eyebrow` / `.h1` /
> `.h2` / `.body` / `.btn`, and the shared media queries. Building it from a diff of
> the pre-sweep files (`4cf03a2`) is the cheapest route — those still carry the full
> template.

**Corollary worth stating:** a new page built from the canonical base will itself need
a sweep before it ships, because the base is deliberately a superset. That is the
intended cycle — copy the superset, prune to actual usage, verify zero-pixel.

**Not touched, per the brief:** no colour, value or token changed; nav and wordmark
markup untouched; `id="programs"` untouched; nothing renamed. Brace balance 0 and all
JSON-LD parses on all six files.

## Fiscal inventory cut — 24 to 14 — 2026-08-05 (ninth pass)

Executed the ruling: item 2 (`index:118`, the second JSON-LD description), items 7-8
(the "two properties" schema + DOM twin), item 10 and the `footer__copy` clause on
all six pages, and `llms.txt:7`. Everything marked keep is untouched.

**TWO ARITHMETIC / RECON CORRECTIONS, both mine.**

1. **The result is 14, not 13.** I reported "24 → 13" last pass; the cut list I
   recommended removes 10 placements, so 24 − 10 = 14. The ruling adopted my list
   verbatim, so the list is right and only my subtraction was wrong. The 14 keepers
   are: `index:50` (JSON-LD Organization), the "What is AICV" pair (`250`/`1684`),
   the governance pair (`258`/`1688`), six `footer__desc` lines, `pledge:962`
   (print attribution), and `llms.txt:3` + `:32`.

2. **Items 7-8 each carried TWO fiscal references, and my inventory only caught
   one.** The inventory was built by matching `fiscally sponsored`. The same
   sentence also ended "...and fiscal-sponsorship infrastructure under Desert
   Community Foundation" — a *different* string, so it never appeared in the 24.
   It surfaced only because the ruling asked for a zero-check on "under Desert
   Community Foundation", which came back **2** after the cut. Removed as part of
   the same items; the list now reads "workshops, programs, and the Responsible AI
   Pledge."

   **Standing lesson: an inventory is only as complete as its widest pattern.** A
   sweep keyed to one phrasing will report itself finished while a synonym of the
   same claim sits untouched in the same sentence. The zero-check caught it; the
   inventory did not.

**Both required zero-checks pass:** `initiative` **0**, `under Desert Community
Foundation` **0**, `sponsored under` **0**.

**Deliberately left — DCF-as-sponsor, not AICV-status:** four `fiscal sponsor` hits
that were never in the inventory and are correct as written — `index:322`/`1720`
("All AICV funds are held by Desert Community Foundation as fiscal sponsor"),
`index:1657` (the partner list label "Desert Community Foundation (Fiscal Sponsor)"),
and `llms.txt:33` (the `**Fiscal sponsor**:` metadata field). These name DCF's role
rather than asserting AICV's legal status, which is exactly the distinction the
whole sweep was drawing.

**The footer redundancy is resolved.** Each footer stated its sponsorship twice —
`footer__desc` and, ~20px below in the same block, `footer__copy`. The `copy` line
is now just "© 2026 AI Coachella Valley". That closed the "under Desert Community
Foundation" wording divergence at the same time, as the ruling anticipated.

**Verified:** zero moved or resized on all six pages at 1280, document heights
identical. At 375, index and pledge each lose 21px / 20px of height because
`footer__copy` no longer wraps to a second line — the intended consequence, and the
only two elements that move are `.footer` and `.footer__inner` themselves. All
JSON-LD parses on all five schema-bearing pages; sitemap and api-catalog valid.

## /pledge gets volt; nav routed to the page — 2026-08-05 (eighth pass)

**VOLT RESTORED, per doctrine.** The page had shipped all-safe — every element on
pine or pine-light, no accent anywhere, worst margin +1.61. The seven principle
numerals are now **volt tiles with pine numerals on them**: 64px square on desktop,
48px on mobile, the same treatment as `.nav__mark` and the favicon, so the page
carries the existing brand mark rather than inventing one.

Measured: pine `#1B4332` on volt `#D8FF00` = **9.61:1**, exactly the figure BRAND.md
§1 records. Volt appears *only* as fill — never as text on the light ground, where
it measures ~1.1:1. The one place volt appears as text is the nav's `is-active`
marker on `/pledge`, which sits on the dark nav ground at **15.35:1** (`--c-on-ground-hi`,
the case doctrine explicitly permits).

**Typographic weight — the page now reads as a document.** The preamble closes with
a `--c-ghost` rule and a bottom margin, so it reads as a masthead block rather than
a lede running into the list. The thesis line ("Powerful tools require thoughtful
people.") went to weight 700 with tightened tracking. The mantra went 34px/600 to
38px/700, and the closing line moved off `--c-ink-l` onto full `--c-ink` (6.11 to
**10.59:1**) and up a step in size — it is the last line of a document people sign,
and it was the palest thing on the page.

**Print keeps its head.** The volt tile is explicitly reverted in `@media print`:
background transparent, plain dark type, `display: block`. Background printing is off
by default in most browsers, which would otherwise have left the tile's centring
applied to a numeral on white with no fill behind it.

All 15 type elements pass at 1280 and 375. Worst margin **+1.61**, unchanged — the
volt tile did not become the tightest element.

**NAV ROUTED TO THE PAGE — 18 links, not 12.** The brief said "six pages, two blocks
each". There is a **third** `#pledge` link per page: the mobile drawer. Leaving it
would have routed every phone visitor through the homepage section, which is the
exact behaviour being retired. All 18 changed — nav, drawer and footer on all six
pages — and `pledge.html`'s own nav link now carries `is-active`, matching what
`events.html` and `philanthropy.html` already do for their own pages.

Zero `#pledge` anchors remain. The homepage `#pledge` section is untouched and still
holds its CTA to `/pledge`.

Verified: **zero moved or resized** on index, events, philanthropy, partner and 404
at 1280/375, document heights identical — the href changes are non-visual.
`pledge.html` moves as intended (it is the page redesigned; its nav shifts because
`is-active` adds `font-weight: 500`, the site's own convention).

## Fiscal-sponsorship inventory — 24 placements, awaiting a ruling — 2026-08-05

**The count is 24, not 17.** 17 was how many the re-sweep *changed*. The full
inventory adds the six `footer__copy` lines (which never said "initiative", so were
never swept) and `pledge.html`'s print attribution (already correct when written).
17 + 6 + 1 = 24.

**The strongest finding: every footer states it twice.** `footer__desc` carries
"A fiscally sponsored project of Desert Community Foundation." and `footer__copy`,
about 20px below it in the same visual block, carries "· Fiscally sponsored under
Desert Community Foundation". Twelve of the 24 placements are footer lines, and half
of those restate the other half at arm's length. That is the redundancy worth cutting,
and it also resolves the wording divergence for free — deleting the `footer__copy`
clause removes the last non-canon formulation on the site.

Nothing removed. Recorded here for the ruling.

## Three rulings — subtraction, and the fiscal re-sweep — 2026-08-05 (seventh pass)

**RULING 1 — the lightbox and slide replica are GONE. Two backlog items close by
removal rather than by fix.**

Deleted from `index.html`: the `#pledge-lb` lightbox (markup + all `.lightbox*`
rules, 1045 bytes of CSS), the hand-built slide-1 replica, and the `.pledge-thumb`
wrapper that contained it (1614 bytes of CSS). The two-column `.pledge-layout`
collapsed to a single copy block plus one CTA pointing at `/pledge`.

- **Step 5 is CLOSED, not done.** The lightbox's iframe was the only reference to
  `aicv-pledge-deck.pdf` anywhere on the site. Count is now **0**. There is no
  surface left that renders the warm-palette deck, so there is nothing to
  regenerate. The file stays in the repo, unreferenced.
- **The X-Frame-Options item is CLOSED, not fixed.** That iframe was the only
  framed element. With nothing framed, `X-Frame-Options: DENY` on `/*` breaks
  nothing and the header stays strict — the outcome the brief asked for.

**Scope note on the ruling's own wording.** The ruling asked to re-point "all four
remaining `aicv-pledge-deck.pdf` references". In fact three of those four were
`aicv-pledge.pdf` (a different file), and one of them — "Open full PDF" at :1808 —
lived *inside* the lightbox, so it was deleted rather than re-pointed. Net: the deck
had **1** reference (the iframe, deleted); `aicv-pledge.pdf` had **4**, of which 1
was deleted with the lightbox and **3 were re-pointed** — the CTA (now `/pledge`,
`target="_blank"` dropped since it is internal) and both FAQ prose twins. Both PDFs
now have **zero** references sitewide.

Also removed: `.pledge-preview__inner` and `.pledge-preview__title`, which had
**already been dead** — zero markup uses. They survived the 2026-08-04 dead-CSS
sweep because that pass worked from a recon list rather than from the DOM.

`.pledge-copy` gained `max-width: 62ch`; it had been measured by the grid column
that no longer exists.

**RULING 2 — fiscal wording re-swept to canon. 17 placements.**

The single canonical formulation is `OPERATING-RULES.md:452-453`:
"A fiscally sponsored **project** of Desert Community Foundation, a 501(c)(3)
nonprofit organization." **There is no separate locked shorthand in canon** — so
where a short form was the right job, the string used is that same sentence
truncated at its clause boundary ("A fiscally sponsored project of Desert Community
Foundation."), which introduces no new words. Flagging that explicitly because the
ruling said to pull both from canon and only one exists.

- **Full string** (legal standing is the subject): the governance FAQ answer,
  schema + DOM twin; `llms.txt` "Legal structure".
- **Shorthand**: six footers, two index JSON-LD descriptions, the "What is AICV"
  twins, the "two properties" twins, two `llms.txt` lines.

Two incidental fixes made while sweeping: the WebSite JSON-LD description read
"is a fiscally sponsored initiative building, connecting…" — it never named DCF at
all, and now does; and `llms.txt` said "under one fiscally sponsored **mission**",
which is now "project" to match its index twin.

**Zero instances of "initiative" remain anywhere on the site.**

**WHY THE FIRST SWEEP DRIFTED — the lesson.** The 2026-08-05 nonprofit sweep took
its replacement noun from a sentence already on disk (`index.html:258`, "the first
and only fiscally sponsored initiative") instead of from canon. That line was itself
drift. Matching a line on disk propagates whatever error that line contains; the
sweep was internally consistent and uniformly wrong. **Anchor a sweep to the
playbook string, then verify disk against it — never the reverse.**

**Still divergent, outside the ruling's scope and NOT changed:** the six
`footer__copy` lines read "© 2026 AI Coachella Valley · Fiscally sponsored under
Desert Community Foundation". That construction contains neither "initiative" nor
"project", so it was not swept. It is not wrong, but it is the last formulation on
the site that is not canon's. Wants a ruling of its own.

**RULING 3 — workshop line shipped as drafted.**

**Verified:** zero deformed on events, philanthropy, partner, 404 and pledge —
every element at 0px shift, document heights unchanged. index shows two rigid
groups (0px above `#pledge`, −218.52px at 1280 / −397.71px at 375 below it) as the
section shrank; doc height 6426 → 6208. **One deformation, expected and checked:**
the governance FAQ paragraph grew 210 → 236px at 375 because the 501(c)(3) clause
added a line — x and width identical, height identical at 1280. All JSON-LD parses
on all six pages; sitemap, api-catalog and server-card valid; `llms.txt` has zero
"initiative" and one "nonprofit" (the 501(c)(3) clause), all four URLs resolve.

## New page — /pledge, the Responsible AI Pledge — 2026-08-05 (sixth pass)

The site is now **six pages**. `pledge.html` serves at `/pledge` via Cloudflare
Pages' automatic clean URLs — the same mechanism `/partner`, `/events` and
`/philanthropy` already use. `_redirects` needed no entry.

**Built by extraction, not by hand.** The head prelude, the whole shared `<style>`
base, the nav block and the footer block were lifted programmatically out of
`partner.html`, so they are byte-identical by construction rather than by
inspection. Verified after the fact by md5.

**The "byte-identical across five pages" premise in the brief is not true today,
and the page matches the majority rather than an ideal.** Measured before building:

| block | index | events / philanthropy / partner / 404 | new /pledge |
|---|---|---|---|
| `:root` | 6570B (own hash) | 6217B, all identical | **6217B, matches** |
| nav | own | partner+404 identical; events and philanthropy differ | **matches partner/404** |
| footer | own | events+philanthropy+partner identical; 404 own | **matches those three** |

index's `:root` differs by annotation comments plus one extra token (`--fs-pull`);
the shared token *values* are the same. The nav differs per page by design — sub-pages
use absolute `/#anchor` links where index uses bare `#anchor`, and the current page's
own link carries `is-active`. So "byte-identical" is really "byte-identical within the
sub-page family", which is what /pledge joins.

**COPY IS VERBATIM.** Extracted independently from `aicv-pledge.pdf` (ReportLab,
ASCII85+Flate) and diffed against the rendered page: **49 substance runs checked,
0 missing.** The only two flagged were "NAME / SIGNATURE" and "DATE", which are in
the markup title-case with `text-transform: uppercase` — they render exactly as the
document has them.

**NO PDF, per amendment.** The page links to no PDF. The print stylesheet is the
signable artifact: `@media print` strips nav, drawer, site footer, the workshop line
and the print hint, then lays out the preamble, seven principles and the signature
lines on one sheet with a print-only attribution block. **This is the site's first
print stylesheet** — there was none anywhere before.

**MACHINE-READABLE.** JSON-LD `CreativeWork` with `hasPart` → `ItemList` of the seven
principles, each an item with `name` and `description` carrying the full body copy.
Registered in `llms.txt` (the Core Pages entry now points at `/pledge`, not the PDF),
`sitemap.xml`, and `.well-known/api-catalog` under `service-doc` — that array already
held HTML and text documents, so the pattern fit without inventing a category.

**Homepage:** the thumbnail became a real `<a href="/pledge">`, replacing a
`div[role=button]` with an onclick. **The site has no global anchor reset** — resets
are per-class — so the conversion had to carry its own `text-decoration:none` and
`color:inherit`, or the hint text inside would have inherited an underline and the
default link colour. Geometry verified identical at 1280 and 375 despite the tag change.

**TWO OPEN ITEMS THIS PAGE SUPERSEDES — recommendation, awaiting a ruling.**
The lightbox is now **unreachable**: nothing on the page adds `is-open` to it any more
(0 references), though its markup and the slide replica are still in the file.
Recommendation is to delete both, because:
- the lightbox's only content is `<iframe src="/aicv-pledge-deck.pdf">`, which is the
  sole remaining reference to the deck. Delete it and **step 5 closes rather than gets
  done** — there is no surface left that renders the warm-palette deck;
- the iframe is also the only thing `X-Frame-Options: DENY` was breaking. With nothing
  framed, **that item closes too, and the header stays strict** — which is the outcome
  the brief asked for;
- the slide replica is a hand-built HTML copy of slide 1 in the old terracotta palette
  (`--c-accent-fill` header). It is a second thing to keep in sync with a document that
  no longer has a reason to exist.

Still pointing at the PDF and NOT changed this session (they were outside the brief's
homepage scope): the `Read & Sign the Pledge` button (index.html:1791), the
`Open full PDF` link inside the lightbox (:1808), and two FAQ answers that cite
`aicoachellavalley.org/aicv-pledge.pdf` in prose (:290 schema, :1840 DOM twin).
If the ruling is to delete, those four want re-pointing at `/pledge` in the same pass.

**FISCAL-SPONSORSHIP STRING — divergence flagged.** The print attribution uses the
locked civic wording from playbook `OPERATING-RULES.md:452`: "A fiscally sponsored
**project** of Desert Community Foundation, a 501(c)(3) nonprofit organization."
The five existing pages say "fiscally sponsored **initiative** of Desert Community
Foundation" after the sweep two commits ago. Both are on disk and they disagree on the
noun. The locked string is also the more precise one — it attributes 501(c)(3) to DCF
rather than leaving it implied. Needs a single ruling: either update OPERATING-RULES to
"initiative", or re-sweep the site to "project".

**Verified:** all 15 new type elements pass at 1280 and 375, worst margin **+1.61**;
nav/footer/`:root` md5-identical to the sub-page family; JSON-LD parses with 7
ItemList items; sitemap valid XML; api-catalog valid JSON; llms.txt has zero
"nonprofit" and all four advertised URLs resolve on disk; **zero moved or resized**
across all five existing pages at 1280/375 with document heights identical.

## Tagline consistency pass — 2026-08-05 (fifth pass)

The six surfaces held back from the previous commit, now aligned to
"Building the Coachella Valley's AI Startup Ecosystem": index `<title>`,
`og:title`, `twitter:title`, and the footer taglines on events, partner and
philanthropy. Six string changes across four files, nothing else.

Deliberately left alone, per the brief: the running-prose descriptions
(`meta description`, `og:description`, JSON-LD, llms.txt — these say "the
Coachella Valley's emerging AI startup ecosystem" mid-sentence, which reads
correctly), and 404.html's separate copy ("Preparing the Valley for the age of
AI"). Post-pass there are zero instances of the old tagline anywhere.

**TITLE LENGTH — flagged, then fixed in the same session.** The consistent title
came to **81 characters**, up from 72, and search engines truncate display around
60 — so "AI Startup Ecosystem", the phrase carrying the positioning, fell off the
end. Founder call: shorten the prefix rather than revert the tagline. All three
tags now read **"AICV — Building the Coachella Valley's AI Startup Ecosystem"**,
which measures **59 characters** (not the 57 estimated — the em dash and its two
spaces account for the difference). Fits the limit with the positioning phrase intact.

Dropping "AI Coachella Valley" from the title does not lose the full brand name:
it survives in `og:site_name`, twice in the JSON-LD `name` fields, and in the
visible nav wordmark. Checked before making the change, not assumed.

**Verified:** zero moved or resized across all five pages at 1280 and 375 (229
elements on index, 68 events, 88 partner, 133 philanthropy, 65 on 404), document
heights byte-identical on every page, tagline stays on one line at both widths.
All JSON-LD parses. Hero untouched, so the nine-breakpoint contrast result from
the previous pass stands unchanged.

**Deploy note from verifying the previous push:** `llms.txt` read as MIXED across
8 fetches (two distinct bodies, 4821 and 4837 bytes) — 4821 was the previous
commit's file still being served by some PoPs. It settled to 15/15 clean at 4837.
Worth recording because a **single-fetch content check on the same file reported
"0 nonprofit assertions" while the stale version was still in flight**. The
multi-fetch distinct-hash check is what caught it; a one-shot grep would have
called the deploy done.

## Copy, type scale, and the nonprofit sweep — 2026-08-05 (fourth pass)

Eight files touched: all five pages, `llms.txt`, `robots.txt`, `.well-known/api-catalog`.

**NONPROFIT SWEEP — 24 assertions fixed, not 22.** AICV is a *fiscally sponsored
initiative* of Desert Community Foundation, not a nonprofit. Fixed:
hero eyebrow (1), JSON-LD `@type` NGO on index + events (2), five footers (5),
two index JSON-LD descriptions (2), three FAQ prose strings that each appear
twice as schema/DOM twins (6), `llms.txt` (5), `robots.txt` (1), `api-catalog` (2).

The count differs from the briefed 22 because **one FAQ answer contains two
separate nonprofit assertions** — "operates two properties under one nonprofit
initiative" AND "nonprofit infrastructure under Desert Community Foundation" —
so that answer is 4 locations across its twins, not 2. Counting answers gives 22;
counting assertions gives 24.

Standing model sentence lives at **index.html:258 (schema) / 1809 (DOM)**, not 249:
"AICV is the first and only fiscally sponsored initiative of Desert Community
Foundation." Everything was matched to it.

**KEPT deliberately** — correct usage about OTHER organizations, verified one by one:
`community nonprofits nationwide` (OpenAI/Anthropic grantees, index ×2), nine
philanthropy.html references to valley nonprofits / CV Giving Day / DCF / Charity
Navigator, and `"@type": "NGO"` on Desert Community Foundation and California
Community Foundation. Post-sweep, every remaining "nonprofit" on the site refers
to a third party. Verified by re-reading each hit, not by string count.

**COPY — hero and footer tagline** now read "Building the Coachella Valley's AI
Startup Ecosystem." Held pending a decision: `<title>`, `og:title` and
`twitter:title` on index still read "The Coachella Valley's AI Startup Ecosystem",
and the footer taglines on events / partner / philanthropy still carry the old
phrasing. 404.html's tagline is different copy ("Preparing the Valley for the age
of AI") and is not part of this phrase family.

**THE COPY EDIT BROKE THE SCRIM — and this is the lesson.** Adding "Building" took
the h1's first line from reaching **57% of hero width to 76%**. The desktop scrim's
clear point was at **72%**, derived in the previous session precisely *because* the
type ended at 57%. The headline now ran past where the scrim gives up, and the h1
margin collapsed to **+0.10 at 1024** (3.10 against a 3:1 threshold) — still passing,
but far too thin to ship. Re-derived to `0.70 / 0.72@34 / 0.48@66 / 0@82`; worst
margin across nine breakpoints is now **+0.68**, better than the +0.34 it replaced.
Clear point 82% is still ahead of the pre-session 86%.

**STANDING RULE: the hero scrim is derived from where the type ends. Any copy edit
to the h1 or eyebrow invalidates it. Re-measure the type extents and re-sweep —
never assume the gradient still fits.** Recorded in the CSS comment too.

**TYPE SCALE.** `#why-now`'s lead paragraph was `--fs-17` (17px) via `.body--lead`;
the Build section's copy is `.body` at `--fs-15` (15px). Scoped as
`#why-now .body--lead { font-size: var(--fs-15) }` rather than editing `.body--lead`
globally — the token is shared with philanthropy.html:921 and is worth keeping
available. This is the only `.body--lead` in index.html's markup.

**PLEDGE LIGHTBOX IS BROKEN — diagnosed, not fixed** (pledge page is its own session).
"Click to view all 7 principles" fires `pledge-lb.classList.add('is-open')`. All of
that works: the id exists (index.html:1786), `.lightbox.is-open{display:flex}` exists,
and the lightbox does open. What fails is its `<iframe src="/aicv-pledge-deck.pdf">`.
`_headers` sets **`X-Frame-Options: DENY` on `/*`**, which blocks framing by *any*
page including same-origin. Confirmed live: console reports "Refused to display …
because it set 'X-Frame-Options' to 'deny'", `transferSize: 0`, `contentDocument: null`.
The PDF itself is fine (HTTP 200). Fix is a path-scoped header override or
`SAMEORIGIN` — deliberately deferred.

**Verified:** nine breakpoints all PASS (worst +0.68). Layout invariance outside
hero / `#why-now` / footer: **zero deformed** on all five pages; events, philanthropy,
partner and 404 are unmoved entirely (0px, every element), index shows one rigid
translation (−10.5px at 1280, −61.25px at 375) from `#why-now` shrinking. All JSON-LD
blocks parse on every page, `api-catalog` and `server-card.json` parse. `llms.txt`
now contains zero "nonprofit", headings are consistent, and all four advertised
`.org` URLs resolve on disk.

**Self-inflicted defect caught in review:** the `llms.txt` line-11 rewrite produced
"the community and grant-facing surface … and grant-facing operations" — the same
phrase twice in one sentence. Changed the second to "philanthropic operations".
Worth noting because the sweep was mechanical and the repetition was not visible
in a diff of the changed token alone.

## Band-in-hero REVERTED, scrims kept — 2026-08-05 (third pass, same day)

Founder call: the stats band goes back to being its own standalone section.
`index.html` was rebuilt as **`1f8f81b` + the two scrim changes and nothing else** —
that is the whole diff, verified line by line. Reverted with it: `.section--edge`,
`.hero__stats` and its mobile compaction, the `.hero` flex-column /
`margin-top:auto` restructure, and the mobile hiding of `.stats__affil`.

**Restoration is provably exact.** 232 elements compared against `1f8f81b` at 1280
and 375: **zero moved or resized, zero elements present in one tree and not the
other**, document heights identical (6437 / 10040). The `<div class="stats">` block
is byte-identical (948 bytes) and top-level document order matches.

**THE SHIPPED MOBILE SCRIM COULD NOT BE KEPT VERBATIM — it failed three
breakpoints once the band was gone.** This is the thing to remember.

`0.88/0.66@36/0.36@55/0@100` cleared from 55% downward *because the band covered
everything below 55%*. Remove the band and the hero pins to `min-height: 460px`
while the type keeps its full height, so the type now runs to **74.9% at 375 and
78.6% at 320** instead of stopping at 52%. The accent's last line landed on
**0.17-0.20 alpha** — effectively bare photograph:

| vp | accent | threshold | verdict |
|---|---|---|---|
| 430 | 2.83 | 3:1 | FAIL -0.17 |
| 375 | 2.79 | 3:1 | FAIL -0.21 |
| 320 | 2.33 | 3:1 | **FAIL -0.67** |

Re-derived to `0.88 / 0.80@40 / 0.70@72 / 0.28@88 / 0@100` — hold 0.70 to 72% so
the fall-off happens *below* the type, clear in the bottom eighth. All nine
breakpoints pass, worst margin **+0.68** at 320.

**CORRECTION worth carrying: the "mobile shows 0.0% of the photo" finding was
caused by the band, not by the scrim.** That number was measured with the band
occupying the hero's bottom 43-45%, which sat exactly on top of the old chain's
clear zone. With the band gone the ORIGINAL `1f8f81b` chain already shows **31.8%**
of the hero. So the mobile scrim change was largely fixing a problem the band had
introduced. The new chain still earns its place — **43.8% vs 31.8%** — but the
justification is "meaningfully more photo," not "rescuing zero."

**The desktop change stands on its own** and was unaffected by the revert: it was
derived from horizontal type extents (h1 reaches 57% of hero width, accent 53.8%,
old chain didn't clear until 86%), and the band never entered that reasoning.
`0.70 / 0.72@34 / 0.40@62 / 0@72`, tightest +0.34 at 1280.

**Note on where `.stats` actually lives.** It sits between `#programs` and the
Partners section — NOT between the hero and `#why-now`. Document order is
hero, `#why-now`, `#programs`, `.stats`, Partners, `#pledge`, `#faq`,
`#get-involved`, `#founder`. Restored to that exact slot.

**Nine-breakpoint proof, final state — all PASS:**

| vp | 1440 | 1280 | 1024 | 768 | 700 | 600 | 430 | 375 | 320 |
|---|---|---|---|---|---|---|---|---|---|
| tightest | +0.38 | +0.34 | +0.39 | +0.43 | +1.97 | +1.92 | +1.66 | +1.38 | +0.68 |

Controls run first as standing practice: no scrim drove 1280 to **-1.43** and 375
to **-0.79**, so the harness was shown able to fail before its passes counted.

## Hero scrim re-derived against the band — 2026-08-05 (same day, follow-on)

Follow-on to `4ee0259`. `index.html` only, and **zero-pixel** — the whole change is
two `::before` gradient values. 232 elements compared at 1280 and 375 at sub-pixel
precision: none moved or resized, document heights identical.

**Both scrims were re-derived from MEASURED type extents rather than tuned by eye.**
That is the transferable part of this entry.

| | before | after |
|---|---|---|
| desktop | `0.80 / 0.72@32 / 0.40@62 / 0@86` | `0.70 / 0.72@34 / 0.40@62 / 0@72` |
| mobile | `0.94 / 0.92@56 / 0.66@75 / 0.14@90 / 0@100` | `0.88 / 0.66@36 / 0.36@55 / 0@100` |
| photo visible, desktop | 49.6% | **57.8-62.1%** (ceiling is 62.1%) |
| photo visible, mobile | **0.0%** | **33.7-46.5%** (ceiling is 56.7%) |
| tightest margin | +0.35 | **+0.38** |

"Photo visible" = share of hero area not under the band where scrim alpha < 0.75,
i.e. the photograph contributes more than 25%. The ceiling is set by the band.

**THE LEFT STOP WAS NEVER THE BINDING KNOB — and last session's "0.75 floor,
+0.19 margin" was an artefact of moving the wrong one.** That figure came from
scaling every stop down together. Hold the mid stops where the type needs them and
sweep the left stop alone: from **0.74 down to 0.60 the tightest margin does not
move off +0.38**. Only the eyebrow degrades (8.82 -> 8.23 against a 4.5 threshold).
The binding element is the accent, and its alpha is set by the stop at 34%, not by
the left edge. **Shipped 0.70 for looks, not for safety.**

**Measure where the type actually ends before placing a stop.** At 1280 the h1's
longest line reaches 57% of hero width and the accent 53.8%; everything right of
57% is type-free. The old chain did not clear until 86% — 14 points of frame dimmed
for no contrast reason. Pulling the clear point to 72% costs nothing and is what
makes the mountains read across the frame.

**Mobile had no gap to reveal into.** The type runs 24%->52% of the hero and the
band starts at 55-67%, leaving ~4.6%. So a reveal placed "between the type and the
band" is invisible — it lands under the band. The reveal has to pass through the
type region, which mobile can afford (it started at +2.70 of margin).

**A two-zone shape scored better and lost anyway.** Buying the reveal from the
text-free sky above the type (0-20%) gave the same 35.4% at a better margin
(+0.75 vs +0.48). Rejected on looks: the top of the mobile crop is featureless
haze, so it rendered as a grey wash under the dark nav. Monotone reads as morning
light. **Both were screenshotted and compared before choosing — the number alone
would have picked the worse one.**

**Shortening the band buys back NOTHING.** Tested 216 -> 206 -> 163px at 1280:
photo area stayed **exactly 353px** in all three. `.hero__inner` is sized by its
content, so the band never competed with the photo for space — shrinking it just
shortens the hero (569 -> 516). Band share falls 38% -> 32% but that is the hero
getting smaller, not the photograph getting bigger. **If more photo is ever wanted,
the lever is the hero's min-height, not the band.** Band left at 216px desktop /
252px mobile. (Recorded because the band was quoted at 189px desktop; measured
216px at both 1440 and 1280.)

**Harness note — the >25% metric saturates.** Once the left stop is <= 0.74 the
entire non-band area passes the threshold and the number pins at the ceiling, so it
cannot discriminate between good and better. Mean photo strength across the frame is
the honest tiebreaker (54.1% -> 57.5%). Positive controls were run first, as standing
practice: no scrim drove the tightest margin to -1.38 and opaque drove photo
visibility to 0%, so the harness was shown capable of failing before its passes counted.

## Hero refinement — scrim relaxed, stats band moved into the hero — 2026-08-05

Follow-on to the hero photograph (`1f8f81b`). Two changes, both to `index.html` only.
Not pushed at time of writing — contained session, reported first.

**1. Desktop scrim relaxed.** Left stop `0.92 -> 0.80`; the stop chain is now
`0.80 / 0.72 / 0.40 / 0` at `0 / 32 / 62 / 86%`. The photograph reads through the
headline area instead of dying behind it. Mobile's vertical gradient was left
untouched, per the brief.

**2. The stats band is now the hero's bottom edge.** The standalone `<div class="stats">`
between the hero and `#why-now` was removed and re-parented into `.hero` as
`.stats.hero__stats`. `.hero` became `display:flex; flex-direction:column`.

- **Safe to move — verified, not assumed.** The band was a `<div>` with **no `id`**;
  zero `#stats` anchors sitewide, zero nav/sitemap/llms.txt references, zero
  cross-page use of `stats__*`. Nothing could link to it, so nothing broke.

**Three things went wrong before this worked. Do not re-derive them.**

- **A solid band eats the hero.** Built full-size and opaque first: it took over half
  the hero and merged visually into `#why-now` (also ground) into one dark slab.
  Fixed with `rgba(var(--c-dusk-rgb),0.88)` + a `--c-ghost` top border + compacted
  padding and numerals. Translucency is load-bearing: the palms show faintly through it.
- **Flex children shrink below their content.** The h1 collided with the band and
  measured **1.17:1**. `.hero__inner { flex: 1 0 auto }` + `.hero__stats { flex: 0 0 auto }`.
  A hero that mixes flowed text and a pinned bottom band needs both, explicitly.
- **The removed band was a separator, and removing it merged two sections.**
  `#programs` and the partners section are BOTH `.section--sand` `#F3F7EB`. The band
  had held a 365px gap between them (556px at 375); with it gone the gap is **0** and
  the two backgrounds are identical — **1.00:1**, one continuous light field. Restored
  with `.section--edge { border-top: 1px solid var(--c-ghost) }` on partners, which is
  the site's existing hairline (`philanthropy.html` `.source-band` uses the same rule).
  **Standing lesson: before deleting a band, check what it was separating — a divider
  can be doing structural work nobody assigned it.**

**Measured — nine breakpoints, composited (photo + scrim + band + cell layers):**
all PASS, tightest margin **+0.35** (accent at 1280, 3.35 vs the 3:1 large threshold).
Numerals 12.06, label ~9.0, caption ~10.3 across the range.

**Scrim floor — probed, not guessed.** A throwaway copy at `0.75` also passes, but the
tightest margin drops to **+0.19** at 1280 (vs `+0.35` at `0.80`). Shipped `0.80`.
`0.75` is the floor, and the brief's own "do not ship under 0.75" is the right line.

**Mobile band: two-up, not horizontal scroll.** At 375 the band is 252px of a 623px hero.
Compacted (`.stats__affil` hidden, cells `10px 12px`, numeral 28px) which took the hero
724 -> 623. Horizontal scroll was rejected: it hides two of four figures behind an
undiscoverable swipe, on the one element that is community proof for funders.

**OPEN QUESTION — the mobile scrim now hides the photo completely.** Left unchanged
because the brief said so, but the premise changed underneath it. The mobile gradient
only clears in its bottom quarter (`0.66@75% -> 0@100%`) and **the band now starts at
57% of the hero**, so the entire clear zone is behind the band. Above the band the scrim
never drops below **0.92**. Measured: **0.0%** of the mobile hero shows the photo at
better than 25% strength. At 375 we ship a 27KB image that contributes nothing visible.
Fix if wanted: pull the mobile stops back to roughly `0.90 / 0.72@40% / 0.45@57%` so the
reveal happens ABOVE the band instead of under it. Not done this session.

**Layout invariance outside the hero and the moved section:** 202 elements compared at
1280 and 375, measured at **sub-pixel precision**. **Zero deformed** — every element kept
identical x, width and height. Y-shifts collapse to exactly **three rigid groups**:
`0` (sticky nav), `+57.30` / `+120.85` (content above the old band position — the hero grew),
and `-306.69` / `-434.13` (everything below it — the band left, net of hero growth).

- **Harness note: round your rects last, or not at all.** Rounding y to integers split
  those three groups into five (`-306`/`-307`, `+57`/`+58`) and manufactured a phantom
  "the hairline shifted things" story that survived one round of investigation. At full
  precision the split vanished. Compare at sub-pixel and round only for display.

## Agent-Readiness Baselines — 2026-04-23

Pre-change baseline captured before today's content truth + Option B agent infrastructure deployment.

**Cloudflare Agentic Readability** (isitagentready.com):
- Score: 33 / Level 2 "Bot-Aware"
- Discoverability: 2/3
- Content: 0/1 (Markdown for Agents not enabled — Pro upgrade deferred)
- Bot Access Control: 2/2 ✓
- API, Auth, MCP & Skill Discovery: 0/6

**AICV AIO Tool** (self-grade of aicoachellavalley.org):
- Grade: B
- HIGH warning: AI Builder Workshops program status ambiguity ("Workshops will resume in 2026" unclear in April 2026 context)
- MED warning: Program section needed clearer status hierarchy

Both warnings addressed in this session via: status pill badges (Live / Paused / Planned), prog-dimmed card styling on paused and planned cards, revised workshop copy naming the Saturday Morning AI Summer Series as the active proposal to CSUSB ERC.

## Agent-Readiness Items Intentionally Deferred

- **Markdown for Agents** — requires Cloudflare Pro / Transform Rules (content negotiation on `Accept: text/markdown`). Deferred indefinitely on Free plan. Revisit if .org pitch or agent traffic materializes.

- **WebMCP** — deferred; requires interactive browser tools on .org to justify. Mirror .com when built.

- **DNS-AID** — DNS-layer agent discovery (draft spec). Deferred; no urgency on Free plan static site.

**Confirmed N/A (not gaps):** OAuth/OIDC discovery, oauth-authorization-server, oauth-protected-resource, auth.md, agent-skills/index.json — .org has no protected APIs and no .org-resident agent skills by design. Phone number in contactPoint — deferred pending Twilio routing (shared with .com).

---

## Post-Deploy Scan Results — 2026-04-23

After commit 70915fe deployed, re-ran both scans.

**Cloudflare** (isitagentready.com): 33 → 50, still Level 2
- Discoverability: 2/3 (unchanged — needs investigation)
- Content: 0/1 (Pro deferred)
- Bot Access Control: 2/2
- API/Auth/MCP: 0/6 → 2/6 (MCP server card + api-catalog credited)

**AICV AIO Tool**: B → B (same grade, different HIGH finding)
- Previous HIGH: program status ambiguity ✓ addressed
- New HIGH: wants top-of-page program status summary line  
  (pill badges are card-level; scanner wants hero-area banner)

## Next .org Cleanup Cycle (scoped, not today)

1. Add hero-area program status summary line (AIO Tool HIGH from April scan — pill badges are card-level; scanner wants hero-area banner)
2. ~~Fact-check `llms.txt` workshop count: "30+ workshops, 300+ participants in 2025"~~ ~~**RESOLVED 2026-07-21** (`ddeab7f`): reframed **"in 2025" → "since 2025"**~~ **SUPERSEDED — see the 2026-08-13 claim-sweep entry for the full chain.** (Date corrected 2026-08-13: this item said "2026-07-21"; `ddeab7f` is dated **2026-07-23**. The 07-23 date-correction entry above already re-dated that pass's HEADING and missed this line, so the wrong date survived here and was copied forward into the 2026-08-11 entry.) The reword fixed the tense and left both figures unsourced, which is why it came back. Now: the participant figure is **deleted** (unsourced, same class as "sold out"), and the count is **derived** from `src/data/events.json` and counts **sessions**, not workshops — no field distinguishes a workshop from a meetup, and inventing a taxonomy to justify an unsourced number is the trap. On `index.astro` it is a written constant guarded by a build assertion (its JSON-LD is `is:inline`); in `llms.txt` it is genuinely derived. See the 2026-08-11 events entry.
3. `404.html` eyebrow: "404 · Page Not Found" fits neither site eyebrow pattern (category label or brand/domain); cosmetic only
4. ~~`sitemap.xml` stale `lastmod`s (STILL OPEN as of 2026-06-20)~~ **CLOSED PERMANENTLY 2026-08-08.** `sitemap.xml` is now a generated route, not a file. Article `lastmod`s derive from frontmatter (`updated ?? date`) and cannot go stale. The four static-page `lastmod`s remain hand-set in `src/data/site-pages.ts` — that much is unchanged from before — but they are now the *only* hand-maintained values in the file, and `scripts/prepare-feeds.mjs` fails the build if a page in `public/` is missing from the manifest entirely. The class of bug where a whole page silently drops out of the sitemap is gone.
