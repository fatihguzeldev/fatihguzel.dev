import styles from './SectionHeader.module.css'

type SectionHeaderProps = {
  eyebrow?: string
  title: string
}

export function SectionHeader({ eyebrow, title }: SectionHeaderProps) {
  return (
    <header className={styles.header}>
      {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
      <h2 className={styles.title}>{title}</h2>
    </header>
  )
}
