import type { BoardPiece, PieceKind } from './types'

const kinds: Record<string, PieceKind> = {
  k: 'king',
  q: 'queen',
  r: 'rook',
  b: 'bishop',
  n: 'knight',
  p: 'pawn',
}

/** Read the placement field; move legality belongs to the verified research data. */
export function piecesFromFen(fen: string): BoardPiece[] {
  const ranks = fen.split(' ')[0].split('/')
  if (ranks.length !== 8) throw new Error('FEN must have eight ranks')

  return ranks.flatMap((rank, row) => {
    let file = 0
    const pieces: BoardPiece[] = []
    for (const symbol of rank) {
      if (/^[1-8]$/.test(symbol)) {
        file += Number(symbol)
      } else {
        const kind = kinds[symbol.toLowerCase()]
        if (!kind || file > 7) throw new Error('Invalid FEN placement')
        pieces.push({
          square: `${String.fromCharCode(97 + file)}${8 - row}`,
          kind,
          color: symbol === symbol.toUpperCase() ? 'white' : 'black',
        })
        file += 1
      }
    }
    if (file !== 8) throw new Error('FEN rank must contain eight squares')
    return pieces
  })
}
