import { Stage, Conclusion, Underline } from '../../components/stage/stage'
import { MajorityWithUnavailableReplica } from './majority-with-unavailable-replica'

export const title = 'üçüncü makine bize ne kazandırıyor?'

export default function ThreeParticipants() {
  return (
    <Stage
      number={15}
      chapter={3}
      title={title}
      lead="iki tasarımı karşılaştıralım: a çalışıyor. b’ye ulaşamıyoruz."
    >
      <div className="lecture-diagram">
        <MajorityWithUnavailableReplica />
      </div>
      <Conclusion>
        <Underline>neden çoğunluk?</Underline>
      </Conclusion>
    </Stage>
  )
}
