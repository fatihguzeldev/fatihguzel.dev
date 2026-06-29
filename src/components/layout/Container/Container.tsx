import type { ReactNode } from 'react'
import styles from './Container.module.css'

type ContainerProps = {
  children: ReactNode
  wide?: boolean
  article?: boolean
  className?: string
}

export function Container({
  children,
  wide = false,
  article = false,
  className,
}: ContainerProps) {
  const classes = [
    styles.container,
    wide ? styles.wide : '',
    article ? styles.article : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <div className={classes}>{children}</div>
}
