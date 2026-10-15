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
