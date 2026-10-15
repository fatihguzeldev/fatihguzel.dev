import type { ReactNode } from 'react'
import { colors, Diagram, diagramType, inkFrame, Label } from '../primitives'
import type { NodeId, TopologyNode } from './types'

const centers: Record<NodeId, number> = { a: 210, b: 720, c: 1230 }

export function Topology({
  nodes,
  children,
  label = 'düğümler arasındaki mesajlar ve yerel kayıtlar',
}: {
  nodes: TopologyNode[]
  children?: ReactNode
  label?: string
}) {
  return (
    <Diagram label={label} viewBox="0 -30 1440 540">
      {nodes.map((node) => {
        const x = centers[node.id] - 180
        return (
          <g key={node.id} transform={`translate(${x} 98)`}>
            <path
              d={inkFrame(0, 0, 360, 284, 15)}
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
              {node.role ?? 'replica'}
            </Label>
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
    </Diagram>
  )
}
