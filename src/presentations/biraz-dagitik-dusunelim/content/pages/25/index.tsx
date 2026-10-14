import { Stage, Underline } from '../../components/stage/stage'
import './thanks.css'

export const title = 'teşekkürler.'

export default function Thanks() {
  return (
    <Stage number={25} className="thanks-scene">
      <h1>
        <Underline>teşekkürler.</Underline>
      </h1>
    </Stage>
  )
}
