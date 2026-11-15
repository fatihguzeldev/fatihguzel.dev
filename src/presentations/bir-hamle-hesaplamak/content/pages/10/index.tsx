import { Stage } from '../../components/stage/stage'
import { PositionRecordsScene } from '../../components/lesson/position-records'

export const title = 'Bir konuma uyan katsayı'

export default function Page10() {
  return (
    <Stage frameId="position-fit">
      <PositionRecordsScene fitted />
    </Stage>
  )
}
