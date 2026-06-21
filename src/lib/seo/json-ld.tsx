import { loadSite } from '@/content/load-site'
import { loadSocials } from '@/content/load-socials'
import { SITE_URL } from '@/content/load-site'
import type { Article } from '@/content/schemas/article'

const site = loadSite()
const { socials } = loadSocials()

export function PersonJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    url: SITE_URL,
    email: site.email,
    description: site.description,
    sameAs: socials.map((social) => social.href),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function WebSiteJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: SITE_URL,
    description: site.description,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function ArticleJsonLd({ article }: { article: Article }) {
  const articleUrl = `${SITE_URL}/articles/${article.slug}`
  const canonicalUrl = article.canonicalUrl ?? articleUrl
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    inLanguage: article.language,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    ...(article.tags.length ? { keywords: article.tags.join(', ') } : {}),
    author: {
      '@type': 'Person',
      name: site.name,
      url: SITE_URL,
    },
    url: canonicalUrl,
    mainEntityOfPage: canonicalUrl,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[]
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
