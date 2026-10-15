import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { pageIndex } from './page'

describe('presentation page URL', () => {
  it('starts on the first slide without a page parameter', () => {
    assert.equal(pageIndex('', 25), 0)
    assert.equal(pageIndex('?theme=dark', 25), 0)
  })

  it('converts one-based page numbers to slide indices', () => {
    assert.equal(pageIndex('?page=7', 25), 6)
    assert.equal(pageIndex('?page=25', 25), 24)
  })

  it('keeps numeric pages within the available slides', () => {
    assert.equal(pageIndex('?page=-3', 25), 0)
    assert.equal(pageIndex('?page=0', 25), 0)
    assert.equal(pageIndex('?page=99', 25), 24)
    assert.equal(pageIndex('?page=99', 1), 0)
  })

  it('falls back to the first slide for invalid page numbers', () => {
    for (const page of ['abc', '1.5', 'Infinity', '9007199254740992']) {
      assert.equal(pageIndex(`?page=${page}`, 25), 0)
    }
  })
})
