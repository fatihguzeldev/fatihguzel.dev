'use client'

import { operaPosition } from '../../data/search/opera'
import { OperaSearchTree } from '../../components/search/opera-search-tree'
import { OperaBoard } from '../../components/search/opera-board'
import { useSceneReveal } from '../../components/reveal/use-scene-reveal'
import { Stage } from '../../components/stage/stage'

export const title = 'arama ağacı ve derinlik'

export default function DepthScene() {
  const { step, root, advance } = useSceneReveal(5)
  const index = Math.min(step, 3)
  const position = operaPosition.line[index]
  const move = position.playedUci
  const showDepth = step === 4

  return (
    <Stage frameId="depth">
      <div className="chess-depth" ref={root} data-reveal-step={step}>
        <button
          className="chess-depth-board"
          type="button"
          aria-label="Aramayı bir adım ilerlet"
          disabled={showDepth}
          onClick={advance}
        >
          <OperaBoard
            index={index}
            highlights={move ? [move.slice(0, 2), move.slice(2, 4)] : []}
          />
        </button>
        <OperaSearchTree
          index={index}
          showDepth={showDepth}
          description={
            showDepth
              ? 'Qb7 ve Qb8+ aynı derinlikte iki seçenek. Qb8+, Nxb8, Rd8# yolunda sırasıyla bir, iki ve üç yarım hamle ilerledik. Qb7’nin devamları bu çizimde açılmadı.'
              : `Başlangıç konumunda Qb7 ve Qb8+ seçenekleri. ${position.playedSan ? `Tahtada ${position.playedSan} sonrası konum.` : 'Henüz hamle yapılmadı.'}`
          }
        />
      </div>
    </Stage>
  )
}
