import { projectsPage } from '@/features/projects/content/page'
import { Container } from '@/components/layout/Container'
import { PageHeader } from '@/components/ui/PageHeader'
import { ProjectList } from '@/features/projects/components/ProjectList'
import { loadProjects } from '@/features/projects/content/loader'
import { createMetadata } from '@/site/seo/metadata'
import { BreadcrumbJsonLd } from '@/site/seo/structured-data/BreadcrumbJsonLd'
import { ProjectsCollectionJsonLd } from '@/features/projects/seo/ProjectsCollectionJsonLd'
import styles from './page.module.css'

export const metadata = createMetadata({
  ...projectsPage,
  description: projectsPage.metadataDescription,
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
        <PageHeader title={projectsPage.title} description={projectsPage.description} />
        <ProjectList projects={projects} className={styles.list} />
      </Container>
    </main>
  )
}
