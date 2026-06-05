import workData from '../../content/pages/work.json'
import { WorkSchema } from './schemas/work'

export function loadWork() {
  return WorkSchema.parse(workData)
}
