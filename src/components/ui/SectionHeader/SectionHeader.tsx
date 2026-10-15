import { DecoratedTitle } from '@/components/ui/DecoratedTitle/DecoratedTitle'
import styles from './SectionHeader.module.css'

type SectionHeaderProps = {
  title: string
}

export function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <header className={styles.header}>
      <DecoratedTitle as="h2" title={title} variant="section" />
    </header>
  )
}
