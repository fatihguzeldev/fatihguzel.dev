import siteData from '../../content/site.json'
import { SiteSchema } from './schemas/site'

const site = SiteSchema.parse(siteData)

export function loadSite() {
  return site
}

export const SITE_URL = site.url
