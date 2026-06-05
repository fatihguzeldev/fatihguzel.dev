import type { Project } from '@/content/schemas/project'
import { ProjectCard } from '@/components/ui/ProjectCard'
import styles from './ProjectList.module.css'

type ProjectListProps = {
  projects: Project[]
}

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <ul className={styles.list}>
      {projects.map((project) => (
        <li key={project.slug}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  )
}
