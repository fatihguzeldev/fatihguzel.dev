export type PieceKind = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn'
export type PieceColor = 'white' | 'black'

export type BoardPiece = {
  square: string
  kind: PieceKind
  color: PieceColor
}
