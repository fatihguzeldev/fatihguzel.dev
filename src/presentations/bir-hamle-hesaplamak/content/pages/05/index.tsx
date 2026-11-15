import { introExamples } from '../../data/learning/positions'
import { ChessPiece } from '../../components/graphics/chess-board/piece'
import { PositionBoard } from '../../components/graphics/chess-board/position-board'
import { Stage } from '../../components/stage/stage'
import './first-rule.css'

export const title = 'konuma değer biçelim'

export default function FirstRuleScene() {
  const p = introExamples[0]
  return (
    <Stage frameId="first-rule" title="konuma değer biçelim">
      <div className="chess-position-layout">
        <div
          className="chess-pawn-count"
          role="img"
          aria-label="Beyazın iki piyonu, siyahın bir piyonu var"
        >
          <div>
            <ChessPiece kind="pawn" color="white" decorative />
            <ChessPiece kind="pawn" color="white" decorative />
          </div>
          <div>
            <ChessPiece kind="pawn" color="black" decorative />
          </div>
        </div>
        <div className="chess-main-board">
          <PositionBoard fen={p.fen} highlights={['d4', 'e4', 'a4']} />
        </div>
      </div>
    </Stage>
  )
}
