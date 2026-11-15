import { Stage } from '../../components/stage/stage'
import { ComparisonScene } from '../../components/lesson/comparison'

export const title = 'Bir kare farkı'

export default function Page06() {
  return (
    <Stage frameId="placement" title="piyon a3’te olsaydı?">
      <ComparisonScene placement />
    </Stage>
  )
}
