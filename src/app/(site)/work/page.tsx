import { WorkContent } from '@/features/work/components/WorkContent/WorkContent'
import { loadSite } from '@/site/content/identity/loader'
import { loadSocials } from '@/site/content/socials/loader'
import { loadWork } from '@/features/work/content/loader'
import { createMetadata } from '@/lib/seo/metadata'
import { BreadcrumbJsonLd, ContactPageJsonLd } from '@/lib/seo/json-ld'
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
      <ContactPageJsonLd description={work.description} />
      <BreadcrumbJsonLd
        items={[
          { name: 'home', path: '/' },
          { name: 'work & contact', path: '/work' },
        ]}
      />
      <WorkContent work={work} site={site} socials={socials} />
    </main>
  )
}
