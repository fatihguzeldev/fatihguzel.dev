import { Stage } from '../../components/stage/stage'
import { PositionRecordsScene } from '../../components/lesson/position-records'

export const title = 'Aynı hesabı yerleşime açmak'

export default function Page07() {
  return (
    <Stage frameId="position-records">
      <PositionRecordsScene />
    </Stage>
  )
}
