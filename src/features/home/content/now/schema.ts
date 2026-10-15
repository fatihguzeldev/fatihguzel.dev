import { z } from 'zod'

export const NowSchema = z.object({
  updatedAt: z.string().min(1),
  items: z.array(z.string().min(1)),
})

export type Now = z.infer<typeof NowSchema>
