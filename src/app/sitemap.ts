import type { MetadataRoute } from 'next'
import { loadArticles } from '@/content/load-articles'
import { SITE_URL } from '@/content/load-site'
import { loadNow } from '@/content/load-now'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const nowUpdated = new Date(loadNow().updatedAt)
  const articles = loadArticles()

  const staticRoutes = ['', '/articles', '/projects', '/work'].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: nowUpdated,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.8,
  }))

  const articleRoutes = articles.map((article) => {
    return {
      url: `${SITE_URL}/articles/${article.slug}`,
      lastModified: new Date(article.updatedAt ?? article.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }
  })

  return [...staticRoutes, ...articleRoutes]
}
