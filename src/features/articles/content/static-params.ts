export const ARTICLE_STATIC_EXPORT_PLACEHOLDER = '__static_export_placeholder__'

export function getArticleStaticParams(slugs: string[]): { slug: string }[] {
  if (slugs.length === 0) {
    return [{ slug: ARTICLE_STATIC_EXPORT_PLACEHOLDER }]
  }

  return slugs.map((slug) => ({ slug }))
}
