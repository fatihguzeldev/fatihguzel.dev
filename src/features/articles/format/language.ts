import type { ArticleFrontmatter } from '../content/schema'

const languageLabels: Record<ArticleFrontmatter['language'], string> = {
  en: 'english',
  tr: 'turkish',
}

export function formatArticleLanguage(
  language: ArticleFrontmatter['language'],
): string {
  return languageLabels[language]
}
