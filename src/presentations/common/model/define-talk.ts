import type { Talk } from './types'

export function defineTalk(talk: Talk): Talk {
  const { width, height } = talk.canvas
  if (
    !talk.title.trim() ||
    !Number.isFinite(width) ||
    !Number.isFinite(height) ||
    width <= 0 ||
    height <= 0
  ) {
    throw new Error('A talk needs a title and positive, finite canvas dimensions.')
  }
  return talk
}
