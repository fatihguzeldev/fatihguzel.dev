import type { Presentation } from '@/presentations/common/model/types'

const loaders: Record<string, () => Promise<{ default: Presentation }>> = {
  'bir-hamle-hesaplamak': () => import('@/presentations/bir-hamle-hesaplamak'),
  'biraz-dagitik-dusunelim': () => import('@/presentations/biraz-dagitik-dusunelim'),
}

export async function loadPresentation(slug: string): Promise<Presentation> {
  const load = loaders[slug]
  if (!load) throw new Error('presentation not found')
  return (await load()).default
}
