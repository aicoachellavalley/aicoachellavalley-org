import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// ════════════════════════════════════════════════════════════════════════════
// .org is a HYBRID: six hand-written static pages + an Astro /news/ surface.
//
// ⚠ outDir MUST remain dist/ — NEVER the repo root.
// Astro empties outDir on every build (core/build/static-build.js):
//     if (settings.config?.vite?.build?.emptyOutDir !== false)
//       emptyDir(settings.config.outDir, new Set(".git"));
// `new Set(".git")` is built from a STRING, so it holds the characters
// '.', 'g', 'i', 't' — NOT the string ".git". Verified false in BOTH 6.1.3
// and 7.2.0 (checked 2026-08-08). outDir at the repo root would delete the
// six pages, functions/, _headers, _redirects AND the git repository itself.
//
// The six pages live in public/ and are copied to dist/ byte-for-byte by
// Vite's copyFileSync. public/ is source; dist/ is disposable.
// functions/ lives at the repo ROOT, outside the build, and Astro never
// sees it — Cloudflare reads it from the repo, not from dist/.
// ════════════════════════════════════════════════════════════════════════════

export default defineConfig({
  integrations: [mdx()],
  output: 'static',
  site: 'https://aicoachellavalley.org',

  // 'file' emits dist/news/slug.html — served at /news/slug, extensionless and
  // with no trailing slash, matching how Cloudflare Pages already serves the
  // six static pages (/pledge is 200, /pledge.html 308s to it). The default
  // 'directory' would emit /news/slug/ and split the site into two URL
  // conventions.
  build: {
    format: 'file',
    assets: '_astro',
  },
  trailingSlash: 'never',
});
