import assert from 'node:assert/strict'
import { test } from 'node:test'
import { getShownUpdatedAt } from './publication'

test('publication metadata omits an absent update date', () => {
  assert.equal(getShownUpdatedAt({ publishedAt: '2026-10-15' }), undefined)
})

test('publication metadata hides updates on the publication date', () => {
  assert.equal(
    getShownUpdatedAt({
      publishedAt: '2026-10-15T08:00:00+03:00',
      updatedAt: '2026-10-15T20:00:00+03:00',
    }),
    undefined,
  )
})

test('publication metadata preserves an update on a later date', () => {
  const updatedAt = '2026-10-16T08:00:00+03:00'

  assert.equal(getShownUpdatedAt({ publishedAt: '2026-10-15', updatedAt }), updatedAt)
})
