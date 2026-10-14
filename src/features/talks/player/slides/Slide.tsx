import type { CSSProperties } from 'react'
import type { Presentation } from '@/presentations/common/types'
import styles from './Slides.module.css'

export function Slide({
  presentation,
  index,
  style,
}: {
  presentation: Presentation
  index: number
  style?: CSSProperties
}) {
  const slide = presentation.slides[index]
  const Content = slide.component
  return (
    <article
      className={styles.slide}
      data-slide
      data-slide-id={slide.id}
      aria-label={`${index + 1}. ${slide.title}`}
      style={{
        ...presentation.theme,
        width: presentation.canvas.width,
        height: presentation.canvas.height,
        ...style,
      }}
    >
      <Content />
    </article>
  )
}
