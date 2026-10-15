import type { ReactNode } from 'react'
import './stage.css'

export const chapters = [
  { name: 'tek makinede çözmek kolay' },
  { name: 'ikinci kopya her şeyi değiştiriyor' },
  { name: 'verdiğimiz onayı nasıl koruyacağız?' },
  { name: 'makine değişsin. geçmiş değişmesin' },
] as const

export function ChapterMarker({ number }: { number: number }) {
  return (
    <span className="lecture-chapter-number">
      <svg viewBox="0 0 72 58" aria-hidden="true">
        <path d="M 63 15 C 49 -1 13 2 7 22 C 0 43 23 57 46 50 C 70 46 74 22 57 9" />
      </svg>
      {String(number).padStart(2, '0')}
    </span>
  )
}

export function Stage({
  number,
  chapter,
  title,
  lead,
  term,
  className = '',
  children,
}: {
  number: number
  chapter?: 1 | 2 | 3 | 4
  title?: ReactNode
  lead?: ReactNode
  term?: string
  className?: string
  children: ReactNode
}) {
  return (
    <section
      className={`lecture ${className}`}
      data-scene
      data-page={number}
      data-chapter={chapter}
    >
      {chapter && (
        <div className="lecture-chapter">
          <ChapterMarker number={chapter} />
          <span>{chapters[chapter - 1].name}</span>
        </div>
      )}
      {title && (
        <header className="lecture-header">
          <h1>{title}</h1>
          {(chapter || lead || term) && (
            <div className="lecture-metadata">
              {lead && <p className="lecture-lead">{lead}</p>}
              {term && <p className="lecture-term">{term}</p>}
            </div>
          )}
        </header>
      )}
      <div className="lecture-content">{children}</div>
    </section>
  )
}

export function Underline({ children }: { children: ReactNode }) {
  return <span className="lecture-underline">{children}</span>
}

export function Conclusion({ children }: { children: ReactNode }) {
  return <p className="lecture-conclusion">{children}</p>
}
