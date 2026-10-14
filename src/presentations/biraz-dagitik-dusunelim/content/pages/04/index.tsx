import { Stage, Conclusion, Underline } from '../../components/stage/stage'
import { SeatingMap } from '../../components/graphics/seating'

export const title = 'iki kişi. aynı koltuk.'
export default function Reservation() {
  return (
    <Stage number={4} chapter={1} title="iki kişi. aynı koltuk.">
      <div className="lecture-diagram">
        <SeatingMap />
      </div>
      <Conclusion>
        koltuk boşsa isteyen kişiye ayırıyoruz.
        <br />
        doluysa <Underline>isteği reddediyoruz.</Underline>
      </Conclusion>
    </Stage>
  )
}
