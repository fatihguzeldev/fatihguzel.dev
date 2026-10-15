import type { ReactNode } from 'react'
import './inline-arrows.css'

export function InlineArrows({
  children,
  svg = false,
}: {
  children: ReactNode
  svg?: boolean
}) {
  if (typeof children !== 'string') return children

  return children.split(/(→)/).map((part, index) => {
    if (part !== '→') return part

    // Center the arrow shaft on the lowercase text's x-height.
    return svg ? (
      <tspan key={index} baselineShift="-0.09em">
        {part}
      </tspan>
    ) : (
      <span key={index} className="lecture-inline-arrow">
        {part}
      </span>
    )
  })
}
