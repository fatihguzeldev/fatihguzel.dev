import { compileHtml } from '@fatihguzeldev/vemi'

export function compileArticleBody(source: string): string {
  return compileHtml(source, {
    headingIds: true,
    classPrefix: 'vemi',
    root: { tag: 'article', className: 'prose' },
  })
}
