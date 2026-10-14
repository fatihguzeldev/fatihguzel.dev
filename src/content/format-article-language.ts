import type { ArticleFrontmatter } from './schemas/article'

const languageLabels: Record<ArticleFrontmatter['language'], string> = {
  en: 'english',
  tr: 'turkish',
}

export function formatArticleLanguage(
  language: ArticleFrontmatter['language'],
): string {
  return languageLabels[language]
}
