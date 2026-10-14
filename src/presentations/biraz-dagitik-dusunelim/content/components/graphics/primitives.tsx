import { useId, type ReactNode, type SVGProps } from 'react'
import { InlineArrows } from '../typography/inline-arrows/inline-arrows'

export const colors = {
  paper: '#f7f8fa',
  ink: '#1e2329',
  muted: '#636b75',
  line: '#c7cdd4',
  accent: '#ff5c35',
  accentInk: '#b9361c',
  tint: '#ffe5dd',
  white: '#ffffff',
} as const

export const diagramType = {
  node: 42,
  metadata: 28,
  record: 30,
  label: 32,
} as const

// Keep connector endpoints clear of frame strokes and arrowhead caps.
export const connectorGap = 12

export function Diagram({
  children,
  label,
  viewBox = '0 0 1440 480',
}: {
  children: ReactNode
  label: string
  viewBox?: string
}) {
  return (
    <svg
      viewBox={viewBox}
      role="img"
      aria-label={label}
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        overflow: 'visible',
        fontFamily: '"IBM Plex Sans", sans-serif',
      }}
    >
      {children}
    </svg>
  )
}

export function Label({
  children,
  mono = false,
  fill = colors.ink,
  ...props
}: SVGProps<SVGTextElement> & { mono?: boolean }) {
  return (
    <text
      fill={fill === colors.accent ? colors.accentInk : fill}
      fontSize={30}
      fontWeight={400}
      fontFamily={mono ? '"IBM Plex Mono", monospace' : '"IBM Plex Sans", sans-serif'}
      {...props}
    >
      {mono ? children : <InlineArrows svg>{children}</InlineArrows>}
    </text>
  )
}

export function inkFrame(
  x: number,
  y: number,
  width: number,
  height: number,
  radius = 14,
  _variant = 0,
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

export function useArrow(stroke: string = colors.ink) {
  const id = useId().replaceAll(':', '')
  return {
    marker: (
      <defs>
        <marker
          id={id}
          viewBox="0 0 12 12"
          refX="10"
          refY="6"
          markerWidth="16"
          markerHeight="16"
          orient="auto-start-reverse"
          markerUnits="userSpaceOnUse"
        >
          <path
            d="M 2 2 L 10 6 L 2 10"
            fill="none"
            stroke={stroke}
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
      </defs>
    ),
    end: `url(#${id})`,
  }
}
