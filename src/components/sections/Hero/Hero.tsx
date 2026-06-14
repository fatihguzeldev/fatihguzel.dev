import { Container } from '@/components/layout/Container'
import { SocialIconList } from '@/components/ui/SocialIconList'
import { loadFooterSocials } from '@/content/load-socials'
import styles from './Hero.module.css'
import sectionStyles from '../shared/Section.module.css'

type HeroProps = {
  title: string
  subtitle: string
}

export function Hero({ title, subtitle }: HeroProps) {
  const socials = loadFooterSocials()

  return (
    <section className={`${sectionStyles.section} ${styles.hero}`}>
      <Container>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        <nav className={styles.socials} aria-label="social">
          <SocialIconList socials={socials} />
        </nav>
      </Container>
    </section>
  )
}
