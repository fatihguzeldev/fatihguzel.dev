'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

type FullscreenSession = { mounted: boolean; ownsFullscreen: boolean }

export function useFullscreen() {
  const [available, setAvailable] = useState(false)
  const [active, setActive] = useState(false)
  const [error, setError] = useState('')
  const sessionRef = useRef<FullscreenSession | null>(null)

  useEffect(() => {
    const session = { mounted: true, ownsFullscreen: false }
    sessionRef.current = session
    setAvailable(document.fullscreenEnabled)
    const sync = () => {
      if (!document.fullscreenElement) session.ownsFullscreen = false
      setActive(Boolean(document.fullscreenElement))
    }
    sync()
    document.addEventListener('fullscreenchange', sync)
    return () => {
      session.mounted = false
      document.removeEventListener('fullscreenchange', sync)
      if (
        session.ownsFullscreen &&
        document.fullscreenElement === document.documentElement
      ) {
        void document.exitFullscreen().catch(() => {})
      }
    }
  }, [])

  const toggle = useCallback(async () => {
    const session = sessionRef.current
    if (!session?.mounted) return
    setError('')
    try {
      if (document.fullscreenElement) await document.exitFullscreen()
      else {
        await document.documentElement.requestFullscreen()
        session.ownsFullscreen = true
        // Navigation can finish while the fullscreen request is still pending.
        if (
          !session.mounted &&
          document.fullscreenElement === document.documentElement
        ) {
          await document.exitFullscreen()
        }
      }
    } catch {
      if (session.mounted) {
        setError('fullscreen is unavailable. use your browser’s fullscreen control.')
      }
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
