import type { PieceKind } from '../../../model/chess/types'

export const BOARD_ORIGIN = 36
export const SQUARE_SIZE = 96
export const BOARD_SIZE = SQUARE_SIZE * 8

export function arrowStartInset(dx: number, dy: number) {
  return (
    ((SQUARE_SIZE / 2 + 6) * Math.hypot(dx, dy)) / Math.max(Math.abs(dx), Math.abs(dy))
  )
}

export function squarePosition(square: string) {
  if (!/^[a-h][1-8]$/.test(square)) {
    throw new Error(`Geçersiz satranç karesi: ${square}`)
  }

  return {
    x: BOARD_ORIGIN + (square.charCodeAt(0) - 97) * SQUARE_SIZE,
    y: BOARD_ORIGIN + (8 - Number(square[1])) * SQUARE_SIZE,
  }
}

export function squareCenter(square: string) {
  const { x, y } = squarePosition(square)
  return { x: x + SQUARE_SIZE / 2, y: y + SQUARE_SIZE / 2 }
}

export function piecePlacement(square: string, kind: PieceKind) {
  const { x, y } = squarePosition(square)
  const width = kind === 'pawn' ? 62 : 70
  // The common base reaches y=110; its 3.2 stroke sits 12 units above the square edge.
  return {
    x: x + (SQUARE_SIZE - width) / 2,
    y: y + 84 - (111.6 * width) / 100,
    width,
    height: width * 1.2,
  }
}
