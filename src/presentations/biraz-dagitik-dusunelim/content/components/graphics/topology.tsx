import type { ReactNode } from 'react'
import {
  colors,
  connectorGap,
  Diagram,
  diagramType,
  inkFrame,
  Label,
  useArrow,
} from './primitives'

export type NodeId = 'a' | 'b' | 'c'
export type TopologyNode = {
  id: NodeId
  role?: string
  label?: string
  term?: number | string
  kind?: string
  dataLabel?: string
  entries?: string[]
  status?: string
  unreachable?: boolean
  active?: boolean
}
export type TopologyMessage = {
  from: NodeId
  to: NodeId
  label?: string
  blocked?: boolean
  accent?: boolean
}

const centers: Record<NodeId, number> = { a: 210, b: 720, c: 1230 }
const frameVariants: Record<NodeId, number> = { a: 0, b: 1, c: 2 }

export function Topology({
  nodes,
  messages = [],
  caption,
  children,
  label = 'düğümler arasındaki mesajlar ve yerel kayıtlar',
}: {
  nodes: TopologyNode[]
  messages?: TopologyMessage[]
  caption?: string
  children?: ReactNode
  label?: string
}) {
  const arrow = useArrow(colors.muted)
  const accentArrow = useArrow(colors.accent)
  return (
    <Diagram label={label} viewBox="0 -30 1440 540">
      {arrow.marker}
      {accentArrow.marker}
      {messages.map((message, index) => {
        const from = centers[message.from],
          to = centers[message.to]
        const long = Math.abs(from - to) > 600
        const direction = to > from ? 1 : -1
        const x1 = long ? from : from + (180 + connectorGap) * direction
        const x2 = long ? to : to - (180 + connectorGap) * direction
        const channel = index % 2 === 0 ? 28 : 428
        const attachment = channel < 100 ? 98 - connectorGap : 382 + connectorGap
        const reversedEarlier = messages
          .slice(0, index)
          .some(
            (previous) => previous.from === message.to && previous.to === message.from,
          )
        const linkY = reversedEarlier ? 310 : 235
        const corner = 18
        const nearChannel = channel + (attachment > channel ? corner : -corner)
        const path = long
          ? `M ${x1} ${attachment} Q ${x1 + 1.5} ${(attachment + nearChannel) / 2} ${x1} ${nearChannel} Q ${x1} ${channel} ${x1 + corner * direction} ${channel} C ${x1 + (x2 - x1) * 0.35} ${channel - 2.5} ${x1 + (x2 - x1) * 0.7} ${channel + 2} ${x2 - corner * direction} ${channel} Q ${x2} ${channel} ${x2} ${nearChannel} Q ${x2 - 1.5} ${(attachment + nearChannel) / 2} ${x2} ${attachment}`
          : `M ${x1} ${linkY} C ${x1 + (x2 - x1) * 0.33} ${linkY - 2.4} ${x1 + (x2 - x1) * 0.72} ${linkY + 1.8} ${x2} ${linkY}`
        const labelX = (from + to) / 2
        const labelY = long ? channel + (channel < 100 ? 44 : -16) : linkY - 28
        const stroke = message.accent || message.blocked ? colors.accent : colors.muted
        return (
          <g key={`${message.from}-${message.to}-${index}`}>
            <path
              d={path}
              fill="none"
              stroke={stroke}
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={message.blocked ? '10 10' : undefined}
              markerEnd={
                message.blocked
                  ? undefined
                  : message.accent
                    ? accentArrow.end
                    : arrow.end
              }
            />
            {message.blocked && (
              <g stroke={colors.accent} strokeWidth={4} strokeLinecap="round">
                <path
                  d={`M ${labelX - 9} ${long ? channel - 9 : linkY - 9} q 8 7 18 18 m -1 -19 q -7 10 -18 19`}
                  fill="none"
                />
              </g>
            )}
            {message.label && (
              <Label
                x={labelX}
                y={labelY}
                fontSize={diagramType.metadata}
                textAnchor="middle"
                fill={stroke}
              >
                {message.label}
              </Label>
            )}
          </g>
        )
      })}
      {nodes
        .filter((node) => node.kind)
        .map((node) => (
          <Label
            key={`kind-${node.id}`}
            x={centers[node.id]}
            y={70}
            textAnchor="middle"
            fontSize={diagramType.metadata}
            fill={colors.muted}
          >
            {node.kind}
          </Label>
        ))}
      {nodes.map((node) => {
        const x = centers[node.id] - 180
        return (
          <g key={node.id} transform={`translate(${x} 98)`}>
            <path
              d={inkFrame(0, 0, 360, 284, 15, frameVariants[node.id])}
              fill={node.active ? colors.tint : colors.white}
              stroke={node.active ? colors.accent : colors.ink}
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={node.unreachable ? '10 8' : undefined}
            />
            <path
              d="M 0 68 H 360"
              fill="none"
              stroke={node.active ? colors.accent : colors.line}
              strokeWidth={2}
            />
            <Label x={24} y={47} fontSize={diagramType.node} mono>
              {node.id}
            </Label>
            <Label
              x={336}
              y={45}
              textAnchor="end"
              fontSize={diagramType.metadata}
              fill={node.active ? colors.accent : colors.muted}
            >
              {node.role ?? node.label ?? 'replica'}
            </Label>
            {node.term !== undefined && (
              <Label
                x={24}
                y={108}
                fontSize={diagramType.metadata}
                mono
                fill={colors.muted}
              >
                term {node.term}
              </Label>
            )}
            {node.term === undefined && node.dataLabel && (
              <Label x={24} y={108} fontSize={diagramType.metadata} fill={colors.muted}>
                {node.dataLabel}
              </Label>
            )}
            {(node.entries ?? []).slice(0, 3).map((entry, index) => (
              <Label
                key={index}
                x={24}
                y={146 + index * 40}
                mono
                fontSize={diagramType.record}
              >
                {entry}
              </Label>
            ))}
            {node.status && (
              <Label
                x={24}
                y={268}
                fontSize={diagramType.metadata}
                fill={node.unreachable ? colors.accent : colors.muted}
              >
                {node.status}
              </Label>
            )}
          </g>
        )
      })}
      {children}
      {caption && (
        <Label
          x={720}
          y={470}
          textAnchor="middle"
          fontSize={diagramType.label}
          fill={colors.muted}
        >
          {caption}
        </Label>
      )}
    </Diagram>
  )
}
