# org/ operational state

> Operational state only. Strategic state lives in `aicv-playbook/STATE.md`.
> **Fresh session? Read `HANDOFF.md` first** (tight orientation), then this file for full detail. Current HEAD: `f86f83e` (2026-07-01).

## Current

- Plain static HTML — no Astro, no build system
- Four main pages: `index.html` (~1770 lines — down from ~2280 after the D3 graph removal), `events.html` (~1015 lines), `philanthropy.html` (~1100 lines), `404.html` (~440 lines). (`ai-readiness.html` was RETIRED in `e519554`; `philanthropy.html` added in `456dede` — both prior session, between the 2026-06-09 and 2026-06-20 entries below.)
- Supporting files: `sitemap.xml`, `robots.txt`, `llms.txt`, PDFs
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
2. Fact-check `llms.txt` workshop count: "30+ workshops, 300+ participants in 2025" — verify against current program truth
3. `404.html` eyebrow: "404 · Page Not Found" fits neither site eyebrow pattern (category label or brand/domain); cosmetic only
4. `sitemap.xml` stale `lastmod`s (STILL OPEN as of 2026-06-20): homepage = 2026-04-22 (should be 2026-06-16 — reframed/polished, never bumped); `/philanthropy` = 2026-06-11 (should be 2026-06-19 — rebuilt). `/events` 2026-06-16 is correct. Bump on next touch of each page.
