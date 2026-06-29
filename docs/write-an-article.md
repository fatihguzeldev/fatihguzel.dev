# writing an article

Articles live in `content/articles/<slug>.md`. The filename slug must match the
frontmatter `slug`, and every article starts with YAML frontmatter between
`---` lines.

```yaml
---
title: 'article title'
slug: 'article-title'
publishedAt: '2026-06-29'
description: 'short sentence used in lists and metadata.'
language: 'en'
tags: ['systems', 'engineering']
draft: false
---
```

## frontmatter

| field          | type             | required | notes                                     |
| -------------- | ---------------- | -------- | ----------------------------------------- |
| `title`        | `string`         | yes      | display title                             |
| `slug`         | `string`         | yes      | lowercase kebab-case; must match filename |
| `publishedAt`  | ISO date string  | yes      | `YYYY-MM-DD` is enough                    |
| `description`  | `string`         | yes      | used on article pages and indexes         |
| `language`     | `'en' \| 'tr'`   | no       | defaults to `en`                          |
| `updatedAt`    | ISO date string  | no       | only set when actually updated            |
| `tags`         | `string[]`       | no       | defaults to `[]`                          |
| `draft`        | `boolean`        | no       | defaults to `false`; drafts are hidden    |
| `canonicalUrl` | URL string       | no       | use for external canonical source         |
| `readingTime`  | positive integer | no       | auto-estimated when omitted               |

## syntax

Vemi supports a small Markdown-like surface:

- headings: `#` through `######`
- paragraphs separated by blank lines
- emphasis: `_text_`
- strong text: `**text**`
- inline code: `` `code` ``
- links: `[label](https://example.com)` and relative links
- unordered lists with `-`
- ordered lists with `1.`
- blockquotes with `>`
- fenced code blocks with optional language:

````md
```ts
type Article = {
  slug: string
}
```
````

Supported code labels in the UI include `ts`, `tsx`, `js`, `jsx`, `sh`, `bash`,
`shell`, `json`, `css`, `html`, `md`, and `markdown`. Plain fences render as
`text`. Code blocks get line numbers automatically.

Raw HTML-like text is escaped, so write examples as text unless the renderer
explicitly supports that syntax.
