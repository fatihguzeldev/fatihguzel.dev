import { workPage } from '@/features/work/content/page'
import { WorkContent } from '@/features/work/components/WorkContent/WorkContent'
import { loadSite } from '@/site/content/identity/loader'
import { loadSocials } from '@/site/content/socials/loader'
import { loadWork } from '@/features/work/content/loader'
import { createMetadata } from '@/site/seo/metadata'
import { BreadcrumbJsonLd } from '@/site/seo/structured-data/BreadcrumbJsonLd'
import { ContactPageJsonLd } from '@/features/work/seo/ContactPageJsonLd'
import styles from './page.module.css'

export const metadata = createMetadata({
  ...workPage,
  description: workPage.metadataDescription,
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
