import { notFound } from 'next/navigation'
import { TalkPlayer } from '@/features/talks/player/TalkPlayer'
import { findTalk, talkSummaries } from '@/features/talks/content/summaries'
import { createMetadata } from '@/lib/seo/metadata'

type TalkPageProps = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return talkSummaries.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: TalkPageProps) {
  const { slug } = await params
  const talk = findTalk(slug)
  if (!talk) notFound()
  return createMetadata({
    title: talk.title,
    description: talk.description,
    path: `/talks/${slug}`,
  })
}

export default async function TalkPage({ params }: TalkPageProps) {
  const { slug } = await params
  const talk = findTalk(slug)
  if (!talk) notFound()
  return <TalkPlayer slug={slug} title={talk.title} />
}
