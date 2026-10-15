import assert from 'node:assert/strict'
import { test, type TestContext } from 'node:test'
import { readCachedStarCount, writeCachedStarCount } from './star-cache'

function installStorage(t: TestContext) {
  const entries = new Map<string, string>()
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, 'window')
  const storage = {
    getItem: (key: string) => entries.get(key) ?? null,
    setItem: (key: string, value: string) => entries.set(key, value),
  }

  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: { localStorage: storage },
  })

  t.after(() => {
    if (originalWindow) {
      Object.defineProperty(globalThis, 'window', originalWindow)
    } else {
      Reflect.deleteProperty(globalThis, 'window')
    }
  })

  return { entries, storage }
}

test('star counts remain cached for six hours and expire at the cutoff', (t) => {
  const { entries } = installStorage(t)
  const now = t.mock.method(Date, 'now', () => 1_000)

  writeCachedStarCount('github-stars:owner/repository', 42)

  assert.deepEqual(JSON.parse(entries.get('github-stars:owner/repository')!), {
    count: 42,
    expiresAt: 21_601_000,
  })
  assert.equal(readCachedStarCount('github-stars:owner/repository'), 42)

  now.mock.mockImplementation(() => 21_601_000)
  assert.equal(readCachedStarCount('github-stars:owner/repository'), null)
})

test('zero is a valid cached count; missing and malformed entries are misses', (t) => {
  const { entries } = installStorage(t)
  t.mock.method(Date, 'now', () => 1_000)
  entries.set('zero', JSON.stringify({ count: 0, expiresAt: 2_000 }))

  assert.equal(readCachedStarCount('zero'), 0)
  assert.equal(readCachedStarCount('missing'), null)

  for (const payload of [
    'broken json',
    'null',
    JSON.stringify({ count: '42', expiresAt: 2_000 }),
    JSON.stringify({ count: 42 }),
  ]) {
    entries.set('invalid', payload)
    assert.equal(readCachedStarCount('invalid'), null)
  }
})

test('unavailable browser storage never blocks the star display', (t) => {
  const { storage } = installStorage(t)
  t.mock.method(storage, 'getItem', () => {
    throw new Error('storage unavailable')
  })
  t.mock.method(storage, 'setItem', () => {
    throw new Error('storage unavailable')
  })

  assert.equal(readCachedStarCount('repository'), null)
  assert.doesNotThrow(() => writeCachedStarCount('repository', 42))
})
