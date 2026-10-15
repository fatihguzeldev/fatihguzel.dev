import { Header } from '@/site/components/Header/Header'
import { Footer } from '@/site/components/Footer/Footer'
import { Container } from '@/components/layout/Container/Container'
import { TextLink } from '@/components/ui/TextLink/TextLink'
import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Container>
          <h1 className={styles.title}>not found</h1>
          <p className={styles.description}>this page does not exist.</p>
          <TextLink href="/">back to home</TextLink>
        </Container>
      </main>
      <Footer />
    </>
  )
}
