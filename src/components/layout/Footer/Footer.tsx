import { loadSite } from '@/content/load-site'
import { Container } from '@/components/layout/Container'
import styles from './Footer.module.css'

const site = loadSite()
const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <p className={styles.meta}>
          © {year} {site.name}
        </p>
      </Container>
    </footer>
  )
}
