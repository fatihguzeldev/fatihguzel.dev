'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import type { Presentation } from '@/presentations/common/types'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import {
  BackIcon,
  NextIcon,
  ExpandIcon,
  CollapseIcon,
  ExportIcon,
  ControlsIcon,
  CloseIcon,
} from '../icons/PlayerIcons'
import styles from './PlayerControls.module.css'

type PlayerControlsProps = {
  presentation: Presentation
  index: number
  go: (index: number) => void
  fullscreen: { available: boolean; active: boolean; toggle: () => Promise<void> }
  exporting: boolean
  onExport: () => void
}

export function PlayerControls({
  presentation,
  index,
  go,
  fullscreen,
  exporting,
  onExport,
}: PlayerControlsProps) {
  const [open, setOpen] = useState(false)
  const region = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const focusPanel = useRef(false)
  const panelId = 'presentation-controls'

  const closePanel = () => {
    setOpen(false)
    requestAnimationFrame(() => trigger.current?.focus())
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

  return (
    <div
      ref={region}
      className={styles.region}
      data-open={open}
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') setOpen(true)
      }}
      onPointerLeave={(event) => {
        if (
          event.pointerType === 'mouse' &&
          !document.activeElement?.matches(':focus-visible')
        )
          setOpen(false)
      }}
      onFocus={(event) => {
        if (!trigger.current?.contains(event.target as Node)) setOpen(true)
      }}
      onBlur={(event) => {
        if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget))
          setOpen(false)
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          closePanel()
        }
      }}
    >
      <button
        ref={trigger}
        className={styles.trigger}
        type="button"
        aria-label={open ? 'hide presentation controls' : 'show presentation controls'}
        aria-expanded={open}
        aria-controls={panelId}
        aria-hidden={open}
        tabIndex={open ? -1 : 0}
        onClick={() => {
          focusPanel.current = true
          setOpen(true)
        }}
      >
        <ControlsIcon />
        <span>
          {index + 1}
          <span className={styles.countDivider}>/</span>
          {presentation.slides.length}
        </span>
      </button>
      <nav
        id={panelId}
        className={styles.panel}
        aria-label="presentation"
        inert={!open}
      >
        <Link
          className={styles.back}
          href="/talks"
          title="back to talks"
          aria-label="back to talks"
        >
          <BackIcon />
          <span>talks</span>
        </Link>
        <span className={styles.title}>{presentation.title}</span>
        <div className={styles.pages}>
          <button
            type="button"
            className={styles.iconButton}
            aria-label="previous slide"
            title="previous slide"
            disabled={index === 0}
            onClick={() => go(index - 1)}
          >
            <BackIcon />
          </button>
          <div className={styles.picker}>
            <select
              aria-label="slide"
              value={index}
              onChange={(event) => go(Number(event.target.value))}
            >
              {presentation.slides.map((slide, page) => (
                <option key={slide.id} value={page}>
                  {page + 1}. {slide.title}
                </option>
              ))}
            </select>
          </div>
          <span className={styles.count}>
            {index + 1} / {presentation.slides.length}
          </span>
          <button
            type="button"
            className={styles.iconButton}
            aria-label="next slide"
            title="next slide"
            disabled={index === presentation.slides.length - 1}
            onClick={() => go(index + 1)}
          >
            <NextIcon />
          </button>
        </div>
        <div className={styles.actions}>
          <ThemeToggle />
          {fullscreen.available && (
            <button
              type="button"
              className={styles.iconButton}
              aria-label={fullscreen.active ? 'exit fullscreen' : 'fullscreen'}
              title={fullscreen.active ? 'exit fullscreen (f)' : 'fullscreen (f)'}
              onClick={() => void fullscreen.toggle()}
            >
              {fullscreen.active ? <CollapseIcon /> : <ExpandIcon />}
            </button>
          )}
          <button
            type="button"
            className={styles.export}
            disabled={exporting}
            onClick={onExport}
            aria-label={exporting ? 'preparing export' : 'export'}
            title="export all slides as pdf"
          >
            <ExportIcon />
            <span>{exporting ? 'preparing…' : 'export'}</span>
          </button>
          <button
            type="button"
            className={styles.iconButton}
            aria-label="hide presentation controls"
            title="hide presentation controls"
            onClick={closePanel}
          >
            <CloseIcon />
          </button>
        </div>
      </nav>
    </div>
  )
}
