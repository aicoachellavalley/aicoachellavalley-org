// ════════════════════════════════════════════════════════════════════════════
// THE FAQ — the fourteen questions, one source.
//
// COPIED, NOT RETYPED. Every string was cut from src/pages/index.astro's
// visible DOM and asserted byte-for-byte against that page's FAQPage JSON-LD
// mirror before this file was generated. All 28 strings matched on both sides.
//
// ✅ THIS IS NOW THE SINGLE SOURCE (session B, 2026-08-28). index.astro carried
// its own copy of all fourteen for one commit — /faq shipped first so the two
// changes could land separately — and a transitional build gate held the copies
// byte-identical in the interval. Both are gone: the homepage renders four of
// these entries by reference (see `homepageFaq` at the foot of this file) and
// declares no FAQ strings of its own. There is no second copy left to drift,
// and nothing to keep in step by hand.
//
// ⚠ `answer` MAY CONTAIN HTML. Exactly one entry does — [9], "Who funds AICV?",
// which carries <br><br> between its two paragraphs. It is carried verbatim
// rather than split into an array because that is the only shape in which
// /faq's answer HTML, /faq's JSON-LD, the homepage's answer HTML and the
// homepage's JSON-LD all stay mutually byte-identical: any other join changes
// the mirror. The homepage has emitted that markup inside its Answer `text`
// since the node was written, so this is the established shape on this
// property, not a new one.
// Consequence: faq.astro renders answers with `set:html`, never as text.
//
// ⚠ QUESTIONS ARE INTERPOLATED, NOT set:html, AND THEIR SHIPPED BYTES THEREFORE
// DIFFER FROM THE HOMEPAGE'S — measured, not assumed. Astro escapes `'` to
// `&#39;` in interpolated text, so five of the fourteen questions ship as
// "AICV&#39;s" on /faq where index.astro's hand-written HTML has a literal
// apostrophe. Decoded text is identical, both are valid HTML, and both pages'
// JSON-LD — which is what agents actually read — carries the literal
// apostrophe and is byte-identical.
// ⚠ DO NOT "FIX" THIS BY MOVING QUESTIONS TO set:html. It would buy byte
// equality in the markup at the cost of treating a plain-text field as HTML,
// for fields that contain no markup at all. The escaping is correct behaviour.
//
// ⚠ DOUBLE-QUOTED LITERALS ON PURPOSE. Thirteen of the fourteen entries carry
// an apostrophe and none carries a double quote or a backslash, so this shape
// holds the prose with ZERO escape characters. A single-quoted file would need
// thirty-odd backslashes, every one of them a chance to change the bytes by
// hand — and the bytes are the whole point of this file.
// ════════════════════════════════════════════════════════════════════════════

export interface FaqEntry {
  /** Plain text. No question contains markup. */
  question: string;
  /** MAY CONTAIN HTML — see the note above. Render with set:html. */
  answer: string;
}

// ── THE HOMEPAGE'S FOUR ────────────────────────────────────────────────────
// ⚠ SELECTED BY REFERENCE, NOT BY INDEX AND NOT BY TEXT. These four objects are
// declared once and appear in BOTH arrays below, so `faq` and `homepageFaq`
// cannot disagree about their content — they are the same objects. Reorder
// `faq`, reword a question, rewrite an answer: the homepage follows, and there
// is nothing to keep in step.
//
// The alternatives were both brittle in ways that fail QUIETLY. Index literals
// (`faq[0]`, `faq[3]`, `faq[9]`) break the moment the array is reordered and
// the homepage then shows four different questions with no error. Matching on
// question text needs the four strings written a second time, which is the
// same two-copies-free-to-drift problem this file exists to end.
//
// A stable `id` on every entry would be better still and is the obvious next
// step — it was NOT done here because it changes `FaqEntry`, and the shape of
// this file is deliberately boring. Founder call if it is ever wanted.
//
// ⚠ ONLY FOUR ARE HOISTED, and the asymmetry is the signal: a named const here
// means "something outside this array points at me". The other ten are inline
// because nothing does. Do not "tidy" this by naming all fourteen — that would
// erase the distinction it exists to carry.

const WHAT_IS_AICV: FaqEntry = {
  question: "What is AI Coachella Valley?",
  answer:
    "AICV is the front door to AI in the Coachella Valley — for people and for AI systems. We run training and in-person events across the valley, and we publish what we learn so the region is readable to the systems that are increasingly how people find things.",
};

const DCF_RELATIONSHIP: FaqEntry = {
  question: "What is AICV's relationship with Desert Community Foundation?",
  answer:
    "AICV is the first and only fiscally sponsored project of Desert Community Foundation, a 501(c)(3) nonprofit organization. DCF handles AICV's accounting, governance, and financial management, and all AICV funds are held by DCF and deployed against AICV's mission. Desert Community Foundation is the desert's only community foundation serving the Coachella Valley exclusively, established in 1999.",
};

const ORG_VS_COM: FaqEntry = {
  question: "What's the relationship between aicoachellavalley.org and aicoachellavalley.com?",
  answer:
    "They share a name and a founder, not a company. This site — the .org — is AICV, a fiscally sponsored project of Desert Community Foundation. Everything here is grant-funded: workshops, AI Tinkerers Coachella Valley, and The AI Beat. We also publish at aicv.co, which is part of the same project. aicoachellavalley.com is a commercial product of SunshineFM LLC, a separate company. If you're looking for the nonprofit work, you're in the right place.",
};

const WHO_FUNDS: FaqEntry = {
  // ⚠ THE ONLY MARKUP IN ANY OF THE 28 STRINGS — <br><br> between this
  //   answer's two paragraphs. Carried verbatim, not split into an array:
  //   see the note above on why any other join breaks the mirror.
  question: "Who funds AICV?",
  answer:
    "AICV is a fiscally sponsored project of Desert Community Foundation, a 501(c)(3) nonprofit organization. All grants are held and administered by DCF.<br><br>The AI Beat is funded by a grant from the IE Journalism Innovation Hub+Fund, the designated Press Forward Inland Empire chapter. AICV Workshops are supported by the Entrepreneurial Resource Center (ERC) at California State University, San Bernardino, where AICV is an official affiliate.",
};

export const faq: FaqEntry[] = [
  WHAT_IS_AICV,
  DCF_RELATIONSHIP,
  {
    question: "What does AICV actually do?",
    answer:
      "AICV works three ways — teaching, connecting, and reporting. It builds AI literacy and applied skills through AICV Workshops at the Entrepreneurial Resource Center (ERC) in Palm Desert. It connects the region's builders through AI Tinkerers Coachella Valley. And it reports on how AI is landing across the Inland Empire through The AI Beat, funded by the IE Journalism Innovation Hub+Fund, the Press Forward Inland Empire chapter.",
  },
  ORG_VS_COM,
  {
    question: "Who is AICV's founder?",
    answer:
      "AICV was founded by Sat Singh, a TEDx Rancho Mirage speaker, community educator, and technology entrepreneur based in the Coachella Valley. Sat hosts SunshineFM, weekend radio for Palm Springs Coachella. His TEDx Rancho Mirage talk — AI, Skynet, and why humans are losing the battle — is available on YouTube.",
  },
  {
    question: "What is the AICV Responsible AI Pledge?",
    answer:
      "The AICV Responsible AI Pledge is a seven-principle commitment to using AI in ways that are human-centered, transparent, and grounded in the values of the Coachella Valley community. The Pledge invites students, educators, business owners, and community leaders to read, sign, and carry forward a shared standard for responsible AI practice in the region. The full pledge is published at aicoachellavalley.org/pledge.",
  },
  {
    question: "Who does AICV serve?",
    answer:
      "Business owners who need to know what these tools actually do. Workers whose jobs are changing. Students and career-changers deciding what to learn next. Founders and technical builders already working here. AICV co-organizes AI Tinkerers Coachella Valley, the local chapter of a global builder network — connecting the people building with these tools to the people who need them is the point. Most people who walk into our sessions have never written a line of code. Some of them are sitting next to people who write it all day.",
  },
  {
    question: "I already build with AI — is there anything here for me?",
    answer:
      "Yes — AI Tinkerers Coachella Valley, the valley's chapter of the global hands-on builders' community: screened, demo-first, no pitches. Bring working code, show what you shipped, and connect with the region's serious builders. That room is also what powers AICV's mentorship — the people in it are who help train the valley's next generation. The chapter runs demo nights, build days, and a global hackathon, and it is open to join.",
  },
  {
    question: "What is AICV's geographic scope?",
    answer:
      "AICV's mission covers the nine cities of the Coachella Valley — Desert Hot Springs, Cathedral City, Palm Springs, Rancho Mirage, Palm Desert, Indian Wells, La Quinta, Indio, and Coachella — along with the unincorporated and adjacent communities that are part of the region. To date, AICV has delivered programs in Palm Desert, Rancho Mirage, Palm Springs, and across the broader Inland Empire, with attendees joining from across the valley. Indio and Indian Wells are next on the programming roadmap. AICV is anchored at the Entrepreneurial Resource Center (ERC) in Palm Desert.",
  },
  WHO_FUNDS,
  {
    question: "How can institutions partner with AICV?",
    answer:
      "AICV partners with foundations, civic institutions, academic programs, and corporate funders interested in regional AI readiness. Current pathways include program funding for workshop expansion, research collaboration on AI adoption and workforce readiness in the Inland Empire, joint programming with academic and journalism institutions, and grant collaboration aligned with AI-impact philanthropy. Institutional inquiries: sat@aicv.co.",
  },
  {
    question: "How can individuals support AICV's work?",
    answer:
      "Individuals can support AICV's mission through Desert Community Foundation — via donor-advised funds, family foundation grants, trust giving, and named scholarships. AICV's philanthropy page at aicoachellavalley.org/philanthropy outlines the pathways and the institutional fabric behind Coachella Valley giving.",
  },
  {
    question: "Why does AICV exist now?",
    answer:
      "The companies building frontier AI are committing significant philanthropic capital to help communities adapt to an AI-driven economy. The OpenAI Foundation has committed $250 million to research and support workers through AI's economic disruption, alongside its People-First AI Fund granting $40.5 million to more than 200 community nonprofits nationwide. Anthropic has committed $350 million across its Economic Futures Research Fund and Claude Corps, a national fellowship placing early-career workers inside community nonprofits. This capital is looking for credible, on-the-ground partners who can turn national commitment into local capacity. AICV exists to be that infrastructure for the Coachella Valley — the operation that ensures the region is positioned to participate as this funding moves from the coasts into communities like ours.",
  },
  {
    question: "How is AICV different from other economic-development efforts in the valley?",
    answer:
      "We've held 42 sessions since April 2025. Most AI efforts in this region are announcements. Ours is a calendar you can look at, with a record of who showed up and what was covered.",
  },
];

/**
 * The four the HOMEPAGE shows. /faq shows all fourteen.
 *
 * ⚠ THE HOMEPAGE IS A DOORWAY, NOT A DUPLICATE. It used to carry all fourteen
 * and a FAQPage node claiming them; both are gone as of session B. The page
 * that carries the questions is /faq, and it holds the only FAQPage node for
 * them — a homepage showing four while its schema claimed fourteen would be
 * telling agents something no visitor could see.
 *
 * WHY THESE FOUR, measured rather than chosen by feel: the homepage's own prose
 * already answers most of the fourteen. Three program cards with headings cover
 * "what does AICV actually do", the Workshops card states "42 sessions across
 * six series", the founder section covers the founder, and the partner strip
 * covers who it works with. What the page NEVER answers outside this list is
 * what AICV *is* (the H1 is positioning, not a definition), which entity you are
 * looking at, and who holds the money — and the footer links "Intelligence
 * Network (.com)" by name, so the page raises the .org/.com question itself.
 * These four are the page's gaps, not its highlights.
 *
 * ⚠ ORDER HERE IS THE DISPLAY ORDER and is independent of `faq`'s. Changing
 * this array changes the homepage; changing `faq` changes /faq. Neither can
 * change the CONTENT of an entry without changing it for both, which is the
 * point of the shared references.
 */
export const homepageFaq: FaqEntry[] = [
  WHAT_IS_AICV,
  DCF_RELATIONSHIP,
  ORG_VS_COM,
  WHO_FUNDS,
];
