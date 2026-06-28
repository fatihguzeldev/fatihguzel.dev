import { notFound } from 'next/navigation'
import { Container } from '@/components/layout/Container'
import { Prose } from '@/components/ui/Prose'
import { TextLink } from '@/components/ui/TextLink'
import { formatArticleLanguage } from '@/content/format-article-language'
import { getArticleSlugs, loadArticleBySlug } from '@/content/load-articles'
import { createMetadata } from '@/lib/seo/metadata'
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/lib/seo/json-ld'
import styles from './page.module.css'

const STATIC_EXPORT_PLACEHOLDER = '__static_export_placeholder__'

type ArticlePageProps = {
  params: Promise<{ slug: string }>
}

function getShownUpdatedAt({
  publishedAt,
  updatedAt,
}: {
  publishedAt: string
  updatedAt?: string
}): string | undefined {
  return updatedAt && updatedAt.slice(0, 10) !== publishedAt.slice(0, 10)
    ? updatedAt
    : undefined
}

export const dynamicParams = false

export function generateStaticParams(): { slug: string }[] {
  const slugs = getArticleSlugs()

  if (slugs.length === 0) {
    return [{ slug: STATIC_EXPORT_PLACEHOLDER }]
  }

  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params

  if (slug === STATIC_EXPORT_PLACEHOLDER) {
    return createMetadata({ title: 'articles', path: '/articles' })
  }

  const article = loadArticleBySlug(slug)

  if (!article) {
    return createMetadata({ title: 'article not found', path: `/articles/${slug}` })
  }

  return createMetadata({
    title: article.title,
    description: article.description,
    path: `/articles/${article.slug}`,
    type: 'article',
    publishedAt: article.publishedAt,
    updatedAt: getShownUpdatedAt(article),
    tags: article.tags,
    canonicalUrl: article.canonicalUrl,
  })
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params

  if (slug === STATIC_EXPORT_PLACEHOLDER) {
    notFound()
  }

  const article = loadArticleBySlug(slug)

  if (!article) notFound()

  const language = formatArticleLanguage(article.language)
  const shownUpdatedAt = getShownUpdatedAt(article)
  const metaLabel = [
    article.publishedAt,
    shownUpdatedAt ? `updated ${shownUpdatedAt}` : null,
    `${article.readingTime} min read`,
    language,
  ]
    .filter(Boolean)
    .join(', ')

  return (
    <main className={styles.main}>
      <ArticleJsonLd article={article} />
      <BreadcrumbJsonLd
        items={[
          { name: 'home', path: '/' },
          { name: 'articles', path: '/articles' },
          { name: article.title, path: `/articles/${article.slug}` },
        ]}
      />
      <Container>
        <header className={styles.header}>
          <TextLink
            href="/articles"
            cta
            ctaVariant="route"
            routeLabel="/articles"
            aria-label="go back to articles"
            className={styles.backLink}
          >
            go back
          </TextLink>
          <h1 className={styles.title}>{article.title}</h1>
          <p className={styles.meta} aria-label={metaLabel}>
            <time dateTime={article.publishedAt}>{article.publishedAt}</time>
            {shownUpdatedAt ? (
              <>
                <span className={styles.dot} aria-hidden="true" />
                <span>
                  updated <time dateTime={shownUpdatedAt}>{shownUpdatedAt}</time>
                </span>
              </>
            ) : null}
            <span className={styles.dot} aria-hidden="true" />
            <span>{article.readingTime} min read</span>
            <span className={styles.dot} aria-hidden="true" />
            <span>{language}</span>
          </p>
          {article.tags.length > 0 ? (
            <ul className={styles.tags} aria-label="article tags">
              {article.tags.map((tag) => (
                <li key={tag} className={styles.tag}>
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
          <p className={styles.description}>{article.description}</p>
        </header>
        <Prose html={article.html} />
      </Container>
    </main>
  )
}
