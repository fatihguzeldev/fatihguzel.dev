import type { Article } from '../../content/schema'
import { ArticleItem } from '../ArticleItem/ArticleItem'
import styles from './ArticleList.module.css'

type ArticleListProps = {
  articles: Article[]
  headingLevel: 2 | 3
  className?: string
}

export function ArticleList({ articles, headingLevel, className }: ArticleListProps) {
  return (
    <ul className={[styles.list, className].filter(Boolean).join(' ')}>
      {articles.map((article) => (
        <ArticleItem key={article.slug} article={article} headingLevel={headingLevel} />
      ))}
    </ul>
  )
}
