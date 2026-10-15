import assert from 'node:assert/strict'
import { test } from 'node:test'
import { ArticleFrontmatterSchema } from './schema'

const requiredFrontmatter = {
  title: 'an article',
  slug: 'an-article',
  publishedAt: '2026-10-15',
  description: 'a short description',
}

test('article frontmatter supplies publishing defaults', () => {
  assert.deepEqual(ArticleFrontmatterSchema.parse(requiredFrontmatter), {
    ...requiredFrontmatter,
    language: 'en',
    tags: [],
    draft: false,
  })
})

test('article frontmatter accepts explicit publishing settings', () => {
  const frontmatter = {
    ...requiredFrontmatter,
    language: 'tr',
    tags: ['engineering'],
    draft: true,
    updatedAt: '2026-10-16T09:00:00+03:00',
    canonicalUrl: 'https://example.com/an-article',
    readingTime: 7,
  }

  assert.deepEqual(ArticleFrontmatterSchema.parse(frontmatter), frontmatter)
})

test('article frontmatter rejects invalid route and publication data', () => {
  for (const invalid of [
    { slug: 'An Article' },
    { publishedAt: 'next thursday' },
    { language: 'de' },
    { canonicalUrl: '/an-article' },
    { readingTime: 0 },
  ]) {
    assert.equal(
      ArticleFrontmatterSchema.safeParse({ ...requiredFrontmatter, ...invalid })
        .success,
      false,
    )
  }
})
