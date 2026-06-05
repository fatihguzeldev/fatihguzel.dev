import { Container } from '@/components/layout/Container'
import styles from './Hero.module.css'
import sectionStyles from '../shared/Section.module.css'

type HeroProps = {
  title: string
  subtitle: string
}

export function Hero({ title, subtitle }: HeroProps) {
  return (
    <section className={`${sectionStyles.section} ${styles.hero}`}>
      <Container>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </Container>
    </section>
  )
}
