import { Container } from '@/components/layout/Container'
import { TalksCatalog } from '@/features/talks/components/TalksCatalog/TalksCatalog'
import { talksPage } from '@/features/talks/content/page'
import { talkSummaries } from '@/features/talks/content/summaries'
import { createMetadata } from '@/site/seo/metadata'
import styles from './page.module.css'

export const metadata = createMetadata({
  ...talksPage,
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
