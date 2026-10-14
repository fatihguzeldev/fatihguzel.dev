import Link from 'next/link'
import { PageHeader } from '@/components/ui/PageHeader'
import type { TalkSummary } from '../types'
import { PresentationArrow, PresentationMark } from './icons/presentation-icons'
import styles from './TalksCatalog.module.css'

export const talksDescription = "a few things i can't stop thinking about."

const eventDate = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
})

export function TalksCatalog({ talks }: { talks: readonly TalkSummary[] }) {
  return (
    <section className={styles.catalog} aria-label="talks">
      <PageHeader title="talks" description={talksDescription} />

      {talks.length ? (
        <ol className={styles.list}>
          {talks.map((talk) => (
            <li key={talk.slug} className={styles.item}>
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

                {talk.appearances.length ? (
                  <div className={styles.appearances}>
                    <p className={styles.appearanceLabel}>on stage</p>
                    <ul className={styles.eventList} aria-label="events">
                      {talk.appearances.map((appearance) => (
                        <li
                          key={`${appearance.date}-${appearance.url}`}
                          className={styles.event}
                        >
                          <a
                            href={appearance.url}
                            className={styles.eventLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span>{appearance.name}</span>
                            <PresentationArrow external />
                          </a>
                          <time className={styles.eventDate} dateTime={appearance.date}>
                            {eventDate
                              .format(new Date(`${appearance.date}T12:00:00Z`))
                              .toLowerCase()}
                          </time>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </article>
            </li>
          ))}
        </ol>
      ) : (
        <p className={styles.empty}>no talks yet.</p>
      )}
    </section>
  )
}
