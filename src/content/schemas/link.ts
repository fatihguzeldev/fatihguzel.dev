import { z } from 'zod'

export const LinkKindSchema = z.enum([
  'github',
  'npm',
  'demo',
  'web',
  'community',
  'other',
])

export const LinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().url(),
  kind: LinkKindSchema.optional(),
})

export type Link = z.infer<typeof LinkSchema>
