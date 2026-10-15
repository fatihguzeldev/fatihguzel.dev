'use client'

import { useEffect, useState } from 'react'
import type { GitHubRepo } from './repositories'
import { fetchStarCount } from './star-api'
import { readCachedStarCount, writeCachedStarCount } from './star-cache'

export function useStarCount(repo: GitHubRepo): number | null {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    let ignore = false
    const cached = readCachedStarCount(repo.cacheKey)

    if (cached !== null) {
      setCount(cached)
    }

    const controller = new AbortController()

    fetchStarCount(repo.apiUrl, controller.signal)
      .then((nextCount) => {
        if (ignore || nextCount === null) return

        setCount(nextCount)
        writeCachedStarCount(repo.cacheKey, nextCount)
      })
      .catch(() => undefined)

    return () => {
      ignore = true
      controller.abort()
    }
  }, [repo.apiUrl, repo.cacheKey])

  return count
}
