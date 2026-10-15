import styles from './Prose.module.css'

type ProseProps = {
  html: string
  lang: string
  className?: string
}

export function Prose({ html, lang, className }: ProseProps) {
  return (
    <div
      className={[styles.root, className].filter(Boolean).join(' ')}
      lang={lang}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
