import { geometryExamples } from '../../data/learning/positions'
import { PositionBoard } from '../../components/graphics/chess-board/position-board'
import { Stage } from '../../components/stage/stage'
import './pawn-threat.css'

export const title = 'bu piyona −1 yetiyor mu?'

const a3 = geometryExamples[1]

export default function PawnThreatScene() {
  return (
    <Stage frameId="pawn-threat" title="bu piyona −1 yetiyor mu?">
      <figure className="chess-lesson-threat-layout">
        <div className="chess-lesson-threat-board">
          <PositionBoard
            fen={a3.fen}
            highlights={['a3', 'e3']}
            arrows={[
              { from: 'a3', to: 'a1', label: 'a3 piyonunun a1 karesine terfi yolu' },
            ]}
          />
        </div>
        <figcaption>terfi tehdidi</figcaption>
      </figure>
    </Stage>
  )
}
