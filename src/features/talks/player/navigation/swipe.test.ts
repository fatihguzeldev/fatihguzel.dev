import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { swipePageOffset } from './swipe'

describe('presentation swipe direction', () => {
  it('advances for a left swipe and goes back for a right swipe', () => {
    assert.equal(swipePageOffset(-80, 4, 400), 1)
    assert.equal(swipePageOffset(80, 4, 400), -1)
  })

  it('rejects short gestures and predominantly vertical scrolling', () => {
    assert.equal(swipePageOffset(-47, 0, 400), 0)
    assert.equal(swipePageOffset(-80, 60, 400), 0)
    assert.equal(swipePageOffset(0, 100, 400), 0)
  })

  it('requires a larger gesture on wider slides', () => {
    assert.equal(swipePageOffset(-79, 0, 1000), 0)
    assert.equal(swipePageOffset(-80, 0, 1000), 1)
  })

  it('accepts gestures exactly at the distance and direction thresholds', () => {
    assert.equal(swipePageOffset(-48, 32, 400), 1)
    assert.equal(swipePageOffset(48, -32, 400), -1)
  })
})
