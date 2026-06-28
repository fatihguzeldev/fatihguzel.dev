import { compileHtml } from '@fatihguzeldev/vemi'

type CompileArticleBodyOptions = {
  filePath?: string
  slug?: string
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

export function compileArticleBody(
  source: string,
  options: CompileArticleBodyOptions = {},
): string {
  try {
    const html = compileHtml(source, {
      headingIds: true,
      classPrefix: 'vemi',
      root: { tag: 'article', className: 'prose' },
    })

    return addCodeBlockLineNumbers(html)
  } catch (error) {
    throw new Error(
      `Failed to compile article${getContextLabel(options)}: ${getErrorMessage(error)}`,
    )
  }
}
