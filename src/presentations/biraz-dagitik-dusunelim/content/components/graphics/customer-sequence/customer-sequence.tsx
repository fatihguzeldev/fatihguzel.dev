import { colors, Diagram, Label, useArrow } from '../primitives'

type CustomerEvent = {
  title: string
  message: string
  notes: readonly string[]
  emphasized?: boolean
}

export function CustomerSequence({
  label,
  events,
  orderLabel,
}: {
  label: string
  events: readonly [CustomerEvent, CustomerEvent, CustomerEvent]
  orderLabel?: string
}) {
  const arrow = useArrow(colors.line)
  const positions = [200, 720, 1240]

  return (
    <Diagram viewBox="0 0 1440 540" label={label}>
      {arrow.marker}
      <path
        d="M 200 270 H 1350"
        fill="none"
        stroke={colors.line}
        strokeWidth={3}
        markerEnd={arrow.end}
      />
      {orderLabel && (
        <Label x={460} y={248} textAnchor="middle" fontSize={30} fill={colors.muted}>
          {orderLabel}
        </Label>
      )}

      {events.map(({ title, message, notes, emphasized }, index) => (
        <g key={title}>
          <Label x={positions[index]} y={112} textAnchor="middle" fontSize={36}>
            {title}
          </Label>
          <Label
            x={positions[index]}
            y={184}
            textAnchor="middle"
            fontSize={46}
            fill={emphasized ? colors.accent : colors.ink}
          >
            {message}
          </Label>
          <circle
            cx={positions[index]}
            cy={270}
            r={9}
            fill={emphasized ? colors.accent : colors.ink}
          />
          {notes.map((note, line) => (
            <Label
              key={note}
              x={positions[index]}
              y={344 + line * 40}
              textAnchor="middle"
              fontSize={30}
              fill={colors.muted}
            >
              {note}
            </Label>
          ))}
        </g>
      ))}
    </Diagram>
  )
}
