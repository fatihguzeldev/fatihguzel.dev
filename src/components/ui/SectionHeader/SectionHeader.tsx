import { DecoratedTitle } from '@/components/ui/DecoratedTitle'
import styles from './SectionHeader.module.css'

type SectionHeaderProps = {
  eyebrow?: string
  title: string
}

export function SectionHeader({ eyebrow, title }: SectionHeaderProps) {
  return (
    <header className={styles.header}>
      {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
      <DecoratedTitle as="h2" title={title} variant="section" />
    </header>
  )
}
