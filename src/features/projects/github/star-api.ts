export async function fetchStarCount(
  apiUrl: string,
  signal: AbortSignal,
): Promise<number | null> {
  const response = await fetch(apiUrl, {
    headers: {
      Accept: 'application/vnd.github+json',
    },
    signal,
  })

  if (!response.ok) throw new Error('failed to load github stars')

  const data = (await response.json()) as { stargazers_count?: unknown }
  return typeof data.stargazers_count === 'number' ? data.stargazers_count : null
}
