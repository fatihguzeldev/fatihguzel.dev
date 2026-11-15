import { lessonUpdate } from '../../data/learning/play'
import { lessonLearned } from '../../model/learning/training'
import { ChessPiece } from '../../components/graphics/chess-board/piece'
import { PositionBoard } from '../../components/graphics/chess-board/position-board'
import { Stage } from '../../components/stage/stage'
import './inference.css'

export const title = 'NNUE’nin hızlı güncellemesi'

const contribution = (value: number) =>
  `${value < 0 ? '−' : '+'}${Math.abs(value).toFixed(2)}`

export default function ReuseEvaluationScene() {
  return (
    <Stage frameId="nnue-update" title="aynı hesabı kullanalım">
      <div
        className="chess-reuse"
        role="group"
        aria-label="Beyaz piyon d4'ten d5'e gidiyor. Eğitilmiş ağırlıklar sabit kalıyor. a3 piyonu ve c3 şahıyla ilgili küçük hesabımızın iki katkısı aynı; değişen girdilerin ara hesaba katkıları güncelleniyor."
      >
        <div className="chess-reuse-positions">
          {lessonUpdate.map((position, index) => (
            <figure className="chess-reuse-position" key={position.fen}>
              <figcaption>{index === 0 ? 'önce' : 'sonra'}</figcaption>
              <div className="chess-reuse-board">
                <PositionBoard
                  fen={position.fen}
                  turn={position.sideToMove}
                  highlights={[position.changedSquare]}
                />
              </div>
              <div className="chess-reuse-pawn">
                <ChessPiece
                  kind="pawn"
                  color="white"
                  width={64}
                  height={76.8}
                  decorative
                />
                <span>{index === 0 ? 'd4' : 'd5+'}</span>
              </div>
            </figure>
          ))}
          <svg className="chess-reuse-arrow" viewBox="0 0 102 806" aria-hidden="true">
            <path d="M18 403 H84 M70 389 L84 403 L70 417" />
          </svg>
        </div>
        <div className="chess-reuse-weights">
          <h2>aynı ağırlıklar</h2>
          <div className="chess-reuse-records">
            <div className="chess-reuse-record">
              <div className="chess-reuse-features">
                <ChessPiece
                  kind="pawn"
                  color="black"
                  width={64}
                  height={76.8}
                  decorative
                />
                <span>a3</span>
              </div>
              <strong>{contribution(lessonLearned.pawnContribution)}</strong>
            </div>
            <div className="chess-reuse-record">
              <div className="chess-reuse-features">
                <ChessPiece
                  kind="king"
                  color="white"
                  width={56}
                  height={67.2}
                  decorative
                />
                <span>c3</span>
                <ChessPiece
                  kind="pawn"
                  color="black"
                  width={52}
                  height={62.4}
                  decorative
                />
                <span>a3</span>
              </div>
              <strong>{contribution(lessonLearned.jointContribution)}</strong>
            </div>
          </div>
        </div>
      </div>
    </Stage>
  )
}
