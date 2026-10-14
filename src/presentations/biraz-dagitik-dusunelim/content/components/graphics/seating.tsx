import { colors, Diagram, inkFrame, Label, useArrow } from './primitives'

function Chair({
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
          d={inkFrame(-83, -90, 166, 183, 26, 2)}
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

export function Seat({
  id = 's17',
  selected = false,
  owner,
  size = 240,
}: {
  id?: string
  selected?: boolean
  owner?: string
  size?: number
}) {
  return (
    <div style={{ width: size, height: size }}>
      <Diagram label={`${id}: ${owner ?? 'boş koltuk'}`} viewBox="-100 -100 200 240">
        <Chair x={0} y={0} id={id} selected={selected} owner={owner} />
      </Diagram>
    </div>
  )
}

export function SeatingMap({
  selected = 's17',
  owner,
  showRequests = true,
}: {
  selected?: string
  owner?: string
  showRequests?: boolean
}) {
  const arrow = useArrow(colors.accent)
  const selectedIndex = Math.max(0, Math.min(9, Number(selected.slice(1)) - 11))
  const selectedX = 620 + (selectedIndex % 5) * 168
  const selectedY = 245 + Math.floor(selectedIndex / 5) * 215
  return (
    <Diagram
      label={
        showRequests
          ? 'ayşe ve bora aynı koltuğu, s17’yi istiyor'
          : 'sinema salonunun koltuk planı'
      }
      viewBox={showRequests ? '0 0 1440 600' : '510 0 870 600'}
    >
      {arrow.marker}
      <g
        stroke={colors.ink}
        strokeWidth={3.1}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path
          d="M 551 101 C 764 129 1121 131 1334 102 L 1332 119 C 1107 150 774 148 552 119 Z"
          fill={colors.tint}
        />
        <path
          d="M 568 31 C 802 23 1106 25 1316 32 L 1334 102 C 1132 130 771 131 551 101 Z"
          fill={colors.white}
        />
        <path
          d="M 572 42 C 804 35 1093 37 1314 43"
          fill="none"
          stroke={colors.line}
          strokeWidth={2}
        />
      </g>
      <Label x={943} y={87} textAnchor="middle" fontSize={33}>
        sahne
      </Label>
      {[0, 1].flatMap((row) =>
        [0, 1, 2, 3, 4].map((column) => {
          const id = `s${11 + row * 5 + column}`
          return (
            <Chair
              key={id}
              x={620 + column * 168}
              y={245 + row * 215}
              id={id}
              selected={id === selected}
              owner={id === selected ? owner : undefined}
            />
          )
        }),
      )}
      {showRequests && (
        <g>
          <Label x={44} y={245} fontSize={48}>
            ayşe
          </Label>
          <Label x={44} y={412} fontSize={48}>
            bora
          </Label>
          <path
            d={`M 195 232 C 282 230 377 232 421 250 Q 449 263 449 ${selectedY - 135} Q 450 ${selectedY - 115} 472 ${selectedY - 115} C 548 ${selectedY - 118} ${selectedX - 81} ${selectedY - 112} ${selectedX - 24} ${selectedY - 115} Q ${selectedX} ${selectedY - 115} ${selectedX} ${selectedY - 103} V ${selectedY - 80}`}
            fill="none"
            stroke={colors.accent}
            strokeWidth={3.2}
            strokeLinecap="round"
            markerEnd={arrow.end}
          />
          <path
            d={`M 195 400 C 282 397 370 400 406 420 Q 432 433 431 ${selectedY + 111} Q 432 ${selectedY + 131} 455 ${selectedY + 131} C 553 ${selectedY + 134} ${selectedX - 80} ${selectedY + 127} ${selectedX - 24} ${selectedY + 131} Q ${selectedX} ${selectedY + 131} ${selectedX} ${selectedY + 119} V ${selectedY + 94}`}
            fill="none"
            stroke={colors.accent}
            strokeWidth={3.2}
            strokeLinecap="round"
            markerEnd={arrow.end}
          />
          <Label x={44} y={523} fontSize={30} mono fill={colors.accent}>
            {selected}
          </Label>
          <Label x={44} y={565} fontSize={28} fill={colors.muted}>
            aynı koltuk
          </Label>
        </g>
      )}
    </Diagram>
  )
}
