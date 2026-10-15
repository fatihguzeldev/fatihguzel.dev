import { notFound } from 'next/navigation'
import { Container } from '@/components/layout/Container'
import { ArticleMetadata } from '@/features/articles/components/ArticleMetadata/ArticleMetadata'
import { ArticleTags } from '@/features/articles/components/ArticleTags/ArticleTags'
import { ArticleTableOfContents } from '@/features/articles/components/ArticleTableOfContents'
import { Prose } from '@/features/articles/components/Prose'
import { TextLink } from '@/components/ui/TextLink'
import { getArticleSlugs, loadArticleBySlug } from '@/features/articles/content/loader'
import { getShownUpdatedAt } from '@/features/articles/format/publication'
import { createMetadata } from '@/lib/seo/metadata'
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/lib/seo/json-ld'
import styles from './page.module.css'

const STATIC_EXPORT_PLACEHOLDER = '__static_export_placeholder__'

type ArticlePageProps = {
  params: Promise<{ slug: string }>
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
      <Container article className={styles.container}>
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
          <ArticleMetadata article={article} variant="detail" />
          <ArticleTags tags={article.tags} variant="detail" />
          <p className={styles.description}>{article.description}</p>
        </header>
        <ArticleTableOfContents
          items={article.tableOfContents}
          className={styles.toc}
        />
        <Prose html={article.html} className={styles.prose} />
      </Container>
    </main>
  )
}
