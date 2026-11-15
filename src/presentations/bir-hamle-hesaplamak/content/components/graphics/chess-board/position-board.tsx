import { piecesFromFen } from '../../../model/chess/position'
import type { PieceColor } from '../../../model/chess/types'
import { ChessBoard, type BoardArrow } from './board'

export function PositionBoard({
  fen,
  turn = 'white',
  highlights = [],
  arrows = [],
}: {
  fen: string
  turn?: PieceColor
  highlights?: readonly string[]
  arrows?: readonly BoardArrow[]
}) {
  return (
    <ChessBoard
      pieces={piecesFromFen(fen)}
      sideToMove={turn}
      highlights={highlights.map((square) => ({ square }))}
      arrows={arrows}
    />
  )
}
