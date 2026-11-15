'use client'

import { branchingPosition } from '../../data/search/branching'
import { ChessPiece } from '../../components/graphics/chess-board/piece'
import { type PieceColor, type PieceKind } from '../../model/chess/types'
import { OperaSearchTree } from '../../components/search/opera-search-tree'
import { OperaBoard } from '../../components/search/opera-board'
import { PositionBoard } from '../../components/graphics/chess-board/position-board'
import { useSceneReveal } from '../../components/reveal/use-scene-reveal'
import { Stage } from '../../components/stage/stage'
import './growth.css'

export const title = 'Dalların çoğalması'

const choices = 35

const million = (choices ** 4 / 1e6).toLocaleString('tr-TR', {
  maximumFractionDigits: 1,
})

const trillion = (choices ** 8 / 1e12).toLocaleString('tr-TR', {
  maximumFractionDigits: 2,
})

function BranchMove({
  x,
  y,
  san,
  kind,
  color,
  selected = false,
}: {
  x: number
  y: number
  san: string
  kind: PieceKind
  color: PieceColor
  selected?: boolean
}) {
  return (
    <g className={`chess-growth-move${selected ? ' chess-growth-move--selected' : ''}`}>
      <ChessPiece
        kind={kind}
        color={color}
        x={x}
        y={y - 29}
        width={42}
        height={50.4}
        decorative
      />
      <text x={x + 54} y={y + 15}>
        {san}
      </text>
    </g>
  )
}

export default function GrowthScene() {
  const { step, root, advance } = useSceneReveal(6)
  const position =
    step === 1 ? branchingPosition.queenMove : branchingPosition.pawnReply

  return (
    <Stage frameId="explosion">
      <div
        className="chess-depth chess-growth-scene"
        ref={root}
        data-reveal-step={step}
      >
        <button
          className="chess-depth-board chess-growth-action"
          type="button"
          aria-label="Dallanmanın sonraki adımını göster"
          onClick={advance}
          disabled={step === 5}
        >
          {step === 0 ? (
            <OperaBoard index={3} highlights={['d1', 'd8']} />
          ) : step < 3 ? (
            <PositionBoard
              fen={position.fen}
              turn={position.sideToMove}
              highlights={position.highlights}
            />
          ) : (
            <span className="chess-growth-calculation" aria-live="polite">
              <span className="chess-growth-assumption">
                <strong>{choices}</strong> seçenek olsaydı?
              </span>
              <span className="chess-growth-count">
                {step >= 4 && (
                  <>
                    <span>4 yarım hamle</span>
                    <strong>≈{million} milyon</strong>
                  </>
                )}
              </span>
              <span className="chess-growth-count">
                {step >= 5 && (
                  <>
                    <span>8 yarım hamle</span>
                    <strong>≈{trillion} trilyon</strong>
                  </>
                )}
              </span>
            </span>
          )}
        </button>
        <OperaSearchTree
          index={3}
          showDepth
          selectedBranch={step === 0 ? 'mate' : 'alternative'}
          description={
            step === 0
              ? 'Önceki sayfanın aynı ağacı: Qb7 ve Qb8+ seçenekleri, Qb8+ Nxb8 Rd8# devamı.'
              : `Qb7 altında siyahın f6 ve Be7 cevaplarından örnekler. ${step >= 2 ? 'f6 sonrasında beyazın Qc8+ ve Be3 seçenekleri açıldı.' : 'Diğer devamlar henüz açılmadı.'} Matla biten dal değişmedi.`
          }
        >
          {step >= 1 && (
            <>
              <path
                className="chess-depth-branch"
                d="M320 350 L250 470 M320 350 L450 470"
              />
              <BranchMove
                san="f6"
                kind="pawn"
                color="black"
                x={180}
                y={535}
                selected={step >= 2}
              />
              <BranchMove san="Be7" kind="bishop" color="black" x={380} y={535} />
            </>
          )}
          {step >= 2 && (
            <>
              <path
                className="chess-depth-branch chess-depth-branch--selected"
                d="M320 350 L250 470"
              />
              <path
                className="chess-depth-branch"
                d="M250 590 L235 710 M250 590 L450 710"
              />
              <BranchMove san="Qc8+" kind="queen" color="white" x={165} y={775} />
              <BranchMove san="Be3" kind="bishop" color="white" x={370} y={775} />
            </>
          )}
        </OperaSearchTree>
      </div>
    </Stage>
  )
}
