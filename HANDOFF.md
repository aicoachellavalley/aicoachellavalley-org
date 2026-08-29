# HANDOFF — aicoachellavalley.org

> Session-close orientation for a fresh session. Read this, then `STATE.md` for full detail. Everything below is reconstructable from disk + git; this is the fast path.

## ⚠ READ THIS FIRST — the only item with an external clock

**AI TINKERERS GLOBAL HACKATHON — SEPTEMBER 12, 2026. Coachella Valley is
CONFIRMED as a host city. THERE IS NO VENUE.**

Candidate: **The Shops at Palm Desert.** Not booked, not confirmed.

⚠ **This is NOT ON DISK anywhere** — not in `events.json`, not in any repo, not
in a gate. It exists in the founder's head and now in this paragraph. Nothing
else in this file has a deadline; every other open item waits patiently and
costs nothing by waiting. This one has a fixed date and a lead time that is
already short.

**If you are a fresh session and you do exactly one thing, make it this.** The
whole list below is design-system and schema work on a site that is currently
correct and shipping. None of it competes.

Related and already true on disk: `/events` renders a dated record of 42
sessions from `src/data/events.json`, and every one of them was at the
Entrepreneurial Resource Center in Palm Desert. A September event at a different
venue is what closes the "across the valley" forward claim in
`src/data/positioning.ts` — see that file's comment.

---

## Where things stand (2026-08-19)

- **Last commit that changed the SITE: `ef810a2`** · branch `main` · **clean
  tree, pushed, deployed, live-verified.** `origin/main` matches. At the time of
  writing HEAD *is* `ef810a2`.
- **`HEAD` may be one or two `docs(handoff):` commits ahead of that**, and this
  file cannot name the commit that creates it. **The check that terminates:**
  `git log --oneline ef810a2..HEAD` should list *only* `docs(handoff):` commits.
  **If it lists anything else, this file is stale — read STATE.md and `git log`
  instead, then fix this pointer.**
- **playbook** at `c4b3448`, clean and synced. Strategic state, house rules
  (§7.1–§7.17), and the forward queue live there.
- ⚠ **THERE IS A BUILD STEP. `npm run build` before every push.** `.org` is an
  Astro hybrid; `dist/` is the deploy directory. Pages serves the last good
  build behind a failure, so a broken build looks like "nothing happened".

### SEVEN GATES, all green — six print a line

⚠ **The block below is a 2026-08-19 SNAPSHOT and four of its numbers have since
moved.** Current, as of 2026-08-28: `@graph` **6** (not 7 — the homepage FAQPage
was removed), coverage **13/13** routes with metadata for **7** (`/faq` was
added), shared chrome **53** rules (the FAQ card component was promoted), and the
events line now reads "all **5** session counts under src/ agree" because that
sweep was widened from one file to the whole source tree. The gate SECTIONS are
still seven — a transitional eighth existed in a working tree for one session and
was deleted without ever being committed. Re-derive rather than trusting either
list.

```
✓ identity      index.astro founder node matches people.json (9 fields, derived)
✓ events        42 sessions / 6 series; index.astro count agrees; @graph 7
✓ coverage      12/12 routes (4 static + 8 astro); metadata for 6
✓ positioning   7 footer carriers agree with src/data/positioning.ts
✓ shared chrome 43 rules owned by shared.css; 6 surfaces carry no duplicate
✓ font coverage DM Sans + Bebas Neue + EB Garamond on all 7 rendering surfaces
```

⚠ **SEVEN and SIX are both right, and the difference will trip you.**
`scripts/prepare-feeds.mjs` carries **seven numbered gate sections** (1 coverage,
2 metadata, 3 identity, 4 events, 5 positioning, 6 shared chrome, 7 font
coverage). Only **six print a `✓`** — section 2 does its work silently and folds
its result into the coverage line ("metadata verified for 6").

So "six gates failed to run" and "one gate is missing" are both wrong readings of
a normal build. Count sections with
`grep -n "^// ── [0-9]" scripts/prepare-feeds.mjs`, not by counting ticks.
*(An earlier draft of this file asserted "six, not seven" and was itself
imprecise — re-derive rather than trusting either number, including this one.)*

### Surfaces and counts (from disk, 2026-08-19)

- **Seven rendering surfaces**: `src/pages/index.astro`, `src/pages/events.astro`,
  `public/philanthropy.html`, `public/pledge.html`, `public/partner.html`,
  `public/404.html`, and `src/layouts/NewsLayout.astro` (which renders 34 pages).
- **32 articles**, `src/content/news/*.mdx`, **0 drafts**. `/news` lists 32.
  Sitemap 38 URLs. 40 built HTML pages.
  ⚠ Not 33 — `placeholder.mdx` was deleted 2026-08-17.
- **CSS**: 43,015 bytes inline across the six + `public/styles/shared.css`
  16,467 + `src/styles/chrome.css` 5,270 + `src/styles/news.css` 27,969.

### What shipped 2026-08-17 → 2026-08-19

| commit | what |
|---|---|
| `6f5917b` | copy pass — retired the ecosystem claim; **three** live taglines converged to one |
| `67bb464` | NUL byte out of `prepare-feeds.mjs` (it made the file invisible to `grep`) |
| `8b3764d` | last InformedIE mention removed |
| `400bcef` | **gate 5** — `src/data/positioning.ts`, one source, seven verified copies |
| `18e87ec` | **Pass 1** — CSS extraction to `public/styles/shared.css`, zero visual change |
| `d0d0af7` | **Pass 2** — Bebas on document structure sitewide; `chrome.css` imports `shared.css`; adds **gate 7** (font coverage) |
| `5c246e1` | two face reversals — `.news-card__title` → Bebas, `.series__name` → EB Garamond |
| `ef810a2` | `Organization.logo` — agents had no AICV mark at all |

**Pass 1** moved 41 byte-identical chrome rules + the token block into one file.
Four static pages `<link>` it; `index.astro`/`events.astro` inline it via
`?raw` + `set:html` so `is:inline` survives. Verified by a computed-style
differential, 18 comparisons, **zero non-size changes**.

**Pass 2** put Bebas on every `h1/h2/h3`, `.faq-q`, and article body `h2`/`h3`.
30 comparisons; the only properties that moved were font-family, font-weight,
line-height, letter-spacing, and the article-`h2` margins.

---

## ⚠ THE FACE RULE — verbatim, because it was reversed twice

> **Bebas where the text IS the thing. EB Garamond where the text LABELS
> something else.**

Recorded at the site in `src/pages/index.astro` (the `.news-card__title` rule)
and in `public/styles/shared.css` (the `h1, h2, h3` rule). It supersedes the
earlier "document structure vs component label" formulation, which produced one
wrong answer in each direction:

- `.news-card__title` was serif because it looked like a component label. It is
  **the article title at card size** — the text IS the thing. Now Bebas.
- `.series__name` went Bebas because it is an `<h3>` and inherits the base. It
  **labels a session list** and rendered louder than the session titles beneath
  it. Now EB Garamond.

**Article titles must agree on all four surfaces that render one:**

| surface | class | file |
|---|---|---|
| `/news` | `.news-item__title` | `src/styles/news.css` |
| `/news/<slug>` | `.article__title` | `src/styles/news.css` |
| `/author/sat-singh` | `.news-item__title` | `src/styles/news.css` |
| homepage cards | `.news-card__title` | `src/pages/index.astro` |

All four are Bebas as of `5c246e1`. **A headline that changes typeface when you
click it reads as a bug** — that is the whole reason.

Serif is kept by DECLARING it, so those elements are immune to the base rule
rather than exempted from it: `.callout` (pairs with `blockquote` — same
treatment, do not split them), `.pledge-*`, `.prog-title`, `.principle__title`,
`.onramp-name`, `.pform-success__title`, `.series__name`, `.nav__mark`,
`.footer__name`, `.footer__tagline`, `.founder-sig`.

---

## ⚠ TRAPS CREATED THIS MONTH — what each looks like when it fires

**1. NO BACKTICKS in the homepage/events CSS block.**
Since Pass 1 that CSS lives inside a JS template literal
(`set:html={sharedCss + ...}`), so a backtick ANYWHERE in it — including inside
a CSS comment — terminates the string.
*What it looks like:* the build dies with a message naming a CSS class as a
function, e.g. `".series__name is not a function"`. Nothing mentions backticks.

**2. NEVER pipe a build to `grep`/`head`/`tail`. THE EXIT CODE IS THE TRUTH.**
*What it looks like:* the six gate lines print `✓`, you report green, and astro
failed afterwards and emitted no page. **Three instances now.** Run
`npm run build > log 2>&1; echo $?` and read the code.
*How it was caught the last time:* the differential reported `/index.html` with
**-219 elements and `body` falling to Times** — what a missing page looks like.

**3. The `.hero` / `.hero::before` NAMING COLLISION.**
Different components share one name across surfaces: index's photographic hero
vs the dark heroes. Also `.hero .h1` and `.section`.
⚠ **The rename is STEP ONE of Pass 3.** Edit `.hero` for the homepage
restructure first and the differential correctly flags a regression on **four
pages nobody touched**, and you can no longer separate your change from the
collision's fallout. Detail in playbook STATE.md.

✅ **`.faq-*` is RESOLVED** (2026-08-28, `71b66bd`) and pass 3 no longer owns it:
philanthropy's card FAQ is now `shared.css`'s `.faq-cards` / `.faq-card` /
`.faq-card__{q,icon,txt,plus,a}`, and `index.astro` keeps `.faq-*` untouched.
⚠ The lesson generalises to the four rows left: **gate 6 would not have caught
it.** It forbids re-declaring a shared rule IDENTICALLY, and these differ — so
promoting under a shared name passes the duplication test while silently
restyling the other surface. Measured before the rename: +40.2px per homepage
FAQ entry, +563px on the section, with `index.astro` untouched.

⚠ **`.hero__subhead` is NOT a collision** — measured 2026-08-28, five of its
seven declarations are byte-identical across the four surfaces that declare it,
and only `margin-top`/`margin-bottom` diverge (`--s-3` vs `--s-2` on partner).
That is one-value drift and belongs with the pass-1 merges below, not here.
`shared.css`'s header comment still mis-files it; playbook STATE.md has the
measurement.

**4. The COLLAPSE PLATEAU on article `h2` margin-top.**
The paragraph above owns a 40px bottom margin and collapses against it. **Below
~0.95em the heading's margin-top does nothing** — 0.9em, 0.8em and 0.7em all
render 39px above at 1280, and every value renders 41px at 375.
*What it looks like:* you lower the number, rebuild, and the page is identical.
It neither worked nor failed. Comment is at the rule in `src/styles/news.css`.

**5. Two older ones still live.** A `grep -c` counts LINES, not occurrences —
built feeds put all entries on one line and read as "1". And
`wrangler pages deployment list` is how you tell a failed build from a **missed
webhook**: no deployment for the commit means nothing was queued, and the fix is
`git commit --allow-empty` — never `wrangler pages deploy`.

---

## OPEN — with the reason each is parked

**Pass 3 — homepage cards-and-rail restructure; spacing tightened on the other
five.** Blocked on nothing except the rename above being step one.
**Carries the five merges deferred from Pass 1** (each is a real visible change,
which is why they could not ride in a refactor whose success condition was that
nothing changed). Values verified on disk 2026-08-19:

| merge | current state | target |
|---|---|---|
| `.eyebrow` margin-bottom | `--s-2` on 404/index/philanthropy, `--s-1` on partner/pledge | **`--s-2`** (ink gap 12px vs 4px under a 68px heading) |
| `.h2` margin-bottom | `--s-3` on index/philanthropy/news.css, `--s-2` on pledge | **`--s-3`** (0.55× the heading, matches news.css) |
| `.footer__desc` | index `lh 1.65` + `max-width 240px`; others `lh 1.7`, no max-width | **`lh 1.7`, KEEP `max-width: 240px`** — it is load-bearing (240px/6 lines vs 357px/4) |
| `.footer__col-label` | index `0.2em`, chrome `0.15em` | **`0.15em`** |
| `.btn` transition | index/partner include `border-color`+`color`; chrome does not | **include them** |

**✅ FAQ — DONE 2026-08-28 (session B).** The homepage adopted the
`.faq-cards` component, dropped from fourteen questions to **four** rendered
from `src/data/faq.ts`, lost its FAQPage node (gate 4's homepage `@graph`
invariant is now **6**, not 7), and gained an "All fourteen questions →" link to
`/faq`. `src/data/faq.ts` is the single source; `index.astro` declares no FAQ
strings and no `.faq-*` rules.

The four are selected **by object reference**, not by index and not by text —
they are declared once as named consts and appear in both `faq` and
`homepageFaq`, so the two arrays cannot disagree about content. Which four, and
the measurement behind the choice, is argued at that export.

The transitional parity gate that held the two copies together was **deleted
with them**, as its own header said it should be. It never reached a commit.

**Hero + FAQ COPY still argues the retired ecosystem claim.** Already
enumerated, needs a founder editorial pass — it is prose to be rewritten, not
strings to be swapped. The list is in `STATE.md` under the positioning entry:
H2 "What we're building.", H2 "For the first time, the valley has a shot." and
its two paragraphs, the FAQ answer ending "…an actual AI Startup Ecosystem",
and the FAQ "How is AICV different from other economic-development efforts".

**Vector mark.** Blocks four things at once: a real `favicon.svg` (today it is a
volt rect with the letters "AI" in Georgia — artwork imitating an icon), clean
16/32/180 icons generated from paths, `.nav__mark` inlining the same paths so
the tile and favicon become ONE object, and the web manifest. The four supplied
PNGs are AI-generated raster, no vector, no alpha, three of four noisy
(15k–19k unique colours in two-colour art), volt off-token by 45–65 and
inconsistent between files, and both marks lose the hairline join and the
floating tittle at 16px. Detail and the fallback are in playbook STATE.md.
⚠ **When real assets land, ship under the EXISTING filenames** — 35 head
references across seven surfaces then change zero times.

**Lowercase-vs-caps brand ruling.** Now LIVE rather than hypothetical:
`Organization.logo` declares the lowercase `aicv` wordmark while every rendered
surface is caps (`.nav__mark` = "AI", `.footer__name` = "AICV"). ⚠ **Settle it
BEFORE commissioning the vector — it changes what gets made.**

**OG card generator.** Unblocked: gate 5 and `src/data/positioning.ts` exist, so
a card can regenerate from the positioning line. Mechanism proposed and ruled:
`opentype.js` → paths → `sharp` (already installed) → PNG, via an Astro endpoint
at `src/pages/og/*.png.ts`, with the Bebas TTF committed. ⚠ **`sharp` cannot be
used with SVG `<text>`** — tested: three different requested fonts, including one
that does not exist, produced byte-identical output. Silent substitution.

**`core/api` — 1 unpushed commit** (`11c0493`, 2026-07-09, `worker.js` +258/−6).
Memory says it is deployed. **Verified tonight: ahead 1, behind 0, clean.** If
both are true, a clean clone-and-deploy would roll production back 258 lines.
⚠ **Establish which is true before pushing** —
`wrangler deployments list --name aicv-api`, or compare the live `/analyze`
response shape. Do not push first and check after.

**`BRAND.md:750` still claims `.org` has no build step.** Verified still present
2026-08-19: *"`.org` has no build step — push equals publish, byte for byte."*
False in both halves. Queued as its own pass with two other stale hits; not
swept opportunistically.

---

### History below this line

Entries from here down are the **July arc (2026-06-30 → 2026-07-25)**, kept for the rulings and traps they record. They predate the Astro rebuild, `/news`, `/author`, `/pledge` and the pine/volt palette — **60 commits** separate `15d1d7a` (the pointer this file carried until today) from `fe97e34`. Where a July entry contradicts the block above, the block above wins.

- ⚠️ **SUPERSEDED — the guard below says "no blog/news/article section on `.org`".** That ruling ended with the news surface: `/news` shipped 2026-08-08 and the 32-piece port landed 2026-08-14. Written content living on SunshineFM is no longer the whole picture. **Do not act on that guard.** The other two guards in the same entry (Informed IE, "daily AI radio") still stand.
- **AI BEAT BRIDGE (2026-07-25) — SHIPPED + edge-verified** (`9182500` + `15d1d7a`): Sat writes the **AI beat for the Inland Empire**; `.org` now acknowledges it in the founder bio and points OUT to `https://sunshine.fm/` (URL reconned from the sunshine-fm repo's own canonical — the beehiiv link in the footer is the *newsletter*, a different thing). Person schema gained `@id` + `description` + `sameAs`. ⚠️ **THREE STANDING GUARDS:** (1) **no blog/news/article section on `.org`** — written content lives on SunshineFM by design; (2) **do NOT add "Informed IE"** (closed beta) or the Journalism Hub / grant to prose or schema — a five-word edit is queued for when it goes public; (3) **do NOT restore "daily AI radio"** — it was aspirational; the real cadence is **weekend radio for Palm Springs Coachella**, swept across bio + FAQ schema + FAQ DOM (parity verified). Geography ruling: Rancho Mirage = Sat's base, Palm Springs Coachella = SunshineFM's market — both true, don't collapse. See STATE.md `2026-07-25`.
- ⚠️ **DATE DISCIPLINE (2026-07-23):** this thread spans multiple days (07-15 → 07-23); several couriers kept saying "today is July 21" after it went stale and it got stamped into `last-modified`/sitemap/STATE before anyone checked. **Verify dates against the system clock + `git log --format='%ai'`, not courier prose** — same verify-don't-infer discipline as paths and counts. Corrected this pass: `last-modified` index→07-23, events/philanthropy/partner→07-22; sitemap `/`→07-23, `/events`+`/philanthropy`→07-22; the "positioning pass" STATE entry re-dated 07-21→**07-22** and the cards entry →**07-23** (git-verified). See STATE.md `2026-07-23 — Date correction`.
- **PROGRAMS CARDS + STATS (2026-07-21, latest) — SHIPPED + edge-verified** (`84452bf` closing-align, then `0d55533` + `ddeab7f`): three Programs cards now carry a **product screenshot** each (visual proof) via `.prog-shot` (16/9 `object-fit:cover` + `object-position:top`, **`height:auto` load-bearing** vs the HTML height-attr overriding aspect-ratio). Intelligence Network copy trimmed 2 paras → 1 for balance. Images optimized 745KB→84KB, committed as clean hyphenated names — **4 space-named source PNGs (incl. off-spec `mirage homepage.png`) left UNTRACKED, Sat deletes.** **AIQnA screenshot = Sat's Option A** (the real "for local media / founding partners" homepage; alt matched to it — don't revert). Workshop retrospective **"in 2025"→"since 2025"** swept 4 surfaces (figures kept) — resolves the fact-check cleanup item. See STATE.md `2026-07-21 — Programs cards`.
- **POSITIONING PASS (2026-07-21) — .org is now the ecosystem FRONT DOOR** (`1e50309` → `073f6e0`, 5 content commits, edge-verified): homepage reframed from "nonprofit website" to the canonical front door to the CV AI startup ecosystem for humans + AI systems. Message everywhere: AICV **builds, connects, documents** the ecosystem — **NOT** claims to BE it (H1 kept; new closing "one part of a growing regional network" does that work). Changes: nav **"Programs"→"Build" LABEL ONLY** (⚠️ `id="programs"`/hrefs deliberately UNCHANGED — hash anchors can't redirect + off-repo citations; **do not rename the id**); closing section → "Start Here. Build From Here." invitation, **Partner button removed** (`/partner` PARKED for v2, do NOT delete/link); metadata + Org/WebSite schema + FAQ Q1/Q3 + llms.txt reframed (**NGO + DCF facts preserved**). **⚠️ PHANTOM SWEEP:** sprints / office hours / "founder programs" NEVER existed (same class as job board + season passes) — swept from all surfaces; informal meetups deliberately NOT listed (they surface via the Luma calendar → /events); **do-not-re-add guard.** **`.com` language alignment queued** (separate repo). See STATE.md `2026-07-21 (positioning pass)`.
- **FUNDING-COPY CORRECTION (2026-07-21, later) — SHIPPED + edge-verified** (`596246c` + `3a7c9a5`): (1) **ERC funding date fixed** — began **July 18** (with the first workshop), not July 1; the morning pass's "genuine July-1 funding date" assumption was wrong. (2) **IEJIH+F grant → PRIVATE per Sat** (real/active Apr 9 2026 approval, Jul 1 2026–Nov 1 2027 term, but ⚠️ **do NOT re-advertise**): removed from all three public spots — funding FAQ (schema+DOM), Academic partners card, llms.txt partners. (3) **AI Talent & Job Board removed from .org** (llms.txt ×3, "three layers"→"two") — **relocating to Tinkerers CV pages, so its reappearance there is expected, not a straggler.** **Flagged, left for Sat:** the generic "AI-adoption research / Inland Empire / journalism institutions" pathways clause in the institutional-partnerships FAQ (doesn't name the grant, but adjacent). See STATE.md `2026-07-21 (later)`.
- **POST-EVENT TRUTH PASS (2026-07-21) — SHIPPED + edge-verified** (`bf09bc4` → `e3b028f`): two agent-facing truth bugs fixed once July 18 passed. (1) **"resuming July 1, 2026" workshop claim was stale/wrong** (conflated ERC funding date with launch) → corrected to "launched July 2026, running monthly through December 2026" across index.html schema (×4) + llms.txt (×2). (2) **events.html schema reshaped — the queued post-7/18 item, now DONE:** dropped the past July-18 `subEvent` + offers, renamed `EventSeries` → "AI events in the Coachella Valley" (single node, NOT CollectionPage). **Flagged for Sat, not touched:** the two funding "beginning July 1" FAQ clauses (genuine fiscal dates — decide if funding tense wants updating too); **llms.txt still lists the RETIRED "AI Talent & Job Board (planned)"** (straggler, needs scoped removal); events calendar now shows "No Upcoming Events" (honest — July 18 past, no new Luma dates yet). **Dead-CSS sweep still queued.** See STATE.md `2026-07-21`.
- **IDENTITY CHANGE (2026-07-15, third pass) — /events is now the AI events CALENDAR page** (`69a1fdf` + `88ea7b6` + `fb36582`, live-verified): lean frame (H1 + one paragraph) around a centered Luma **calendar** embed (`cal-123s6rDFxeKQjJd` = luma.com/aicv, `?lt=light`, h560) holding workshops/meetups/boot camps/conferences. Old hero/Next Lab band/perks/Series/Location sections all gone; meta/OG/title + llms.txt moved to the new identity (llms.txt had still carried the false season-pass + six-workshops claims — removed). **og:image still the "NO CODE" art — flagged for Sat, replacement pending.** JSON-LD deliberately untouched; **post-7/18 schema commit scope EXPANDED: drop dated subEvent AND reshape schema to the general-events identity.** See STATE.md `2026-07-15 (third pass)`.
- **CORRECTION (2026-07-15, later) — the Season Pass NEVER EXISTED; section removed** (`43767a0`, live-verified): no $100/$300 passes were ever real — the page was advertising a false offer. The whole Tickets section is gone; **the page carries ZERO commerce; Luma is the sole ticketing surface.** Any older note saying "season passes kept" is superseded. **Follow-through SHIPPED after Sat approved wording** (`3f53c38` + `ddea7c7`): Series section → "Hands-on AI for the Coachella Valley." (no counts/timeframe, "monthly" kept deliberately); same count claim removed from the EventSeries schema `description` (string only — **subEvent/offers byte-identical through Sat 7/18**). /events is now fully evergreen outside the deliberate dated subEvent: zero commerce, zero count claims, nothing to sync with Luma.
- **Earlier same day — /events evergreen cleanup SHIPPED + live-verified** (`76665fb` → `719a634`): Luma embed is the canonical carrier of what's-next + registration; dated prose/meta gone; single-session tier cards gone (embed sells those). Luma iframe byte-identical throughout. **Two approved follow-ups wait until AFTER Sat 7/18:** (1) schema → pure `EventSeries` (drop dated subEvent + offers), (2) events.html dead-CSS sweep (now also includes the orphaned ticket classes + `.section`/`.wrap`). See STATE.md `2026-07-15` entries.
- **In flight (2026-07-01) — Partner intake form, STAGING** (`3434dbf` page + `f86f83e` backend): new `/partner` page + `functions/api/partner.js` Pages Function (D1 + Turnstile + honeypot; `.org`'s first Pages Function). **Live but inert-but-safe** pending Sat's dashboard bindings. **Do NOT treat as public yet** — the "Partner with AICV" CTA still points at the (obfuscated) mailto; Commit 3 repoints it + swaps the real Turnstile site key, and goes ONLY after the live close condition (submit → D1 row → key-gated read) passes. Full detail + Sat's ordered switch-ons in STATE.md `2026-07-01`. Turnstile keys = the shared AIQnA open item.
- **Latest (2026-06-30) — card legibility polish + tagline-cream revert SHIPPED + live-verified** (`9724b65` → `43c2e3f`): card ① gained a tagline (all three cards now title→tagline→body→CTA); featured CTA pills restyled to mirror `.pill-live` (cream/terracotta); featured tagline is now `--c-cream` (apricot one-off `#F7D9BF` reverted to the on-palette token, orphan hex gone — italic EB-Garamond keeps it distinct from the 80%-cream body). Row-level tonal variation still deferred. See STATE.md `2026-06-30` entry.
- **Programs reshape SHIPPED + live-verified** (`c4edf1f` → `3251fbe` → `ee4242a`): Programs cards are now **AI Tinkerers Coachella Valley · AIQnA · AICV Intelligence Network**, all Live. The **AI Talent & Job Board concept is RETIRED** — gone from cards, schema (`#service-job-board` deleted, `#service-aitinkerers`+`#service-aiqna` added), founder bio, and all schema descriptions. **Do not restore a talent/job board.** Workshops survive only as `#service-workshops` + FAQ Q3/Q9 + /events. New FAQ Q at #8 ("I already build with AI…"). See STATE.md `2026-06-30` entry for full detail. Dead CSS `.pill-planned`/`.prog-dimmed` left orphaned on purpose (backlog, tied to possible row tonal-variation).
- ~~**Four pages:** `index.html`, `events.html`, `philanthropy.html`, `404.html`.~~ **STALE — see the current surface inventory above** (six pages, two of them Astro, plus `/news` and `/author`). Still true: no `ai-readiness.html` (retired), no `/network` (never built; see below).

## What shipped 2026-07-23 (commit arc `adcf16a` → `6ecb093`) — HISTORY

1. **Homepage reframed** → "The Coachella Valley's AI Startup Ecosystem" (identity; infrastructure demoted to method). 13-question FAQPage.
2. **`/events` rebuilt** → "Saturday Morning AI: Idea Labs" conversion page (featured event `evt-5czB0wpW6R66spG`, July 18; four-tier pricing; Luma embed; EventSeries + dated Event schema). Then tightened + Tickets card-ified.
3. **Nav propagated** across all four pages → six-item menu: **Philanthropy · Programs · Events · The Pledge · About · Intelligence Network ↗**. "Get Involved" menu links removed (CTA section kept on homepage). Philanthropy is the nav CTA. Nav is **inlined per-page (not a shared include)** — nav changes are multi-file edits.
4. **`/philanthropy` rebuilt** → "Philanthropy 3.0" (differentiated on-ramp cards, inline-SVG icons, icon-led FAQ accordion + FAQPage JSON-LD, sourced figures).
5. **Homepage cleanup pass (subtraction):** hero now H1-only; "Two properties" band removed; **D3 node graph removed entirely** (homepage is now D3-dependency-free, no `.com/nodes.json` fetch); About/Founder section relocated to the page tail as a closing founder note.

## Shipment 4 was KILLED (important)

`/network` was **not built** — instead the existing homepage D3 graph was **removed**. A D3 graph isn't agent-legible; the node corpus lives on `.com`; "Intelligence Network ↗" is the honest pointer. **Do not build `/network`.** Zero `/network` references exist anywhere (verified).

## Queue (non-urgent) — ⚠️ THE JULY QUEUE, NOT RE-DERIVED SINCE

Several items below are known DONE (the post-7/18 events schema reshape, the dead-CSS sweep — `77b2fcd`). **Treat this list as a candidate list, not a worklist**: check each against STATE.md before acting on it. The only current commitments are in the `/news` block at the top of this file, and both are decisions rather than work.

- **AFTER Sat 7/18 (approved, scoped in STATE.md `2026-07-15`):** events schema → pure evergreen `EventSeries` (drop dated subEvent + offers); events.html dead-CSS sweep (cascade trap applies).
- **AIQnA-as-Program-2** — strategy conversation.
- **DCF + CV Giving Day agentic rebuilds** — the bigger play; `/philanthropy` is now their front door.
- **events GA phone walk-through** (Sat-only, Monday-relevant) — register July 18 GA on the live page, confirm no wallet-verification wall.
- **Backlog:** homepage OG-image still `sat-tedx.png` (swap); dead CSS on philanthropy (events dead CSS is now the scoped post-7/18 item above).

## Standing facts / traps a fresh session needs

- **Render-gate discipline:** every visual change is rendered desktop (1280) + mobile (375) via the preview tools and held for Sat's approval *before* commit, then post-deploy verified live. The **approval gate is the load-bearing half**; the branch is not always used — the 2026-08-15 pass ran on `main` (propose → approve → build → measure → commit → push → verify live). Branch when a change needs holding across sessions.
- ⚠️ **The Browser pane paints once per navigation.** A programmatic scroll then screenshot returns a blank frame, and the tool reports the pane as hidden rather than as stale. To see something far down a page, give the viewport enough height to contain it at load — do not conclude a page is broken from a blank capture.
- **Source-order CSS cascade trap (bit us 3×):** these single-file pages define some base layout rules *after* their `@media` blocks / modifier rules, so a later base rule silently wins. Put responsive/modifier overrides *after* the base rule (or use a compound selector). Always render-check mobile after adding responsive CSS.
- **Cloudflare email-obfuscation parity trap:** CF rewrites visible-DOM emails into `__cf_email__` spans but leaves JSON-LD untouched, and injects an `email-decode.min.js` script on live pages. Run schema↔DOM parity on the SOURCE file, not CDN-served HTML; expect one extra `<script>` live.
- **Protected pointers:** "Intelligence Network ↗" links (nav/drawer/footer → `.com`) and Programs card 3 are the honest pointers to the corpus — leave them.
- **Two-system workflow:** strategy/decisions happen in a separate Claude.ai thread; couriers come here as build instructions. Canon lives on disk (this file + `STATE.md` + git) precisely so a fresh session reconstructs context without the conversation history.
- **`_redirects`:** `/ai-readiness / 301` (retired page → home). **FAQ `.faq-a` = `70ch`** on purpose (reading measure, not a bug).
