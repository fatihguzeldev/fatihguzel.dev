'use client'

import { useCallback, useEffect, useState } from 'react'
import { applyTheme, getInitialTheme, setStoredTheme } from './apply-theme'
import type { Theme } from './constants'

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('light')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const initial = getInitialTheme()
    setThemeState(initial)
    applyTheme(initial)
    setReady(true)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((current) => {
      const next = current === 'light' ? 'dark' : 'light'
      applyTheme(next)
      setStoredTheme(next)
      return next
    })
  }, [])

  return { theme, toggleTheme, ready }
}
