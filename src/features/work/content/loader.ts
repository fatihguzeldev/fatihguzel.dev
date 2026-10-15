import workData from '../../../../content/pages/work.json'
import { WorkSchema } from './schema'

export function loadWork() {
  return WorkSchema.parse(workData)
}
