import { SITE_URL } from '@/site/content/identity/loader'
import {
  personReference,
  websiteReference,
  siteIdentity,
  siteDescription,
} from '@/site/seo/identity'
import { JsonLd } from '@/site/seo/structured-data/JsonLd'

export function ProfilePageJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: siteIdentity.name,
    description: siteDescription,
    isPartOf: websiteReference(),
    about: personReference(),
    mainEntity: personReference(),
  }

  return <JsonLd data={data} />
}
