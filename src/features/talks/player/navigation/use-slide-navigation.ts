'use client'

import { useCallback, useEffect, useState } from 'react'
import { pageIndex } from './page'

export function useSlideNavigation(count: number) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const sync = () => setIndex(pageIndex(window.location.search, count))
    sync()
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [count])

  const go = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(count - 1, next))
      if (clamped === index) return
      const url = new URL(window.location.href)
      if (clamped === 0) url.searchParams.delete('page')
      else url.searchParams.set('page', String(clamped + 1))
      window.history.pushState(null, '', url)
      setIndex(clamped)
    },
    [count, index],
  )

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target
      if (
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        (target instanceof HTMLElement &&
          (target.isContentEditable || target.closest('input, textarea, select')))
      )
        return
      if (
        event.key === ' ' &&
        target instanceof HTMLElement &&
        target.closest('button, a')
      )
        return
      let next: number | undefined
      if (['ArrowRight', 'ArrowDown', 'PageDown'].includes(event.key)) next = index + 1
      if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(event.key)) next = index - 1
      if (event.key === ' ') next = index + (event.shiftKey ? -1 : 1)
      if (event.key === 'Home') next = 0
      if (event.key === 'End') next = count - 1
      if (next !== undefined) {
        event.preventDefault()
        go(next)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [count, go, index])

  return { index, go }
}
