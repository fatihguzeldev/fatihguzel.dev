'use client'

import { minimaxPosition } from '../../data/search/minimax'
import { minimaxReveals, pruningReveals } from './minimax-reveal'
import { ChessPiece } from '../graphics/chess-board/piece'
import { type PieceKind } from '../../model/chess/types'
import { PositionBoard } from '../graphics/chess-board/position-board'
import { useSceneReveal } from '../reveal/use-scene-reveal'
import './minimax.css'

type Mode = 'explore' | 'bound' | 'cut'

const signed = (value: number) =>
  `${value < 0 ? '−' : '+'}${Math.abs(value).toFixed(2)}`

const replyReveal = [
  [6, 5],
  [3, 2],
]

function MoveLabel({
  san,
  color,
  x,
  y,
}: {
  san: string
  color: 'white' | 'black'
  x: number
  y: number
}) {
  const kind: PieceKind = san.startsWith('K') ? 'king' : 'pawn'
  return (
    <g className="chess-decision-move">
      <ChessPiece
        kind={kind}
        color={color}
        x={x - 100}
        y={y - 55}
        width={48}
        height={57.6}
        decorative
      />
      <text x={x - 32} y={y}>
        {san}
      </text>
    </g>
  )
}

function DecisionTree({ step, mode }: { step: number; mode: Mode }) {
  const bounded = mode !== 'explore'
  const comparing = mode === 'cut' || (mode === 'bound' && step === 2)
  const summary = (mode === 'explore' && step === 7) || comparing
  const active = bounded
    ? pruningReveals[mode === 'cut' ? 2 : step]
    : minimaxReveals[step]
  const rootValue = bounded
    ? minimaxPosition.branches[0].treeValue
    : minimaxPosition.treeValue
  const isReplyVisible = (branchIndex: number, replyIndex: number) =>
    bounded
      ? branchIndex === 0 || step >= 1 || mode === 'cut'
      : step >= replyReveal[branchIndex][replyIndex]
  const descriptions = minimaxPosition.branches.flatMap((branch, branchIndex) =>
    branch.replies.flatMap((reply, replyIndex) => {
      if (!isReplyVisible(branchIndex, replyIndex)) return []
      return [
        bounded && branchIndex === 1 && replyIndex === 1
          ? `${branch.white.san}, ${reply.san}: incelenmedi`
          : `${branch.white.san}, ${reply.san}: ${signed(reply.score)}`,
      ]
    }),
  )

  return (
    <svg
      className="chess-decision-tree"
      viewBox="0 0 930 900"
      role="img"
      aria-label={
        bounded
          ? `Kb3 incelendi: ${signed(rootValue)}. ${step >= 1 || mode === 'cut' ? `Kc4 sonrası siyah a2 ile ${signed(minimaxPosition.branches[1].replies[0].score)} sonucuna gidebilir. Kf6 henüz incelenmedi.` : 'Kc4 henüz incelenmedi.'} ${comparing ? 'Kalan Kf6 cevabını incelemek Kb3 seçimini değiştiremez.' : ''}`
          : `Beyazın Kb3 ve Kc4 seçenekleri; ${summary ? `bu devamların hesabında tercih Kb3, ${signed(minimaxPosition.treeValue)}` : 'cevaplar sırayla inceleniyor'}. ${descriptions.join('. ')}`
      }
    >
      {(summary || bounded) && (
        <g className="chess-decision-root">
          <path d="M465 155 L245 262 M465 155 L685 262" />
          {summary && (
            <text x="465" y="120">
              {signed(rootValue)}
            </text>
          )}
        </g>
      )}
      {minimaxPosition.branches.map((branch, branchIndex) => {
        const x = branchIndex === 0 ? 245 : 685
        const evaluated = bounded
          ? branchIndex === 0 || comparing
          : step >= (branchIndex === 0 ? 6 : 3)
        const branchValue =
          bounded && branchIndex === 1 ? branch.replies[0].score : branch.treeValue
        const selected =
          active.branch === branchIndex ||
          ((summary || (bounded && step === 0)) && branchIndex === 0)
        return (
          <g
            className={`chess-decision-branch${selected ? ' chess-decision-branch--selected' : ''}`}
            key={branch.id}
          >
            <MoveLabel san={branch.white.san} color="white" x={x} y={320} />
            {evaluated && (
              <text
                x={x}
                y="420"
                className={`chess-decision-value${branchValue < 0 ? ' chess-decision-value--negative' : ''}`}
              >
                {bounded && branchIndex === 1 ? '≤ ' : ''}
                {signed(branchValue)}
              </text>
            )}
            {branch.replies.map((reply, replyIndex) => {
              const unknown = bounded && branchIndex === 1 && replyIndex === 1
              const visible = isReplyVisible(branchIndex, replyIndex)
              if (!visible) return null
              const leafX = x + (replyIndex === 0 ? -115 : 115)
              const chosen = replyIndex === 0 && evaluated
              const current =
                active.branch === branchIndex && active.reply === replyIndex
              return (
                <g
                  className={`chess-decision-reply${chosen ? ' chess-decision-reply--chosen' : ''}${current ? ' chess-decision-reply--current' : ''}${unknown ? ' chess-decision-reply--unknown' : ''}`}
                  key={reply.uci}
                >
                  <path d={`M${x} 455 L${leafX} 585`} />
                  <MoveLabel san={reply.san} color="black" x={leafX + 20} y={660} />
                  <text
                    className={`chess-decision-leaf-value${reply.score < 0 && !unknown ? ' chess-decision-value--negative' : ''}`}
                    x={leafX}
                    y="760"
                  >
                    {unknown ? '?' : signed(reply.score)}
                  </text>
                  {mode === 'cut' && unknown && (
                    <path
                      className="chess-decision-cut"
                      d={`M${x + 33} 499 l48 48 m0-48 l-48 48`}
                    />
                  )}
                </g>
              )
            })}
          </g>
        )
      })}
    </svg>
  )
}

export function MinimaxScene({ mode = 'explore' }: { mode?: Mode }) {
  const reveals = mode === 'explore' ? minimaxReveals : pruningReveals
  const { step, root, advance } = useSceneReveal(reveals.length, mode !== 'cut')

  const active = reveals[mode === 'cut' ? reveals.length - 1 : step]
  const branch = active.branch === null ? null : minimaxPosition.branches[active.branch]
  const reply = branch && active.reply !== null ? branch.replies[active.reply] : null
  const position = mode !== 'cut' ? (reply ?? branch?.white) : null
  const lastMove = reply?.uci ?? branch?.white.uci
  const path =
    mode !== 'cut' && branch ? [branch.white.san, reply?.san].filter(Boolean) : []

  return (
    <div className="chess-decision" ref={root} data-reveal-step={step}>
      <div className="chess-decision-position">
        <button
          className="chess-decision-board"
          type="button"
          aria-label="Sonraki hamleyi göster"
          disabled={mode === 'cut' || step === reveals.length - 1}
          onClick={advance}
        >
          <PositionBoard
            fen={position?.fen ?? minimaxPosition.rootFen}
            turn={position?.sideToMove ?? 'white'}
            highlights={
              mode !== 'cut' && lastMove
                ? [lastMove.slice(0, 2), lastMove.slice(2, 4)]
                : ['c3', 'a3']
            }
          />
        </button>
        <p className="chess-decision-path" aria-live="polite">
          {path.map((san, index) => (
            <span key={index}>{san}</span>
          ))}
        </p>
      </div>
      <DecisionTree step={step} mode={mode} />
    </div>
  )
}
