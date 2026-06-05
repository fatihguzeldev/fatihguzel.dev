import { z } from 'zod'

export const WorkSchema = z.object({
  title: z.string().min(1),
  availability: z.string().min(1),
  description: z.string().min(1),
  services: z.array(z.string().min(1)),
})

export type Work = z.infer<typeof WorkSchema>
