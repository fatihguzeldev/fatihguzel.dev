'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { NAV_LINKS } from '@/lib/constants'
import styles from './Header.module.css'

type HeaderProps = {
  siteName: string
}

export function Header({ siteName }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={[styles.header, scrolled ? styles.scrolled : ''].join(' ')}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          {siteName}
        </Link>
        <nav className={styles.nav} aria-label="main">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
