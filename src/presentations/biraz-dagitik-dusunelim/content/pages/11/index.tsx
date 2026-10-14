import { Stage, Conclusion, Underline } from '../../components/stage/stage'
import { NonOverlappingApprovals } from './non-overlapping-approvals'

export const title = 'istekler aynı anda gelmedi bile.'
export default function LocalAndSystemBehavior() {
  return (
    <Stage number={11} chapter={3} title={title}>
      <div className="lecture-diagram">
        <NonOverlappingApprovals />
      </div>
      <Conclusion>
        her işlem kendi kopyasında doğru.
        <br />
        <Underline>bu iki onay birlikte geçerli olamaz.</Underline>
      </Conclusion>
    </Stage>
  )
}
