import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  ARTICLE_STATIC_EXPORT_PLACEHOLDER,
  getArticleStaticParams,
} from './static-params'

test('an empty article collection still supplies a static export route', () => {
  assert.deepEqual(getArticleStaticParams([]), [
    { slug: ARTICLE_STATIC_EXPORT_PLACEHOLDER },
  ])
})

test('published articles produce only their own static routes in the supplied order', () => {
  assert.deepEqual(
    getArticleStaticParams(['direnebilmek', 'what-learning-c-changes']),
    [{ slug: 'direnebilmek' }, { slug: 'what-learning-c-changes' }],
  )
})
