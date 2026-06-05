import Link from 'next/link'
import type { ComponentProps } from 'react'
import styles from './TextLink.module.css'

type TextLinkProps = Omit<ComponentProps<'a'>, 'href'> & {
  href: string
  muted?: boolean
  mono?: boolean
  external?: boolean
}

function isInternalHref(href: string): boolean {
  return href.startsWith('/') && !href.startsWith('//')
}

function isExternalHref(href: string): boolean {
  return (
    href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//')
  )
}

export function TextLink({
  muted = false,
  mono = false,
  external = false,
  className,
  children,
  href,
  ...props
}: TextLinkProps) {
  const classes = [
    styles.link,
    muted ? styles.muted : '',
    mono ? styles.mono : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (!external && isInternalHref(href)) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  const openInNewTab = external || isExternalHref(href)

  return (
    <a
      href={href}
      className={classes}
      {...(openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    >
      {children}
    </a>
  )
}
