export function pageIndex(search: string, count: number): number {
  const value = Number(new URLSearchParams(search).get('page') ?? 1)
  if (!Number.isSafeInteger(value)) return 0
  return Math.max(0, Math.min(count - 1, value - 1))
}
