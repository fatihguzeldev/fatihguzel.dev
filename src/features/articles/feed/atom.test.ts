import assert from 'node:assert/strict'
import { test } from 'node:test'
import type { Article } from '../content/schema'
import { buildAtomFeed } from './atom'

const article: Article = {
  title: 'an article',
  slug: 'an-article',
  description: 'a short description',
  publishedAt: '2026-10-15T09:00:00+03:00',
  language: 'en',
  tags: [],
  draft: false,
  readingTime: 2,
  body: '',
  html: '',
  tableOfContents: [],
}

const site = {
  siteName: 'a site',
  siteDescription: 'some writing',
  siteUrl: 'https://example.com/',
}

test('atom feed escapes site and article text as XML', () => {
  const feed = buildAtomFeed({
    ...site,
    siteName: 'site & "friends" <dev>',
    siteDescription: "notes > code's",
    articles: [{ ...article, title: 'a < b', description: '"quote" & text' }],
  })

  assert.ok(feed.includes('<title>site &amp; &quot;friends&quot; &lt;dev&gt;</title>'))
  assert.ok(feed.includes('<subtitle>notes &gt; code&apos;s</subtitle>'))
  assert.ok(feed.includes('<title>a &lt; b</title>'))
  assert.ok(feed.includes('<summary>&quot;quote&quot; &amp; text</summary>'))
  assert.ok(feed.includes('<id>https://example.com/articles/an-article</id>'))
  assert.ok(feed.includes('href="https://example.com/atom.xml"'))
})

test('atom entries preserve their language and normalize publication dates', () => {
  const feed = buildAtomFeed({
    ...site,
    articles: [
      {
        ...article,
        language: 'tr',
        updatedAt: '2026-10-16T12:00:00+03:00',
      },
    ],
  })

  assert.ok(feed.includes('<entry xml:lang="tr">'))
  assert.ok(feed.includes('<published>2026-10-15T06:00:00.000Z</published>'))
  assert.equal(feed.match(/<updated>2026-10-15T06:00:00\.000Z<\/updated>/g)?.length, 2)
})

test('an empty atom feed has a stable update date and no entries', () => {
  const feed = buildAtomFeed({ ...site, articles: [] })

  assert.ok(feed.includes('<updated>1970-01-01T00:00:00.000Z</updated>'))
  assert.ok(feed.includes('<id>https://example.com/</id>'))
  assert.ok(!feed.includes('<entry'))
  assert.ok(feed.endsWith('</feed>'))
})
