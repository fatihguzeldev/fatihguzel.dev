import { defineTalk } from '../common/model/define-talk'
import { talkTheme } from './theme'

export default defineTalk({
  title: 'bir hamle hesaplamak',
  description:
    'Satranç motorları bir konuma nasıl değer biçiyor, bir hamleyi nasıl seçiyor?',
  language: 'tr',
  canvas: { width: 1920, height: 1080 },
  theme: talkTheme,
})
