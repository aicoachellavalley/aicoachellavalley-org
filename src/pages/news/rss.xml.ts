import type { APIRoute } from 'astro';
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

// RSS exists for two reasons: agents consume it, and Buttondown can turn it
// into the newsletter via RSS-to-email. Articles only — the six static pages
// are not news and must not appear in a feed that mails people.

const SITE = 'https://aicoachellavalley.org';

export const GET: APIRoute = async (context) => {
  const articles = (await getCollection('news'))
    .filter((a) => !a.data.draft)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: 'AI Coachella Valley — News',
    description:
      'Editorial coverage of AI in the Coachella Valley: what is happening, and why it matters here.',
    site: context.site ?? SITE,
    items: articles.map((a) => ({
      title: a.data.title,
      description: a.data.description,
      pubDate: a.data.date,
      link: `/news/${a.id}`,
      // OPTIONAL since 2026-08-14 — @astrojs/rss omits the key when it is
      // undefined, so a piece with no tags carries no <category> elements
      // rather than an empty one.
      categories: a.data.tags,
      author: a.data.author,
    })),
    // @astrojs/rss appends a trailing slash to every <link> by default, which
    // would emit /news/<slug>/ while the page is served at /news/<slug>
    // (build.format: 'file', trailingSlash: 'never'). Example slug updated
    // 2026-08-17: the placeholder this once named has been deleted.
    // Caught in Stage 2 verification — every RSS link was a URL that does not
    // exist. Must stay false for as long as trailingSlash is 'never'.
    trailingSlash: false,
    customData: `<language>en-us</language>`,
  });
};
