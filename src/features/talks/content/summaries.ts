import distributedThinking from '@/presentations/biraz-dagitik-dusunelim/talk'
import type { TalkSummary } from './types'

export const talkSummaries: readonly TalkSummary[] = [
  {
    slug: 'biraz-dagitik-dusunelim',
    title: distributedThinking.title,
    description: distributedThinking.description ?? '',
    language: distributedThinking.language ?? 'en',
    appearances: [
      {
        name: 'Devnot Developer Summit',
        url: 'https://summit.devnot.com/',
        date: '2026-10-17',
      },
    ],
  },
]

export function findTalk(slug: string) {
  return talkSummaries.find((talk) => talk.slug === slug)
}
