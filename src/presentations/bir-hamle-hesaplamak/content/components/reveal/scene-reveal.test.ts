import assert from 'node:assert/strict'
import test from 'node:test'
import { nextSceneStep } from './scene-reveal'

test('presentation scenes consume their interior presentation keys', () => {
  for (const count of [2, 3, 4, 5, 6, 8]) {
    for (const key of ['ArrowRight', 'ArrowDown', 'PageDown', ' ']) {
      assert.equal(nextSceneStep(0, key, count), 1)
      assert.equal(nextSceneStep(count - 2, key, count), count - 1)
    }
    for (const key of ['ArrowLeft', 'ArrowUp', 'PageUp']) {
      assert.equal(nextSceneStep(count - 1, key, count), count - 2)
      assert.equal(nextSceneStep(1, key, count), 0)
    }
    assert.equal(nextSceneStep(1, ' ', count, true), 0)
  }
})

test('scene boundaries and player shortcuts are not consumed', () => {
  for (const count of [1, 2, 3, 4, 5, 6, 8]) {
    assert.equal(nextSceneStep(0, 'ArrowLeft', count), undefined)
    assert.equal(nextSceneStep(0, ' ', count, true), undefined)
    assert.equal(nextSceneStep(count - 1, 'ArrowRight', count), undefined)
    assert.equal(nextSceneStep(count - 1, ' ', count), undefined)
    for (const key of ['Home', 'End', 'Escape', 'Tab', 'f', 'F11']) {
      assert.equal(nextSceneStep(0, key, count), undefined)
    }
  }
})
