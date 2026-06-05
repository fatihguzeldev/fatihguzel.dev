import { Container } from '@/components/layout/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { TextLink } from '@/components/ui/TextLink'
import type { Article } from '@/content/schemas/article'
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
        <SectionHeader eyebrow="writing" title="featured articles" />
        <ul className={styles.list}>
          {articles.map((article) => (
            <li key={article.slug} className={styles.item}>
              <h3 className={styles.title}>
                <TextLink href={`/articles/${article.slug}`}>{article.title}</TextLink>
              </h3>
              <p className={styles.description}>{article.description}</p>
              <p className={styles.meta}>{article.publishedAt}</p>
            </li>
          ))}
        </ul>
        <p className={styles.cta}>
          <TextLink href="/articles">see all articles</TextLink>
        </p>
      </Container>
    </section>
  )
}
