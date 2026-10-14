import { Stage, Conclusion, Underline } from '../../components/stage/stage'
import { SingleDatabaseDependency } from './dependency-scene'

export const title = 'ya database’e ulaşamazsak?'
export default function AvailabilityNeed() {
  return (
    <Stage
      number={6}
      chapter={1}
      title={
        <>
          ya database’e <Underline>ulaşamazsak?</Underline>
        </>
      }
    >
      <div className="lecture-diagram">
        <SingleDatabaseDependency />
      </div>
      <Conclusion>bir database’e ulaşamamak satışı durdurmamalı.</Conclusion>
    </Stage>
  )
}
