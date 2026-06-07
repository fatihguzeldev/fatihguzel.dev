import type { Social } from '@/content/schemas/socials'
import { getSocialIcon } from '@/components/icons/SocialIcons'
import styles from './SocialIconList.module.css'

type SocialIconListProps = {
  socials: Social[]
  iconSize?: number
}

export function SocialIconList({ socials, iconSize = 15 }: SocialIconListProps) {
  if (!socials.length) return null

  return (
    <ul className={styles.list}>
      {socials.map((social) => {
        const Icon = getSocialIcon(social)

        return (
          <li key={social.slug}>
            <a
              href={social.href}
              className={styles.link}
              target="_blank"
              rel="me noopener noreferrer"
              aria-label={social.label}
            >
              <Icon size={iconSize} />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
