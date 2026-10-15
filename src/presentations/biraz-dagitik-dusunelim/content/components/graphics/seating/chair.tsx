import { colors, inkFrame, Label } from '../primitives'

export function Chair({
  x,
  y,
  id,
  selected = false,
  owner,
}: {
  x: number
  y: number
  id: string
  selected?: boolean
  owner?: string
}) {
  const fill = selected ? colors.tint : colors.white
  const tilt = [-0.8, 0.55, -0.3, 0.75, -0.5][Number(id.slice(1)) % 5] ?? 0
  return (
    <g transform={`translate(${x} ${y})`}>
      {selected && (
        <path
          d={inkFrame(-83, -90, 166, 183, 26)}
          fill={colors.tint}
          transform="rotate(-3)"
        />
      )}
      <g
        transform={`rotate(${tilt})`}
        stroke={colors.ink}
        strokeWidth={3.1}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path
          d="M -47 -60 C -26 -69 25 -70 47 -59 Q 52 -56 52 -47 L 49 17 Q 0 25 -49 17 L -52 -46 Q -53 -56 -47 -60 Z"
          fill={fill}
        />
        <path
          d="M -40 -50 C -15 -56 17 -56 40 -49"
          fill="none"
          stroke={selected ? colors.accent : colors.line}
          strokeWidth={2.2}
        />
        <path
          d="M -48 14 Q -3 8 48 15 L 52 47 Q 52 57 42 59 C 12 63 -20 62 -42 59 Q -53 58 -52 47 Z"
          fill={selected ? colors.accent : colors.white}
        />
        <path
          d="M -66 -5 Q -66 -12 -58 -12 L -52 -11 Q -46 -10 -46 -4 L -46 53 Q -47 61 -55 61 L -60 60 Q -67 59 -67 52 Z"
          fill={fill}
        />
        <path
          d="M 53 -11 Q 61 -13 66 -7 L 67 51 Q 67 59 60 60 L 54 61 Q 47 61 47 53 L 47 -3 Q 47 -10 53 -11 Z"
          fill={fill}
        />
        <path
          d="M -12 64 L -12 77 Q 0 80 13 77 L 13 65 M -24 79 Q 0 82 25 78"
          fill="none"
        />
      </g>
      <Label x={0} y={-13} fontSize={29} textAnchor="middle" mono>
        {id}
      </Label>
      {owner && (
        <Label x={0} y={119} textAnchor="middle" fontSize={28}>
          {owner}
        </Label>
      )}
    </g>
  )
}
