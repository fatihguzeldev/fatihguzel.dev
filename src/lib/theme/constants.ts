export const THEME_STORAGE_KEY = 'fatihguzel-dev-theme'

export type Theme = 'light' | 'dark'

export function isTheme(value: string | null | undefined): value is Theme {
  return value === 'light' || value === 'dark'
}

export function resolveThemeFromSystem(): Theme {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}
