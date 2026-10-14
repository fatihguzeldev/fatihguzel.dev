import Link from 'next/link'
import type { TalkSummary } from '../types'
import { PresentationArrow, PresentationMark } from './icons/presentation-icons'
import styles from './TalksCatalog.module.css'

const eventDate = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

function languageName(language: string) {
  return language === 'tr' ? 'turkish' : language === 'en' ? 'english' : language
}

export function TalksCatalog({ talks }: { talks: readonly TalkSummary[] }) {
  return (
    <section className={styles.catalog} aria-labelledby="talks-title">
      <header className={styles.header}>
        <h1 id="talks-title">talks</h1>
        <p>the talks i give, with slides and event details.</p>
      </header>

      {talks.length ? (
        <ol className={styles.list}>
          {talks.map((talk, index) => (
            <li key={talk.slug} className={styles.item}>
              <article className={styles.talk} aria-labelledby={`talk-${talk.slug}`}>
                <div className={styles.rail} aria-hidden="true">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <PresentationMark />
                </div>

                <div className={styles.body}>
                  <p className={styles.meta}>
                    <span>{languageName(talk.language)}</span>
                    <span>{talk.durationMinutes} min</span>
                  </p>
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
                            <p className={styles.eventMeta}>
                              <time dateTime={appearance.date}>
                                {eventDate.format(
                                  new Date(`${appearance.date}T12:00:00Z`),
                                )}
                              </time>
                              {appearance.organizer ? (
                                <span>
                                  by{' '}
                                  <span className={styles.officialName}>
                                    {appearance.organizer}
                                  </span>
                                </span>
                              ) : null}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
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
