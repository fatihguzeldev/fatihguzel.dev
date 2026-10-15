import { About } from '@/features/home/components/About'
import { FeaturedArticles } from '@/features/home/components/FeaturedArticles'
import { FeaturedProjects } from '@/features/home/components/FeaturedProjects'
import { Hero } from '@/features/home/components/Hero'
import { Now } from '@/features/home/components/Now'
import { WorkTeaser } from '@/features/home/components/WorkTeaser'
import { loadHome } from '@/features/home/content/loader'
import { loadNow } from '@/features/home/content/now/loader'
import { createMetadata } from '@/lib/seo/metadata'
import { ProfilePageJsonLd } from '@/lib/seo/json-ld'

export const metadata = createMetadata()

export default function HomePage() {
  const home = loadHome()
  const now = loadNow()

  return (
    <main>
      <ProfilePageJsonLd />
      <Hero title={home.hero.title} subtitle={home.hero.subtitle} />
      <About paragraphs={home.about.paragraphs} />
      <Now now={now} />
      <FeaturedArticles articles={home.featuredArticles} />
      <FeaturedProjects projects={home.featuredProjects} />
      <WorkTeaser
        headline={home.workTeaser.headline}
        description={home.workTeaser.description}
        cta={home.workTeaser.cta}
      />
    </main>
  )
}
