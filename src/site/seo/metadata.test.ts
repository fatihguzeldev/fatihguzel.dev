import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createMetadata } from './metadata'

test('pages without a share image retain a summary card without image metadata', () => {
  const metadata = createMetadata({ title: 'articles', path: '/articles' })

  assert.ok(metadata.twitter && 'card' in metadata.twitter)
  assert.equal(metadata.twitter?.card, 'summary')
  assert.equal(metadata.openGraph?.images, undefined)
  assert.equal(metadata.twitter?.images, undefined)
})

test('an image enables a large Twitter card and matching Open Graph image metadata', () => {
  const image = {
    url: '/articles/direnebilmek/og.png',
    alt: 'direnebilmek',
    width: 1200,
    height: 630,
  }
  const metadata = createMetadata({
    title: 'direnebilmek',
    path: '/articles/direnebilmek',
    image,
  })

  assert.ok(metadata.twitter && 'card' in metadata.twitter)
  assert.equal(metadata.twitter?.card, 'summary_large_image')
  assert.deepEqual(metadata.openGraph?.images, [image])
  assert.deepEqual(metadata.twitter?.images, [{ url: image.url, alt: image.alt }])
})
