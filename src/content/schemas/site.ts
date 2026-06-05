import { z } from 'zod'

export const SiteSchema = z.object({
  name: z.string().min(1),
  tagline: z.string().min(1),
  email: z.string().email(),
  url: z.string().url(),
  description: z.string().min(1),
})

export type Site = z.infer<typeof SiteSchema>
