import { Container } from '@/components/layout/Container'
import { LinkList } from '@/components/ui/LinkList'
import { PageHeader } from '@/components/ui/PageHeader'
import { TextLink } from '@/components/ui/TextLink'
import { loadSite } from '@/content/load-site'
import { loadSocials } from '@/content/load-socials'
import { loadWork } from '@/content/load-work'
import { createMetadata } from '@/lib/seo/metadata'
import { BreadcrumbJsonLd } from '@/lib/seo/json-ld'
import styles from './page.module.css'

export const metadata = createMetadata({
  title: 'work & contact',
  description:
    'work with fatih guzel — consulting, architecture, backend design, and collaborations.',
  path: '/work',
})

export default function WorkPage() {
  const work = loadWork()
  const site = loadSite()
  const { socials } = loadSocials()

  return (
    <main className={styles.main}>
      <BreadcrumbJsonLd
        items={[
          { name: 'home', path: '/' },
          { name: 'work & contact', path: '/work' },
        ]}
      />
      <Container>
        <PageHeader
          eyebrow="contact"
          title={work.title}
          availability={work.availability}
          description={work.description}
        />

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>services</h2>
          <ul className={styles.services}>
            {work.services.map((service) => (
              <li key={service} className={styles.service}>
                {service}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>email</h2>
          <TextLink href={`mailto:${site.email}`} mono>
            {site.email}
          </TextLink>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>elsewhere</h2>
          <LinkList links={socials} />
        </section>
      </Container>
    </main>
  )
}
