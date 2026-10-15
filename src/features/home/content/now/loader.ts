import nowData from '../../../../../content/now.json'
import { NowSchema } from './schema'

export function loadNow() {
  return NowSchema.parse(nowData)
}
