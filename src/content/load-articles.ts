import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { ArticleFrontmatterSchema } from './schemas/article'
import type { Article } from './schemas/article'
import { compileArticleBody } from '@/lib/vemi/compile-article'

const ARTICLES_DIR = path.join(process.cwd(), 'content/articles')

let articlesCache: Article[] | null = null

function loadArticleFromFile(filePath: string): Article | null {
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const frontmatter = ArticleFrontmatterSchema.parse(data)

  if (frontmatter.draft) return null

  return {
    ...frontmatter,
    body: content.trim(),
    html: compileArticleBody(content.trim()),
  }
}

export function loadArticles(): Article[] {
  if (articlesCache) return articlesCache

  if (!fs.existsSync(ARTICLES_DIR)) {
    articlesCache = []
    return articlesCache
  }

  const files = fs
    .readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith('.md') && !file.startsWith('.'))

  articlesCache = files
    .map((file) => loadArticleFromFile(path.join(ARTICLES_DIR, file)))
    .filter((article): article is Article => Boolean(article))
    .sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )

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
