import { operaPosition } from '../../data/search/opera'
import { piecesFromFen } from '../../model/chess/position'
import { ChessBoard, type BoardArrow } from '../graphics/chess-board/board'

export function OperaBoard({
  index = 0,
  highlights = [],
  arrows = [],
}: {
  index?: number
  highlights?: readonly string[]
  arrows?: readonly BoardArrow[]
}) {
  const p = operaPosition.line[index]
  return (
    <ChessBoard
      pieces={piecesFromFen(p.fen)}
      sideToMove={p.checkmate ? undefined : p.sideToMove}
      highlights={highlights.map((square) => ({ square }))}
      arrows={arrows}
    />
  )
}
