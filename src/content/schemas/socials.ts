import { z } from 'zod'
import { LinkSchema } from './link'

export const SocialSchema = LinkSchema.extend({
  slug: z.string().min(1),
})

export const SocialsFileSchema = z.object({
  socials: z.array(SocialSchema),
  footerSlugs: z.array(z.string()).optional(),
})

export type Social = z.infer<typeof SocialSchema>
export type SocialsFile = z.infer<typeof SocialsFileSchema>
