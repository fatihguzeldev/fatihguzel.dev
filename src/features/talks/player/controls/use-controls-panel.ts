'use client'

import {
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react'

export function useControlsPanel() {
  const [open, setOpen] = useState(false)
  const region = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const focusPanel = useRef(false)

  const closePanel = () => {
    setOpen(false)
    requestAnimationFrame(() => trigger.current?.focus())
  }

  const openPanel = () => {
    focusPanel.current = true
    setOpen(true)
  }

  useEffect(() => {
    const dismiss = (event: PointerEvent) => {
      if (!region.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', dismiss)
    return () => document.removeEventListener('pointerdown', dismiss)
  }, [])

  useEffect(() => {
    if (open && focusPanel.current) {
      focusPanel.current = false
      region.current
        ?.querySelector<HTMLAnchorElement>('nav a')
        ?.focus({ preventScroll: true })
    }
  }, [open])

  const panelEvents = {
    onPointerEnter(event: ReactPointerEvent<HTMLDivElement>) {
      if (event.pointerType === 'mouse') setOpen(true)
    },
    onPointerLeave(event: ReactPointerEvent<HTMLDivElement>) {
      if (
        event.pointerType === 'mouse' &&
        !document.activeElement?.matches(':focus-visible')
      )
        setOpen(false)
    },
    onFocus(event: FocusEvent<HTMLDivElement>) {
      if (!trigger.current?.contains(event.target as Node)) setOpen(true)
    },
    onBlur(event: FocusEvent<HTMLDivElement>) {
      if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget))
        setOpen(false)
    },
    onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
      if (event.key === 'Escape') closePanel()
    },
  }

  return { open, region, trigger, closePanel, openPanel, panelEvents }
}
