import assert from 'node:assert/strict'
import { test } from 'node:test'
import { getGitHubRepos, parseGitHubRepo } from './repositories'

test('repository links resolve to canonical API, stargazer and cache addresses', () => {
  assert.deepEqual(
    parseGitHubRepo('https://www.github.com/fatihguzeldev/Ring3.git/tree/main?q=1'),
    {
      owner: 'fatihguzeldev',
      name: 'Ring3',
      label: 'fatihguzeldev/Ring3',
      apiUrl: 'https://api.github.com/repos/fatihguzeldev/Ring3',
      stargazersUrl: 'https://github.com/fatihguzeldev/Ring3/stargazers',
      cacheKey: 'github-stars:fatihguzeldev/Ring3',
    },
  )
})

test('invalid, non-GitHub and incomplete repository links are ignored', () => {
  for (const href of [
    'not a url',
    'https://gitlab.com/owner/repository',
    'https://github.com.example.com/owner/repository',
    'https://github.com',
    'https://github.com/owner',
  ]) {
    assert.equal(parseGitHubRepo(href), null)
  }
})

test('repositories are unique by cache key and retain their first link order', () => {
  const repos = getGitHubRepos([
    { label: 'repository', href: 'https://github.com/owner/first' },
    { label: 'website', href: 'https://example.com' },
    { label: 'same repository', href: 'https://www.github.com/owner/first.git' },
    { label: 'another repository', href: 'https://github.com/owner/second/issues' },
  ])

  assert.deepEqual(
    repos.map((repo) => repo.label),
    ['owner/first', 'owner/second'],
  )
})
