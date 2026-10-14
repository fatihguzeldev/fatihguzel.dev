import { Stage, Conclusion, Underline } from '../../components/stage/stage'
import { ApplyOrderedRequests } from './apply-ordered-requests'

export const title = 'önce ayşe. sonra bora.'

export default function ApplyPreservedHistory() {
  return (
    <Stage
      number={21}
      chapter={4}
      title={title}
      lead="b ve c henüz uygulamadıkları komutları aynı deterministik kuralla işliyor."
    >
      <div className="lecture-diagram">
        <ApplyOrderedRequests />
      </div>
      <Conclusion>
        iki kopyada aynı komutlar aynı sırayla işlendi.
        <br />
        <Underline>replicated state machine</Underline>
      </Conclusion>
    </Stage>
  )
}
