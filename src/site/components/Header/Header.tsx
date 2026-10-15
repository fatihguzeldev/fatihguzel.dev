'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { MenuIcon } from '@/site/icons/HeaderIcons'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { HeaderNavigation } from './HeaderNavigation'
import styles from './Header.module.css'

// Keep aligned with the desktop media query in Header.module.css.
const WIDE_NAVIGATION = '(min-width: 32rem)'

export function Header() {
  const pathname = usePathname()
  const header = useRef<HTMLElement>(null)
  const menu = useRef<HTMLDetailsElement>(null)
  const trigger = useRef<HTMLElement>(null)

  useEffect(() => {
    if (menu.current) menu.current.open = false
  }, [pathname])

  useEffect(() => {
    const wide = window.matchMedia(WIDE_NAVIGATION)
    const dismiss = () => {
      if (menu.current) menu.current.open = false
    }
    const resize = () => {
      if (!wide.matches) return
      const active = document.activeElement
      if (active instanceof HTMLAnchorElement && menu.current?.contains(active)) {
        header.current
          ?.querySelector<HTMLAnchorElement>(
            `nav a[href="${active.getAttribute('href')}"]`,
          )
          ?.focus()
      } else if (menu.current?.contains(active)) {
        header.current?.querySelector<HTMLAnchorElement>('a')?.focus()
      }
      dismiss()
    }
    const escape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !menu.current?.open) return
      event.preventDefault()
      dismiss()
      trigger.current?.focus()
    }
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) dismiss()
    }
    wide.addEventListener('change', resize)
    document.addEventListener('keydown', escape)
    document.addEventListener('pointerdown', outside)
    return () => {
      wide.removeEventListener('change', resize)
      document.removeEventListener('keydown', escape)
      document.removeEventListener('pointerdown', outside)
    }
  }, [])

  return (
    <header className={styles.header} ref={header}>
      <div className={styles.inner}>
        <div className={styles.bar}>
          <Link
            href="/"
            className={styles.logo}
            aria-label="home"
            aria-current={pathname === '/' ? 'page' : undefined}
            onClick={() => {
              if (menu.current) menu.current.open = false
            }}
          >
            home
          </Link>
          <HeaderNavigation className={styles.desktopNav} pathname={pathname} />
          <div className={styles.actions}>
            <ThemeToggle />
          </div>
        </div>
        <details className={styles.mobileMenu} ref={menu}>
          <summary className={styles.menuToggle} ref={trigger} aria-label="menu">
            <MenuIcon className={styles.menuIcon} />
          </summary>
          <HeaderNavigation
            className={styles.mobileNav}
            pathname={pathname}
            onNavigate={() => {
              if (menu.current) menu.current.open = false
            }}
          />
        </details>
      </div>
    </header>
  )
}
