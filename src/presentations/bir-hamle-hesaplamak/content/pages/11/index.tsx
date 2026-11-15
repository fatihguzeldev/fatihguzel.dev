import { kingContextExample } from '../../data/learning/context'
import { geometryExamples } from '../../data/learning/positions'
import { lessonPredictions } from '../../model/learning/training'
import { PositionBoard } from '../../components/graphics/chess-board/position-board'
import { Score } from '../../components/stage/score'
import { Stage } from '../../components/stage/stage'
import './king-context.css'

export const title = 'şah c3’te olsaydı?'

const format = (value: number, digits = 2) => value.toFixed(digits).replace('-', '−')

const a3 = geometryExamples[1]

export default function KingContextScene() {
  return (
    <Stage frameId="king-context" title="şah c3’te olsaydı?">
      <div className="chess-lesson-context">
        {[a3, kingContextExample].map((position, index) => (
          <div className="chess-lesson-context-position" key={position.id}>
            <div className="chess-lesson-context-board">
              <PositionBoard
                fen={position.fen}
                highlights={[index === 0 ? 'e3' : 'c3']}
              />
            </div>
            <div className="chess-lesson-context-value">
              <span>bizim hesap</span>
              <strong>
                {format(
                  index === 0
                    ? lessonPredictions.a3After
                    : lessonPredictions.nearbyAfter,
                )}
              </strong>
            </div>
            <div className="chess-lesson-context-value">
              <span>Stockfish 19</span>
              <Score value={position.score} />
            </div>
          </div>
        ))}
      </div>
    </Stage>
  )
}
