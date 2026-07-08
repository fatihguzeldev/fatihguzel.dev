import { Container } from '@/components/layout/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import type { Now as NowContent } from '@/content/schemas/now'
import styles from './Now.module.css'
import sectionStyles from '../shared/Section.module.css'

type NowProps = {
  now: NowContent
}

export function Now({ now }: NowProps) {
  return (
    <section className={sectionStyles.section} id="now">
      <Container>
        <SectionHeader title="what i'm focused on" />
        <p className={styles.meta}>updated {now.updatedAt}</p>
        <ul className={styles.list}>
          {now.items.map((item, index) => (
            <li key={index} className={styles.item}>
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
