import type { ReactNode } from 'react'
import { Stage } from '../../components/stage/stage'
import { InlineArrows } from '../../components/typography/inline-arrows/inline-arrows'
import './verdict.css'

export const title = 'sistem düzeyinde doğruluk'

function Relation({
  concepts,
  children,
}: {
  concepts: readonly string[]
  children: ReactNode
}) {
  return (
    <div className="verdict-relation">
      <h2>
        {concepts.map((concept) => (
          <span key={concept}>{concept}</span>
        ))}
      </h2>
      <svg className="verdict-connector" viewBox="0 0 64 32" aria-hidden="true">
        <path d="M 4 16 H 58 M 49 8 L 59 16 L 49 24" />
      </svg>
      <div className="verdict-deduction">{children}</div>
    </div>
  )
}

export default function SystemCorrectness() {
  return (
    <Stage number={24} title={title} className="verdict-scene">
      <div className="verdict-relations">
        <div className="verdict-group">
          <Relation concepts={['partial failure', 'indistinguishability']}>
            <p>aynı yerel gözlem farklı geçmişlerle uyumlu olabilir.</p>
          </Relation>
        </div>

        <div className="verdict-group">
          <Relation concepts={['consensus']}>
            <p>komutların ortak geçmişteki sırası kesinleşir.</p>
          </Relation>
          <Relation concepts={['replicated state machine']}>
            <p className="verdict-conditions">
              aynı başlangıç durumu + aynı komut sırası + aynı deterministik kural
            </p>
            <p>
              <InlineArrows>→ aynı durum ve sonuçlar</InlineArrows>
            </p>
          </Relation>
        </div>

        <div className="verdict-group">
          <Relation concepts={['quorum intersection', 'oy kuralları']}>
            <p>yeni primary kesinleşmiş geçmişi korur.</p>
          </Relation>
          <Relation concepts={['term']}>
            <p>eski term ile gönderilen mesajlar reddedilir.</p>
          </Relation>
        </div>

        <div className="verdict-group">
          <Relation concepts={['kesinleşmiş geçmiş', 'ilerleme']}>
            <p>geçmişin korunması ilerlemeyi garanti etmez.</p>
            <p>ilerleme çalışan çoğunluk ve kararlı iletişim gerektirir.</p>
          </Relation>
        </div>
      </div>
    </Stage>
  )
}
