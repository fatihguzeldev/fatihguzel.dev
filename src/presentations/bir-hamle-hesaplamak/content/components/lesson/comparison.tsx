import { geometryExamples, introExamples } from '../../data/learning/positions'
import { PositionBoard } from '../graphics/chess-board/position-board'
import { Score } from '../stage/score'
import './comparison.css'

export function ComparisonScene({ placement = false }: { placement?: boolean }) {
  const examples = placement ? geometryExamples : introExamples
  return (
    <div className="chess-comparison">
      {examples.map((p) => (
        <div className="chess-comparison-position" key={p.id}>
          <div className="chess-comparison-board">
            <PositionBoard
              fen={p.fen}
              turn={p.sideToMove}
              highlights={placement ? [p.id === 'geometry-a3' ? 'a3' : 'a4'] : []}
            />
          </div>
          <Score value={p.score} />
        </div>
      ))}
    </div>
  )
}
