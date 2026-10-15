import type { Article } from '../../content/schema'
import { formatArticleLanguage } from '../../format/language'
import { getShownUpdatedAt } from '../../format/publication'
import styles from './ArticleMetadata.module.css'

type ArticleMetadataProps = {
  article: Pick<Article, 'publishedAt' | 'updatedAt' | 'readingTime' | 'language'>
  variant?: 'preview' | 'detail'
}

export function ArticleMetadata({
  article,
  variant = 'preview',
}: ArticleMetadataProps) {
  const language = formatArticleLanguage(article.language)
  const shownUpdatedAt = variant === 'detail' ? getShownUpdatedAt(article) : undefined
  const metaLabel = [
    article.publishedAt,
    shownUpdatedAt ? `updated ${shownUpdatedAt}` : null,
    `${article.readingTime} min read`,
    language,
  ]
    .filter(Boolean)
    .join(', ')

  return (
    <p
      className={[styles.meta, variant === 'detail' ? styles.detail : '']
        .filter(Boolean)
        .join(' ')}
      aria-label={metaLabel}
    >
      {variant === 'preview' ? (
        <span className={styles.marker} aria-hidden="true" />
      ) : null}
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
  )
}
