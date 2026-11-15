import { lessonGame } from '../../data/learning/play'
import { piecesFromFen } from '../../model/chess/position'
import { ChessBoard } from '../../components/graphics/chess-board/board'
import { PositionBoard } from '../../components/graphics/chess-board/position-board'
import { Stage } from '../../components/stage/stage'
import './outcome.css'

export const title = 'Oyun sonucundan öğrenmek'

export default function GameOutcomeScene() {
  return (
    <Stage frameId="self-play" title="Leela Chess Zero">
      <div
        className="chess-outcome"
        role="group"
        aria-label="Tanıdık konumdan oynanan öğretici devamın başlangıcı ve beyazın mat ederek kazandığı son konum."
      >
        <div className="chess-outcome-board">
          <PositionBoard
            fen={lessonGame.startFen}
            turn={lessonGame.line[0].sideToMove}
            highlights={['a3', 'c3']}
          />
        </div>
        <div className="chess-outcome-result">
          <strong>{lessonGame.result}</strong>
          <svg viewBox="0 0 240 36" aria-hidden="true">
            <path d="M8 18 H232 M216 2 L232 18 L216 34" />
          </svg>
        </div>
        <div className="chess-outcome-board">
          <ChessBoard
            pieces={piecesFromFen(lessonGame.endFen)}
            highlights={[{ square: 'f3' }, { square: 'g3' }]}
          />
        </div>
      </div>
    </Stage>
  )
}
