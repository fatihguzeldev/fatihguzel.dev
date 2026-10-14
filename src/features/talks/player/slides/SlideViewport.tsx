'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import type { Presentation } from '@/presentations/common/types'
import { Slide } from './Slide'
import styles from './Slides.module.css'

export function SlideViewport({
  presentation,
  index,
}: {
  presentation: Presentation
  index: number
}) {
  const viewport = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0)
  const { width, height } = presentation.canvas

  useLayoutEffect(() => {
    const element = viewport.current
    if (!element) return
    const fit = () =>
      setScale(Math.min(element.clientWidth / width, element.clientHeight / height))
    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(element)
    return () => observer.disconnect()
  }, [width, height])

  return (
    <div className={styles.viewport} ref={viewport}>
      <div
        className={styles.frame}
        style={{
          width: width * scale,
          height: height * scale,
          visibility: scale ? 'visible' : 'hidden',
        }}
      >
        <Slide
          key={index}
          presentation={presentation}
          index={index}
          style={{ transform: `scale(${scale})` }}
        />
      </div>
    </div>
  )
}
