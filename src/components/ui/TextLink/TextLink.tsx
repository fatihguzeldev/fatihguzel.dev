import Link from 'next/link'
import type { ComponentProps, CSSProperties } from 'react'
import styles from './TextLink.module.css'

type TextLinkStyle = CSSProperties & {
  '--route-width'?: string
}

type TextLinkProps = Omit<ComponentProps<'a'>, 'href'> & {
  href: string
  muted?: boolean
  mono?: boolean
  cta?: boolean
  ctaVariant?: 'tick' | 'route'
  routeLabel?: string
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
  cta = false,
  ctaVariant = 'tick',
  routeLabel,
  external = false,
  className,
  children,
  href,
  style,
  ...props
}: TextLinkProps) {
  const classes = [
    styles.link,
    muted ? styles.muted : '',
    mono ? styles.mono : '',
    cta ? styles.cta : '',
    cta && ctaVariant === 'route' ? styles.ctaRoute : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const routeStyle: TextLinkStyle | undefined =
    cta && ctaVariant === 'route' && routeLabel
      ? {
          '--route-width': `calc(${routeLabel.length}ch + ${
            Math.max(routeLabel.length - 1, 0) * 0.04
          }em)`,
        }
      : undefined

  const linkStyle = routeStyle ? { ...style, ...routeStyle } : style
  const routeProps = routeLabel ? { 'data-route': routeLabel } : {}

  if (!external && isInternalHref(href)) {
    return (
      <Link
        href={href}
        className={classes}
        style={linkStyle}
        {...routeProps}
        {...props}
      >
        {children}
      </Link>
    )
  }

  const openInNewTab = external || isExternalHref(href)

  return (
    <a
      href={href}
      className={classes}
      style={linkStyle}
      {...routeProps}
      {...(openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    >
      {children}
    </a>
  )
}
