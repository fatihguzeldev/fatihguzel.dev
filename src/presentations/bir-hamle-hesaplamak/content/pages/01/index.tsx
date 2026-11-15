import { ChessPiece } from '../../components/graphics/chess-board/piece'
import { Stage } from '../../components/stage/stage'
import './cover.css'

export const title = 'bir hamle hesaplamak'

export default function CoverScene() {
  return (
    <Stage frameId="cover" surface="green">
      <div className="chess-cover">
        <h1>
          bir hamle
          <br />
          hesaplamak
        </h1>
        <p className="chess-cover-author">Fatih Güzel</p>
        <div className="chess-cover-art" aria-hidden="true">
          <ChessPiece
            kind="bishop"
            color="black"
            className="chess-cover-bishop"
            decorative
          />
          <ChessPiece
            kind="knight"
            color="white"
            className="chess-cover-knight"
            decorative
          />
        </div>
      </div>
    </Stage>
  )
}
