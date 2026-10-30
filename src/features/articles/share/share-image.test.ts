import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  getArticleShareImageData,
  getArticleShareImageTitleLayout,
} from './share-image'

test('share image uses the first hashtag and the Turkish publication date', () => {
  const data = getArticleShareImageData({
    title: 'direnebilmek',
    publishedAt: '2026-10-25',
    language: 'tr',
    tags: ['attention', 'habits'],
  })

  assert.equal(data.title, 'direnebilmek')
  assert.equal(data.hashtag, '#attention')
  assert.equal(data.date, '25 ekim 2026')
})

test('share image omits an absent hashtag', () => {
  const data = getArticleShareImageData({
    title: 'what learning c changes',
    publishedAt: '2026-10-20',
    language: 'en',
    tags: [],
  })

  assert.equal(data.hashtag, undefined)
  assert.equal(data.date, 'october 20, 2026')
})

test('share image keeps the publication calendar date across timezone offsets', () => {
  const data = getArticleShareImageData({
    title: 'İŞLER',
    publishedAt: '2026-10-25T23:30:00-05:00',
    language: 'tr',
    tags: ['DİKKAT'],
  })

  assert.equal(data.title, 'işler')
  assert.equal(data.hashtag, '#dikkat')
  assert.equal(data.date, '25 ekim 2026')
})

test('short and medium titles stay on one line instead of leaving a lone final word', () => {
  assert.deepEqual(getArticleShareImageTitleLayout('direnebilmek').lines, [
    'direnebilmek',
  ])
  assert.deepEqual(getArticleShareImageTitleLayout('what learning c changes').lines, [
    'what learning c changes',
  ])
})

test('long titles form balanced lines without losing or splitting words', () => {
  const title = 'mühendisliğin evrimi ve kocaman yanılgılar'
  const { lines } = getArticleShareImageTitleLayout(title)

  assert.deepEqual(lines, ['mühendisliğin evrimi', 've kocaman yanılgılar'])
  assert.equal(lines.join(' '), title)
})
