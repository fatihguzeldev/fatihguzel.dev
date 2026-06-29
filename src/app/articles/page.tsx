import { Container } from '@/components/layout/Container'
import { PageHeader } from '@/components/ui/PageHeader'
import { TextLink } from '@/components/ui/TextLink'
import { formatArticleLanguage } from '@/content/format-article-language'
import { loadArticles } from '@/content/load-articles'
import { createMetadata } from '@/lib/seo/metadata'
import { BreadcrumbJsonLd } from '@/lib/seo/json-ld'
import styles from './page.module.css'

export const metadata = createMetadata({
  title: 'articles',
  description:
    'notes on engineering, systems, technology, work, and the software industry.',
  path: '/articles',
})

export default function ArticlesPage() {
  const articles = loadArticles()

  return (
    <main className={styles.main}>
      <BreadcrumbJsonLd
        items={[
          { name: 'home', path: '/' },
          { name: 'articles', path: '/articles' },
        ]}
      />
      <Container>
        <PageHeader
          eyebrow="writing"
          title="articles"
          description="notes on engineering, systems, technology, work, and the software industry."
        />

        {articles.length ? (
          <ul className={styles.list}>
            {articles.map((article) => {
              const language = formatArticleLanguage(article.language)
              const metaLabel = `${article.publishedAt}, ${article.readingTime} min read, ${language}`

              return (
                <li key={article.slug} className={styles.item}>
                  <h2 className={styles.articleTitle}>
                    <TextLink href={`/articles/${article.slug}`}>
                      {article.title}
                    </TextLink>
                  </h2>
                  <p className={styles.articleMeta} aria-label={metaLabel}>
                    <span className={styles.articleMarker} aria-hidden="true" />
                    <time dateTime={article.publishedAt}>{article.publishedAt}</time>
                    <span className={styles.dot} aria-hidden="true" />
                    <span>{article.readingTime} min read</span>
                    <span className={styles.dot} aria-hidden="true" />
                    <span>{language}</span>
                  </p>
                  <p className={styles.articleDescription}>{article.description}</p>
                  {article.tags.length > 0 ? (
                    <ul className={styles.tags} aria-label="article tags">
                      {article.tags.map((tag) => (
                        <li key={tag} className={styles.tag}>
                          {tag}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              )
            })}
          </ul>
        ) : (
          <p className={styles.empty}>articles coming soon.</p>
        )}
      </Container>
    </main>
  )
}
