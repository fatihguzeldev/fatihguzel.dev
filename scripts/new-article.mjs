import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const slug = process.argv[2]
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

if (!slug) {
  console.error('Usage: npm run new-article -- <slug>')
  process.exit(1)
}

if (!slugPattern.test(slug)) {
  console.error('Article slug must use lowercase kebab-case.')
  process.exit(1)
}

const articlesDirectory = path.join(process.cwd(), 'content', 'articles')
const articlePath = path.join(articlesDirectory, `${slug}.md`)
const article = `---
title: ''
slug: '${slug}'
publishedAt: ''
description: ''
language: 'en'
tags: []
draft: true
---

`

await mkdir(articlesDirectory, { recursive: true })

try {
  await writeFile(articlePath, article, { encoding: 'utf8', flag: 'wx' })
  console.log(`Created content/articles/${slug}.md`)
} catch (error) {
  if (error?.code === 'EEXIST') {
    console.error(`Article content/articles/${slug}.md already exists.`)
    process.exit(1)
  }

  throw error
}
