import { Stage, Conclusion, Underline } from '../../components/stage/stage'
import { AsyncReservation } from '../../components/graphics/replication/replication'

export const title = 'bir kopya daha tutalım'
export default function AsyncReplication() {
  return (
    <Stage number={7} chapter={2} title={title} term="asynchronous replication">
      <div className="lecture-diagram">
        <AsyncReservation />
      </div>
      <Conclusion>
        onay için <Underline>b’yi beklemiyoruz.</Underline>
      </Conclusion>
    </Stage>
  )
}
