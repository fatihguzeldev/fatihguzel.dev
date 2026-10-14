import type { ComponentType, CSSProperties } from 'react'

export interface Talk {
  title: string
  description?: string
  language?: string
  canvas: { width: number; height: number }
  theme?: CSSProperties
}

export interface Slide {
  id: string
  title: string
  component: ComponentType
}

export interface Presentation extends Talk {
  slug: string
  slides: Slide[]
}

export function defineTalk(talk: Talk): Talk {
  const { width, height } = talk.canvas
  if (
    !talk.title.trim() ||
    !Number.isFinite(width) ||
    !Number.isFinite(height) ||
    width <= 0 ||
    height <= 0
  ) {
    throw new Error('A talk needs a title and positive, finite canvas dimensions.')
  }
  return talk
}
