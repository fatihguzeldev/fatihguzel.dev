import { Stage } from '../../components/stage/stage'
import { MinimaxScene } from '../../components/search/minimax'

export const title = 'budama sınırı'

export default function Page24() {
  return (
    <Stage frameId="alpha-bound">
      <MinimaxScene mode="bound" />
    </Stage>
  )
}
