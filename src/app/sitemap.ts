import type { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import { loadArticles } from '@/features/articles/content/loader'
import { SITE_URL } from '@/site/content/identity/loader'
import { talkSummaries } from '@/features/talks/content/summaries'
import { loadNow } from '@/features/home/content/now/loader'

export const dynamic = 'force-static'

function getContentLastModified(relativePath: string, fallback: Date): Date {
  try {
    return fs.statSync(path.join(process.cwd(), relativePath)).mtime
  } catch {
    return fallback
  }
}

function getLatestDate(dates: Date[]): Date {
  return new Date(Math.max(...dates.map((date) => date.getTime())))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const nowUpdated = new Date(loadNow().updatedAt)
  const articles = loadArticles()
  const siteUpdated = getContentLastModified('content/site.json', nowUpdated)
  const homeUpdated = getLatestDate([
    siteUpdated,
    getContentLastModified('content/pages/home.json', nowUpdated),
    getContentLastModified('content/projects.json', nowUpdated),
    nowUpdated,
  ])
  const articlesUpdated = articles.length
    ? getLatestDate(
        articles.map((article) => new Date(article.updatedAt ?? article.publishedAt)),
      )
    : getContentLastModified('content/articles/.gitkeep', siteUpdated)
  const projectsUpdated = getContentLastModified('content/projects.json', siteUpdated)
  const workUpdated = getLatestDate([
    siteUpdated,
    getContentLastModified('content/pages/work.json', siteUpdated),
    getContentLastModified('content/socials.json', siteUpdated),
  ])

  const staticRoutes = [
    { path: '', lastModified: homeUpdated, priority: 1 },
    { path: '/articles', lastModified: articlesUpdated, priority: 0.8 },
    { path: '/projects', lastModified: projectsUpdated, priority: 0.8 },
    { path: '/talks', lastModified: siteUpdated, priority: 0.8 },
    { path: '/work', lastModified: workUpdated, priority: 0.8 },
  ].map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: route.lastModified,
    changeFrequency: 'monthly' as const,
    priority: route.priority,
  }))

  const articleRoutes = articles.map((article) => {
    return {
      url: `${SITE_URL}/articles/${article.slug}`,
      lastModified: new Date(article.updatedAt ?? article.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }
  })

  const talkRoutes = talkSummaries.map((talk) => ({
    url: `${SITE_URL}/talks/${talk.slug}`,
    lastModified: getContentLastModified(
      `src/presentations/${talk.slug}/talk.ts`,
      siteUpdated,
    ),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...articleRoutes, ...talkRoutes]
}
