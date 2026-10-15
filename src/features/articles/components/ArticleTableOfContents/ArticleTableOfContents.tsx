'use client'

import type { ArticleTableOfContentsItem } from '../../content/schema'
import { useActiveHeading } from './use-active-heading'
import styles from './ArticleTableOfContents.module.css'

type ArticleTableOfContentsProps = {
  items: ArticleTableOfContentsItem[]
  className?: string
}

export function ArticleTableOfContents({
  items,
  className,
}: ArticleTableOfContentsProps) {
  const { activeId, navigateToHeading } = useActiveHeading(items)

  if (!items.length) return null

  return (
    <nav
      className={[styles.root, className].filter(Boolean).join(' ')}
      aria-label="table of contents"
    >
      <ol className={styles.list}>
        {items.map((item) => {
          const isActive = item.id === activeId

          return (
            <li key={item.id}>
              <a
                className={[
                  styles.link,
                  item.level === 3 ? styles.levelThree : '',
                  isActive ? styles.active : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                href={`#${item.id}`}
                aria-current={isActive ? 'location' : undefined}
                onClick={(event) => navigateToHeading(event, item.id)}
              >
                <span className={styles.label}>{item.text}</span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
