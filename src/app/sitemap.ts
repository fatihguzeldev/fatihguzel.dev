import type { MetadataRoute } from 'next'
import { getArticleSlugs, loadArticles } from '@/content/load-articles'
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

  const articleRoutes = getArticleSlugs().map((slug) => {
    const article = articles.find((entry) => entry.slug === slug)
    return {
      url: `${SITE_URL}/articles/${slug}`,
      lastModified: article ? new Date(article.publishedAt) : nowUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }
  })

  return [...staticRoutes, ...articleRoutes]
}
