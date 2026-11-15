import { Stage } from '../../components/stage/stage'
import { FinaleScene } from '../../components/search/finale'

export const title = 'Yasal hamlelerden birini denemek'

export default function Page27() {
  return (
    <Stage frameId="approach">
      <FinaleScene phase="candidates" />
    </Stage>
  )
}
