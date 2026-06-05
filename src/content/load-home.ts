import homeData from '../../content/pages/home.json'
import { HomeSchema } from './schemas/home'
import { loadProjects, loadProjectsBySlugs } from './load-projects'
import { loadArticles, loadArticlesBySlugs } from './load-articles'

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

  assertFeaturedSlugs(
    'featuredArticleSlugs',
    home.featuredArticleSlugs,
    loadArticles().map((article) => article.slug),
  )

  const featuredProjects = loadProjectsBySlugs(home.featuredProjectSlugs)
  const featuredArticles = loadArticlesBySlugs(home.featuredArticleSlugs)

  return {
    ...home,
    featuredProjects,
    featuredArticles,
  }
}
