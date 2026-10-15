export function headingIdFromHash(hash: string): string | undefined {
  try {
    return decodeURIComponent(hash.slice(1)) || undefined
  } catch {
    return undefined
  }
}
