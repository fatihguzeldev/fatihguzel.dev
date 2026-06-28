---
title: 'vemi syntax kitchen sink'
slug: 'vemi-syntax-kitchen-sink'
publishedAt: '2026-06-14'
description: 'a temporary article that exercises the full vemi syntax surface in this site.'
language: 'en'
tags: ['vemi', 'markdown', 'review']
draft: false
---

# vemi syntax kitchen sink

This temporary article exists so the blog infrastructure has something real to
render. It touches every syntax feature supported by the installed Vemi package:
headings, paragraphs, fenced code blocks, unordered lists, ordered lists,
blockquotes, emphasis, strong text, inline code, and links.

It also checks escaping behavior with literal HTML-looking text:
`<script>alert("nope")</script>` should render as text, not as a script.

## headings

Headings use ATX markers from `#` through `######`. The site enables heading
ids, so repeated headings should get stable unique ids.

### repeated heading

This heading should receive the base id.

### repeated heading

This duplicate should receive a numbered id.

#### fourth level

Small headings should still feel calm and readable.

##### fifth level

The typography should not jump around.

###### sixth level

The smallest heading is mostly here to verify the renderer.

## paragraphs and inline text

Paragraphs are separated by blank lines. This paragraph includes _emphasis_,
_alternate emphasis_, **strong text**, **alternate strong text**, and inline
`code`. The surrounding text should remain readable, not loud.

Escapes should behave as text: \*not emphasized\*, \`not code\`, and
\[not a link\](https://example.com).

## links

This is a normal link to [vemi](https://vemi.fatihguzel.dev).

This is a relative link back to [articles](/articles).

This unsafe link should not become a working JavaScript URL:
[unsafe link](javascript:alert).

## unordered list

- compile Markdown-like text
- emit semantic HTML
- keep the grammar small and explicit
- preserve enough structure for styling

## ordered list

1. parse the source
2. build the syntax tree
3. render the HTML
4. let the site style the result

## blockquote

> Vemi is intentionally small.
> The site can stay quiet because the compiler output is predictable.

## fenced code block

```ts
type Article = {
  slug: string
  title: string
  html: string
}

export function publish(article: Article) {
  return `/articles/${article.slug}`
}
```

## plain code fence

```
no language here
just escaped text and spacing
<div>still text</div>
```

## final note

If this page looks balanced, the article pipeline is doing its job: content is
validated, compiled, escaped, styled, and routed without adding extra visual
noise to the site.
