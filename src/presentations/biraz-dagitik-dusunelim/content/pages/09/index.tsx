import { Stage, Conclusion, Underline } from '../../components/stage/stage'
import { AlternativeHistories } from '../../components/graphics/replication/alternative-histories'

export const title = 'iki geçmiş. aynı gözlem'
export default function Indistinguishability() {
  return (
    <Stage number={9} chapter={2} title={title} term="indistinguishability">
      <div className="lecture-diagram">
        <AlternativeHistories />
      </div>
      <Conclusion>
        b ayşe’nin <Underline>onay alıp almadığını bilmiyor.</Underline>
      </Conclusion>
    </Stage>
  )
}
