import { Stage, Conclusion, Underline } from '../../components/stage/stage'
import {
  StoryExchange,
  StoryHistory,
  StoryMessage,
  StoryScene,
} from '../../components/graphics/recovery/story/scene'

export const title = 'c neden seçilemiyor?'

export default function ElectionFreshness() {
  return (
    <Stage
      number={18}
      chapter={4}
      title={title}
      lead="term seçim döneminin numarası. ayşe’nin kaydındaki term 1 değişmiyor."
    >
      <div className="lecture-diagram">
        <StoryScene label="a’ya ulaşılamadığı için b ve c’ye yakından bakıyoruz. ayşe’nin s17 isteği a’nın primary olduğu term 1’de kaydedilmişti. c bildiği dönem numarasını artırıp term 2 ile b’den oy istiyor ve kayıtlarının boş olduğunu bildiriyor. b term 2’yi öğrenip kalıcı saklıyor ama ayşe’nin kaydındaki term 1 değişmiyor. b adayın son kayıt bilgisini kendi son kayıt bilgisiyle karşılaştırıyor. c’nin kayıtları geride olduğu için b oy vermiyor. daha yüksek seçim term’i daha güncel log anlamına gelmiyor. c’nin yalnız kendi oyu var ve seçilemiyor.">
          <StoryMessage
            x={880}
            header="c → b · oy isteği · term 2"
            lines={['bana oy verir misin?', 'kayıtlarım boş.']}
            accent
          />
          <StoryExchange requester="right" />
          <StoryMessage
            x={80}
            header="b’nin c’ye cevabı"
            lines={['kayıtların benden geride.', 'oy vermiyorum.']}
          />
          <StoryHistory
            id="b"
            x={80}
            currentTerm={2}
            entries={[{ person: 'ayşe', seat: 's17', term: 1, highlight: true }]}
          />
          <StoryHistory id="c" x={880} currentTerm={2} entries={[]} />
        </StoryScene>
      </div>
      <Conclusion>
        c’nin yalnız kendi oyu var. <Underline>seçilemedi.</Underline>
        <br />
        adayın kayıtları oy verenden geride olmamalı.
      </Conclusion>
    </Stage>
  )
}
