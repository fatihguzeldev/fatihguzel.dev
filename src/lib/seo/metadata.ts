import type { Metadata } from 'next'
import { loadSite, SITE_URL } from '@/content/load-site'

const site = loadSite()

type PageMetadataOptions = {
  title?: string
  description?: string
  path?: string
  type?: 'website' | 'article'
  publishedAt?: string
}

export function createMetadata({
  title,
  description = site.description,
  path = '',
  type = 'website',
  publishedAt,
}: PageMetadataOptions = {}): Metadata {
  const pageTitle = title ? `${title} · ${site.name}` : site.name
  const url = `${SITE_URL}${path}`

  return {
    title: pageTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName: site.name,
      locale: 'en_US',
      type,
      ...(publishedAt ? { publishedTime: publishedAt } : {}),
    },
    twitter: {
      card: 'summary',
      title: pageTitle,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export function getSite() {
  return site
}
