type CachedStarCount = {
  count: number
  expiresAt: number
}

const CACHE_TTL_MS = 1000 * 60 * 60 * 6

export function readCachedStarCount(cacheKey: string): number | null {
  try {
    const cached = window.localStorage.getItem(cacheKey)
    if (!cached) return null

    const parsed = JSON.parse(cached) as Partial<CachedStarCount>
    if (
      typeof parsed.count !== 'number' ||
      typeof parsed.expiresAt !== 'number' ||
      parsed.expiresAt <= Date.now()
    ) {
      return null
    }

    return parsed.count
  } catch {
    return null
  }
}

export function writeCachedStarCount(cacheKey: string, count: number) {
  try {
    const payload: CachedStarCount = {
      count,
      expiresAt: Date.now() + CACHE_TTL_MS,
    }

    window.localStorage.setItem(cacheKey, JSON.stringify(payload))
  } catch {
    // Cache misses should never block the UI.
  }
}
