import assert from 'node:assert/strict'
import { test } from 'node:test'
import { headingIdFromHash } from './heading-hash'

test('heading fragments preserve plain IDs and decode valid percent encoding', () => {
  assert.equal(headingIdFromHash('#giris'), 'giris')
  assert.equal(headingIdFromHash('#giri%C5%9F'), 'giriş')
  assert.equal(headingIdFromHash('#part%23two'), 'part#two')
  assert.equal(headingIdFromHash('#c%2B%2B'), 'c++')
})

test('empty fragments have no heading ID', () => {
  assert.equal(headingIdFromHash(''), undefined)
  assert.equal(headingIdFromHash('#'), undefined)
})

test('malformed percent encoding and invalid UTF-8 are ignored', () => {
  for (const hash of ['#%', '#%GG', '#%E0%A4%A', '#%FF', '#%C0%AF']) {
    assert.equal(headingIdFromHash(hash), undefined)
  }
})

test('heading fragments are decoded only once', () => {
  assert.equal(headingIdFromHash('#%2525'), '%25')
})
