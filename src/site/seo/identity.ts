import { loadSite, SITE_URL } from '@/site/content/identity/loader'

export const siteIdentity = loadSite()
export const siteDescription = `${siteIdentity.tagline}. ${siteIdentity.description}`

export const PERSON_ID = `${SITE_URL}/#person`
export const WEBSITE_ID = `${SITE_URL}/#website`

export function personReference() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: siteIdentity.name,
    url: SITE_URL,
  }
}

export function websiteReference() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: siteIdentity.name,
  }
}
