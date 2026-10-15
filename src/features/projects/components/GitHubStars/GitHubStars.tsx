'use client'

import { useMemo } from 'react'
import type { Link } from '@/lib/links/schema'
import { getGitHubRepos, type GitHubRepo } from '../../github/repositories'
import { useStarCount } from '../../github/use-star-count'
import { formatStarCount } from './format-star-count'
import { StarIcon } from './icons/StarIcon'
import styles from './GitHubStars.module.css'

type GitHubStarsProps = {
  links: Link[]
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
        <StarIcon className={styles.icon} />
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
