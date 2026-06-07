import { loadSite } from '@/content/load-site'
import { loadFooterSocials } from '@/content/load-socials'
import { Container } from '@/components/layout/Container'
import { SocialIconList } from '@/components/ui/SocialIconList'
import styles from './Footer.module.css'

const site = loadSite()
const footerSocials = loadFooterSocials()
const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.inner}>
          <nav className={styles.socials} aria-label="social">
            <SocialIconList socials={footerSocials} />
          </nav>
          <p className={styles.meta}>
            © {year} {site.name}
          </p>
        </div>
      </Container>
    </footer>
  )
}
