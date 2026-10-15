import { SITE_URL } from '@/site/content/identity/loader'
import { personReference, websiteReference } from '@/site/seo/identity'
import { JsonLd } from '@/site/seo/structured-data/JsonLd'
import { workPage } from '../content/page'

export function ContactPageJsonLd({ description }: { description: string }) {
  const url = `${SITE_URL}${workPage.path}`
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${url}#webpage`,
    url,
    name: workPage.title,
    description,
    isPartOf: websiteReference(),
    about: personReference(),
    mainEntity: personReference(),
  }

  return <JsonLd data={data} />
}
