import type { Presentation } from '@/presentations/common/model/types'
import { Slide } from '../slides/Slide'
import styles from './PrintDeck.module.css'

export function PrintDeck({ presentation }: { presentation: Presentation }) {
  const { width, height } = presentation.canvas
  return (
    <div className={styles.deck} aria-hidden="true">
      <style>{`@page { size: ${width}px ${height}px; margin: 0; }`}</style>
      {presentation.slides.map((slide, index) => (
        <div className={styles.page} key={slide.id}>
          <Slide presentation={presentation} index={index} />
        </div>
      ))}
    </div>
  )
}
