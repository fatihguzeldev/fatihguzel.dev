import { Stage } from '../../components/stage/stage'
import { AnchorScene } from '../../components/search/anchor'

export const title = 'Ana konuma dönüş'

export default function Page26() {
  return (
    <Stage frameId="return-board">
      <AnchorScene returning />
    </Stage>
  )
}
