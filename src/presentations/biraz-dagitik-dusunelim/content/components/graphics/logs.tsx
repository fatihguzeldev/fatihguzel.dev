import { colors, Diagram, diagramType, inkFrame, Label } from './primitives'

export function LogComparison({
  rows,
  committed = 0,
}: {
  rows: {
    id: string
    entries: string[]
    label?: string
    selected?: boolean
    unreachable?: boolean
  }[]
  committed?: number
}) {
  const columns = Math.max(1, ...rows.map((row) => row.entries.length))
  const width = Math.min(570, 1140 / columns)
  return (
    <Diagram
      label="düğümlerin kayıtları ve kesinleşmiş ortak geçmiş"
      viewBox="0 0 1440 540"
    >
      {Array.from({ length: columns }, (_, index) => (
        <Label
          key={index}
          x={250 + index * width + width / 2}
          y={40}
          textAnchor="middle"
          fontSize={diagramType.metadata}
          mono
          fill={colors.muted}
        >
          {index + 1}
        </Label>
      ))}
      {committed > 0 && (
        <g>
          <path
            d={inkFrame(
              242,
              65,
              Math.min(committed, columns) * width + 16,
              rows.length * 128 - 16,
              18,
              2,
            )}
            fill={colors.tint}
          />
          <path
            d={`M ${250 + Math.min(committed, columns) * width} 56 q -2 ${(rows.length * 128 + 4) / 2} 0 ${rows.length * 128 + 4}`}
            fill="none"
            stroke={colors.accent}
            strokeWidth={3}
            strokeLinecap="round"
            strokeDasharray="8 8"
          />
        </g>
      )}
      {rows.map((row, rowIndex) => (
        <g key={row.id} transform={`translate(0 ${80 + rowIndex * 128})`}>
          <Label x={34} y={46} fontSize={diagramType.node} mono>
            {row.id}
          </Label>
          {row.label && (
            <Label x={95} y={45} fontSize={diagramType.metadata} fill={colors.muted}>
              {row.label}
            </Label>
          )}
          {Array.from({ length: columns }, (_, index) => (
            <g key={index}>
              <path
                d={inkFrame(
                  250 + index * width,
                  0,
                  width - 14,
                  90,
                  10,
                  rowIndex + index,
                )}
                fill={row.entries[index] ? colors.white : colors.paper}
                stroke={
                  row.selected
                    ? colors.accent
                    : row.entries[index]
                      ? colors.ink
                      : colors.line
                }
                strokeWidth={row.selected ? 3 : 2}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={
                  row.unreachable || !row.entries[index] ? '8 8' : undefined
                }
              />
              <Label
                x={250 + index * width + (width - 14) / 2}
                y={55}
                textAnchor="middle"
                fontSize={diagramType.record}
                mono
              >
                {row.entries[index] ?? '—'}
              </Label>
            </g>
          ))}
        </g>
      ))}
      {committed > 0 && (
        <Label
          x={250}
          y={rows.length * 128 + 110}
          fontSize={diagramType.label}
          fill={colors.accent}
        >
          kesinleşmiş ortak geçmiş
        </Label>
      )}
    </Diagram>
  )
}
