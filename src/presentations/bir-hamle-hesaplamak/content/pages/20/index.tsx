import { Stage } from '../../components/stage/stage'
import { MinimaxScene } from '../../components/search/minimax'

export const title = 'Minimax hesabı'

export default function Page20() {
  return (
    <Stage frameId="backed-up-value">
      <MinimaxScene />
    </Stage>
  )
}
