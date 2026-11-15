import assert from 'node:assert/strict'
import test from 'node:test'
import { piecesFromFen } from './position'

test('FEN placement preserves square, color and kind in the Opera position', () => {
  const pieces = piecesFromFen(
    '4kb1r/p2n1ppp/4q3/4p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 0 16',
  )
  assert.equal(pieces.length, 21)
  assert.deepEqual(
    pieces.find((piece) => piece.square === 'b3'),
    {
      square: 'b3',
      kind: 'queen',
      color: 'white',
    },
  )
  assert.deepEqual(
    pieces.find((piece) => piece.square === 'e8'),
    {
      square: 'e8',
      kind: 'king',
      color: 'black',
    },
  )
  assert.equal(
    pieces.some((piece) => piece.square === 'a8'),
    false,
  )
})

test('malformed FEN cannot silently shift the board drawing', () => {
  for (const fen of ['8/8', '9/8/8/8/8/8/8/8', '7/8/8/8/8/8/8/8']) {
    assert.throws(() => piecesFromFen(fen))
  }
})
