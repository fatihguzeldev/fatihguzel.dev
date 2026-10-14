import { About } from '@/components/sections/About'
import { FeaturedArticles } from '@/components/sections/FeaturedArticles'
import { FeaturedProjects } from '@/components/sections/FeaturedProjects'
import { Hero } from '@/components/sections/Hero'
import { Now } from '@/components/sections/Now'
import { WorkTeaser } from '@/components/sections/WorkTeaser'
import { loadHome } from '@/content/load-home'
import { loadNow } from '@/content/load-now'
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
