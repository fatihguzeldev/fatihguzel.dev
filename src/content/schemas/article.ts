import { z } from 'zod'

const IsoDateSchema = z.string().refine(
  (value) => {
    const parsed = Date.parse(value)
    return /^\d{4}-\d{2}-\d{2}/.test(value) && !Number.isNaN(parsed)
  },
  { message: 'expected an ISO date string' },
)

const SlugSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'expected a lowercase slug')

export const ArticleFrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: SlugSchema,
  publishedAt: IsoDateSchema,
  description: z.string().min(1),
  updatedAt: IsoDateSchema.optional(),
  tags: z.array(z.string().min(1)).default([]),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  canonicalUrl: z.string().url().optional(),
  readingTime: z.number().int().positive().optional(),
  summary: z.string().min(1).optional(),
})

export type ArticleFrontmatter = z.infer<typeof ArticleFrontmatterSchema>

export type Article = Omit<ArticleFrontmatter, 'readingTime'> & {
  readingTime: number
  body: string
  html: string
}
