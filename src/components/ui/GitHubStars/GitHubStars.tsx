'use client'

import { useEffect, useMemo, useState } from 'react'
import type { Link } from '@/content/schemas/link'
import styles from './GitHubStars.module.css'

type GitHubRepo = {
  owner: string
  name: string
  label: string
  apiUrl: string
  stargazersUrl: string
  cacheKey: string
}

type CachedStarCount = {
  count: number
  expiresAt: number
}

type GitHubStarsProps = {
  links: Link[]
}

const CACHE_TTL_MS = 1000 * 60 * 60 * 6

function parseGitHubRepo(href: string): GitHubRepo | null {
  let url: URL

  try {
    url = new URL(href)
  } catch {
    return null
  }

  const hostname = url.hostname.toLowerCase()
  if (hostname !== 'github.com' && hostname !== 'www.github.com') return null

  const [owner, rawName] = url.pathname.split('/').filter(Boolean)
  if (!owner || !rawName) return null

  const name = rawName.replace(/\.git$/, '')
  const label = `${owner}/${name}`

  return {
    owner,
    name,
    label,
    apiUrl: `https://api.github.com/repos/${owner}/${name}`,
    stargazersUrl: `https://github.com/${owner}/${name}/stargazers`,
    cacheKey: `github-stars:${owner}/${name}`,
  }
}

function getGitHubRepos(links: Link[]): GitHubRepo[] {
  const seen = new Set<string>()

  return links
    .map((link) => parseGitHubRepo(link.href))
    .filter((repo): repo is GitHubRepo => Boolean(repo))
    .filter((repo) => {
      if (seen.has(repo.cacheKey)) return false
      seen.add(repo.cacheKey)
      return true
    })
}

function readCachedStarCount(cacheKey: string): number | null {
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

function writeCachedStarCount(cacheKey: string, count: number) {
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

function formatStarCount(count: number): string {
  if (count < 1000) return String(count)

  const compact = Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: count < 10_000 ? 1 : 0,
  })

  return compact.format(count).toLowerCase()
}

function StarIcon() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="m12 3.25 2.67 5.41 5.97.87-4.32 4.21 1.02 5.95L12 16.88l-5.34 2.81 1.02-5.95-4.32-4.21 5.97-.87z" />
    </svg>
  )
}

function useStarCount(repo: GitHubRepo): number | null {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    let ignore = false
    const cached = readCachedStarCount(repo.cacheKey)

    if (cached !== null) {
      setCount(cached)
    }

    const controller = new AbortController()

    fetch(repo.apiUrl, {
      headers: {
        Accept: 'application/vnd.github+json',
      },
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error('failed to load github stars')
        return response.json() as Promise<{ stargazers_count?: unknown }>
      })
      .then((data) => {
        if (ignore || typeof data.stargazers_count !== 'number') return

        setCount(data.stargazers_count)
        writeCachedStarCount(repo.cacheKey, data.stargazers_count)
      })
      .catch(() => undefined)

    return () => {
      ignore = true
      controller.abort()
    }
  }, [repo.apiUrl, repo.cacheKey])

  return count
}

function GitHubStarLink({ repo }: { repo: GitHubRepo }) {
  const count = useStarCount(repo)

  if (count === null) return null

  const label = `${formatStarCount(count)} ${count === 1 ? 'star' : 'stars'} on ${
    repo.label
  }`

  return (
    <li>
      <a
        className={styles.link}
        href={repo.stargazersUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        title={label}
      >
        <StarIcon />
        <span className={styles.count}>{formatStarCount(count)}</span>
      </a>
    </li>
  )
}

export function GitHubStars({ links }: GitHubStarsProps) {
  const repos = useMemo(() => getGitHubRepos(links), [links])

  if (!repos.length) return null

  return (
    <ul className={styles.list} aria-label="github stars">
      {repos.map((repo) => (
        <GitHubStarLink key={repo.cacheKey} repo={repo} />
      ))}
    </ul>
  )
}
