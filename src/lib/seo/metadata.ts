import type { Metadata } from 'next'
import { loadSite, SITE_URL } from '@/content/load-site'

const site = loadSite()

type PageMetadataOptions = {
  title?: string
  description?: string
  path?: string
  type?: 'website' | 'article'
  publishedAt?: string
  updatedAt?: string
  tags?: string[]
  canonicalUrl?: string
}

export function createMetadata({
  title,
  description = site.description,
  path = '',
  type = 'website',
  publishedAt,
  updatedAt,
  tags,
  canonicalUrl,
}: PageMetadataOptions = {}): Metadata {
  const pageTitle = title ? `${title} · ${site.name}` : site.name
  const url = `${SITE_URL}${path}`
  const canonical = canonicalUrl ?? url

  return {
    title: pageTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical,
    },
    openGraph: {
      title: pageTitle,
      description,
      url: canonical,
      siteName: site.name,
      locale: 'en_US',
      type,
      ...(publishedAt ? { publishedTime: publishedAt } : {}),
      ...(updatedAt ? { modifiedTime: updatedAt } : {}),
      ...(tags?.length ? { tags } : {}),
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
