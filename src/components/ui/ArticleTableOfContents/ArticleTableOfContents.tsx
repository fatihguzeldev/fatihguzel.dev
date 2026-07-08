'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { ArticleTableOfContentsItem } from '@/content/schemas/article'
import styles from './ArticleTableOfContents.module.css'

type ArticleTableOfContentsProps = {
  items: ArticleTableOfContentsItem[]
  className?: string
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function isElementInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect()

  return rect.bottom >= 0 && rect.top <= window.innerHeight
}

function getHeadings(ids: string[]): HTMLElement[] {
  return ids
    .map((id) => document.getElementById(id))
    .filter((heading): heading is HTMLElement => Boolean(heading))
}

function getActivationY(headings: HTMLElement[]): number {
  const scrollMarginTop = Number.parseFloat(
    window.getComputedStyle(headings[0]).scrollMarginTop,
  )
  const offset = Number.isFinite(scrollMarginTop) ? scrollMarginTop : 0

  return window.scrollY + offset + 1
}

function getCurrentHeadingId(ids: string[]): string | undefined {
  const headings = getHeadings(ids)
  if (!headings.length) return undefined

  const scrollEnd = document.documentElement.scrollHeight - window.innerHeight

  if (scrollEnd - window.scrollY <= 2) {
    return headings[headings.length - 1]?.id
  }

  const activationY = getActivationY(headings)
  let currentId = headings[0]?.id

  for (const heading of headings) {
    const headingTop = heading.getBoundingClientRect().top + window.scrollY

    if (headingTop > activationY) break
    currentId = heading.id
  }

  return currentId
}

export function ArticleTableOfContents({
  items,
  className,
}: ArticleTableOfContentsProps) {
  const ids = useMemo(() => items.map((item) => item.id), [items])
  const lockedIdRef = useRef<string | undefined>(undefined)
  const [activeId, setActiveId] = useState<string | undefined>(items[0]?.id)

  useEffect(() => {
    if (!ids.length) return

    let frameId: number | undefined

    const updateActiveId = () => {
      frameId = undefined

      const lockedId = lockedIdRef.current
      if (lockedId && ids.includes(lockedId)) {
        const lockedHeading = document.getElementById(lockedId)

        if (lockedHeading && isElementInViewport(lockedHeading)) {
          setActiveId(lockedId)
          return
        }

        lockedIdRef.current = undefined
      }

      const nextActiveId = getCurrentHeadingId(ids)
      if (nextActiveId) setActiveId(nextActiveId)
    }

    const requestUpdateActiveId = () => {
      if (frameId !== undefined) return
      frameId = window.requestAnimationFrame(updateActiveId)
    }

    const syncHashId = () => {
      const hashId = decodeURIComponent(window.location.hash.slice(1))

      if (!ids.includes(hashId)) return

      lockedIdRef.current = hashId
      setActiveId(hashId)
      requestUpdateActiveId()
    }

    const hashId = decodeURIComponent(window.location.hash.slice(1))
    if (ids.includes(hashId)) {
      lockedIdRef.current = hashId
      setActiveId(hashId)
    }

    requestUpdateActiveId()
    window.addEventListener('scroll', requestUpdateActiveId, { passive: true })
    window.addEventListener('resize', requestUpdateActiveId)
    window.addEventListener('hashchange', syncHashId)

    return () => {
      if (frameId !== undefined) window.cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', requestUpdateActiveId)
      window.removeEventListener('resize', requestUpdateActiveId)
      window.removeEventListener('hashchange', syncHashId)
    }
  }, [ids])

  if (!items.length) return null

  return (
    <nav
      className={[styles.root, className].filter(Boolean).join(' ')}
      aria-label="table of contents"
    >
      <ol className={styles.list}>
        {items.map((item) => {
          const isActive = item.id === activeId

          return (
            <li key={item.id}>
              <a
                className={[
                  styles.link,
                  item.level === 3 ? styles.levelThree : '',
                  isActive ? styles.active : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                href={`#${item.id}`}
                aria-current={isActive ? 'location' : undefined}
                onClick={(event) => {
                  const target = document.getElementById(item.id)
                  if (!target) return

                  event.preventDefault()
                  lockedIdRef.current = item.id
                  setActiveId(item.id)
                  target.scrollIntoView({
                    block: 'start',
                    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
                  })
                  window.history.pushState(null, '', `#${item.id}`)
                }}
              >
                <span className={styles.label}>{item.text}</span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
