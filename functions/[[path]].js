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
  const notFound = await next(new Request(new URL('/404.html', url.origin), request));
  return new Response(notFound.body, {
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
