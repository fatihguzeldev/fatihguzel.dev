import assert from 'node:assert/strict'
import test from 'node:test'
import {
  arrowStartInset,
  piecePlacement,
  squareCenter,
  squarePosition,
} from './board-geometry'

test('the white viewpoint puts a1 at bottom left and h8 at top right', () => {
  assert.deepEqual(squarePosition('a1'), { x: 36, y: 708 })
  assert.deepEqual(squarePosition('h8'), { x: 708, y: 36 })
  assert.deepEqual(squareCenter('e4'), { x: 468, y: 468 })
})

test('out-of-board coordinates fail instead of silently misplacing a piece', () => {
  for (const square of ['a0', 'i1', 'a9', 'e4x', '', 'E4']) {
    assert.throws(() => squarePosition(square), /Geçersiz satranç karesi/)
  }
})

test('pieces share a baseline inside the square while pawns stay visibly smaller', () => {
  const cell = squarePosition('d4')
  const king = piecePlacement('d4', 'king')
  const pawn = piecePlacement('d4', 'pawn')
  for (const piece of [king, pawn]) {
    assert.equal(piece.x + piece.width / 2, cell.x + 48)
    assert.ok(Math.abs(piece.y + (111.6 * piece.width) / 100 - (cell.y + 84)) < 0.001)
    assert.ok(piece.y > cell.y)
    assert.ok(piece.width < 80)
  }
  assert.ok(pawn.width < king.width)
  assert.ok(pawn.y > king.y)
})

test('every board-arrow tail starts six units outside its source square', () => {
  const arrows = [
    { from: 'a3', to: 'a1', kind: 'pawn' },
    { from: 'd1', to: 'd8', kind: 'rook' },
    { from: 'd1', to: 'd7', kind: 'rook' },
    { from: 'g5', to: 'd8', kind: 'bishop' },
  ] as const
  for (const { from, to, kind } of arrows) {
    const start = squareCenter(from)
    const end = squareCenter(to)
    const length = Math.hypot(end.x - start.x, end.y - start.y)
    const inset = arrowStartInset(end.x - start.x, end.y - start.y)
    const tail = {
      x: start.x + ((end.x - start.x) / length) * inset,
      y: start.y + ((end.y - start.y) / length) * inset,
    }
    const cell = squarePosition(from)
    if (kind === 'pawn') {
      assert.equal(tail.y - (cell.y + 96), 6)
      assert.equal(tail.x, start.x)
    } else if (kind === 'rook') {
      assert.equal(cell.y - tail.y, 6)
      assert.equal(tail.x, start.x)
    } else {
      assert.ok(Math.abs(cell.x - tail.x - 6) < 1e-10)
      assert.ok(Math.abs(cell.y - tail.y - 6) < 1e-10)
    }
  }
})

test('an adjacent-square arrow retains a shaft before its unchanged head', () => {
  const start = squareCenter('a3')
  const end = squareCenter('a2')
  const length = Math.hypot(end.x - start.x, end.y - start.y)
  assert.equal(length - 30 - arrowStartInset(end.x - start.x, end.y - start.y), 12)
})
