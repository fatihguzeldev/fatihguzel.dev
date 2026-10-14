'use client'

import { useRef, type PointerEvent } from 'react'

type SwipeStart = { id: number; x: number; y: number }

export function useSwipeNavigation(index: number, go: (index: number) => void) {
  const start = useRef<SwipeStart | null>(null)

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'touch') return
    if (
      !event.isPrimary ||
      (event.target instanceof Element &&
        event.target.closest('a, button, input, select, textarea, [contenteditable]'))
    ) {
      start.current = null
      return
    }
    start.current = { id: event.pointerId, x: event.clientX, y: event.clientY }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const origin = start.current
    start.current = null
    if (!origin || origin.id !== event.pointerId) return

    const dx = event.clientX - origin.x
    const dy = event.clientY - origin.y
    const threshold = Math.max(48, event.currentTarget.clientWidth * 0.08)
    if (Math.abs(dx) < threshold || Math.abs(dx) < Math.abs(dy) * 1.5) return
    go(index + (dx < 0 ? 1 : -1))
  }

  const onPointerCancel = () => {
    start.current = null
  }

  return { onPointerDown, onPointerUp, onPointerCancel }
}
