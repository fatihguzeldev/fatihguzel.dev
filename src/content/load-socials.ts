import socialsData from '../../content/socials.json'
import { SocialsFileSchema } from './schemas/socials'

export function loadSocials() {
  return SocialsFileSchema.parse(socialsData)
}

export function loadFooterSocials() {
  const { socials, footerSlugs } = loadSocials()
  if (!footerSlugs?.length) return socials.slice(0, 4)

  return footerSlugs
    .map((slug) => socials.find((social) => social.slug === slug))
    .filter((social): social is (typeof socials)[number] => Boolean(social))
}
