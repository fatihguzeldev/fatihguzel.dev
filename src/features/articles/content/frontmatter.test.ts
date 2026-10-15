import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { test } from 'node:test'
import { YAMLException } from 'js-yaml'
import { parseArticleSource } from './frontmatter'
import { ArticleFrontmatterSchema } from './schema'

test('YAML metadata and Markdown body are parsed together without changing the body', () => {
  const body = '\n## giriş\n\n---\n\n```yaml\ntitle: body example\n```\n'
  const source = `---
title: 'bir yazı'
slug: 'bir-yazi'
publishedAt: '2026-10-15'
description: >-
  first line
  second line
tags: ['systems', 'databases']
draft: false
readingTime: 7
---
${body}`
  const parsed = parseArticleSource(source)
  assert.equal(parsed.content, body)
  assert.deepEqual(ArticleFrontmatterSchema.parse(parsed.data), {
    title: 'bir yazı',
    slug: 'bir-yazi',
    publishedAt: '2026-10-15',
    description: 'first line second line',
    tags: ['systems', 'databases'],
    draft: false,
    readingTime: 7,
    language: 'en',
  })
})

test('BOM and CRLF do not leak metadata into the Markdown body', () => {
  const source = '\uFEFF---\r\ntitle: "hello"\r\n---\r\nbody\r\n'
  assert.deepEqual(parseArticleSource(source), {
    data: { title: 'hello' },
    content: 'body\r\n',
  })
})

test('missing and empty frontmatter still fail article validation', () => {
  for (const source of ['body', '', '---\n# metadata\n---\nbody']) {
    const parsed = parseArticleSource(source)
    assert.deepEqual(parsed.data, {})
    assert.equal(ArticleFrontmatterSchema.safeParse(parsed.data).success, false)
  }
})

test('invalid YAML and unsafe JavaScript tags are rejected', () => {
  for (const metadata of [
    'title: [unterminated',
    'title: !!js/function "function () {}"',
  ]) {
    assert.throws(
      () => parseArticleSource(`---\n${metadata}\n---\nbody`),
      YAMLException,
    )
  }
})

test('JSON frontmatter remains supported by the existing delimiter parser', () => {
  assert.deepEqual(parseArticleSource('---json\n{"title":"hello"}\n---\nbody'), {
    data: { title: 'hello' },
    content: 'body',
  })
})

test('all authored articles retain valid frontmatter and Markdown bodies', () => {
  const directory = path.join(process.cwd(), 'content/articles')
  for (const name of readdirSync(directory).filter((file) => file.endsWith('.md'))) {
    const source = readFileSync(path.join(directory, name), 'utf8')
    const { data, content } = parseArticleSource(source)
    const article = ArticleFrontmatterSchema.parse(data)
    assert.equal(article.slug, name.slice(0, -3))
    assert.ok(content.trim().length > 0, name)
    assert.equal(content.startsWith('---'), false, name)
  }
})
