import {
  colors,
  connectorGap,
  Diagram,
  diagramType,
  inkFrame,
  Label,
} from '../../components/graphics/primitives'

export function SingleDatabaseDependency() {
  return (
    <Diagram
      label="database’e ulaşılamazsa, boş s17 için uygulamaya gelen rezervasyon isteği yanıt bekler"
      viewBox="0 -30 1440 540"
    >
      <path
        d={`M ${1010 - connectorGap} 235 H ${390 + connectorGap}`}
        fill="none"
        stroke={colors.muted}
        strokeWidth={3}
        strokeDasharray="9 9"
      />
      <path
        d={`M ${402 + connectorGap} 227 L ${390 + connectorGap} 235 L ${402 + connectorGap} 243`}
        fill="none"
        stroke={colors.muted}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Label
        x={720}
        y={207}
        textAnchor="middle"
        fontSize={diagramType.metadata}
        fill={colors.muted}
      >
        rezervasyon isteği
      </Label>
      <g stroke={colors.accent} strokeWidth={4} strokeLinecap="round">
        <path d="M 458 227 L 474 243 M 474 227 L 458 243" />
      </g>

      <path
        d={inkFrame(30, 98, 360, 284)}
        fill={colors.white}
        stroke={colors.ink}
        strokeWidth={3}
        strokeDasharray="10 8"
      />
      <path d="M 30 166 H 390" fill="none" stroke={colors.line} strokeWidth={2} />
      <Label x={54} y={145} fontSize={diagramType.label}>
        database
      </Label>
      <Label x={54} y={244} fontSize={diagramType.record} mono>
        s17: boş
      </Label>

      <path
        d={inkFrame(1010, 98, 400, 284)}
        fill={colors.paper}
        stroke={colors.line}
        strokeWidth={2.5}
      />
      <path d="M 1010 166 H 1410" fill="none" stroke={colors.line} strokeWidth={2} />
      <Label x={1034} y={145} fontSize={diagramType.label}>
        uygulama
      </Label>
      <Label x={1034} y={244} fontSize={diagramType.label}>
        s17 için rezervasyon
      </Label>
      <Label x={1034} y={296} fontSize={diagramType.metadata} fill={colors.accent}>
        yanıt bekleniyor
      </Label>
    </Diagram>
  )
}
