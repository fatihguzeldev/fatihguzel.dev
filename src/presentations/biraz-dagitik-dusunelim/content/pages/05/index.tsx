import { Stage } from '../../components/stage/stage'
import { InlineArrows } from '../../components/typography/inline-arrows/inline-arrows'
import './atomicity.css'

export const title = 'tek bir karar noktası'
export default function AtomicDecision() {
  return (
    <Stage number={5} chapter={1} title="tek bir karar noktası" term="atomicity">
      <pre className="lecture-code">
        <code>
          {`update seats
set owner = 'ayşe'
where id = 's17'
  `}
          <span className="hot">and owner is null;</span>
        </code>
      </pre>
      <div className="lecture-results">
        <p>
          <InlineArrows>1 satır → onay</InlineArrows>
        </p>
        <p>
          <InlineArrows>0 satır → ret</InlineArrows>
        </p>
      </div>
    </Stage>
  )
}
