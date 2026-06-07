import {
  isTheme,
  resolveThemeFromSystem,
  THEME_STORAGE_KEY,
  type Theme,
} from './constants'

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme
}

export function getInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (isTheme(stored)) return stored
  } catch {
    // ignore storage failures (private mode, etc.)
  }

  return resolveThemeFromSystem()
}

export function setStoredTheme(theme: Theme): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // ignore storage failures (private mode, etc.)
  }
}

export function getThemeScript(): string {
  return `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var t=localStorage.getItem(k);if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='light';}})();`
}
