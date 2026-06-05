import { z } from 'zod'
import { LinkSchema } from './link'

export const ProjectSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  links: z.array(LinkSchema),
  status: z.enum(['active', 'archived']).optional(),
  year: z.number().int().optional(),
})

export const ProjectsFileSchema = z.object({
  projects: z.array(ProjectSchema),
})

export type Project = z.infer<typeof ProjectSchema>
