import { Container } from '@/components/layout/Container'
import { TalksCatalog } from '@/features/talks/components/TalksCatalog/TalksCatalog'
import { talksDescription } from '@/features/talks/content/page'
import { talkSummaries } from '@/features/talks/content/summaries'
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
