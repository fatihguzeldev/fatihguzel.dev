import { ChessPiece } from '../graphics/chess-board/piece'
import { OperaBoard } from './opera-board'
import './move.css'

export function MoveScene({ reply = false }: { reply?: boolean }) {
  return (
    <div className="chess-position-layout">
      <div className={`chess-position-copy${reply ? ' chess-reply-copy' : ''}`}>
        {reply ? (
          <>
            <div className="chess-reply-move">
              <ChessPiece
                kind="knight"
                color="black"
                width={142}
                height={170.4}
                decorative
              />
              <div className="chess-reply-line">
                <p className="chess-move">Nxb8</p>
                <span className="chess-reply-forced">zorunlu hamle</span>
              </div>
            </div>
            <p className="chess-reply-then">ardından</p>
            <div className="chess-reply-move">
              <ChessPiece
                kind="rook"
                color="white"
                width={142}
                height={170.4}
                decorative
              />
              <p className="chess-move">Rd8#</p>
            </div>
          </>
        ) : (
          <>
            <ChessPiece
              kind="queen"
              color="white"
              width={142}
              height={170.4}
              decorative
            />
            <p className="chess-move">Qb8+</p>
          </>
        )}
      </div>
      <div className="chess-main-board">
        <OperaBoard
          index={reply ? 2 : 1}
          highlights={reply ? ['b8', 'd7'] : ['b8', 'e8']}
          arrows={
            reply
              ? [
                  {
                    from: 'd1',
                    to: 'd8',
                    label: 'Atın boşalttığı d dosyasından kale d8’e gidebilir',
                  },
                ]
              : []
          }
        />
      </div>
    </div>
  )
}
