import { loadSite } from '@/content/load-site'
import { loadSocials } from '@/content/load-socials'
import { SITE_URL } from '@/content/load-site'
import type { Article } from '@/content/schemas/article'
import type { Project } from '@/content/schemas/project'

const site = loadSite()
const { socials } = loadSocials()
const siteDescription = `${site.tagline}. ${site.description}`

const PERSON_ID = `${SITE_URL}/#person`
const WEBSITE_ID = `${SITE_URL}/#website`

type JsonLdData = Record<string, unknown>

type CollectionJsonLdItem = {
  type: string
  name: string
  description?: string
  url: string
  extra?: JsonLdData
}

function serializeJsonLd(data: JsonLdData): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

function JsonLd({ data }: { data: JsonLdData }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  )
}

function personReference() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: site.name,
    url: SITE_URL,
  }
}

function websiteReference() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: site.name,
  }
}

function getProjectUrl(project: Project): string {
  return (
    project.links.find((link) => link.kind === 'web')?.href ??
    project.links.find((link) => link.kind === 'github')?.href ??
    project.links[0]?.href ??
    `${SITE_URL}/projects`
  )
}

function getProjectRepository(project: Project): string | undefined {
  return project.links.find((link) => link.kind === 'github')?.href
}

export function PersonJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: site.name,
    alternateName: 'fatihguzeldev',
    url: SITE_URL,
    email: `mailto:${site.email}`,
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
    name: site.name,
    url: SITE_URL,
    description: siteDescription,
    inLanguage: 'en',
    publisher: personReference(),
  }

  return <JsonLd data={data} />
}

export function ProfilePageJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: site.name,
    description: siteDescription,
    isPartOf: websiteReference(),
    about: personReference(),
    mainEntity: personReference(),
  }

  return <JsonLd data={data} />
}

export function ArticleJsonLd({ article }: { article: Article }) {
  const articleUrl = `${SITE_URL}/articles/${article.slug}`
  const canonicalUrl = article.canonicalUrl ?? articleUrl
  const modifiedAt =
    article.updatedAt &&
    article.updatedAt.slice(0, 10) !== article.publishedAt.slice(0, 10)
      ? article.updatedAt
      : undefined
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    inLanguage: article.language,
    datePublished: article.publishedAt,
    ...(modifiedAt ? { dateModified: modifiedAt } : {}),
    ...(article.tags.length ? { keywords: article.tags.join(', ') } : {}),
    author: personReference(),
    publisher: personReference(),
    url: canonicalUrl,
    isPartOf: websiteReference(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  }

  return <JsonLd data={data} />
}

export function CollectionPageJsonLd({
  name,
  description,
  path,
  items,
}: {
  name: string
  description: string
  path: string
  items: CollectionJsonLdItem[]
}) {
  const url = `${SITE_URL}${path}`
  const data = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: websiteReference(),
    ...(items.length
      ? {
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: items.map((item, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': item.type,
                name: item.name,
                ...(item.description ? { description: item.description } : {}),
                url: item.url,
                ...(item.extra ?? {}),
              },
            })),
          },
        }
      : {}),
  }

  return <JsonLd data={data} />
}

export function ArticlesCollectionJsonLd({ articles }: { articles: Article[] }) {
  return (
    <CollectionPageJsonLd
      name="articles"
      description="notes on engineering, systems, technology, work, and the software industry."
      path="/articles"
      items={articles.map((article) => ({
        type: 'Article',
        name: article.title,
        description: article.description,
        url: `${SITE_URL}/articles/${article.slug}`,
        extra: {
          inLanguage: article.language,
          datePublished: article.publishedAt,
          ...(article.updatedAt ? { dateModified: article.updatedAt } : {}),
          author: personReference(),
        },
      }))}
    />
  )
}

export function ProjectsCollectionJsonLd({ projects }: { projects: Project[] }) {
  return (
    <CollectionPageJsonLd
      name="projects"
      description="selected projects by fatih guzel — open source tools, communities, and products."
      path="/projects"
      items={projects.map((project) => {
        const repository = getProjectRepository(project)

        return {
          type: 'SoftwareSourceCode',
          name: project.name,
          description: project.description,
          url: getProjectUrl(project),
          extra: {
            ...(repository ? { codeRepository: repository } : {}),
            sameAs: project.links.map((link) => link.href),
            author: personReference(),
          },
        }
      })}
    />
  )
}

export function ContactPageJsonLd({ description }: { description: string }) {
  const url = `${SITE_URL}/work`
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${url}#webpage`,
    url,
    name: 'work & contact',
    description,
    isPartOf: websiteReference(),
    about: personReference(),
    mainEntity: personReference(),
  }

  return <JsonLd data={data} />
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

  return <JsonLd data={data} />
}
