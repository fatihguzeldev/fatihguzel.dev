import { SITE_URL } from '@/site/content/identity/loader'
import { loadSocials } from '@/site/content/socials/loader'
import {
  PERSON_ID,
  WEBSITE_ID,
  personReference,
  siteDescription,
  siteIdentity,
} from '../identity'
import { JsonLd } from './JsonLd'

const { socials } = loadSocials()

export function PersonJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: siteIdentity.name,
    alternateName: 'fatihguzeldev',
    url: SITE_URL,
    email: `mailto:${siteIdentity.email}`,
    jobTitle: 'software engineer',
    description: siteDescription,
    knowsAbout: [
      'software engineering',
      'distributed systems',
      'systems design',
      'performance engineering',
      'product engineering',
    ],
    sameAs: socials.map((social) => social.href),
  }

  return <JsonLd data={data} />
}

export function WebSiteJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: siteIdentity.name,
    url: SITE_URL,
    description: siteDescription,
    inLanguage: 'en',
    publisher: personReference(),
  }

  return <JsonLd data={data} />
}
