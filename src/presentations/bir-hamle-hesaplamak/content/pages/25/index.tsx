import { Stage } from '../../components/stage/stage'
import { MinimaxScene } from '../../components/search/minimax'

export const title = 'Kararı değiştirmeyen dal'

export default function Page25() {
  return (
    <Stage frameId="alpha-cut">
      <MinimaxScene mode="cut" />
    </Stage>
  )
}
