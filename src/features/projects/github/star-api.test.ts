import assert from 'node:assert/strict'
import { test } from 'node:test'
import { fetchStarCount } from './star-api'

test('GitHub responses expose a numeric star count, including zero', async (t) => {
  const controller = new AbortController()
  t.mock.method(
    globalThis,
    'fetch',
    async (url: RequestInfo | URL, init?: RequestInit) => {
      assert.equal(url, 'https://api.github.com/repos/owner/repository')
      assert.equal(init?.signal, controller.signal)
      assert.deepEqual(init?.headers, { Accept: 'application/vnd.github+json' })
      return Response.json({ stargazers_count: 0 })
    },
  )

  assert.equal(
    await fetchStarCount(
      'https://api.github.com/repos/owner/repository',
      controller.signal,
    ),
    0,
  )
})

test('successful responses without a numeric count do not replace a cached count', async (t) => {
  const fetch = t.mock.method(globalThis, 'fetch', async () =>
    Response.json({ stargazers_count: '42' }),
  )
  const signal = new AbortController().signal

  assert.equal(await fetchStarCount('https://api.github.com/repos/o/r', signal), null)

  fetch.mock.mockImplementation(async () => Response.json({ message: 'no count' }))
  assert.equal(await fetchStarCount('https://api.github.com/repos/o/r', signal), null)
})

test('HTTP and abort failures propagate for the hook to retain its cached count', async (t) => {
  const fetch = t.mock.method(globalThis, 'fetch', async () =>
    Response.json({ message: 'rate limited' }, { status: 403 }),
  )
  const signal = new AbortController().signal

  await assert.rejects(
    fetchStarCount('https://api.github.com/repos/o/r', signal),
    /failed to load github stars/,
  )

  const abort = new DOMException('aborted', 'AbortError')
  fetch.mock.mockImplementation(async () => {
    throw abort
  })
  await assert.rejects(
    fetchStarCount('https://api.github.com/repos/o/r', signal),
    (error) => error === abort,
  )
})
