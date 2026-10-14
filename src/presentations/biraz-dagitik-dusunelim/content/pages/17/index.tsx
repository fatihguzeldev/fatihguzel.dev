import { Stage, Conclusion, Underline } from '../../components/stage/stage'
import { RecoveryScene } from '../../components/graphics/recovery/recovery-scene'

export const title = 'şimdi a’ya ulaşamıyoruz.'

export default function RecoveryNeedsAnElection() {
  return (
    <Stage number={17} chapter={4} title={title} term="quorum intersection">
      <div className="lecture-diagram">
        <RecoveryScene phase="election" />
      </div>
      <Conclusion>
        a ve b kaydetti. b ve c’nin oyları gerekli.
        <br />
        <Underline>b hangi adaya oy vermeli?</Underline>
      </Conclusion>
    </Stage>
  )
}
