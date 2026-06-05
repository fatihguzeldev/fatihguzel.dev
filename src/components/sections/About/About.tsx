import { Container } from '@/components/layout/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import styles from './About.module.css'
import sectionStyles from '../shared/Section.module.css'

type AboutProps = {
  paragraphs: string[]
}

export function About({ paragraphs }: AboutProps) {
  return (
    <section className={sectionStyles.section} id="about">
      <Container>
        <SectionHeader eyebrow="about" title="about me" />
        <div className={styles.paragraphs}>
          {paragraphs.map((paragraph, index) => (
            <p key={index} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
    </section>
  )
}
