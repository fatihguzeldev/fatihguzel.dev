import type { Metadata } from 'next'
import { SITE_URL } from '@/site/content/identity/loader'
import { siteIdentity as site, siteDescription } from './identity'

type PageMetadataOptions = {
  title?: string
  description?: string
  path?: string
  type?: 'website' | 'article'
  publishedAt?: string
  updatedAt?: string
  tags?: string[]
  canonicalUrl?: string
  image?: {
    url: string
    alt: string
    width: number
    height: number
  }
}

export function createMetadata({
  title,
  description = siteDescription,
  path = '',
  type = 'website',
  publishedAt,
  updatedAt,
  tags,
  canonicalUrl,
  image,
}: PageMetadataOptions = {}): Metadata {
  const pageTitle = title ? `${title} · ${site.name}` : site.name
  const url = `${SITE_URL}${path}`
  const canonical = canonicalUrl ?? url

  return {
    title: {
      default: site.name,
      template: `%s · ${site.name}`,
      absolute: pageTitle,
    },
    description,
    metadataBase: new URL(SITE_URL),
    applicationName: site.name,
    authors: [{ name: site.name, url: SITE_URL }],
    creator: site.name,
    publisher: site.name,
    keywords: tags,
    alternates: {
      canonical,
      types: {
        'application/atom+xml': [
          {
            title: `${site.name} atom feed`,
            url: '/atom.xml',
          },
        ],
      },
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
      ...(image ? { images: [image] } : {}),
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title: pageTitle,
      description,
      ...(image ? { images: [{ url: image.url, alt: image.alt }] } : {}),
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}
