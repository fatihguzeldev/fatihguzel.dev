import { lessonLearned } from '../../model/learning/training'
import { ChessPiece } from '../../components/graphics/chess-board/piece'
import { PositionBoard } from '../../components/graphics/chess-board/position-board'
import { Score } from '../../components/stage/score'
import { Stage } from '../../components/stage/stage'
import './training.css'

export const title = 'Ağın eğitimi'

const targetScore = (value: number) => `${value >= 0 ? '+' : ''}${value.toFixed(2)}`

const learnedContribution = (value: number) =>
  `${value < 0 ? '−' : '+'}${Math.abs(value).toFixed(2)}`

export default function TeacherScene() {
  return (
    <Stage frameId="teacher" title="ağı eğitelim">
      <div
        className="chess-learned"
        role="group"
        aria-label="İki konumun hedeflerinden küçük hesabımızın katkıları öğreniliyor. Diğer katkılar sabit; a3 piyonu katkısı ile şah c3 ve piyon a3 ortak katkısı ayarlanıyor."
      >
        <div className="chess-learned-targets">
          <h2 className="chess-learned-heading">hedefler</h2>
          <div className="chess-learned-examples">
            {lessonLearned.examples.map((example) => (
              <div className="chess-learned-example" key={example.id}>
                <div className="chess-learned-board">
                  <PositionBoard
                    fen={example.fen}
                    turn={example.sideToMove}
                    highlights={['a3', example.jointActive ? 'c3' : 'e3']}
                  />
                </div>
                <Score value={targetScore(example.target)} />
              </div>
            ))}
          </div>
        </div>
        <svg className="chess-learned-arrow" viewBox="0 0 102 806" aria-hidden="true">
          <path d="M18 437 H84 M70 423 L84 437 L70 451" />
        </svg>
        <div className="chess-learned-records">
          <h2 className="chess-learned-heading">katkılar</h2>
          <div className="chess-learned-record-list">
            <div className="chess-learned-record">
              <div className="chess-learned-pieces">
                <div className="chess-learned-piece">
                  <ChessPiece
                    kind="pawn"
                    color="black"
                    width={64}
                    height={76.8}
                    decorative
                  />
                  <span>a3</span>
                </div>
              </div>
              <strong>{learnedContribution(lessonLearned.pawnContribution)}</strong>
            </div>
            <div className="chess-learned-record">
              <div className="chess-learned-pieces">
                <div className="chess-learned-piece">
                  <ChessPiece
                    kind="king"
                    color="white"
                    width={56}
                    height={67.2}
                    decorative
                  />
                  <span>c3</span>
                </div>
                <div className="chess-learned-piece">
                  <ChessPiece
                    kind="pawn"
                    color="black"
                    width={52}
                    height={62.4}
                    decorative
                  />
                  <span>a3</span>
                </div>
              </div>
              <strong>{learnedContribution(lessonLearned.jointContribution)}</strong>
            </div>
          </div>
        </div>
      </div>
    </Stage>
  )
}
