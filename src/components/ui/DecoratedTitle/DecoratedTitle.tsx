import { SECTION_TITLE_DECORATOR } from '@/lib/constants'
import styles from './DecoratedTitle.module.css'

type DecoratedTitleProps = {
  as: 'h1' | 'h2'
  title: string
  variant: 'page' | 'section'
  className?: string
}

export function DecoratedTitle({
  as: Tag,
  title,
  variant,
  className,
}: DecoratedTitleProps) {
  const classes = [styles.title, styles[variant], className].filter(Boolean).join(' ')

  return (
    <Tag className={classes}>
      <span className={styles.decorator} aria-hidden="true">
        {SECTION_TITLE_DECORATOR}
      </span>
      <span className={styles.text}>{title}</span>
    </Tag>
  )
}
