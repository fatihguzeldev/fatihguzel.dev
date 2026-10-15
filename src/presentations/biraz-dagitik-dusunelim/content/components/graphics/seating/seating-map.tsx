import { colors, Diagram, Label, useArrow } from '../primitives'
import { Chair } from './chair'

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
