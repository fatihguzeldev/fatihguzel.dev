import { Container } from '@/components/layout/Container'
import { PageHeader } from '@/components/ui/PageHeader'
import { ProjectList } from '@/components/ui/ProjectList'
import { loadProjects } from '@/content/load-projects'
import { createMetadata } from '@/lib/seo/metadata'
import { BreadcrumbJsonLd, ProjectsCollectionJsonLd } from '@/lib/seo/json-ld'
import styles from './page.module.css'

export const metadata = createMetadata({
  title: 'projects',
  description:
    'selected projects by fatih guzel — open source tools, communities, and products.',
  path: '/projects',
})

export default function ProjectsPage() {
  const projects = loadProjects()

  return (
    <main className={styles.main}>
      <ProjectsCollectionJsonLd projects={projects} />
      <BreadcrumbJsonLd
        items={[
          { name: 'home', path: '/' },
          { name: 'projects', path: '/projects' },
        ]}
      />
      <Container>
        <PageHeader
          title="projects"
          description={
            "things i've built, shipped, or maintain. open source where possible."
          }
        />
        <ProjectList projects={projects} className={styles.list} />
      </Container>
    </main>
  )
}
