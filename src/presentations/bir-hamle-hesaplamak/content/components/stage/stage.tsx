import type { ReactNode } from 'react'
import './stage.css'

export function Stage({
  frameId,
  title,
  surface = 'dark',
  children,
}: {
  frameId: string
  title?: string
  surface?: 'green' | 'dark'
  children: ReactNode
}) {
  return (
    <section
      className={`chess-talk chess-scene--${frameId} chess-surface--${surface}`}
      data-story-frame={frameId}
    >
      {title && (
        <header className="chess-heading">
          <h1>{title}</h1>
        </header>
      )}
      <div className="chess-scene-content">{children}</div>
    </section>
  )
}
