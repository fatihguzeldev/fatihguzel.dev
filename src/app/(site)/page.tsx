import { About } from '@/features/home/components/About/About'
import { FeaturedArticles } from '@/features/home/components/FeaturedArticles/FeaturedArticles'
import { FeaturedProjects } from '@/features/home/components/FeaturedProjects/FeaturedProjects'
import { Hero } from '@/features/home/components/Hero/Hero'
import { Now } from '@/features/home/components/Now/Now'
import { WorkTeaser } from '@/features/home/components/WorkTeaser/WorkTeaser'
import { loadHome } from '@/features/home/content/loader'
import { loadNow } from '@/features/home/content/now/loader'
import { createMetadata } from '@/site/seo/metadata'
import { ProfilePageJsonLd } from '@/features/home/seo/ProfilePageJsonLd'

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
