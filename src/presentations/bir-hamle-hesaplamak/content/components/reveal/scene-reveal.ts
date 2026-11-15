export function nextSceneStep(
  step: number,
  key: string,
  count: number,
  shiftKey = false,
) {
  let direction = 0
  if (['ArrowRight', 'ArrowDown', 'PageDown'].includes(key)) direction = 1
  if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(key)) direction = -1
  if (key === ' ') direction = shiftKey ? -1 : 1
  const next = step + direction
  return direction && next >= 0 && next < count ? next : undefined
}
