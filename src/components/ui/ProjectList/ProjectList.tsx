import type { Project } from '@/content/schemas/project'
import { ProjectCard } from '@/components/ui/ProjectCard'
import styles from './ProjectList.module.css'

type ProjectListProps = {
  projects: Project[]
  className?: string
}

export function ProjectList({ projects, className }: ProjectListProps) {
  return (
    <ul className={[styles.list, className].filter(Boolean).join(' ')}>
      {projects.map((project) => (
        <li key={project.slug}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  )
}
