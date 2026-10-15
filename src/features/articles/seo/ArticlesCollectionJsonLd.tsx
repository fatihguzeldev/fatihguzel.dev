import { SITE_URL } from '@/site/content/identity/loader'
import { personReference } from '@/site/seo/identity'
import { CollectionPageJsonLd } from '@/site/seo/structured-data/CollectionPageJsonLd'
import type { Article } from '../content/schema'
import { articlesPage } from '../content/page'

export function ArticlesCollectionJsonLd({ articles }: { articles: Article[] }) {
  return (
    <CollectionPageJsonLd
      name={articlesPage.title}
      description={articlesPage.description}
      path={articlesPage.path}
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
