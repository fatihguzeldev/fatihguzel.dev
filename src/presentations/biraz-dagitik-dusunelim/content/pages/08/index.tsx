import { Stage, Conclusion, Underline } from '../../components/stage/stage'
import { UnreachablePrimary } from '../../components/graphics/replication/replication'

export const title = 'a’ya ulaşamıyoruz'
export default function PartialFailure() {
  return (
    <Stage number={8} chapter={2} title={title} term="partial failure">
      <div className="lecture-diagram">
        <UnreachablePrimary />
      </div>
      <Conclusion>
        satış bekliyor. <Underline>b’yi primary yapabilir miyiz?</Underline>
      </Conclusion>
    </Stage>
  )
}
