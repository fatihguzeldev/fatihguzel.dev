import projectsData from '../../content/projects.json'
import { ProjectsFileSchema } from './schemas/project'
import type { Project } from './schemas/project'

export function loadProjects(): Project[] {
  return ProjectsFileSchema.parse(projectsData).projects
}

export function loadProjectBySlug(slug: string): Project | undefined {
  return loadProjects().find((project) => project.slug === slug)
}

export function loadProjectsBySlugs(slugs: string[]): Project[] {
  const projects = loadProjects()
  return slugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is Project => Boolean(project))
}
