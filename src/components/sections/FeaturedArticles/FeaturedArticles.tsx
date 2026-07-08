import { Container } from '@/components/layout/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { TextLink } from '@/components/ui/TextLink'
import { formatArticleLanguage } from '@/content/format-article-language'
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
        <SectionHeader title="featured articles" />
        <ul className={styles.list}>
          {articles.map((article) => {
            const language = formatArticleLanguage(article.language)
            const metaLabel = `${article.publishedAt}, ${article.readingTime} min read, ${language}`

            return (
              <li key={article.slug} className={styles.item}>
                <h3 className={styles.title}>
                  <TextLink href={`/articles/${article.slug}`}>
                    {article.title}
                  </TextLink>
                </h3>
                <p className={styles.meta} aria-label={metaLabel}>
                  <span className={styles.marker} aria-hidden="true" />
                  <time dateTime={article.publishedAt}>{article.publishedAt}</time>
                  <span className={styles.dot} aria-hidden="true" />
                  <span>{article.readingTime} min read</span>
                  <span className={styles.dot} aria-hidden="true" />
                  <span>{language}</span>
                </p>
                <p className={styles.description}>{article.description}</p>
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
        <p className={styles.cta}>
          <TextLink href="/articles" cta ctaVariant="route" routeLabel="/articles">
            more writing
          </TextLink>
        </p>
      </Container>
    </section>
  )
}
