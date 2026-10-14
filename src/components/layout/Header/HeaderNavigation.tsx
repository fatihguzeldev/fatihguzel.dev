import Link from 'next/link'
import { NAV_LINKS } from '@/lib/constants'
import styles from './Header.module.css'

type HeaderNavigationProps = {
  className: string
  pathname: string
  onNavigate?: () => void
}

export function HeaderNavigation({
  className,
  pathname,
  onNavigate,
}: HeaderNavigationProps) {
  return (
    <nav className={className} aria-label="main">
      {NAV_LINKS.map((link) => {
        const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
        return (
          <Link
            key={link.href}
            href={link.href}
            className={styles.navLink}
            aria-current={active ? 'page' : undefined}
            onClick={onNavigate}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
