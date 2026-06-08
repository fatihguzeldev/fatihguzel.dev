import { DecoratedTitle } from '@/components/ui/DecoratedTitle'
import styles from './PageHeader.module.css'

type PageHeaderProps = {
  eyebrow: string
  title: string
  description?: string
  availability?: string
}

export function PageHeader({
  eyebrow,
  title,
  description,
  availability,
}: PageHeaderProps) {
  return (
    <header className={styles.header}>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <DecoratedTitle as="h1" title={title} variant="page" />
      {availability ? <p className={styles.availability}>{availability}</p> : null}
      {description ? <p className={styles.description}>{description}</p> : null}
    </header>
  )
}
