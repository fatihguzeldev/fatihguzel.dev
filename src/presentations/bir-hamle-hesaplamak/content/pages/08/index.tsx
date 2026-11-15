import { geometryExamples } from '../../data/learning/positions'
import { lessonFit, lessonTarget } from '../../model/learning/training'
import { PositionBoard } from '../../components/graphics/chess-board/position-board'
import { Score } from '../../components/stage/score'
import { Stage } from '../../components/stage/stage'
import '../../components/lesson/position-layout.css'
import './target.css'

export const title = 'Hedef: Stockfish’in değerlendirmesi'

const format = (value: number, digits = 2) => value.toFixed(digits).replace('-', '−')

const score = (value: number) => `${value >= 0 ? '+' : ''}${value.toFixed(2)}`

const a3 = geometryExamples[1]

export default function TargetScene() {
  return (
    <Stage frameId="training-target">
      <div className="chess-lesson-target-layout">
        <div className="chess-lesson-board">
          <PositionBoard fen={a3.fen} highlights={['a3']} />
        </div>
        <div className="chess-lesson-target-values">
          <div>
            <span>bizim hesap</span>
            <strong>{score(lessonFit.prediction)}</strong>
          </div>
          <div>
            <span>Stockfish 19</span>
            <Score value={score(lessonTarget)} />
          </div>
          <p className="chess-lesson-difference">
            hata <strong>+{format(lessonFit.error)}</strong>
          </p>
        </div>
      </div>
    </Stage>
  )
}
