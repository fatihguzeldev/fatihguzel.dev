import type { ReactNode } from 'react'
import {
  colors,
  connectorGap,
  Diagram,
  diagramType,
  inkFrame,
  Label,
} from '../../primitives'

const databaseX = { a: 30, b: 540 } as const
const databaseRoleSize = 24

export function ReplicationScene({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <Diagram label={label} viewBox="0 -30 1440 540">
      {children}
    </Diagram>
  )
}

export function Database({
  id,
  role,
  owner,
  active = false,
  unreachable = false,
  observation,
}: {
  id: 'a' | 'b'
  role: 'primary' | 'replica' | 'eski primary'
  owner: 'ayşe' | 'bora' | 'boş'
  active?: boolean
  unreachable?: boolean
  observation?: string
}) {
  const x = databaseX[id]
  const stroke = active ? colors.accent : unreachable ? colors.muted : colors.ink
  return (
    <g data-database={id} transform={`translate(${x} 98)`}>
      <path
        d={inkFrame(0, 0, 360, 284)}
        fill={active ? colors.tint : colors.white}
        stroke={stroke}
        strokeWidth={3}
        strokeDasharray={unreachable ? '10 8' : undefined}
      />
      <path
        d="M 0 68 H 360"
        fill="none"
        stroke={active ? colors.accent : colors.line}
        strokeWidth={2}
      />
      <Label x={24} y={47} fontSize={diagramType.label}>
        database {id}
      </Label>
      <Label
        x={336}
        y={45}
        textAnchor="end"
        fontSize={databaseRoleSize}
        fill={active ? colors.accent : colors.muted}
      >
        {role}
      </Label>
      <Label x={24} y={146} fontSize={diagramType.record} mono>
        s17: {owner}
      </Label>
      {observation && (
        <Label x={24} y={198} fontSize={diagramType.metadata} fill={colors.muted}>
          {observation}
        </Label>
      )}
    </g>
  )
}

export function Application({
  customer,
  waiting = false,
}: {
  customer: 'ayşe' | 'bora'
  waiting?: boolean
}) {
  const request = customer === 'ayşe' ? 'ayşe’nin s17 isteği' : 'bora’nın s17 isteği'
  return (
    <g data-application>
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
        {request}
      </Label>
      <Label x={1034} y={296} fontSize={diagramType.metadata} fill={colors.accent}>
        {waiting ? 'yanıt bekleniyor' : 'onay verildi'}
      </Label>
    </g>
  )
}

export function RequestRoute({
  target,
  waiting = false,
}: {
  target: 'a' | 'b'
  waiting?: boolean
}) {
  const destination = databaseX[target] + 30
  const endpointY = 98 - connectorGap
  const stroke = waiting ? colors.muted : colors.accent
  return (
    <g
      aria-hidden="true"
      fill="none"
      stroke={stroke}
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d={`M 1380 ${endpointY} V 38 Q 1380 20 1362 20 H ${destination + 18} Q ${destination} 20 ${destination} 38 V ${endpointY}`}
        strokeDasharray={waiting ? '8 8' : undefined}
      />
      {waiting ? (
        <path
          d={`M ${destination - 8} 62 L ${destination + 8} 78 M ${destination + 8} 62 L ${destination - 8} 78`}
          stroke={colors.accent}
          strokeWidth={4}
        />
      ) : (
        <path
          d={`M ${destination - 8} ${endpointY - 12} L ${destination} ${endpointY} L ${destination + 8} ${endpointY - 12}`}
        />
      )}
    </g>
  )
}

export function CopyInFlight() {
  return (
    <g>
      <path
        d={`M ${390 + connectorGap} 235 H ${540 - connectorGap}`}
        fill="none"
        stroke={colors.line}
        strokeWidth={3}
        strokeDasharray="7 7"
      />
      <path
        d={`M ${390 + connectorGap} 235 H 465 M 454 228 L 465 235 L 454 242`}
        fill="none"
        stroke={colors.accent}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Label
        x={465}
        y={207}
        textAnchor="middle"
        fontSize={diagramType.metadata}
        fill={colors.accent}
      >
        yolda
      </Label>
    </g>
  )
}

export function UnansweredContact() {
  return (
    <g>
      <path
        d={`M ${540 - connectorGap} 235 H ${390 + connectorGap}`}
        fill="none"
        stroke={colors.muted}
        strokeWidth={3}
        strokeDasharray="8 8"
      />
      <path
        d="M 457 227 L 473 243 M 473 227 L 457 243"
        fill="none"
        stroke={colors.accent}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <Label
        x={465}
        y={207}
        textAnchor="middle"
        fontSize={diagramType.metadata}
        fill={colors.muted}
      >
        yanıt yok
      </Label>
    </g>
  )
}
