import { colors, Label } from '../../primitives'

export function CinemaSeat({
  x,
  y,
  id,
  owner,
}: {
  x: number
  y: number
  id: 's17' | 's18'
  owner: 'ayşe' | 'bora'
}) {
  const recipient = owner === 'ayşe' ? 'ayşe’ye' : 'bora’ya'
  return (
    <g transform={`translate(${x} ${y})`} aria-label={`${id} ${recipient} ayrıldı`}>
      <g
        transform="scale(1.05)"
        stroke={colors.ink}
        strokeWidth={3}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path
          d="M -47 -60 C -26 -69 25 -70 47 -59 Q 52 -56 52 -47 L 49 17 Q 0 25 -49 17 L -52 -46 Q -53 -56 -47 -60 Z"
          fill={colors.tint}
        />
        <path
          d="M -40 -50 C -15 -56 17 -56 40 -49"
          fill="none"
          stroke={colors.accent}
          strokeWidth={2}
        />
        <path
          d="M -48 14 Q -3 8 48 15 L 52 47 Q 52 57 42 59 C 12 63 -20 62 -42 59 Q -53 58 -52 47 Z"
          fill={colors.accent}
        />
        <path
          d="M -66 -5 Q -66 -12 -58 -12 L -52 -11 Q -46 -10 -46 -4 L -46 53 Q -47 61 -55 61 L -60 60 Q -67 59 -67 52 Z"
          fill={colors.tint}
        />
        <path
          d="M 53 -11 Q 61 -13 66 -7 L 67 51 Q 67 59 60 60 L 54 61 Q 47 61 47 53 L 47 -3 Q 47 -10 53 -11 Z"
          fill={colors.tint}
        />
        <path
          d="M -12 64 L -12 77 Q 0 80 13 77 L 13 65 M -24 79 Q 0 82 25 78"
          fill="none"
        />
      </g>
      <Label x={0} y={-16} textAnchor="middle" fontSize={30} mono>
        {id}
      </Label>
      <Label x={0} y={150} textAnchor="middle" fontSize={34}>
        {owner}
      </Label>
    </g>
  )
}
