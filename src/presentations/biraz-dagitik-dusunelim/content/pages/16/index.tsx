import { Stage, Conclusion, Underline } from '../../components/stage/stage'
import { RecoveryScene } from '../../components/graphics/recovery/recovery-scene'

export const title = 'a ve b kaydetti. ayşe onay aldı.'

export default function AcknowledgedMajority() {
  return (
    <Stage
      number={16}
      chapter={3}
      title={title}
      lead="üç makineli tasarımda başka bir olasılık: c geride kalıyor."
    >
      <div className="lecture-diagram">
        <RecoveryScene phase="acknowledged" />
      </div>
      <Conclusion>
        <Underline>şimdi a’ya ulaşamazsak?</Underline>
      </Conclusion>
    </Stage>
  )
}
