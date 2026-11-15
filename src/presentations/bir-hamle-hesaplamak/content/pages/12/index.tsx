import { kingContextExample } from '../../data/learning/context'
import { geometryExamples } from '../../data/learning/positions'
import { lessonJoint } from '../../model/learning/training'
import { ChessPiece } from '../../components/graphics/chess-board/piece'
import { PositionBoard } from '../../components/graphics/chess-board/position-board'
import { Stage } from '../../components/stage/stage'
import './network.css'

export const title = 'Özelliklerin birlikte etkisi'

const signed = (value: number) =>
  value === 0 ? '0' : `${value > 0 ? '+' : '−'}${Math.abs(value).toFixed(2)}`

export default function NetworkScene() {
  const cases = [
    { position: geometryExamples[1], kingSquare: 'e3', calculation: lessonJoint.a3 },
    {
      position: kingContextExample,
      kingSquare: 'c3',
      calculation: lessonJoint.nearbyKing,
    },
  ] as const

  return (
    <Stage frameId="nnue-network" title="şahı da hesaba katalım">
      <div className="chess-interaction">
        <div className="chess-interaction-cases">
          {cases.map(({ position, kingSquare, calculation }) => (
            <div className="chess-interaction-case" key={position.id}>
              <div className="chess-interaction-board">
                <PositionBoard fen={position.fen} highlights={['a3', kingSquare]} />
              </div>
              <svg
                className={`chess-interaction-calculation ${calculation.contribution ? 'chess-interaction-calculation--active' : ''}`}
                viewBox="0 0 780 280"
                role="img"
                aria-label={`Örnek hesabımız: beyaz şah ${kingSquare} ve siyah piyon a3 bilgileri birlikte kullanılıyor. Önceki toplam ${signed(calculation.basePrediction)}, ortak katkı ${signed(calculation.contribution)}, sonuç ${signed(calculation.prediction)}. Katkı bu iki örneğe göre elle seçildi.`}
              >
                <ChessPiece
                  kind="king"
                  color="white"
                  x={263}
                  y={0}
                  width={52}
                  height={62.4}
                  decorative
                />
                <text x="329" y="45" className="chess-interaction-square">
                  {kingSquare}
                </text>
                <ChessPiece
                  kind="pawn"
                  color="black"
                  x={439}
                  y={8}
                  width={44}
                  height={52.8}
                  decorative
                />
                <text x="497" y="45" className="chess-interaction-square">
                  a3
                </text>
                <path
                  className="chess-interaction-connection"
                  d="M316 72 V90 Q316 112 338 112 H442 Q464 112 464 90 V72 M390 112 V142"
                />
                <text x="390" y="178" className="chess-interaction-label">
                  birlikte katkı
                </text>
                <text x="194" y="250" className="chess-interaction-base">
                  {signed(calculation.basePrediction)}
                </text>
                <text x="240" y="250" className="chess-interaction-operator">
                  +
                </text>
                <text x="390" y="250" className="chess-interaction-contribution">
                  {calculation.contribution === 0
                    ? '0'
                    : calculation.contribution.toFixed(2)}
                </text>
                <text x="540" y="250" className="chess-interaction-operator">
                  =
                </text>
                <text
                  x="774"
                  y="250"
                  className={`chess-interaction-result ${calculation.prediction > 0 ? 'chess-interaction-result--positive' : ''}`}
                >
                  {signed(calculation.prediction)}
                </text>
              </svg>
            </div>
          ))}
        </div>
      </div>
    </Stage>
  )
}
