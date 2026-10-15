import { Stage, Conclusion, Underline } from '../../components/stage/stage'
import { ReplicateOrderedRequests } from './replicate-ordered-requests'

export const title = 'bora da s17’yi istiyor.'

export default function CurrentTermCommit() {
  return (
    <Stage
      number={20}
      chapter={4}
      title={title}
      lead="bora’nın komutu ayşe’nin kaydının arkasına b’nin kendi term’iyle ekleniyor."
    >
      <div className="lecture-diagram">
        <ReplicateOrderedRequests />
      </div>
      <Conclusion>
        ortak geçmişteki komut sırası kesinleşti.
        <br />
        <Underline>consensus</Underline>
      </Conclusion>
    </Stage>
  )
}
