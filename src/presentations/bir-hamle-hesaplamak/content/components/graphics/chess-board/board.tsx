import type { BoardPiece, PieceColor } from '../../../model/chess/types'
import {
  BOARD_ORIGIN,
  BOARD_SIZE,
  arrowStartInset,
  SQUARE_SIZE,
  piecePlacement,
  squareCenter,
  squarePosition,
} from './board-geometry'
import { ChessPiece, pieceNames } from './piece'

export type BoardArrow = { from: string; to: string; color?: string; label?: string }
export type BoardHighlight = { square: string; color?: string }

export function ChessBoard({
  pieces,
  className = '',
  arrows = [],
  highlights = [],
  sideToMove,
}: {
  pieces: readonly BoardPiece[]
  className?: string
  arrows?: readonly BoardArrow[]
  highlights?: readonly BoardHighlight[]
  sideToMove?: PieceColor
}) {
  const description = pieces
    .map(
      (piece) =>
        `${piece.color === 'white' ? 'beyaz' : 'siyah'} ${pieceNames[piece.kind]} ${piece.square}`,
    )
    .join(', ')
  const arrowDescription = arrows
    .map(({ from, to, label }) => label ?? `${from} karesinden ${to} karesine ok`)
    .join('; ')

  return (
    <svg
      className={`chess-board ${className}`}
      viewBox="0 0 840 840"
      role="img"
      aria-label={`Satranç konumu${sideToMove ? `; sıra ${sideToMove === 'white' ? 'beyazda' : 'siyahta'}` : ''}: ${description}${arrowDescription ? `. ${arrowDescription}` : ''}`}
    >
      <rect
        className="chess-board-edge"
        x="31"
        y="31"
        width="778"
        height="778"
        rx="5"
      />
      {Array.from({ length: 64 }, (_, index) => {
        const file = index % 8
        const row = Math.floor(index / 8)
        return (
          <rect
            key={index}
            className={
              (row + file) % 2 === 0 ? 'chess-square-light' : 'chess-square-dark'
            }
            x={BOARD_ORIGIN + file * SQUARE_SIZE}
            y={BOARD_ORIGIN + row * SQUARE_SIZE}
            width={SQUARE_SIZE}
            height={SQUARE_SIZE}
          />
        )
      })}
      {highlights.map(({ square, color }) => {
        const { x, y } = squarePosition(square)
        return (
          <g key={square}>
            <rect
              className="chess-board-highlight-edge"
              x={x + 6}
              y={y + 6}
              width={SQUARE_SIZE - 12}
              height={SQUARE_SIZE - 12}
              rx="3"
            />
            <rect
              className="chess-board-highlight"
              x={x + 6}
              y={y + 6}
              width={SQUARE_SIZE - 12}
              height={SQUARE_SIZE - 12}
              rx="3"
              style={color ? { stroke: color } : undefined}
            />
          </g>
        )
      })}
      {pieces.map((piece) => {
        const placement = piecePlacement(piece.square, piece.kind)
        return (
          <ChessPiece
            key={piece.square}
            kind={piece.kind}
            color={piece.color}
            {...placement}
            decorative
          />
        )
      })}
      {arrows.map(({ from, to, color }) => {
        const start = squareCenter(from)
        const end = squareCenter(to)
        const length = Math.hypot(end.x - start.x, end.y - start.y)
        if (length === 0) return null
        const startInset = arrowStartInset(end.x - start.x, end.y - start.y)
        const angle = (Math.atan2(end.y - start.y, end.x - start.x) * 180) / Math.PI
        return (
          <g
            key={`${from}-${to}`}
            className="chess-board-arrow"
            transform={`translate(${start.x} ${start.y}) rotate(${angle})`}
            style={color ? { fill: color } : undefined}
          >
            <path
              d={`M${startInset} -7 H${length - 30} V-19 L${length - 4} 0 L${length - 30} 19 V7 H${startInset} Z`}
            />
          </g>
        )
      })}
      {Array.from({ length: 8 }, (_, index) => (
        <g key={index} className="chess-board-coordinate">
          <text
            x={BOARD_ORIGIN + index * SQUARE_SIZE + SQUARE_SIZE / 2}
            y={BOARD_ORIGIN + BOARD_SIZE + 27}
          >
            {String.fromCharCode(97 + index)}
          </text>
          <text x="16" y={BOARD_ORIGIN + index * SQUARE_SIZE + SQUARE_SIZE / 2 + 7}>
            {8 - index}
          </text>
        </g>
      ))}
      {sideToMove && (
        <circle
          className={`chess-board-turn chess-board-turn--${sideToMove}`}
          cx="824"
          cy="18"
          r="8"
          aria-hidden="true"
        />
      )}
    </svg>
  )
}
