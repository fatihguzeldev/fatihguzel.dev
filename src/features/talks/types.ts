export interface TalkAppearance {
  name: string
  url: string
  date: string
}

export interface TalkSummary {
  slug: string
  title: string
  description: string
  language: string
  durationMinutes: number
  appearances: readonly TalkAppearance[]
}
