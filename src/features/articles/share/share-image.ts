import type { Article } from '../content/schema'

export const SHARE_IMAGE_SIZE = { width: 1200, height: 630 }

export type ShareImageArticle = Pick<
  Article,
  'title' | 'publishedAt' | 'language' | 'tags'
>

export function getArticleShareImageTitleLayout(title: string) {
  const words = title.trim().split(/\s+/)
  const text = words.join(' ')
  const fontSize = text.length <= 16 ? 112 : text.length <= 70 ? 88 : 72

  if (text.length <= 28 || words.length < 2) {
    return { lines: [text], fontSize }
  }

  let lines = [text]
  let smallestDifference = Infinity

  for (let index = 1; index < words.length; index++) {
    const first = words.slice(0, index).join(' ')
    const second = words.slice(index).join(' ')
    const difference = Math.abs(first.length - second.length)

    if (difference < smallestDifference) {
      smallestDifference = difference
      lines = [first, second]
    }
  }

  return { lines, fontSize }
}

export function getArticleShareImageData(article: ShareImageArticle) {
  const locale = article.language === 'tr' ? 'tr-TR' : 'en-US'
  const firstTag = article.tags[0]
  const date = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${article.publishedAt.slice(0, 10)}T00:00:00Z`))

  return {
    title: article.title.toLocaleLowerCase(locale),
    hashtag: firstTag ? `#${firstTag.toLocaleLowerCase(locale)}` : undefined,
    date: date.toLocaleLowerCase(locale),
  }
}
