import { Container } from '@/components/layout/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { TextLink } from '@/components/ui/TextLink'
import { ArticleList } from '@/features/articles/components/ArticleList/ArticleList'
import type { Article } from '@/features/articles/content/schema'
import styles from './FeaturedArticles.module.css'
import sectionStyles from '../shared/Section.module.css'

type FeaturedArticlesProps = {
  articles: Article[]
}

export function FeaturedArticles({ articles }: FeaturedArticlesProps) {
  if (!articles.length) return null

  return (
    <section className={sectionStyles.section} id="articles">
      <Container>
        <SectionHeader title="featured articles" />
        <ArticleList articles={articles} headingLevel={3} className={styles.list} />
        <p className={styles.cta}>
          <TextLink href="/articles" cta ctaVariant="route" routeLabel="/articles">
            more writing
          </TextLink>
        </p>
      </Container>
    </section>
  )
}
