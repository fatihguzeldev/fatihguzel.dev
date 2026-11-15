import './chess.css'
import type { PieceColor, PieceKind } from '../../../model/chess/types'

export const pieceNames: Record<PieceKind, string> = {
  king: 'şah',
  queen: 'vezir',
  rook: 'kale',
  bishop: 'fil',
  knight: 'at',
  pawn: 'piyon',
}

const basePath = 'M23 95 Q49 91 78 95 L82 108 Q49 112 18 108 Z'

function PieceDrawing({ kind }: { kind: PieceKind }) {
  switch (kind) {
    case 'king':
      // Adapted from Cburnett's Lichess king; see assets/cburnett-LICENSE.txt.
      return (
        <>
          <path
            d="M47.8 26 V17.3 H43.9 V12.9 H47.8 V9.1 H52.2 V12.9 H56.1 V17.3 H52.2 V26 Z"
            strokeWidth="1.6"
          />
          <path d="M50 66.1 s11-22.5 7.4-31.5 c0 0-2.5-7.5-7.4-7.5 s-7.4 7.5-7.4 7.5 c-3.7 9 7.4 31.5 7.4 31.5" />
          <path d="M23.1 102.1 c13.5 10.5 38 10.5 51.4 0 v-21 s22.1-13.5 14.7-31.5 c-9.8-19.5-33.1-10.5-39.2 12 v10.5 v-10.5 c-8.6-22.5-31.9-31.5-39.2-12 c-7.4 18 12.3 30 12.3 30 z" />
          <path
            className="chess-piece-detail"
            d="M23.1 81.1 c13.5-9 38-9 51.4 0 M23.1 91.6 c13.5-9 38-9 51.4 0 M23.1 102.1 c13.5-9 38-9 51.4 0"
          />
        </>
      )
    case 'queen':
      // Adapted from Cburnett's Lichess queen; see assets/cburnett-LICENSE.txt.
      return (
        <>
          <circle cx="12.9" cy="28.3" r="4.7" />
          <circle cx="30.9" cy="17.8" r="4.7" />
          <circle cx="50" cy="14.8" r="4.7" />
          <circle cx="69.1" cy="19.3" r="4.7" />
          <circle cx="87.1" cy="28.3" r="4.7" />
          <path d="M19.6 70.3 c19.1-4.5 47.3-4.5 60.8 0 l4.5-36-15.8 33 V25.3 L56.8 65.8 L50 20.8 L43.3 65.8 L30.9 23.8 V67.3 L15.1 34.3 Z" />
          <path d="M19.6 70.3 C19.6 76.3 23 76.3 25.3 82.3 C27.5 86.8 27.5 85.3 26.4 92.8 C23 95.8 23 100.3 23 100.3 C19.6 104.8 24.1 107.75 24.1 107.75 C38.8 110.75 61.3 110.75 75.9 107.75 C75.9 107.75 79.3 104.8 75.9 100.3 C75.9 100.3 77 95.8 73.6 92.8 C72.5 85.3 72.5 83.8 74.8 82.3 C77 76.3 80.4 76.3 80.4 70.3 C61.3 65.8 38.8 65.8 19.6 70.3 Z" />
          <path
            className="chess-piece-detail"
            d="M25.3 82.3 c7.9-3 41.6-3 49.5 0 M26.4 92.8 c13.5-3 33.8-3 47.3 0"
          />
        </>
      )
    case 'rook':
      return (
        <>
          <path d="M26 17 L38 17 L38 29 L47 29 L47 16 L58 16 L58 29 L67 29 L67 17 L79 18 L77 48 L66 56 L67 83 L75 95 L25 95 L34 82 L35 56 L25 48 Z" />
          <path className="chess-piece-detail" d="M27 46 Q51 50 77 46 M35 60 L66 60" />
          <path d={basePath} />
        </>
      )
    case 'bishop':
      return (
        <>
          <circle cx="49" cy="11" r="4.5" />
          <path d="M49 17 C42 21 35 26 34 31 C33 37 40 42 50 42 C60 42 67 37 66 31 C65 27 61 22 55 19 Z" />
          <path className="chess-piece-detail" d="M61 23 L49 35" />
          <path d="M35 44 Q49 46 65 44 L64 49 Q49 51 36 49 Z" />
          <path d="M42 51 L58 51 C55 61 54 71 57 79 C60 87 64 92 71 95 L28 95 C35 92 40 86 42 78 C45 69 45 60 42 51 Z" />
          <path d={basePath} />
        </>
      )
    case 'knight':
      return (
        <>
          <path d="M29 95 C35 82 48 74 48 61 L35 68 L20 60 L22 49 L34 34 L38 17 L50 23 L61 13 C78 26 84 45 82 66 C81 79 75 88 76 95 Z" />
          <path className="chess-piece-detail" d="M61 28 C73 44 72 62 64 78" />
          <path d={basePath} />
        </>
      )
    case 'pawn':
      return (
        <>
          <path d="M64 30 C65 39 59 46 50 47 C40 47 33 40 34 30 C35 21 41 17 50 17 C59 17 64 22 64 30 Z" />
          <path d="M40 48 Q49 51 60 48 L61 59 L55 64 C56 77 62 86 72 96 L27 96 C38 85 44 76 44 64 L38 59 Z" />
          <path className="chess-piece-detail" d="M40 59 Q49 62 60 59" />
          <path d={basePath} />
        </>
      )
  }
}

export function ChessPiece({
  kind,
  color,
  className = '',
  x,
  y,
  width = 100,
  height = 120,
  decorative = false,
}: {
  kind: PieceKind
  color: PieceColor
  className?: string
  x?: number
  y?: number
  width?: number | string
  height?: number | string
  decorative?: boolean
}) {
  return (
    <svg
      className={`chess-piece chess-piece--${color} ${className}`}
      viewBox="0 0 100 120"
      x={x}
      y={y}
      width={width}
      height={height}
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative || undefined}
      aria-label={
        decorative
          ? undefined
          : `${color === 'white' ? 'Beyaz' : 'Siyah'} ${pieceNames[kind]}`
      }
    >
      <g className="chess-piece-drawing">
        <PieceDrawing kind={kind} />
      </g>
    </svg>
  )
}
