import { Container } from '@/components/layout/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { TextLink } from '@/components/ui/TextLink'
import styles from './WorkTeaser.module.css'
import sectionStyles from '../shared/Section.module.css'

type WorkTeaserProps = {
  headline: string
  description: string
  cta: string
}

export function WorkTeaser({ headline, description, cta }: WorkTeaserProps) {
  return (
    <section className={sectionStyles.section} id="work">
      <Container>
        <SectionHeader eyebrow="contact" title="work & contact" />
        <p className={styles.headline}>{headline}</p>
        <p className={styles.description}>{description}</p>
        <p className={styles.cta}>
          <TextLink href="/work">{cta}</TextLink>
        </p>
      </Container>
    </section>
  )
}
