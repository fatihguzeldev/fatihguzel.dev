import styles from './ArticleTags.module.css'

type ArticleTagsProps = {
  tags: string[]
  variant?: 'preview' | 'detail'
}

export function ArticleTags({ tags, variant = 'preview' }: ArticleTagsProps) {
  if (!tags.length) return null

  return (
    <ul
      className={[styles.tags, variant === 'preview' ? styles.preview : '']
        .filter(Boolean)
        .join(' ')}
      aria-label="article tags"
    >
      {tags.map((tag) => (
        <li key={tag} className={styles.tag}>
          {tag}
        </li>
      ))}
    </ul>
  )
}
