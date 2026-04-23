# org/ operational state

> Operational state only. Strategic state lives in `aicv-playbook/STATE.md`.

## Current

- Plain static HTML — no Astro, no build system
- Two main files: `index.html` (~1970 lines), `events.html` (~940 lines)
- Supporting files: `sitemap.xml`, `robots.txt`, `llms.txt`, PDFs
- Cloudflare Pages — **manual deploy** (not auto-deploy)
- Deploy: `cd ~/Projects/org && npx wrangler pages deploy . --project-name aicoachellavalley-org`
- Zone: Cloudflare Free plan. Markdown for Agents NOT enabled — not justified given agent traffic levels on this property.

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

Three cards:
1. **AI Builder Workshops** (Currently paused) — hosted at CSUSB ERC Palm Desert, resumes 2026, Luma signup https://luma.com/aicv
2. **AI Talent & Job Board** (Planned initiative) — not yet live, expected when .com intelligence layer matures
3. **AICV Intelligence Layer** (LIVE) — "Built for agents. Powered by humans." Links to aicoachellavalley.com

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

- **Markdown for Agents / Cloudflare Pro upgrade** — deferred ~2 weeks. Revisit if pitch activity or agent traffic on .org materializes. Current rationale: .org serves human institutional stakeholders; the structured intelligence layer and agent corpus live at .com.

- **WebMCP** — deferred to same dedicated session scheduled for .com. Will mirror .com's implementation when built.

- **OAuth/OIDC discovery** + **OAuth Protected Resource** — not applicable. .org has no protected APIs by design.

- **Phone number in Organization schema contactPoint** — deferred pending Twilio routing project (shared with .com).

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

1. Investigate Discoverability 2/3 gap — compare .com llms.txt  
   implementation against .org's, identify missing signal
2. Add hero-area program status summary line (AIO Tool HIGH)
3. Revisit Markdown for Agents + Pro upgrade when .org pitch  
   traffic materializes
