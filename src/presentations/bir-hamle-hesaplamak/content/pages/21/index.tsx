'use client'

import { operaPosition, searchRuns } from '../../data/search/opera'
import { ChessPiece } from '../../components/graphics/chess-board/piece'
import { PositionBoard } from '../../components/graphics/chess-board/position-board'
import { Score } from '../../components/stage/score'
import { useSceneReveal } from '../../components/reveal/use-scene-reveal'
import { Stage } from '../../components/stage/stage'
import './comparison.css'

export const title = 'Aynı ağ, farklı arama'

const runs = searchRuns.slice(0, 2)

export default function SearchComparisonScene() {
  const { step, root, advance } = useSceneReveal(2)
  const activeMove = runs[step].variations[0]

  return (
    <Stage frameId="frontier">
      <div className="chess-search-comparison" ref={root} data-reveal-step={step}>
        <button
          className="chess-search-comparison-board"
          type="button"
          aria-label="Sonraki aramayı göster"
          disabled={step === 1}
          onClick={advance}
        >
          <PositionBoard
            fen={operaPosition.fen}
            turn="white"
            highlights={['b3', activeMove.uci.slice(2, 4)]}
            arrows={[
              {
                from: 'b3',
                to: activeMove.uci.slice(2, 4),
                label: `Bu aramada seçilen hamle: ${activeMove.san}`,
              },
            ]}
          />
        </button>
        <div className="chess-search-comparison-record" aria-live="polite">
          <div className="chess-search-comparison-choice">
            <ChessPiece
              kind="queen"
              color="white"
              width={142}
              height={170.4}
              decorative
            />
            <p className="chess-search-comparison-move">{activeMove.san}</p>
            <Score value={activeMove.score} />
          </div>
        </div>
      </div>
    </Stage>
  )
}
