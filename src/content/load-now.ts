import nowData from '../../content/now.json'
import { NowSchema } from './schemas/now'

export function loadNow() {
  return NowSchema.parse(nowData)
}
