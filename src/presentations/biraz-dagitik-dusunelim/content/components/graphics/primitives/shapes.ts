export function inkFrame(
  x: number,
  y: number,
  width: number,
  height: number,
  radius = 14,
) {
  const right = x + width,
    bottom = y + height
  const r = Math.max(0, Math.min(radius, width / 2, height / 2))
  return `M ${x + r} ${y}
    H ${right - r} Q ${right} ${y} ${right} ${y + r}
    V ${bottom - r} Q ${right} ${bottom} ${right - r} ${bottom}
    H ${x + r} Q ${x} ${bottom} ${x} ${bottom - r}
    V ${y + r} Q ${x} ${y} ${x + r} ${y} Z`
}

export function inkOval(cx: number, cy: number, rx: number, ry: number, variant = 0) {
  const bend = variant % 2 ? -3 : 3
  return `M ${cx - rx} ${cy + bend}
    C ${cx - rx - bend} ${cy - ry * 0.62} ${cx - rx * 0.52} ${cy - ry - bend} ${cx} ${cy - ry}
    C ${cx + rx * 0.6} ${cy - ry + bend} ${cx + rx + bend} ${cy - ry * 0.48} ${cx + rx} ${cy}
    C ${cx + rx - bend} ${cy + ry * 0.65} ${cx + rx * 0.43} ${cy + ry + bend} ${cx} ${cy + ry}
    C ${cx - rx * 0.58} ${cy + ry - bend} ${cx - rx - bend} ${cy + ry * 0.45} ${cx - rx} ${cy + bend} Z`
}
