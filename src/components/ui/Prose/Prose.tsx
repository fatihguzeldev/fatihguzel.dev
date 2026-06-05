type ProseProps = {
  html: string
  className?: string
}

export function Prose({ html, className }: ProseProps) {
  return (
    <div
      className={['prose', className].filter(Boolean).join(' ')}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
