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

export function compileArticleBody(
  source: string,
  options: CompileArticleBodyOptions = {},
): string {
  try {
    return compileHtml(source, {
      headingIds: true,
      classPrefix: 'vemi',
      root: { tag: 'article', className: 'prose' },
    })
  } catch (error) {
    throw new Error(
      `Failed to compile article${getContextLabel(options)}: ${getErrorMessage(error)}`,
    )
  }
}
