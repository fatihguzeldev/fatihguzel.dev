import type { ReactNode } from 'react'
import { colors, Diagram, inkFrame, Label, useArrow } from '../../primitives'
import { messageHeight, messageTop, storyLayout } from './layout'

export type StoryEntry = {
  person: 'ayşe' | 'bora'
  seat: 's17' | 's18'
  term?: number
  highlight?: boolean
}

export function StoryScene({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <Diagram viewBox="0 0 1440 540" label={label}>
      {children}
    </Diagram>
  )
}

export function StoryMessage({
  x,
  lines,
  y = messageTop(lines.length),
  header,
  accent = false,
}: {
  x: number
  y?: number
  header: string
  lines: readonly string[]
  accent?: boolean
}) {
  const height = messageHeight(lines.length)
  const bottom = y + height
  const right = x + 480
  const stroke = accent ? colors.accent : colors.ink
  return (
    <g data-story-message>
      <path
        d={`M ${x + 16} ${y} H ${right - 16} Q ${right} ${y} ${right} ${y + 16}
      V ${bottom - 16} Q ${right} ${bottom} ${right - 16} ${bottom}
      H ${x + 80} L ${x + 52} ${bottom + storyLayout.tailHeight} L ${x + 58} ${bottom}
      H ${x + 16} Q ${x} ${bottom} ${x} ${bottom - 16}
      V ${y + 16} Q ${x} ${y} ${x + 16} ${y} Z`}
        fill={accent ? colors.tint : colors.white}
        stroke={stroke}
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      <Label
        x={x + 24}
        y={y + 31}
        fontSize={26}
        fill={accent ? colors.accent : colors.muted}
      >
        {header}
      </Label>
      {lines.map((line, index) => (
        <Label key={index} x={x + 24} y={y + 73 + index * 44} fontSize={32}>
          {line}
        </Label>
      ))}
    </g>
  )
}

export function StoryHistory({
  id,
  x,
  entries,
  currentTerm,
  role = 'replica',
  committed = false,
  vote = false,
}: {
  id: 'b' | 'c'
  x: number
  entries: readonly StoryEntry[]
  currentTerm: number
  role?: string
  committed?: boolean
  vote?: boolean
}) {
  const y = storyLayout.nodeTop
  return (
    <g data-story-history={id}>
      <path
        d={inkFrame(x, y, 480, 250, 14)}
        fill={colors.white}
        stroke={id === 'b' || committed ? colors.accent : colors.ink}
        strokeWidth={2.5}
      />
      <Label x={x + 24} y={y + 44} fontSize={42} mono>
        {id}
      </Label>
      <Label x={x + 74} y={y + 43} fontSize={26} fill={colors.muted}>
        {role}
      </Label>
      <Label x={x + 456} y={y + 43} textAnchor="end" fontSize={24} fill={colors.accent}>
        güncel term {currentTerm}
        {vote && ' · oy: b'}
      </Label>
      <Label x={x + 24} y={y + 83} fontSize={26} fill={colors.muted}>
        kalıcı istek kayıtları
      </Label>
      {committed && id === 'b' && (
        <Label
          x={x + 456}
          y={y + 83}
          textAnchor="end"
          fontSize={26}
          fill={colors.accent}
        >
          commit
        </Label>
      )}
      {entries.length === 0 && (
        <Label x={x + 28} y={y + 132} fontSize={30} fill={colors.muted}>
          henüz kayıt yok
        </Label>
      )}
      {entries.map((entry, index) => {
        const row = y + 96 + index * 50
        return (
          <g key={`${entry.person}-${entry.seat}`}>
            <path
              d={inkFrame(x + 16, row, 448, 46, 7)}
              fill={committed || entry.highlight ? colors.tint : colors.paper}
            />
            <path
              d={`M ${x + 18} ${row + 8} V ${row + 38}`}
              stroke={committed || entry.highlight ? colors.accent : colors.line}
              strokeWidth={3}
              strokeLinecap="round"
            />
            <Label x={x + 28} y={row + 32} fontSize={28}>
              {entry.person === 'bora' ? 'bora’nın' : 'ayşe’nin'} {entry.seat} isteği
            </Label>
            {entry.term !== undefined && (
              <Label
                x={x + 448}
                y={row + 31}
                textAnchor="end"
                fontSize={24}
                fill={entry.term === currentTerm ? colors.accent : colors.muted}
              >
                term {entry.term}
              </Label>
            )}
          </g>
        )
      })}
    </g>
  )
}

export function StoryExchange({ requester }: { requester: 'left' | 'right' }) {
  const arrow = useArrow()
  const accentArrow = useArrow(colors.accent)
  const leftToRight = requester === 'left'
  const { requestLevel, replyLevel } = storyLayout
  return (
    <g aria-hidden="true">
      {arrow.marker}
      {accentArrow.marker}
      <path
        data-message-flow="request"
        d={leftToRight ? `M 572 ${requestLevel} H 868` : `M 868 ${requestLevel} H 572`}
        fill="none"
        stroke={colors.ink}
        strokeWidth={3}
        strokeLinecap="round"
        markerEnd={arrow.end}
      />
      <path
        data-message-flow="reply"
        d={leftToRight ? `M 868 ${replyLevel} H 572` : `M 572 ${replyLevel} H 868`}
        fill="none"
        stroke={colors.accent}
        strokeWidth={3}
        strokeLinecap="round"
        markerEnd={accentArrow.end}
      />
    </g>
  )
}
