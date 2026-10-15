import { Stage, Conclusion, Underline } from '../../components/stage/stage'
import { StaleReadAfterApproval } from './stale-read-after-approval'

export const title = 'onaydan sonra hala “boş” diyebilir miyiz?'
export default function Linearizability() {
  return (
    <Stage number={12} chapter={3} title={title} term="linearizability">
      <div className="lecture-diagram">
        <StaleReadAfterApproval />
      </div>
      <Conclusion>
        linearizability istiyorsak
        <br />
        <Underline>bu sorguya “boş” diyemeyiz.</Underline>
      </Conclusion>
    </Stage>
  )
}
