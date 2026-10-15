import assert from 'node:assert/strict'
import { test } from 'node:test'
import { formatStarCount } from './format-star-count'

test('star counts retain exact small values and use lowercase compact large values', () => {
  for (const [count, expected] of [
    [0, '0'],
    [1, '1'],
    [999, '999'],
    [1_000, '1k'],
    [1_250, '1.3k'],
    [12_345, '12k'],
    [1_000_000, '1m'],
  ] as const) {
    assert.equal(formatStarCount(count), expected)
  }
})
