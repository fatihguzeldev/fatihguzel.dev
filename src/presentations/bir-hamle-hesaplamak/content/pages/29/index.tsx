import { Stage } from '../../components/stage/stage'
import { FinaleScene } from '../../components/search/finale'

export const title = 'Matın tespiti'

export default function Page29() {
  return (
    <Stage frameId="forced-reply">
      <FinaleScene phase="terminal" />
    </Stage>
  )
}
