'use client'

import { useRef, type PointerEvent } from 'react'
import { swipePageOffset } from './swipe'

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
    const offset = swipePageOffset(dx, dy, event.currentTarget.clientWidth)
    if (offset) go(index + offset)
  }

  const onPointerCancel = () => {
    start.current = null
  }

  return { onPointerDown, onPointerUp, onPointerCancel }
}
