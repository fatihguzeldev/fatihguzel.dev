import { LinkList } from '@/components/ui/LinkList'
import { GitHubStars } from '@/components/ui/GitHubStars'
import type { Project } from '@/content/schemas/project'
import styles from './ProjectCard.module.css'

type ProjectCardProps = {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      className={[styles.card, project.status === 'archived' ? styles.archived : '']
        .filter(Boolean)
        .join(' ')}
    >
      <div className={styles.header}>
        <h3 className={styles.name}>{project.name}</h3>
        <GitHubStars links={project.links} />
      </div>
      {project.year ? <p className={styles.year}>{project.year}</p> : null}
      <p className={styles.description}>{project.description}</p>
      <LinkList links={project.links} />
    </article>
  )
}
