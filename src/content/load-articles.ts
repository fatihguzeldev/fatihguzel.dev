import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { ArticleFrontmatterSchema } from './schemas/article'
import type { Article } from './schemas/article'
import { compileArticleBody } from '@/lib/vemi/compile-article'

const ARTICLES_DIR = path.join(process.cwd(), 'content/articles')
const WORDS_PER_MINUTE = 200
const SHOULD_CACHE_ARTICLES = process.env.NODE_ENV === 'production'

let articlesCache: Article[] | null = null

type LoadedArticle = {
  slug: string
  article: Article | null
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  return String(error)
}

function getArticleFileSlug(filePath: string): string {
  return path.basename(filePath, '.md')
}

function getArticlePath(filePath: string): string {
  return path.relative(process.cwd(), filePath)
}

function estimateReadingTime(source: string): number {
  const wordCount = source.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))
}

function loadArticleFromFile(filePath: string): LoadedArticle {
  try {
    const raw = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(raw)
    const frontmatter = ArticleFrontmatterSchema.parse(data)
    const fileSlug = getArticleFileSlug(filePath)

    if (frontmatter.slug !== fileSlug) {
      throw new Error(
        `frontmatter slug "${frontmatter.slug}" must match filename "${fileSlug}"`,
      )
    }

    if (frontmatter.draft) {
      return {
        slug: frontmatter.slug,
        article: null,
      }
    }

    const body = content.trim()
    const compiledBody = compileArticleBody(body, {
      filePath: getArticlePath(filePath),
      slug: frontmatter.slug,
    })

    return {
      slug: frontmatter.slug,
      article: {
        ...frontmatter,
        body,
        readingTime: frontmatter.readingTime ?? estimateReadingTime(body),
        html: compiledBody.html,
        tableOfContents: compiledBody.tableOfContents,
      },
    }
  } catch (error) {
    throw new Error(
      `Failed to load article "${getArticlePath(filePath)}": ${getErrorMessage(error)}`,
    )
  }
}

export function loadArticles(): Article[] {
  if (SHOULD_CACHE_ARTICLES && articlesCache) return articlesCache

  if (!fs.existsSync(ARTICLES_DIR)) {
    articlesCache = []
    return articlesCache
  }

  const files = fs
    .readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith('.md') && !file.startsWith('.'))

  const seenSlugs = new Map<string, string>()
  const loadedArticles = files.map((file) => {
    const filePath = path.join(ARTICLES_DIR, file)
    const loaded = loadArticleFromFile(filePath)
    const previousPath = seenSlugs.get(loaded.slug)

    if (previousPath) {
      throw new Error(
        `Duplicate article slug "${loaded.slug}" in ${previousPath} and ${getArticlePath(filePath)}`,
      )
    }

    seenSlugs.set(loaded.slug, getArticlePath(filePath))
    return loaded.article
  })

  articlesCache = loadedArticles
    .filter((article): article is Article => Boolean(article))
    .sort((a, b) => {
      const dateDifference =
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()

      return dateDifference || a.slug.localeCompare(b.slug)
    })

  return articlesCache
}

export function loadArticleBySlug(slug: string): Article | undefined {
  return loadArticles().find((article) => article.slug === slug)
}

export function loadArticlesBySlugs(slugs: string[]): Article[] {
  const articles = loadArticles()
  return slugs
    .map((slug) => articles.find((article) => article.slug === slug))
    .filter((article): article is Article => Boolean(article))
}

export function getArticleSlugs(): string[] {
  return loadArticles().map((article) => article.slug)
}
