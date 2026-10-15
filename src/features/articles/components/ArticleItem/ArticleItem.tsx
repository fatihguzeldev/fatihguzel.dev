import { TextLink } from '@/components/ui/TextLink/TextLink'
import type { Article } from '../../content/schema'
import { ArticleMetadata } from '../ArticleMetadata/ArticleMetadata'
import { ArticleTags } from '../ArticleTags/ArticleTags'
import styles from './ArticleItem.module.css'

type ArticleItemProps = {
  article: Article
  headingLevel: 2 | 3
}

export function ArticleItem({ article, headingLevel }: ArticleItemProps) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3'

  return (
    <li className={styles.item}>
      <Heading className={styles.title}>
        <TextLink href={`/articles/${article.slug}`}>{article.title}</TextLink>
      </Heading>
      <ArticleMetadata article={article} />
      <p className={styles.description}>{article.description}</p>
      <ArticleTags tags={article.tags} />
    </li>
  )
}
