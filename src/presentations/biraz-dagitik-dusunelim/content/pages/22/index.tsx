import { Stage, Conclusion, Underline } from '../../components/stage/stage'
import { SuccessfulReservation } from './successful-reservation'

export const title = 'bora bu kez s18’i istiyor.'

export default function NewReservationSucceeds() {
  return (
    <Stage number={22} chapter={4} title={title} lead="a’ya hala ulaşamıyoruz.">
      <div className="lecture-diagram">
        <SuccessfulReservation />
      </div>
      <Conclusion>
        <Underline>a’yı beklemeden yeni rezervasyonu tamamladık.</Underline>
      </Conclusion>
    </Stage>
  )
}
