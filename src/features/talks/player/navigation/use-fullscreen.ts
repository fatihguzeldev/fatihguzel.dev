'use client'

import { useCallback, useEffect, useState } from 'react'

export function useFullscreen() {
  const [available, setAvailable] = useState(false)
  const [active, setActive] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setAvailable(document.fullscreenEnabled)
    const sync = () => setActive(Boolean(document.fullscreenElement))
    sync()
    document.addEventListener('fullscreenchange', sync)
    return () => document.removeEventListener('fullscreenchange', sync)
  }, [])

  const toggle = useCallback(async () => {
    setError('')
    try {
      if (document.fullscreenElement) await document.exitFullscreen()
      else await document.documentElement.requestFullscreen()
    } catch {
      setError('fullscreen is unavailable. use your browser’s fullscreen control.')
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!available || event.altKey || event.ctrlKey || event.metaKey) return
      if (
        event.target instanceof HTMLElement &&
        event.target.closest('input, select, textarea, [contenteditable="true"]')
      )
        return
      if (event.key.toLowerCase() === 'f') {
        event.preventDefault()
        void toggle()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [available, toggle])

  return { available, active, error, toggle }
}
