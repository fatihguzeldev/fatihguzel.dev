import type { SVGProps } from 'react'

const base: SVGProps<SVGSVGElement> = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export function BackIcon() {
  return (
    <svg {...base}>
      <path d="m10 6-6 6 6 6M4 12h16" />
    </svg>
  )
}
export function NextIcon() {
  return (
    <svg {...base}>
      <path d="m14 6 6 6-6 6M20 12H4" />
    </svg>
  )
}
export function ExpandIcon() {
  return (
    <svg {...base}>
      <path d="M9 3H3v6m12-6h6v6M3 15v6h6m12-6v6h-6" />
    </svg>
  )
}
export function CollapseIcon() {
  return (
    <svg {...base}>
      <path d="M3 9h6V3m6 0v6h6M9 21v-6H3m18 0h-6v6" />
    </svg>
  )
}
export function ExportIcon() {
  return (
    <svg {...base}>
      <path d="M12 3v12m-4-4 4 4 4-4M4 16v5h16v-5" />
    </svg>
  )
}
export function ControlsIcon() {
  return (
    <svg {...base}>
      <path d="M4 7h16M4 17h16" />
      <circle cx="9" cy="7" r="2" fill="var(--bg-elevated)" />
      <circle cx="15" cy="17" r="2" fill="var(--bg-elevated)" />
    </svg>
  )
}

export function CloseIcon() {
  return (
    <svg {...base}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  )
}
