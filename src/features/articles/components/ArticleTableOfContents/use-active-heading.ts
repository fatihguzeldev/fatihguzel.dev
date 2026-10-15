'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import type { ArticleTableOfContentsItem } from '../../content/schema'
import { headingIdFromHash } from './heading-hash'

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

export function useActiveHeading(items: ArticleTableOfContentsItem[]) {
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
      const hashId = headingIdFromHash(window.location.hash)

      if (!hashId || !ids.includes(hashId)) return

      lockedIdRef.current = hashId
      setActiveId(hashId)
      requestUpdateActiveId()
    }

    const hashId = headingIdFromHash(window.location.hash)
    if (hashId && ids.includes(hashId)) {
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

  function navigateToHeading(event: MouseEvent<HTMLAnchorElement>, id: string) {
    const target = document.getElementById(id)
    if (!target) return

    event.preventDefault()
    lockedIdRef.current = id
    setActiveId(id)
    target.scrollIntoView({
      block: 'start',
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    })
    window.history.pushState(null, '', `#${id}`)
  }

  return { activeId, navigateToHeading }
}
