import { SITE_URL } from '@/site/content/identity/loader'
import { personReference } from '@/site/seo/identity'
import { CollectionPageJsonLd } from '@/site/seo/structured-data/CollectionPageJsonLd'
import type { Project } from '../content/schema'
import { projectsPage } from '../content/page'

function getProjectUrl(project: Project): string {
  return (
    project.links.find((link) => link.kind === 'web')?.href ??
    project.links.find((link) => link.kind === 'github')?.href ??
    project.links[0]?.href ??
    `${SITE_URL}/projects`
  )
}

function getProjectRepository(project: Project): string | undefined {
  return project.links.find((link) => link.kind === 'github')?.href
}

export function ProjectsCollectionJsonLd({ projects }: { projects: Project[] }) {
  return (
    <CollectionPageJsonLd
      name={projectsPage.title}
      description={projectsPage.metadataDescription}
      path={projectsPage.path}
      items={projects.map((project) => {
        const repository = getProjectRepository(project)

        return {
          type: 'SoftwareSourceCode',
          name: project.name,
          description: project.description,
          url: getProjectUrl(project),
          extra: {
            ...(repository ? { codeRepository: repository } : {}),
            sameAs: project.links.map((link) => link.href),
            author: personReference(),
          },
        }
      })}
    />
  )
}
