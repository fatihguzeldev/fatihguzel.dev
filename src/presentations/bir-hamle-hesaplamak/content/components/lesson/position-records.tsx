import { geometryExamples } from '../../data/learning/positions'
import {
  lessonFeatures,
  lessonFit,
  lessonInputs,
  lessonWeightIndex,
} from '../../model/learning/training'
import { ChessPiece } from '../graphics/chess-board/piece'
import { PositionBoard } from '../graphics/chess-board/position-board'
import './position-layout.css'
import './position-records.css'

const format = (value: number, digits = 2) => value.toFixed(digits).replace('-', '−')

const score = (value: number) => `${value >= 0 ? '+' : ''}${value.toFixed(2)}`

const a3 = geometryExamples[1]

export function PositionRecordsScene({ fitted = false }: { fitted?: boolean }) {
  return (
    <div className="chess-lesson-records-layout">
      <div className="chess-lesson-board">
        <PositionBoard fen={a3.fen} highlights={['a3']} />
      </div>
      <div
        className={`chess-lesson-records ${fitted ? 'chess-lesson-records--fitted' : ''}`}
      >
        {lessonFeatures.map((feature, index) =>
          lessonInputs.a3[index] === 1 ? (
            <div
              className={`chess-lesson-record ${index === lessonWeightIndex ? 'chess-lesson-record--selected' : ''}`}
              key={`${feature.color}-${feature.kind}-${feature.square}`}
            >
              <ChessPiece
                kind={feature.kind}
                color={feature.color}
                width={64}
                height={76.8}
              />
              <span>{feature.square}</span>
              <span className="chess-lesson-record-arrow" aria-hidden="true">
                →
              </span>
              {fitted && index === lessonWeightIndex ? (
                <strong className="chess-lesson-record-change">
                  {format(lessonFit.contribution)}
                </strong>
              ) : (
                <strong>
                  {feature.initialWeight > 0 ? '+' : ''}
                  {format(feature.initialWeight, 0)}
                </strong>
              )}
            </div>
          ) : null,
        )}
        <div className="chess-lesson-record-sum">
          {!fitted && <span>bizim hesap</span>}
          <strong>
            {score(fitted ? lessonFit.nextPrediction : lessonFit.prediction).replace(
              '-',
              '−',
            )}
          </strong>
        </div>
      </div>
    </div>
  )
}
