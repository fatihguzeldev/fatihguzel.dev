import matter from 'gray-matter'
import { load } from 'js-yaml'

export function parseArticleSource(source: string): { data: unknown; content: string } {
  // gray-matter's default engine calls safeLoad, which was removed in js-yaml 4.
  const { data, content } = matter(source, {
    engines: { yaml: (yaml) => load(yaml) as object },
  })
  return { data, content }
}
