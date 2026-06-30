# HANDOFF — aicoachellavalley.org

> Session-close orientation for a fresh session. Read this, then `STATE.md` for full detail. Everything below is reconstructable from disk + git; this is the fast path.

## Where things stand (2026-06-30)

- **Repo:** `aicoachellavalley.org` — the `.org` civic/nonprofit face of AICV. Static HTML, no build step, Cloudflare Pages, **auto-deploys on push to `main`**. Remote is `.org` (`git remote -v` → `aicoachellavalley-org.git`) — NOT `.com` (that's a separate repo, `aicoachellavalley/homepage`).
- **HEAD: `ee4242a`** · branch `main` · **clean tree, all pushed.** Safe to start fresh.
- **Latest (2026-06-30) — Programs reshape SHIPPED + live-verified** (`c4edf1f` → `3251fbe` → `ee4242a`): Programs cards are now **AI Tinkerers Coachella Valley · AIQnA · AICV Intelligence Network**, all Live. The **AI Talent & Job Board concept is RETIRED** — gone from cards, schema (`#service-job-board` deleted, `#service-aitinkerers`+`#service-aiqna` added), founder bio, and all schema descriptions. **Do not restore a talent/job board.** Workshops survive only as `#service-workshops` + FAQ Q3/Q9 + /events. New FAQ Q at #8 ("I already build with AI…"). See STATE.md `2026-06-30` entry for full detail. Dead CSS `.pill-planned`/`.prog-dimmed` left orphaned on purpose (backlog, tied to possible row tonal-variation).
- **Four pages:** `index.html`, `events.html`, `philanthropy.html`, `404.html`. (No `ai-readiness.html` — retired. No `/network` — never built; see below.)

## What shipped today (commit arc `adcf16a` → `6ecb093`, all live)

1. **Homepage reframed** → "The Coachella Valley's AI Startup Ecosystem" (identity; infrastructure demoted to method). 13-question FAQPage.
2. **`/events` rebuilt** → "Saturday Morning AI: Idea Labs" conversion page (featured event `evt-5czB0wpW6R66spG`, July 18; four-tier pricing; Luma embed; EventSeries + dated Event schema). Then tightened + Tickets card-ified.
3. **Nav propagated** across all four pages → six-item menu: **Philanthropy · Programs · Events · The Pledge · About · Intelligence Network ↗**. "Get Involved" menu links removed (CTA section kept on homepage). Philanthropy is the nav CTA. Nav is **inlined per-page (not a shared include)** — nav changes are multi-file edits.
4. **`/philanthropy` rebuilt** → "Philanthropy 3.0" (differentiated on-ramp cards, inline-SVG icons, icon-led FAQ accordion + FAQPage JSON-LD, sourced figures).
5. **Homepage cleanup pass (subtraction):** hero now H1-only; "Two properties" band removed; **D3 node graph removed entirely** (homepage is now D3-dependency-free, no `.com/nodes.json` fetch); About/Founder section relocated to the page tail as a closing founder note.

## Shipment 4 was KILLED (important)

`/network` was **not built** — instead the existing homepage D3 graph was **removed**. A D3 graph isn't agent-legible; the node corpus lives on `.com`; "Intelligence Network ↗" is the honest pointer. **Do not build `/network`.** Zero `/network` references exist anywhere (verified).

## Queue (non-urgent)

- **AIQnA-as-Program-2** — strategy conversation.
- **DCF + CV Giving Day agentic rebuilds** — the bigger play; `/philanthropy` is now their front door.
- **events GA phone walk-through** (Sat-only, Monday-relevant) — register July 18 GA on the live page, confirm no wallet-verification wall.
- **Backlog:** homepage OG-image still `sat-tedx.png` (swap); dead CSS (orphaned `.three-col-grid` etc. on events/philanthropy).

## Standing facts / traps a fresh session needs

- **Render-gate discipline:** every visual change is built on a branch, rendered desktop (1280) + mobile (375) via the preview tools, and held for Sat's approval *before* commit. Then commit → ff-merge to `main` → push → delete branch → post-deploy verify live.
- **Source-order CSS cascade trap (bit us 3×):** these single-file pages define some base layout rules *after* their `@media` blocks / modifier rules, so a later base rule silently wins. Put responsive/modifier overrides *after* the base rule (or use a compound selector). Always render-check mobile after adding responsive CSS.
- **Cloudflare email-obfuscation parity trap:** CF rewrites visible-DOM emails into `__cf_email__` spans but leaves JSON-LD untouched, and injects an `email-decode.min.js` script on live pages. Run schema↔DOM parity on the SOURCE file, not CDN-served HTML; expect one extra `<script>` live.
- **Protected pointers:** "Intelligence Network ↗" links (nav/drawer/footer → `.com`) and Programs card 3 are the honest pointers to the corpus — leave them.
- **Two-system workflow:** strategy/decisions happen in a separate Claude.ai thread; couriers come here as build instructions. Canon lives on disk (this file + `STATE.md` + git) precisely so a fresh session reconstructs context without the conversation history.
- **`_redirects`:** `/ai-readiness / 301` (retired page → home). **FAQ `.faq-a` = `70ch`** on purpose (reading measure, not a bug).
