import assert from 'node:assert/strict'
import { test } from 'node:test'
import { defineTalk } from './define-talk'

test('authoring preserves a valid talk and its exact canvas', () => {
  const talk = { title: 'a talk', canvas: { width: 1920, height: 1080 } }
  assert.equal(defineTalk(talk), talk)
})

test('authoring rejects blank titles and invalid canvas dimensions', () => {
  assert.throws(() => defineTalk({ title: ' ', canvas: { width: 1920, height: 1080 } }))
  for (const value of [0, -1, NaN, Infinity]) {
    assert.throws(() =>
      defineTalk({ title: 'a talk', canvas: { width: value, height: 1080 } }),
    )
    assert.throws(() =>
      defineTalk({ title: 'a talk', canvas: { width: 1920, height: value } }),
    )
  }
})
