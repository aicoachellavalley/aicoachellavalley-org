# aicoachellavalley-org

Source for **aicoachellavalley.org** — the civic / nonprofit face of
AI Coachella Valley. Pure static HTML; no build step.

## What this serves

The `.org` surface: pledge page, programs, node graph visualization,
and the public-facing nonprofit identity under fiscal sponsor Desert
Community Foundation. Companion to `.com` (the agent-native commercial
surface).

## Stack

| Layer | Tech |
| :--- | :--- |
| Framework | Static HTML / CSS / minimal JS |
| Hosting | Cloudflare Pages |
| Build step | None |
| Auto-deploy | push to `main` |

## Agent endpoints

- `/llms.txt` — org-level summary (canonical org pitch)
- Headers set explicit `Content-Type: text/plain; charset=utf-8` for
  `llms.txt` via `_headers`.

## Architecture notes

- **WebMCP** — deferred by design. `.org` is a static civic page with
  no interactive tool surface that would justify exposing WebMCP
  tools. Mirror `.com` when and if a real action warrants it.
- **Schema** — Organization / NGO JSON-LD `@graph` in `index.html`,
  `sameAs` cross-links to `.com` and `@CoachellaAI`.

## Related

- **aicoachellavalley.com** — agent-native commercial surface
  ([repo](https://github.com/aicoachellavalley/homepage))
- **AI Coachella Valley** — [aicoachellavalley.org](https://aicoachellavalley.org)
