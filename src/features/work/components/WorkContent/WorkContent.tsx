import { Container } from '@/components/layout/Container/Container'
import { SocialIconList } from '@/site/components/SocialIconList/SocialIconList'
import { PageHeader } from '@/components/ui/PageHeader/PageHeader'
import { SectionHeader } from '@/components/ui/SectionHeader/SectionHeader'
import { TextLink } from '@/components/ui/TextLink/TextLink'
import styles from './WorkContent.module.css'

import type { Work } from '../../content/schema'
import type { Site } from '@/site/content/identity/schema'
import type { Social } from '@/site/content/socials/schema'

type WorkContentProps = {
  work: Work
  site: Site
  socials: Social[]
}

export function WorkContent({ work, site, socials }: WorkContentProps) {
  return (
    <Container>
      <PageHeader
        title={work.title}
        availability={work.availability}
        description={work.description}
      />

      <section className={styles.section}>
        <SectionHeader title="ways i can help" />
        <ul className={styles.services}>
          {work.services.map((service) => (
            <li key={service} className={styles.service}>
              {service}
            </li>
          ))}
        </ul>
        <p className={styles.servicesNote}>{work.servicesNote}</p>
      </section>

      <section className={styles.section}>
        <SectionHeader title="email" />
        <TextLink href={`mailto:${site.email}`} mono>
          {site.email}
        </TextLink>
      </section>

      <section className={styles.section}>
        <SectionHeader title="elsewhere" />
        <SocialIconList socials={socials} />
      </section>
    </Container>
  )
}
