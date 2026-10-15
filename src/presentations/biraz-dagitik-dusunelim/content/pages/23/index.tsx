import { Stage, Conclusion, Underline } from '../../components/stage/stage'
import { RejectStaleMessage } from './reject-stale-message'

export const title = 'a hala primary olduğunu sanıyorsa?'

export default function RejectOldAuthority() {
  return (
    <Stage
      number={23}
      chapter={4}
      title={title}
      lead="iletişim yeniden kuruluyor. a yeni seçimi henüz öğrenmedi."
    >
      <div className="lecture-diagram">
        <RejectStaleMessage />
      </div>
      <Conclusion>
        <Underline>a eski term ile çoğunluğun onayını alamaz.</Underline>
      </Conclusion>
    </Stage>
  )
}
