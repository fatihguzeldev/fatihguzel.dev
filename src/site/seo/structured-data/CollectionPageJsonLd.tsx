import { SITE_URL } from '@/site/content/identity/loader'
import { websiteReference } from '../identity'
import { JsonLd } from './JsonLd'
import type { JsonLdData } from './JsonLd'

type CollectionJsonLdItem = {
  type: string
  name: string
  description?: string
  url: string
  extra?: JsonLdData
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
