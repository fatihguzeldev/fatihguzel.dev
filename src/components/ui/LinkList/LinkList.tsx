import type { Link } from '@/content/schemas/link'
import { TextLink } from '@/components/ui/TextLink'
import styles from './LinkList.module.css'

type LinkListProps = {
  links: Link[]
  mono?: boolean
  external?: boolean
}

export function LinkList({ links, mono = true, external = true }: LinkListProps) {
  if (!links.length) return null

  return (
    <ul className={styles.list}>
      {links.map((link, index) => (
        <li key={`${link.label}-${link.href}`} className={styles.item}>
          <TextLink href={link.href} mono={mono} external={external}>
            {link.label}
          </TextLink>
          {index < links.length - 1 ? (
            <span className={styles.separator} aria-hidden="true">
              ·
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  )
}
