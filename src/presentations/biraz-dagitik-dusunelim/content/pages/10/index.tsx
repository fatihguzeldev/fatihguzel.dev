import { Stage, Conclusion, Underline } from '../../components/stage/stage'
import { UnsafeFailover } from '../../components/graphics/replication/replication'

export const title = 'deneme: eksik kopyayı primary yapalım'
export default function TwoApprovals() {
  return (
    <Stage number={10} chapter={2} title={title} term="failover">
      <div className="lecture-diagram">
        <UnsafeFailover />
      </div>
      <Conclusion>
        <Underline>aynı koltuğa iki onay.</Underline>
      </Conclusion>
    </Stage>
  )
}
