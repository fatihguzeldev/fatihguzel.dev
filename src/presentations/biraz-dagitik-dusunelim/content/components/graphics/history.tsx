import { colors, Diagram, inkFrame, Label, useArrow } from './primitives'

export function History({
  mode = 'concurrent',
  showPoints = false,
}: {
  mode?: 'concurrent' | 'ordered' | 'stale'
  showPoints?: boolean
}) {
  const arrow = useArrow(colors.line)
  const accentArrow = useArrow(colors.accent)
  const ordered = mode !== 'concurrent'
  const first = { start: 330, end: ordered ? 730 : 950, y: 160 }
  const second = { start: ordered ? 890 : 630, end: 1300, y: 365 }
  const firstPoint = ordered ? 570 : 760
  const secondPoint = ordered ? 1080 : 850
  return (
    <Diagram
      viewBox="0 0 1440 540"
      label={
        mode === 'stale'
          ? 'başarılı rezervasyondan sonra başlayan okuma eski veriyi görmemeli'
          : 'işlemlerin başlangıç, yanıt ve tek karar anları'
      }
    >
      {arrow.marker}
      {accentArrow.marker}
      <Label x={42} y={first.y + 12} fontSize={38}>
        ayşe
      </Label>
      <Label x={42} y={second.y + 12} fontSize={38}>
        {mode === 'stale' ? 'okuma' : 'bora'}
      </Label>
      {[first, second].map((operation, index) => (
        <g key={index}>
          <path
            d={`M 260 ${operation.y} C 625 ${operation.y - 2.5} 1000 ${operation.y + 2} 1360 ${operation.y}`}
            fill="none"
            stroke={colors.line}
            strokeWidth={2}
            strokeLinecap="round"
            markerEnd={arrow.end}
          />
          <path
            d={inkFrame(
              operation.start,
              operation.y - 24,
              operation.end - operation.start,
              48,
              8,
              index,
            )}
            fill={index === 0 ? colors.accent : colors.white}
            stroke={index === 0 ? colors.accent : colors.ink}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={`M ${operation.start} ${operation.y - 38} C ${operation.start - 0.8} ${operation.y - 9} ${operation.start + 0.8} ${operation.y + 13} ${operation.start} ${operation.y + 38} M ${operation.end} ${operation.y - 38} C ${operation.end + 0.8} ${operation.y - 9} ${operation.end - 0.8} ${operation.y + 13} ${operation.end} ${operation.y + 38}`}
            fill="none"
            stroke={index === 0 ? colors.accent : colors.ink}
            strokeWidth={3}
            strokeLinecap="round"
          />
          <Label
            x={operation.start}
            y={operation.y + 78}
            fontSize={32}
            textAnchor="middle"
            fill={colors.muted}
          >
            istek
          </Label>
          <Label
            x={operation.end}
            y={operation.y + 78}
            fontSize={32}
            textAnchor="end"
            fill={colors.muted}
          >
            {index === 0
              ? 'yanıt: onaylandı'
              : mode === 'stale'
                ? 'yanıt: boş'
                : 'yanıt: reddedildi'}
          </Label>
        </g>
      ))}
      {showPoints &&
        [firstPoint, secondPoint].map((x, index) => (
          <g key={x}>
            <circle
              cx={x}
              cy={index === 0 ? first.y : second.y}
              r={9}
              fill={index === 0 ? colors.white : colors.accent}
              stroke={index === 0 ? colors.white : colors.accent}
              strokeWidth={3}
            />
            <Label
              x={x}
              y={index === 0 ? first.y - 62 : second.y - 62}
              textAnchor="middle"
              fontSize={32}
              fill={colors.accent}
            >
              karar anı
            </Label>
          </g>
        ))}
      {ordered && (
        <g>
          <path
            d="M 730 92 C 780 89 831 94 890 92"
            fill="none"
            stroke={colors.accent}
            strokeWidth={3}
            strokeLinecap="round"
            markerEnd={accentArrow.end}
          />
          <Label x={810} y={60} fontSize={32} textAnchor="middle" fill={colors.accent}>
            önce
          </Label>
        </g>
      )}
      <Label x={1360} y={520} fontSize={32} textAnchor="end" fill={colors.muted}>
        zaman →
      </Label>
    </Diagram>
  )
}
