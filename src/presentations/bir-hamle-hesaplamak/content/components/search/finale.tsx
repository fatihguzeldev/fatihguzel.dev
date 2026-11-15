'use client'

import { operaPosition, searchRuns } from '../../data/search/opera'
import { ChessPiece } from '../graphics/chess-board/piece'
import { type PieceColor, type PieceKind } from '../../model/chess/types'
import { OperaBoard } from './opera-board'
import { useSceneReveal } from '../reveal/use-scene-reveal'
import './finale.css'

type Phase = 'candidates' | 'reply' | 'terminal'

const recordedSearch = searchRuns[1]

const selectedMove = recordedSearch.variations[0]

const candidates = [recordedSearch.variations[1], selectedMove]

function Move({
  san,
  kind,
  color = 'white',
  active = false,
}: {
  san: string
  kind: PieceKind
  color?: PieceColor
  active?: boolean
}) {
  return (
    <div
      className={`chess-finale-move-row${active ? ' chess-finale-move-row--active' : ''}`}
    >
      <ChessPiece kind={kind} color={color} width={88} height={105.6} decorative />
      <p>{san}</p>
    </div>
  )
}

export function FinaleScene({ phase }: { phase: Phase }) {
  const { step, root, advance } = useSceneReveal(2, phase === 'terminal')
  const index = phase === 'reply' ? 1 : phase === 'terminal' ? 2 + step : 0
  const position = operaPosition.line[index]
  const mat = position.check && position.legalMoveCount === 0
  const move = position.playedUci
  const highlights = mat
    ? ['d8', 'e8']
    : move
      ? [move.slice(0, 2), move.slice(2, 4)]
      : ['b3']
  const path = operaPosition.line.slice(1, phase === 'reply' ? 3 : 4)
  const board = <OperaBoard index={index} highlights={highlights} />

  return (
    <div
      className="chess-position-layout chess-finale"
      ref={root}
      data-finale-phase={phase}
      data-reveal-step={step}
    >
      <div className="chess-position-copy">
        {phase === 'candidates' && (
          <ul
            className="chess-finale-candidates"
            aria-label="Başlangıç konumundaki yasal hamlelerden iki örnek"
          >
            {candidates.map((candidate) => (
              <li key={candidate.uci}>
                <Move
                  san={candidate.san}
                  kind="queen"
                  active={candidate.uci === selectedMove.uci}
                />
              </li>
            ))}
          </ul>
        )}
        {(phase === 'reply' || phase === 'terminal') && (
          <div
            className={`chess-finale-proof${phase === 'terminal' ? ' chess-finale-proof--compact' : ''}`}
          >
            <ol className="chess-finale-line" aria-label="İncelenen devam">
              {path.map((entry, i) => (
                <li key={entry.playedUci}>
                  <Move
                    san={entry.playedSan!}
                    kind={i === 0 ? 'queen' : i === 1 ? 'knight' : 'rook'}
                    color={i === 1 ? 'black' : 'white'}
                    active={i === path.length - 1}
                  />
                </li>
              ))}
            </ol>
            {phase === 'terminal' && (
              <div className="chess-finale-outcome" aria-live="polite">
                {mat && <p>1–0</p>}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="chess-main-board">
        {phase === 'terminal' ? (
          <button
            className="chess-finale-board"
            type="button"
            aria-label="Rd8 hamlesini uygula"
            disabled={mat}
            onClick={advance}
          >
            {board}
          </button>
        ) : (
          board
        )}
      </div>
    </div>
  )
}
