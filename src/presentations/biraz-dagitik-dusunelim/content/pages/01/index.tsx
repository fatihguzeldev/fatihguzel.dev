import { Stage, Underline } from '../../components/stage/stage'
import { SeatingMap } from '../../components/graphics/seating/seating-map'
import './cover.css'

export const title = 'biraz dağıtık düşünelim'
export default function Cover() {
  return (
    <Stage number={1} className="lecture-cover">
      <div className="lecture-cover-layout">
        <div>
          <h1>
            biraz dağıtık
            <br />
            <Underline>düşünelim</Underline>
          </h1>
          <p className="lecture-author">Fatih Güzel</p>
        </div>
        <div className="lecture-cover-art">
          <SeatingMap showRequests={false} />
        </div>
      </div>
    </Stage>
  )
}
