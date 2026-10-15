import { Container } from '@/components/layout/Container'
import { PageHeader } from '@/components/ui/PageHeader'
import { TextLink } from '@/components/ui/TextLink'
import { ArticleList } from '@/features/articles/components/ArticleList/ArticleList'
import { loadArticles } from '@/features/articles/content/loader'
import { createMetadata } from '@/lib/seo/metadata'
import { ArticlesCollectionJsonLd, BreadcrumbJsonLd } from '@/lib/seo/json-ld'
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
      <ArticlesCollectionJsonLd articles={articles} />
      <BreadcrumbJsonLd
        items={[
          { name: 'home', path: '/' },
          { name: 'articles', path: '/articles' },
        ]}
      />
      <Container>
        <PageHeader
          title="articles"
          description="notes on engineering, systems, technology, work, and the software industry."
        />
        <p className={styles.feed}>
          <TextLink href="/atom.xml" cta ctaVariant="route" routeLabel="/atom.xml">
            follow the writing
          </TextLink>
        </p>

        {articles.length ? (
          <ArticleList articles={articles} headingLevel={2} />
        ) : (
          <p className={styles.empty}>articles coming soon.</p>
        )}
      </Container>
    </main>
  )
}
