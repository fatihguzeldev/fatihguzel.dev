import { loadArticles } from '@/content/load-articles'
import { loadSite, SITE_URL } from '@/content/load-site'
import { buildAtomFeed } from '@/lib/feed/atom'

export const dynamic = 'force-static'

export function GET() {
  const site = loadSite()
  const feed = buildAtomFeed({
    articles: loadArticles(),
    siteName: site.name,
    siteDescription: `${site.tagline}. ${site.description}`,
    siteUrl: SITE_URL,
  })

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  })
}
