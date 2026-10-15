import type { Link } from '@/lib/links/schema'

export type GitHubRepo = {
  owner: string
  name: string
  label: string
  apiUrl: string
  stargazersUrl: string
  cacheKey: string
}

export function parseGitHubRepo(href: string): GitHubRepo | null {
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

export function getGitHubRepos(links: Link[]): GitHubRepo[] {
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
