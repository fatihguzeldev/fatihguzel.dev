'use client'

import { MoonIcon, SunIcon } from '@/components/icons/ThemeIcons'
import { useTheme } from '@/lib/theme/use-theme'
import styles from './ThemeToggle.module.css'

export function ThemeToggle() {
  const { theme, toggleTheme, ready } = useTheme()
  const label = theme === 'light' ? 'switch to dark theme' : 'switch to light theme'

  return (
    <button
      type="button"
      className={styles.button}
      onMouseDown={(event) => event.preventDefault()}
      onClick={toggleTheme}
      aria-label={ready ? label : 'theme'}
    >
      <span key={ready ? theme : 'loading'} className={styles.icon}>
        {theme === 'light' ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  )
}
