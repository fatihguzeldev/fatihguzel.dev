import Link from 'next/link'
import type { TalkSummary } from '../../content/types'
import { PresentationArrow, PresentationMark } from '../icons/presentation-icons'
import { TalkAppearances } from '../TalkAppearances/TalkAppearances'
import styles from './TalkItem.module.css'

export function TalkItem({ talk }: { talk: TalkSummary }) {
  return (
    <li className={styles.item}>
      <span className={styles.itemMark} aria-hidden="true">
        <PresentationMark />
      </span>
      <article className={styles.body} aria-labelledby={`talk-${talk.slug}`}>
        <h2 id={`talk-${talk.slug}`} className={styles.title}>
          <Link href={`/talks/${talk.slug}`} className={styles.titleLink}>
            <span>{talk.title}</span>
            <PresentationArrow />
          </Link>
        </h2>
        <p className={styles.description}>{talk.description}</p>
        <TalkAppearances appearances={talk.appearances} />
      </article>
    </li>
  )
}
