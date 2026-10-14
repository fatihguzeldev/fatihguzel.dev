import { Container } from '@/components/layout/Container'
import { TalksCatalog, talksDescription } from '@/features/talks/catalog'
import { talkSummaries } from '@/features/talks/registry/summaries'
import { createMetadata } from '@/lib/seo/metadata'
import styles from './page.module.css'

export const metadata = createMetadata({
  title: 'talks',
  description: talksDescription,
  path: '/talks',
})

export default function TalksPage() {
  return (
    <main className={styles.main}>
      <Container>
        <TalksCatalog talks={talkSummaries} />
      </Container>
    </main>
  )
}
