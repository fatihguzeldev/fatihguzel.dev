import type { Presentation } from '../common/types'
import '../common/fonts.css'
import talk from './talk'
import Page01, { title as title01 } from './content/pages/01'
import Page02, { title as title02 } from './content/pages/02'
import Page03, { title as title03 } from './content/pages/03'
import Page04, { title as title04 } from './content/pages/04'
import Page05, { title as title05 } from './content/pages/05'
import Page06, { title as title06 } from './content/pages/06'
import Page07, { title as title07 } from './content/pages/07'
import Page08, { title as title08 } from './content/pages/08'
import Page09, { title as title09 } from './content/pages/09'
import Page10, { title as title10 } from './content/pages/10'
import Page11, { title as title11 } from './content/pages/11'
import Page12, { title as title12 } from './content/pages/12'
import Page13, { title as title13 } from './content/pages/13'
import Page14, { title as title14 } from './content/pages/14'
import Page15, { title as title15 } from './content/pages/15'
import Page16, { title as title16 } from './content/pages/16'
import Page17, { title as title17 } from './content/pages/17'
import Page18, { title as title18 } from './content/pages/18'
import Page19, { title as title19 } from './content/pages/19'
import Page20, { title as title20 } from './content/pages/20'
import Page21, { title as title21 } from './content/pages/21'
import Page22, { title as title22 } from './content/pages/22'
import Page23, { title as title23 } from './content/pages/23'
import Page24, { title as title24 } from './content/pages/24'
import Page25, { title as title25 } from './content/pages/25'

const presentation: Presentation = {
  ...talk,
  slug: 'biraz-dagitik-dusunelim',
  slides: [
    { id: '01', title: title01, component: Page01 },
    { id: '02', title: title02, component: Page02 },
    { id: '03', title: title03, component: Page03 },
    { id: '04', title: title04, component: Page04 },
    { id: '05', title: title05, component: Page05 },
    { id: '06', title: title06, component: Page06 },
    { id: '07', title: title07, component: Page07 },
    { id: '08', title: title08, component: Page08 },
    { id: '09', title: title09, component: Page09 },
    { id: '10', title: title10, component: Page10 },
    { id: '11', title: title11, component: Page11 },
    { id: '12', title: title12, component: Page12 },
    { id: '13', title: title13, component: Page13 },
    { id: '14', title: title14, component: Page14 },
    { id: '15', title: title15, component: Page15 },
    { id: '16', title: title16, component: Page16 },
    { id: '17', title: title17, component: Page17 },
    { id: '18', title: title18, component: Page18 },
    { id: '19', title: title19, component: Page19 },
    { id: '20', title: title20, component: Page20 },
    { id: '21', title: title21, component: Page21 },
    { id: '22', title: title22, component: Page22 },
    { id: '23', title: title23, component: Page23 },
    { id: '24', title: title24, component: Page24 },
    { id: '25', title: title25, component: Page25 },
  ],
}

export default presentation
