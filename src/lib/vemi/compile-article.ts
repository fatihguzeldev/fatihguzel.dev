import { parseDocument, renderHtml } from '@fatihguzeldev/vemi'
import type { InlineNode, Root } from '@fatihguzeldev/vemi'

type CompileArticleBodyOptions = {
  filePath?: string
  slug?: string
}

type CompiledArticleBody = {
  html: string
  tableOfContents: CompiledTableOfContentsItem[]
}

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

type CompiledTableOfContentsItem = {
  id: string
  text: string
  level: 2 | 3
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  return String(error)
}

function getContextLabel({ filePath, slug }: CompileArticleBodyOptions): string {
  const context = [filePath, slug ? `slug "${slug}"` : ''].filter(Boolean)
  return context.length ? ` for ${context.join(', ')}` : ''
}

function renderCodeLine(line: string, index: number): string {
  return [
    '<span class="vemi-code-line">',
    `<span class="vemi-code-line-number" data-line="${index + 1}" aria-hidden="true"></span>`,
    `<span class="vemi-code-line-content">${line}</span>`,
    '</span>',
  ].join('')
}

function addCodeBlockLineNumbers(html: string): string {
  return html.replace(
    /<pre([^>]*)><code([^>]*)>([\s\S]*?)<\/code><\/pre>/g,
    (_match, preAttributes: string, codeAttributes: string, code: string) => {
      const lines = code.split('\n')
      const numberedCode = lines.map(renderCodeLine).join('')

      return `<pre${preAttributes}><code${codeAttributes}>${numberedCode}</code></pre>`
    },
  )
}

function getInlinePlainText(nodes: InlineNode[]): string {
  return nodes
    .map((node) => {
      switch (node.type) {
        case 'text':
        case 'code':
          return node.content
        case 'emphasis':
        case 'strong':
          return getInlinePlainText(node.children)
        case 'link':
          return getInlinePlainText(node.text)
      }
    })
    .join('')
}

function getHeadingId(value: string): string {
  return (
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'section'
  )
}

function getNextHeadingId(value: string, seenIds: Map<string, number>): string {
  const baseId = getHeadingId(value)
  const count = seenIds.get(baseId) ?? 0

  seenIds.set(baseId, count + 1)

  return count === 0 ? baseId : `${baseId}-${count}`
}

function isTableOfContentsLevel(
  level: HeadingLevel,
): level is CompiledTableOfContentsItem['level'] {
  return level === 2 || level === 3
}

function extractTableOfContents(root: Root): CompiledTableOfContentsItem[] {
  const seenIds = new Map<string, number>()
  const tableOfContents: CompiledTableOfContentsItem[] = []

  for (const node of root.children) {
    if (node.type !== 'heading') continue

    const text = getInlinePlainText(node.children)
    const id = getNextHeadingId(text, seenIds)

    if (!isTableOfContentsLevel(node.level)) continue

    tableOfContents.push({
      id,
      text,
      level: node.level,
    })
  }

  return tableOfContents
}

export function compileArticleBody(
  source: string,
  options: CompileArticleBodyOptions = {},
): CompiledArticleBody {
  try {
    const root = parseDocument(source)
    const html = renderHtml(root, {
      headingIds: true,
      classPrefix: 'vemi',
      root: { tag: 'article', className: 'prose' },
    })

    return {
      html: addCodeBlockLineNumbers(html),
      tableOfContents: extractTableOfContents(root),
    }
  } catch (error) {
    throw new Error(
      `Failed to compile article${getContextLabel(options)}: ${getErrorMessage(error)}`,
    )
  }
}
