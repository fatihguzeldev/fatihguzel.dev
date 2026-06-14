import styles from './Prose.module.css'

type ProseProps = {
  html: string
  className?: string
}

export function Prose({ html, className }: ProseProps) {
  return (
    <div
      className={[styles.root, className].filter(Boolean).join(' ')}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
