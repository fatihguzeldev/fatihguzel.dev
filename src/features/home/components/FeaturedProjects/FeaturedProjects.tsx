import { Container } from '@/components/layout/Container/Container'
import { ProjectCard } from '@/features/projects/components/ProjectCard/ProjectCard'
import { SectionHeader } from '@/components/ui/SectionHeader/SectionHeader'
import { TextLink } from '@/components/ui/TextLink/TextLink'
import type { Project } from '@/features/projects/content/schema'
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
        <SectionHeader title="featured projects" />
        <ul className={styles.list}>
          {projects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
        <p className={styles.cta}>
          <TextLink href="/projects" cta ctaVariant="route" routeLabel="/projects">
            explore the projects
          </TextLink>
        </p>
      </Container>
    </section>
  )
}
