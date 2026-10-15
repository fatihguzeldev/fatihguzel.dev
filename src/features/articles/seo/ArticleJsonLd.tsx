import { SITE_URL } from '@/site/content/identity/loader'
import { personReference, websiteReference } from '@/site/seo/identity'
import { JsonLd } from '@/site/seo/structured-data/JsonLd'
import type { Article } from '../content/schema'
import { getShownUpdatedAt } from '../format/publication'

export function ArticleJsonLd({ article }: { article: Article }) {
  const articleUrl = `${SITE_URL}/articles/${article.slug}`
  const canonicalUrl = article.canonicalUrl ?? articleUrl
  const modifiedAt = getShownUpdatedAt(article)
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
