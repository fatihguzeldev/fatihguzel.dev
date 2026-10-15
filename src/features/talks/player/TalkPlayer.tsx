'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { Presentation } from '@/presentations/common/model/types'
import { loadPresentation } from '../content/load-presentation'
import { PresentationPlayer } from './PresentationPlayer'
import styles from './Player.module.css'

export function TalkPlayer({ slug, title }: { slug: string; title: string }) {
  const [presentation, setPresentation] = useState<Presentation>()
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let active = true
    setFailed(false)
    setPresentation(undefined)
    loadPresentation(slug).then(
      (value) => {
        if (active) setPresentation(value)
      },
      () => {
        if (active) setFailed(true)
      },
    )
    return () => {
      active = false
    }
  }, [slug])

  if (presentation) return <PresentationPlayer key={slug} presentation={presentation} />
  return (
    <main className={styles.loading} aria-busy={!failed}>
      <Link href="/talks">← talks</Link>
      <h1>{title}</h1>
      <p role="status">
        {failed ? 'the presentation could not load.' : 'loading presentation…'}
      </p>
      {failed && (
        <button type="button" onClick={() => window.location.reload()}>
          try again
        </button>
      )}
    </main>
  )
}
