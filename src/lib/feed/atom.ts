import type { Article } from '@/content/schemas/article'

type BuildAtomFeedOptions = {
  articles: Article[]
  siteName: string
  siteDescription: string
  siteUrl: string
}

const EMPTY_FEED_UPDATED = '1970-01-01T00:00:00.000Z'

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function toAtomDate(date: string): string {
  return new Date(date).toISOString()
}

function trimTrailingSlash(value: string): string {
  return value.replace(/\/$/, '')
}

function getArticleUrl(siteUrl: string, article: Article): string {
  return `${trimTrailingSlash(siteUrl)}/articles/${article.slug}`
}

export function buildAtomFeed({
  articles,
  siteName,
  siteDescription,
  siteUrl,
}: BuildAtomFeedOptions): string {
  const normalizedSiteUrl = trimTrailingSlash(siteUrl)
  const feedUrl = `${normalizedSiteUrl}/atom.xml`
  const latestPublishedAt = articles[0]?.publishedAt
  const feedUpdated = latestPublishedAt
    ? toAtomDate(latestPublishedAt)
    : EMPTY_FEED_UPDATED

  const entries = articles
    .map((article) => {
      const articleUrl = getArticleUrl(normalizedSiteUrl, article)
      const publishedAt = toAtomDate(article.publishedAt)

      return [
        `  <entry xml:lang="${escapeXml(article.language)}">`,
        `    <id>${escapeXml(articleUrl)}</id>`,
        `    <title>${escapeXml(article.title)}</title>`,
        `    <link rel="alternate" href="${escapeXml(articleUrl)}" />`,
        `    <published>${publishedAt}</published>`,
        `    <updated>${publishedAt}</updated>`,
        `    <summary>${escapeXml(article.description)}</summary>`,
        '  </entry>',
      ].join('\n')
    })
    .join('\n')

  return [
    '<?xml version="1.0" encoding="utf-8"?>',
    '<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="en">',
    `  <id>${escapeXml(normalizedSiteUrl)}/</id>`,
    `  <title>${escapeXml(siteName)}</title>`,
    '  <author>',
    `    <name>${escapeXml(siteName)}</name>`,
    '  </author>',
    `  <subtitle>${escapeXml(siteDescription)}</subtitle>`,
    `  <link rel="alternate" href="${escapeXml(normalizedSiteUrl)}/" />`,
    `  <link rel="self" href="${escapeXml(feedUrl)}" />`,
    `  <updated>${feedUpdated}</updated>`,
    entries,
    '</feed>',
    '',
  ]
    .filter((line) => line.length > 0)
    .join('\n')
}
