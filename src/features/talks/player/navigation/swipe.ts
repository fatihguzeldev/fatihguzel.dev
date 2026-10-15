export function swipePageOffset(dx: number, dy: number, width: number): -1 | 0 | 1 {
  const threshold = Math.max(48, width * 0.08)
  if (Math.abs(dx) < threshold || Math.abs(dx) < Math.abs(dy) * 1.5) return 0
  return dx < 0 ? 1 : -1
}
