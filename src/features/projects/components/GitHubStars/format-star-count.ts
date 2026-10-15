export function formatStarCount(count: number): string {
  if (count < 1000) return String(count)

  const compact = Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: count < 10_000 ? 1 : 0,
  })

  return compact.format(count).toLowerCase()
}
