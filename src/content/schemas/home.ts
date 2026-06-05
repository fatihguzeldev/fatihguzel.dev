import { z } from 'zod'

export const HomeSchema = z.object({
  hero: z.object({
    title: z.string().min(1),
    subtitle: z.string().min(1),
  }),
  about: z.object({
    paragraphs: z.array(z.string().min(1)),
  }),
  featuredProjectSlugs: z.array(z.string()),
  featuredArticleSlugs: z.array(z.string()),
  workTeaser: z.object({
    headline: z.string().min(1),
    description: z.string().min(1),
    cta: z.string().min(1),
  }),
})

export type Home = z.infer<typeof HomeSchema>
