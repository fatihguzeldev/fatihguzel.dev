import { Stage, Underline } from '../../components/stage/stage'
import './invariants.css'

export const title = 'b’den nasıl devam edeceğiz?'

export default function SafeContinuationQuestion() {
  return (
    <Stage number={13} chapter={3} title={title} className="lecture-reset">
      <p className="lecture-banner">a’ya ulaşamıyoruz.</p>
      <p className="lecture-banner">satışa b’den devam etmek istiyoruz.</p>
      <p className="lecture-banner">
        <Underline>ama s17 ayşe’nin kalmalı.</Underline>
      </p>
    </Stage>
  )
}
