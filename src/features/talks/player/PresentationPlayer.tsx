'use client'

import { useState } from 'react'
import type { Presentation } from '@/presentations/common/model/types'
import { PlayerControls } from './controls/PlayerControls'
import { PrintDeck } from './export/PrintDeck'
import { exportPdf } from './export/export-pdf'
import { useFullscreen } from './navigation/use-fullscreen'
import { useSlideNavigation } from './navigation/use-slide-navigation'
import { useSwipeNavigation } from './navigation/use-swipe-navigation'
import { SlideViewport } from './slides/SlideViewport'
import styles from './Player.module.css'

export function PresentationPlayer({ presentation }: { presentation: Presentation }) {
  const { index, go } = useSlideNavigation(presentation.slides.length)
  const swipe = useSwipeNavigation(index, go)
  const fullscreen = useFullscreen()
  const [exporting, setExporting] = useState(false)
  const [error, setError] = useState('')

  const onExport = async () => {
    setExporting(true)
    setError('')
    try {
      await exportPdf()
    } catch {
      setError('export could not open. try your browser’s print command.')
    } finally {
      setExporting(false)
    }
  }

  return (
    <>
      <main
        className={styles.player}
        lang={presentation.language ?? 'en'}
        aria-label={presentation.title}
      >
        <PlayerControls
          presentation={presentation}
          index={index}
          go={go}
          fullscreen={fullscreen}
          exporting={exporting}
          onExport={() => void onExport()}
        />
        <div className={styles.stage} {...swipe}>
          <SlideViewport presentation={presentation} index={index} />
        </div>
        <span className={styles.announcement} aria-live="polite">
          slide {index + 1} of {presentation.slides.length}:{' '}
          {presentation.slides[index].title}
        </span>
        {(error || fullscreen.error) && (
          <p className={styles.error} role="status">
            {error || fullscreen.error}
          </p>
        )}
      </main>
      <PrintDeck presentation={presentation} />
    </>
  )
}
