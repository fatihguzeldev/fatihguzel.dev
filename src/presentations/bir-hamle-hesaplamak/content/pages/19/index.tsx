import { Stage } from '../../components/stage/stage'
import { MoveScene } from '../../components/search/move'

export const title = 'Siyahın tek cevabı'

export default function Page19() {
  return (
    <Stage frameId="reply">
      <MoveScene reply />
    </Stage>
  )
}
