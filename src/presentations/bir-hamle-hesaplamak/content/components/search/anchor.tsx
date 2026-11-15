import { operaPosition } from '../../data/search/opera'
import { OperaBoard } from './opera-board'
import { Score } from '../stage/score'
import './anchor.css'

export function AnchorScene({ returning = false }: { returning?: boolean }) {
  return (
    <div className="chess-position-layout">
      <div className="chess-position-copy">
        {returning ? (
          <dl className="chess-search-return">
            <div>
              <dt>NNUE değerlendirmesi</dt>
              <dd>+1.93</dd>
            </div>
            <div>
              <dt>arama sonucu</dt>
              <dd>#2</dd>
            </div>
          </dl>
        ) : (
          <>
            <span className="chess-context">ağın tahmini</span>
            <Score
              value={`+${operaPosition.analysis.staticEvaluation.nnue.toFixed(2)}`}
            />
            <p className="chess-position-credit">
              Paul Morphy
              <br />
              Brunswick Dükü II. Karl ve Kont Isouard’a karşı
              <br />
              Paris, 1858
            </p>
          </>
        )}
      </div>
      <div className="chess-main-board">
        <OperaBoard />
      </div>
    </div>
  )
}
