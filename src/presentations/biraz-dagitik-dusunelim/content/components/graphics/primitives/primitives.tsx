import { useId, type ReactNode, type SVGProps } from 'react'
import { InlineArrows } from '../../typography/inline-arrows/inline-arrows'

import { colors } from './palette'

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
