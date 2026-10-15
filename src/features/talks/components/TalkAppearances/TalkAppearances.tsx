import type { TalkAppearance } from '../../content/types'
import { PresentationArrow } from '../icons/presentation-icons'
import styles from './TalkAppearances.module.css'

const eventDate = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
})

export function TalkAppearances({
  appearances,
}: {
  appearances: readonly TalkAppearance[]
}) {
  if (!appearances.length) return null

  return (
    <div className={styles.appearances}>
      <p className={styles.appearanceLabel}>on stage</p>
      <ul className={styles.eventList} aria-label="events">
        {appearances.map((appearance) => (
          <li key={`${appearance.date}-${appearance.url}`} className={styles.event}>
            <a
              href={appearance.url}
              className={styles.eventLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.eventName}>
                {appearance.name}
                <PresentationArrow external />
              </span>
              <time className={styles.eventDate} dateTime={appearance.date}>
                {eventDate
                  .format(new Date(`${appearance.date}T12:00:00Z`))
                  .toLowerCase()}
              </time>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
