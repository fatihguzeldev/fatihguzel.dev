import { type ReactNode } from 'react'
import { ChessPiece } from '../graphics/chess-board/piece'
import { type PieceKind } from '../../model/chess/types'
import './opera-search-tree.css'

function Move({
  san,
  kind,
  color = 'white',
  x,
  y,
  selected,
}: {
  san: string
  kind: PieceKind
  color?: 'white' | 'black'
  x: number
  y: number
  selected: boolean
}) {
  return (
    <g className={`chess-depth-move${selected ? ' chess-depth-move--selected' : ''}`}>
      <ChessPiece
        kind={kind}
        color={color}
        x={x - 130}
        y={y - 43}
        width={60}
        height={72}
        decorative
      />
      <text x={x - 48} y={y + 22}>
        {san}
      </text>
    </g>
  )
}

export function OperaSearchTree({
  index,
  showDepth = false,
  selectedBranch = 'mate',
  description,
  children,
}: {
  index: number
  showDepth?: boolean
  selectedBranch?: 'mate' | 'alternative'
  description: string
  children?: ReactNode
}) {
  const mateSelected = selectedBranch === 'mate'
  return (
    <svg
      className="chess-depth-tree"
      viewBox="0 0 848 860"
      role="img"
      aria-live="polite"
      aria-label={description}
    >
      {showDepth && (
        <g className="chess-depth-scale">
          <text x="0" y="40">
            derinlik
          </text>
          {[100, 295, 535, 775].map((y, depth) => (
            <g key={depth}>
              <text x="65" y={y + 22} className="chess-depth-count">
                {depth}
              </text>
              <path d={`M110 ${y} H155`} />
            </g>
          ))}
        </g>
      )}
      <circle cx="500" cy="100" r="10" className="chess-depth-root" />
      <path
        className={`chess-depth-branch${!mateSelected ? ' chess-depth-branch--selected' : ''}`}
        d="M500 112 L320 230"
      />
      <path
        className={`chess-depth-branch${mateSelected && index >= 1 ? ' chess-depth-branch--selected' : ''}`}
        d="M500 112 L680 230"
      />
      <Move san="Qb7" kind="queen" x={320} y={295} selected={!mateSelected} />
      <Move
        san="Qb8+"
        kind="queen"
        x={680}
        y={295}
        selected={mateSelected && index >= 1}
      />
      {index >= 2 && (
        <>
          <path
            className={`chess-depth-branch${mateSelected ? ' chess-depth-branch--selected' : ''}`}
            d="M680 350 V470"
          />
          <Move
            san="Nxb8"
            kind="knight"
            color="black"
            x={680}
            y={535}
            selected={mateSelected}
          />
        </>
      )}
      {index >= 3 && (
        <>
          <path
            className={`chess-depth-branch${mateSelected ? ' chess-depth-branch--selected' : ''}`}
            d="M680 590 V710"
          />
          <Move san="Rd8#" kind="rook" x={680} y={775} selected={mateSelected} />
        </>
      )}
      {children}
    </svg>
  )
}
