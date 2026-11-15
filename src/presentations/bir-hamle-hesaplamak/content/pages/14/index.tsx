import { geometryExamples } from '../../data/learning/positions'
import { PositionBoard } from '../../components/graphics/chess-board/position-board'
import { Score } from '../../components/stage/score'
import { Stage } from '../../components/stage/stage'
import './source.css'

export const title = 'Hedefleri üreten değerlendirme'

export default function TeacherSourceScene() {
  const position = geometryExamples[1]
  return (
    <Stage frameId="teacher-source" title="hedeflerin kaynağı">
      <div className="chess-source">
        <div className="chess-source-position">
          <div className="chess-source-board">
            <PositionBoard
              fen={position.fen}
              turn={position.sideToMove}
              highlights={['a3', 'e3']}
            />
          </div>
          <div className="chess-source-evaluation">
            <span>Stockfish 19</span>
            <Score value={position.score} />
          </div>
        </div>
        <div className="chess-source-copy">
          <p>
            bizim öğretmenimiz <strong>Stockfish</strong>
          </p>
          <p>
            peki ya <strong>Stockfish</strong>’in öğretmeni?
          </p>
        </div>
      </div>
    </Stage>
  )
}
