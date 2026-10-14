import { Stage, Conclusion, Underline } from '../../components/stage/stage'
import { ReplicationBeforeApproval } from './replication-before-approval'

export const title = 'önce kopya. sonra onay.'

export default function WaitForReplication() {
  return (
    <Stage
      number={14}
      chapter={3}
      title={title}
      lead="ayşe’nin isteğini baştan işleyelim. bu kez komutu kaydediyoruz."
    >
      <div className="lecture-diagram">
        <ReplicationBeforeApproval />
      </div>
      <Conclusion>
        peki <Underline>b’ye ulaşamazsak?</Underline>
      </Conclusion>
    </Stage>
  )
}
