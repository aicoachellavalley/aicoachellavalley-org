# org/ operational state

> Operational state only. Strategic state lives in `aicv-playbook/STATE.md`.

## Current

- Plain static HTML — no Astro, no build system
- Four main pages: `index.html` (~2280 lines), `events.html` (~1015 lines), `philanthropy.html` (~1100 lines), `404.html` (~440 lines). (`ai-readiness.html` was RETIRED in `e519554`; `philanthropy.html` added in `456dede` — both prior session, between the 2026-06-09 and 2026-06-20 entries below.)
- Supporting files: `sitemap.xml`, `robots.txt`, `llms.txt`, PDFs
- Agent endpoints: `/.well-known/api-catalog` (RFC 9727 linkset), `/.well-known/mcp/server-card.json`
- `_headers`: security headers on `/*` + `Link: </.well-known/api-catalog>; rel="api-catalog"` + CORS + Content-Type overrides for agent endpoints
- Deploy: auto-deploy on push to `main`; manual `wrangler pages deploy` available as fallback.
- Zone: Cloudflare Free plan. Markdown for Agents NOT enabled — requires Cloudflare Pro / Transform Rules; deferred (see Agent-Readiness below).

## Functional role

Community and nonprofit face of AICV. Mission, programs, AICV Pledge, events, D3 interactive node graph. Audience: grants officers, community partners, workshop alumni, valley residents. Distinct from .com which is the agent-native intelligence layer.

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

## D3 Node Graph

Live on homepage. Fetches `https://aicoachellavalley.com/nodes.json` (CORS-enabled) and renders ~80 nodes in zone bounding boxes for 9 cities + Valley Wide + Adjacent bands.

### Known debt — ZONE_MAP / SUB_MAP drift

`ZONE_MAP` and `SUB_MAP` are hardcoded in `index.html` and were last synced at commit `2ab7408` (civic-infrastructure node, ~2026-03-30). Any nodes added to `.com`'s nodes.json after that commit will fetch successfully but render unpositioned because they won't appear in ZONE_MAP. Long-term fix: auto-sync from nodes.json at deploy time, or have .com publish enriched nodes.json including zone/subcategory metadata. Separate architectural session — do not attempt manually.

### Known debt — silent fetch failure

The graph fetch uses `.catch(console.warn)` only. A failed fetch produces a blank SVG with no user-visible error. Should eventually render a visible error state.

---

## Programs section (as of 2026-04-22)

> SUPERSEDED 2026-06-20: AI Builder Workshops are now **Live** (homepage pills read Live · Planned · Live) — workshops resume July 1, not paused. The card structure below is still broadly accurate; the *paused* status is not. See the 2026-06-16 → 06-20 entry.

Three cards:
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

HEAD at `1a52d78`. Commit arc from `adcf16a` forward (all live):

### Commits (most recent first)

- **1a52d78** — feat: rebuild /philanthropy — "Philanthropy 3.0". Prose wall → locked sourced copy + prescriptive design. Hero "Philanthropy 3.0 starts here." (terracotta-italic accent). Two DIFFERENTIATED on-ramp cards: CV Giving Day (warm terracotta wash / "give now" / heart icon → cvgivingday.org) and Desert Community Foundation (dusk navy / "go deeper" / columns icon → desertfoundation.org). 7-question icon-led FAQ ACCORDION (chat-bubble glyphs). Added `FAQPage` JSON-LD (7 Q&A, answers parity-matched to DOM verbatim) alongside the WebPage node. Inline-SVG icons (currentColor, no dependency). Sourced figures: $3M+ raised by CVGD over 4 yrs / $1M single-day first in 2026 / 149 orgs / 200+; DCF $121M AUM / Charity Navigator 4-star / $25M+ distributed / since 1999, CCF-seeded. CVGD url corrected cvgd.org → cvgivingday.org. Footer "age of AI" lines → ecosystem framing. Meta/OG updated to "Philanthropy 3.0".
- **ef61af3** — feat: propagate six-item nav across all four pages. Unified menu everywhere: **Philanthropy · Programs · Events · The Pledge · About · Intelligence Network ↗**. "Get Involved" removed from all nav/drawer/footer menus (the `#get-involved` CTA *section* stays on the homepage). Philanthropy is FIRST and the nav CTA (`.nav__cta` button on pages where it isn't current; on philanthropy.html the active state wins). Per-page anchor forms preserved (homepage bare-hash, sub-pages back-ref). Active states: Events on events.html, Philanthropy on philanthropy.html. Nav is inlined per-page (NOT a shared include) → multi-file edit. Footer Navigate keeps its fuller labels + Philanthropy + Events − Get Involved.
- **bf238dd** — fix: homepage hero H1 break (`display:block` on `.accent` → "AI Startup Ecosystem" on its own line, graceful mobile wrap) + Partners restructured from stacked text to two side-by-side cards (`.partners-grid`/`.partner-card`). Subhead font confirmed working-as-designed (DM Sans 300, same as body) — no change.
- **54933cb** — refactor: card-ify /events Tickets band. Labeled groups (Single Session / Season Pass) + season tier visually distinguished (warm terracotta tint + accent). Replaced run-on prose divider with eyebrow labels.
- **fea4257** — refactor: tighten /events layout + design pass. 5 bands → 4 (hero / indigo featured-event anchor / tickets / combined Series+Location tail). Dusk treatment moved to the featured July-18 band as the visual anchor; uniform type; tighter rhythm; iframe 450→620px to surface the Luma registration affordance in the narrower column. Removed orphaned `checkout-button.js`.
- **5a6af69** — feat: rebuild /events into the Idea Labs conversion landing page. Replaced calendar-only stub with hero + in-page Luma event iframe (`evt-5czB0wpW6R66spG`, July 18, 10am–1pm, CSUSB ERC) + four-tier ticket ladder (GA $25 / Premium $75 online; GA Pass $100 / Premium Pass $300 in-person). `EventSeries` schema upgraded with a dated `subEvent` `Event` (offers). New asset `idea-labs-cover.png` (OG). llms.txt + sitemap refreshed.
- **adcf16a** — feat: reframe homepage identity → **"The Coachella Valley's AI Startup Ecosystem"** (infrastructure demoted from identity to method). Subhead "AI is making founders out of everyone. This is where we build." Why-Now band rewritten (founder-barrier thesis); FAQ Q1/Q3/Q4/Q7/Q8 reframed + new Q13 → **13-question FAQPage**, schema + DOM in sync. Title trio, 3 meta descriptions, footer, Org/WebSite schema descriptions, Programs card 3 aligned to "agentic intelligence network" + LLMs.

### Current page truth (as of 2026-06-20)

- **index.html** — anchored on "The Coachella Valley's AI Startup Ecosystem". H1 break + Partners as two cards. FAQPage now 13 questions. Programs pills read **Live · Planned · Live** (AI Builder Workshops are **LIVE / resuming July 1**, NOT paused — supersedes the 2026-04-22 "paused" note below).
- **events.html** — the **Saturday Morning AI: Idea Labs** conversion page (NOT calendar-only — that 2026-06-09 description is superseded). Featured event `evt-5czB0wpW6R66spG`, July 18; four-tier pricing; `EventSeries` + dated `Event` subEvent schema; in-page Luma embed (height 620).
- **philanthropy.html** — "Philanthropy 3.0" (see `1a52d78` above). Replaces the retired `/ai-readiness`.
- **404.html** — branded chrome, six-item nav matching the others.

### Agent surfaces (as of 2026-06-20)

- `/sitemap.xml` — three URLs: homepage, `/events` (lastmod 2026-06-16 ✓), `/philanthropy` (lastmod 2026-06-11 — STALE, page rebuilt 2026-06-19). Homepage lastmod still 2026-04-22 — STALE (page reframed/polished, never bumped). No `/ai-readiness` entry (correctly removed).
- `/llms.txt` — `/events` entry = Idea Labs series; `/philanthropy` entry = agentic-philanthropy position. Both current. No ai-readiness entry.
- Two JSON-LD blocks now on philanthropy.html (WebPage + FAQPage); homepage @graph FAQPage = 13 Q.

### Traps logged this arc (see project memory `project_aicv_agent_readiness.md`)

- **CF email-obfuscation parity trap** — Cloudflare rewrites visible-DOM emails into `__cf_email__` spans but leaves JSON-LD untouched; run schema↔DOM parity on SOURCE, not CDN-served HTML.
- **Source-order CSS cascade trap (caught 3×)** — these single-file pages define some base layout rules AFTER their `@media` blocks / modifier rules, so a later base rule silently wins; put responsive/modifier overrides AFTER the base rule (or use a compound selector). Render-check mobile after any responsive CSS add.

### Queued (record in canon, non-urgent)

- **Shipment 4** — `/network` D3 page + homepage static preview + add "Network" to the nav (the six-item menu is built to take it).
- **AIQnA-as-Program-2** — strategy conversation.
- **DCF + CV Giving Day agentic rebuilds** — the bigger play; `/philanthropy` is now their front door.
- **events GA phone walk-through** — register for July 18 GA on the live page to confirm no wallet-verification wall (only-Sat, Monday-critical).
- **Backlog** — homepage OG-image still `sat-tedx.png` (swap); dead CSS on events/philanthropy (orphaned `.three-col-grid` etc.).

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
