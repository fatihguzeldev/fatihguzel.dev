import { PageHeader } from '@/components/ui/PageHeader'
import { talksDescription } from '../../content/page'
import type { TalkSummary } from '../../content/types'
import { TalkItem } from '../TalkItem/TalkItem'
import styles from './TalksCatalog.module.css'

export function TalksCatalog({ talks }: { talks: readonly TalkSummary[] }) {
  return (
    <section className={styles.catalog} aria-label="talks">
      <PageHeader title="talks" description={talksDescription} />
      {talks.length ? (
        <ol className={styles.list}>
          {talks.map((talk) => (
            <TalkItem key={talk.slug} talk={talk} />
          ))}
        </ol>
      ) : (
        <p className={styles.empty}>no talks yet.</p>
      )}
    </section>
  )
}
