import homeData from '../../../../content/pages/home.json'
import { HomeSchema } from './schema'
import { loadProjects, loadProjectsBySlugs } from '@/features/projects/content/loader'
import { loadArticles, loadArticlesBySlugs } from '@/features/articles/content/loader'

const RECENT_ARTICLE_COUNT = 3

function assertFeaturedSlugs(
  label: string,
  slugs: string[],
  available: string[],
): void {
  const missing = slugs.filter((slug) => !available.includes(slug))
  if (missing.length > 0) {
    throw new Error(
      `${label} references unknown slugs: ${missing.join(', ')}. Available: ${available.join(', ')}`,
    )
  }
}

export function loadHome() {
  const home = HomeSchema.parse(homeData)

  assertFeaturedSlugs(
    'featuredProjectSlugs',
    home.featuredProjectSlugs,
    loadProjects().map((project) => project.slug),
  )

  const articles = loadArticles()

  assertFeaturedSlugs(
    'featuredArticleSlugs',
    home.featuredArticleSlugs,
    articles.map((article) => article.slug),
  )

  const featuredProjects = loadProjectsBySlugs(home.featuredProjectSlugs)
  const featuredArticles = home.featuredArticleSlugs.length
    ? loadArticlesBySlugs(home.featuredArticleSlugs)
    : articles.slice(0, RECENT_ARTICLE_COUNT)

  return {
    ...home,
    featuredProjects,
    featuredArticles,
  }
}
