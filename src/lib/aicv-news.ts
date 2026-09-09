// ════════════════════════════════════════════════════════════════════════════
// AICV NEWS FEED — the subscriber side of the 2026-09-08 brief. .org is an
// institutional shell; new writing is published at aicv.news and this site
// shows "Latest from AICV News" as a band of OUTBOUND cards on /news only.
// No .org article routes, no .org sitemap entries, no rebroadcast in
// /news/rss.xml. Canonical stays at the origin.
//
// FETCHED AT BUILD TIME over public HTTP — the same boundary rule as any
// external dependency: no shared package, no import from the other repo.
// DEGRADES TO NOTHING: on any failure (network, non-200, parse) the band is
// empty and the build STILL SUCCEEDS. A nonprofit's site must not go down
// because its publication's feed hiccupped. It logs loudly instead.
//
// Freshness: .org is static and rebuilds on push, so the band is as fresh as
// the last .org build. A deploy hook fired from aicv-news (D2) closes that.
// ════════════════════════════════════════════════════════════════════════════
export const AICV_NEWS = 'https://aicv.news';
export const FEED_URL = `${AICV_NEWS}/feed.xml`;

export interface AicvNewsItem {
  title: string;
  link: string;
  date: Date;
  description: string;
  /** First <category> — the type label (News / Views / Field Notes). */
  type: string;
}

const unescape = (s: string) =>
  s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").trim();
const tag = (xml: string, name: string) => {
  const m = xml.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`));
  return m ? unescape(m[1]) : '';
};

export async function latestFromAicvNews(limit = 8): Promise<AicvNewsItem[]> {
  try {
    const res = await fetch(FEED_URL, { signal: AbortSignal.timeout(10000), headers: { 'user-agent': 'aicoachellavalley-org build (subscriber band)' } });
    if (!res.ok) { console.warn(`[aicv-news] feed ${res.status} — band will be empty`); return []; }
    const xml = await res.text();
    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => m[1]);
    const out: AicvNewsItem[] = [];
    for (const it of items) {
      const link = tag(it, 'link');
      // Only ever link OUT to the origin. A feed item pointing anywhere else is
      // not ours to render.
      if (!link.startsWith(AICV_NEWS + '/')) continue;
      const date = new Date(tag(it, 'pubDate'));
      if (Number.isNaN(date.getTime())) continue;
      out.push({ title: tag(it, 'title'), link, date, description: tag(it, 'description'), type: tag(it, 'category') || 'AICV News' });
    }
    out.sort((a, b) => b.date.getTime() - a.date.getTime());
    console.log(`[aicv-news] ${out.length} items in feed; rendering ${Math.min(limit, out.length)}`);
    return out.slice(0, limit);
  } catch (e) {
    console.warn(`[aicv-news] feed unreachable (${(e as Error).name}) — band will be empty`);
    return [];
  }
}
