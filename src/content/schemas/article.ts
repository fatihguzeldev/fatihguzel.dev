import { z } from 'zod'

export const ArticleFrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  publishedAt: z.string().min(1),
  description: z.string().min(1),
  tags: z.array(z.string()).optional(),
  draft: z.boolean().optional(),
})

export type ArticleFrontmatter = z.infer<typeof ArticleFrontmatterSchema>

export type Article = ArticleFrontmatter & {
  body: string
  html: string
}
