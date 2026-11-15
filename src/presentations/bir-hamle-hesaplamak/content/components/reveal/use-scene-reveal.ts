'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { nextSceneStep } from './scene-reveal'

export function useSceneReveal(count: number, enabled = true) {
  const [step, setStep] = useState(0)
  const stepRef = useRef(0)
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = root.current
    // PrintDeck mounts a hidden second copy of every scene.
    if (!enabled || !element || element.closest('[aria-hidden="true"]')) return

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target
      if (
        event.defaultPrevented ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        (target instanceof HTMLElement &&
          (target.isContentEditable ||
            target.closest('input, textarea, select') ||
            (target.closest('button, a, [role="dialog"]') &&
              !element.contains(target)) ||
            (event.key === ' ' && target.closest('button, a'))))
      )
        return
      const next = nextSceneStep(stepRef.current, event.key, count, event.shiftKey)
      if (next === undefined) return
      event.preventDefault()
      event.stopImmediatePropagation()
      stepRef.current = next
      setStep(next)
    }
    window.addEventListener('keydown', onKeyDown, true)
    return () => window.removeEventListener('keydown', onKeyDown, true)
  }, [count, enabled])

  const advance = useCallback(() => {
    if (!enabled) return
    const next = Math.min(count - 1, stepRef.current + 1)
    stepRef.current = next
    setStep(next)
  }, [count, enabled])

  return { step, root, advance }
}
