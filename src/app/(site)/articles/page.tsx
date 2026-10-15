import { articlesPage } from '@/features/articles/content/page'
import { Container } from '@/components/layout/Container'
import { PageHeader } from '@/components/ui/PageHeader'
import { TextLink } from '@/components/ui/TextLink'
import { ArticleList } from '@/features/articles/components/ArticleList/ArticleList'
import { loadArticles } from '@/features/articles/content/loader'
import { createMetadata } from '@/site/seo/metadata'
import { ArticlesCollectionJsonLd } from '@/features/articles/seo/ArticlesCollectionJsonLd'
import { BreadcrumbJsonLd } from '@/site/seo/structured-data/BreadcrumbJsonLd'
import styles from './page.module.css'

export const metadata = createMetadata(articlesPage)

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
        <PageHeader title={articlesPage.title} description={articlesPage.description} />
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
