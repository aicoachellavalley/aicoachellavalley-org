// ════════════════════════════════════════════════════════════════════════════
// THE POSITIONING LINE — one source, seven copies, one gate.
//
// Founder ruling 2026-08-16. Retired "Building the Coachella Valley's AI
// Startup Ecosystem" and, with it, two more lines nobody had noticed the site
// was also running (see STATE.md, the 2026-08-17 copy pass).
//
// ⚠ THIS FILE DOES NOT DRIVE THE SURFACES. It cannot: four of the seven
// carriers are hand-written HTML in public/ that ships byte-for-byte and can
// import nothing. A prebuild script that rewrote those files was considered
// and REJECTED on this repo — "the file you edit is the file that ships"
// becomes "the file you edit gets rewritten". So the copies stay hardcoded
// and `prepare-feeds.mjs` gate 5 makes divergence impossible to COMMIT.
// One source of truth, seven verified copies, no silent drift.
//
// ⚠ THIS FILE DESCRIBES THE POSITIONING, NOT THE THINGS THAT CONSUME IT.
// The OG card generator imports `line` and `sub` and adds nothing here. If a
// consumer needs a value, it derives that value from these — it does not park
// its own configuration in the source of truth for the words. Founder ruling
// 2026-08-17, made when a `card` block was proposed for this module.
// ════════════════════════════════════════════════════════════════════════════

/** The positioning claim. Ends with a full stop; `footer__desc` uses it verbatim. */
export const line = 'Preparing the Coachella Valley for the AI economy.';

/** The supporting claim — `footer__tagline` verbatim, and the opening of the
 *  homepage meta description.
 *
 *  ⚠ "ACROSS THE VALLEY" IS DELIBERATELY AHEAD OF THE RECORD and must not be
 *  softened toward it. All 42 sessions to date ran at one venue in Palm Desert.
 *  This is a statement of SCOPE, not of delivery, and it closes as the
 *  September events land elsewhere. A claims sweep that finds it and "corrects"
 *  it to the record is undoing a founder ruling, not fixing an error. */
export const sub = 'AI training and in-person events across the valley since 2025.';

/** The fiscal-sponsorship sentence. It lives here because it is the second half
 *  of every `footer__desc` — left out, it would be the one un-guarded remainder
 *  of a guarded string, and it is a live legal claim with its own history on
 *  this property (see STATE.md, fiscal wording). */
export const fiscal = 'A fiscally sponsored project of Desert Community Foundation.';
