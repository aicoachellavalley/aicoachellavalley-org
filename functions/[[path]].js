// ════════════════════════════════════════════════════════════════════════════
// Cloudflare Pages Function — catch-all guard for operational docs
//
// WHY THIS EXISTS, AND WHY IT IS NOT _redirects:
// Every file in this repo's root deploys, so /STATE.md (145KB of session logs,
// founder rulings and internal debt notes), /HANDOFF.md and /README.md were all
// returning 200 with real content.
//
// _redirects CANNOT close that. Proven 2026-08-06 across two deploys: both
// "/*.md /404.html 404" and exact-filename rules failed, while "/ai-readiness /
// 301" in the same file worked (no file matches that path) and the identical
// "/*.md" wildcard in _headers DID apply. Static assets take precedence over
// _redirects on Pages. Functions do not — they run before assets, which is why
// this works where the redirect could not.
//
// PATTERN, not a filename list, on purpose: a future operational doc dropped in
// the root is private by default rather than by someone remembering to add it.
//
// Everything that is not a .md falls straight through via next(), and the more
// specific functions/api/partner.js still owns /api/partner.
// ════════════════════════════════════════════════════════════════════════════

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  if (!/\.md$/i.test(url.pathname)) return next();

  // Serve the site's own 404 page, with a real 404 status.
  //
  // next(new Request(...)) returned an EMPTY body on the first deploy — status
  // was right, page was blank. Read it to text() rather than piping .body, and
  // keep an inline fallback so a blank page is impossible even if the asset
  // fetch changes behaviour again.
  let body = null;
  try {
    const page = await next(new Request(new URL('/404.html', url.origin), { method: 'GET' }));
    if (page && page.status === 200) {
      const text = await page.text();
      if (text && text.length > 200) body = text;
    }
  } catch (_) { /* fall through to the inline body */ }

  if (!body) {
    body = '<!doctype html><html lang="en"><head><meta charset="utf-8">'
         + '<meta name="viewport" content="width=device-width,initial-scale=1">'
         + '<title>Page Not Found \u2014 AI Coachella Valley</title>'
         + '<style>body{margin:0;min-height:100vh;display:flex;align-items:center;'
         + 'justify-content:center;background:#FAFAF7;color:#1B4332;'
         + 'font:300 15px/1.75 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}'
         + 'a{color:#2D6A4F}</style></head><body><main style="text-align:center;padding:40px">'
         + '<p style="font-size:10px;letter-spacing:.18em;text-transform:uppercase">404</p>'
         + '<h1 style="font-family:Georgia,serif;font-weight:700">Page Not Found</h1>'
         + '<p><a href="/">Return to AI Coachella Valley</a></p></main></body></html>';
  }

  return new Response(body, {
    status: 404,
    statusText: 'Not Found',
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store',
      'x-robots-tag': 'noindex, nofollow, noarchive',
      'x-content-type-options': 'nosniff',
    },
  });
}
