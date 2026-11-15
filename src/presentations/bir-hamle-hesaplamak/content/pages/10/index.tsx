import { Stage } from '../../components/stage/stage'
import { PositionRecordsScene } from '../../components/lesson/position-records'

export const title = 'a3 piyonunun katkısı'

export default function Page10() {
  return (
    <Stage frameId="position-fit">
      <PositionRecordsScene fitted />
    </Stage>
  )
}
