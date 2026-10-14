import { Stage, Conclusion, Underline } from '../../components/stage/stage'
import {
  StoryExchange,
  StoryHistory,
  StoryMessage,
  StoryScene,
} from '../../components/graphics/recovery/story/scene'

export const title = 'yeni seçim. bu kez b aday.'

export default function ElectTheReplicaWithTheRecord() {
  return (
    <Stage
      number={19}
      chapter={4}
      title={title}
      lead="bir makine aynı term’de iki farklı adaya oy veremez."
    >
      <div className="lecture-diagram">
        <StoryScene label="ayrı bir seçim denemesi başlıyor. b bildiği term 2’yi artırıp term 3 ile c’den oy istiyor. mesajın başlığı yeni seçimin term 3 olduğunu bildiriyor. son kayıt özeti ise ayşe’nin isteğinin term 1’de eklendiğini ve log’da birinci sırada olduğunu bildiriyor. ayşe’nin kayıt satırında term 1 damgası aynı yerde duruyor. rezervasyon komutunun kendisi gönderilmiyor. c bu özeti kendi son kayıt bilgisiyle karşılaştırıyor. b’nin kayıtları c’nin boş kayıtlarından geride değil. c term 3’ü ve b’ye verdiği oyu cevap göndermeden önce kalıcı saklıyor. b de term 3’ü ve kendi oyunu aynı şekilde saklıyor. b kendi oyu ve c’nin oyuyla çoğunluğu sağlıyor ve primary seçiliyor. c’nin ayşe isteğini henüz kopyalamadığına dikkat: oy kaydı, rezervasyon isteği kaydı değildir.">
          <StoryMessage
            x={80}
            header="b → c · oy isteği · term 3"
            lines={['son kaydın term’i: 1', 'log’daki sırası: 1']}
            accent
          />
          <StoryExchange requester="left" />
          <StoryMessage
            x={880}
            header="c’nin b’ye cevabı"
            lines={['dönemi ve oyumu', 'diske yazdım. oyum b’ye.']}
          />
          <StoryHistory
            id="b"
            x={80}
            currentTerm={3}
            role="primary"
            vote
            entries={[{ person: 'ayşe', seat: 's17', term: 1, highlight: true }]}
          />
          <StoryHistory id="c" x={880} currentTerm={3} vote entries={[]} />
        </StoryScene>
      </div>
      <Conclusion>
        b’nin kendi oyu + c’nin oyu: <Underline>b seçildi.</Underline>
      </Conclusion>
    </Stage>
  )
}
