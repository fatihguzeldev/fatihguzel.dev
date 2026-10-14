import { Container } from '@/components/layout/Container'
import { TalksCatalog } from '@/features/talks/catalog'
import { talkSummaries } from '@/features/talks/registry/summaries'
import { createMetadata } from '@/lib/seo/metadata'
import styles from './page.module.css'

export const metadata = createMetadata({
  title: 'talks',
  description: 'conference talks, slides, and where i give them.',
  path: '/talks',
})

export default function TalksPage() {
  return (
    <main className={styles.main}>
      <Container wide>
        <TalksCatalog talks={talkSummaries} />
      </Container>
    </main>
  )
}
