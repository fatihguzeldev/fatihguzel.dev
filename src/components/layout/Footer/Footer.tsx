import { loadSite } from '@/content/load-site'
import { loadFooterSocials } from '@/content/load-socials'
import { Container } from '@/components/layout/Container'
import styles from './Footer.module.css'

const site = loadSite()
const footerSocials = loadFooterSocials()
const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.inner}>
          <p className={styles.meta}>
            © {year} {site.name}
          </p>
          <nav className={styles.links} aria-label="social">
            {footerSocials.map((social) => (
              <a
                key={social.href}
                href={social.href}
                className={styles.link}
                target="_blank"
                rel="me noopener noreferrer"
              >
                {social.label}
              </a>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  )
}
