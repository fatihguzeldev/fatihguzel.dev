import type { CSSProperties } from 'react'

export interface ThemeTokens {
  background: string
  foreground: string
  muted: string
  accent: string
  fontSans: string
  fontMono: string
  spacing: number
  radius: number
}

/** Optional starting values. Every talk may replace these or use its own CSS. */
export const defaultTheme: ThemeTokens = {
  background: '#0b0b0b',
  foreground: '#f5f5f5',
  muted: '#a0a0a0',
  accent: '#7db4ff',
  fontSans: "'IBM Plex Sans', sans-serif",
  fontMono: "'IBM Plex Mono', monospace",
  spacing: 24,
  radius: 12,
}

export type ThemeStyle = CSSProperties & Record<`--slide-${string}`, string | number>

export function createTheme(overrides: Partial<ThemeTokens> = {}): ThemeStyle {
  const tokens = { ...defaultTheme, ...overrides }
  return {
    '--slide-background': tokens.background,
    '--slide-foreground': tokens.foreground,
    '--slide-muted': tokens.muted,
    '--slide-accent': tokens.accent,
    '--slide-font': tokens.fontSans,
    '--slide-font-mono': tokens.fontMono,
    '--slide-spacing': `${tokens.spacing}px`,
    '--slide-radius': `${tokens.radius}px`,
  }
}
