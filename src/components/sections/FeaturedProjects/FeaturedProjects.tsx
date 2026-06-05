import { Container } from '@/components/layout/Container'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { TextLink } from '@/components/ui/TextLink'
import type { Project } from '@/content/schemas/project'
import styles from './FeaturedProjects.module.css'
import sectionStyles from '../shared/Section.module.css'

type FeaturedProjectsProps = {
  projects: Project[]
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  if (!projects.length) return null

  return (
    <section className={sectionStyles.section} id="projects">
      <Container>
        <SectionHeader eyebrow="work" title="featured projects" />
        <ul className={styles.list}>
          {projects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
        <p className={styles.cta}>
          <TextLink href="/projects">see all projects</TextLink>
        </p>
      </Container>
    </section>
  )
}
