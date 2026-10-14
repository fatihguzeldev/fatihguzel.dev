import { colors, inkFrame, Label, useArrow } from '../../components/graphics/primitives'
import { StoryScene } from '../../components/graphics/recovery/story/scene'

const participants = [
  { x: 80, id: 'a', role: 'primary', term: 1, height: 492 },
  { x: 880, id: 'c', role: 'replica', term: 3, height: 374 },
] as const

export function RejectStaleMessage() {
  const arrow = useArrow()
  const accentArrow = useArrow(colors.accent)
  return (
    <StoryScene label="22’de a’ya ulaşmadan yeni rezervasyon tamamlandı. bu koşullu senaryoda a izolasyon sırasında çalışmaya devam etmiş; bağlantı yeniden kurulurken yeni seçimi henüz öğrenmemiş ve term 1’de kendisini primary olarak görüyor. soldaki a panelinin üstü mesaj öncesindeki yerel rolünü ve term 1 bilgisini gösteriyor. a c’ye s18 için term 1 taşıyan bir yazma mesajı gönderiyor. c paneli önceki sayfayla aynı üst konumda ve güncel term’i hala 3. karşılaştırma c’nin içinde yapılıyor: gelen mesajın term 1 değeri c’nin kalıcı güncel term 3 değerinden küçük olduğu için mesaj reddediliyor. s18’in sahibi veya commit 03 bilgisi ret sebebi değil; log veya state değişmiyor. aşağıdaki ayrı b kutusu primary b’nin de term 3 bildiğini gösteriyor; a eski term mesajlarıyla çoğunlukta kabul göremiyor. c ret cevabında term 3’ü bildiriyor. a bu cevabı alırsa daha yüksek term’i kalıcı saklayıp replica rolüne geçiyor; a panelinin altında cevabı alınca etiketi bunun daha sonraki bir durum olduğunu açıklıyor. c’nin reti a’nın cevabı almasını beklemiyor. eski-term mesajıyla eski-term log kaydı farklı; ayşe’nin term 1 komutu korunmaya devam ediyor. a için crash sonrası primary rolüyle restart gösterilmiyor.">
      {arrow.marker}
      {accentArrow.marker}
      {participants.map((node) => (
        <g key={node.id} data-term-participant={node.id}>
          <path
            d={inkFrame(node.x, 24, 480, node.height, 14)}
            fill={colors.white}
            stroke={colors.ink}
            strokeWidth={2.5}
          />
          <Label x={node.x + 24} y={69} fontSize={42} mono>
            {node.id}
          </Label>
          <Label x={node.x + 74} y={68} fontSize={26} fill={colors.muted}>
            {node.role}
          </Label>
          <Label
            x={node.x + 456}
            y={68}
            textAnchor="end"
            fontSize={24}
            fill={colors.accent}
          >
            güncel term {node.term}
          </Label>
          <path
            d={`M ${node.x + 2} 92 H ${node.x + 478}`}
            stroke={colors.line}
            strokeWidth={2}
          />
        </g>
      ))}

      <path d={inkFrame(104, 182, 432, 84, 8)} fill={colors.paper} />
      <Label x={128} y={234} fontSize={30}>
        s18 için yazma isteği
      </Label>

      <g data-local-term-check>
        <Label x={904} y={160} fontSize={26} fill={colors.muted}>
          mesajın term’i
        </Label>
        <Label x={1336} y={160} textAnchor="end" fontSize={26} fill={colors.muted}>
          güncel term
        </Label>
        <Label data-message-term x={968} y={244} textAnchor="middle" fontSize={64} mono>
          1
        </Label>
        <Label
          x={1120}
          y={244}
          textAnchor="middle"
          fontSize={54}
          mono
          fill={colors.accent}
        >
          &lt;
        </Label>
        <Label
          data-current-term
          x={1278}
          y={244}
          textAnchor="middle"
          fontSize={64}
          mono
          fill={colors.accent}
        >
          3
        </Label>
        <path d={inkFrame(904, 286, 432, 64, 8)} fill={colors.tint} />
        <Label x={1120} y={329} textAnchor="middle" fontSize={30} fill={colors.accent}>
          mesaj reddedildi
        </Label>
      </g>

      <g fill="none" strokeWidth={3} strokeLinecap="round">
        <path
          data-stale-message
          d="M 572 224 H 868"
          stroke={colors.ink}
          markerEnd={arrow.end}
        />
        <path
          data-term-reply
          d="M 868 326 C 760 326 640 376 572 376"
          stroke={colors.accent}
          markerEnd={accentArrow.end}
        />
      </g>
      <Label x={720} y={202} textAnchor="middle" fontSize={28} mono>
        mesaj · term 1
      </Label>
      <Label x={720} y={326} textAnchor="middle" fontSize={26} fill={colors.accent}>
        ret · term 3
      </Label>

      <g data-step-down>
        <Label x={104} y={384} fontSize={24} fill={colors.muted}>
          cevabı alınca
        </Label>
        <path d={inkFrame(104, 400, 432, 92, 8)} fill={colors.tint} />
        <Label x={128} y={443} fontSize={30} mono>
          term 1 → 3
        </Label>
        <Label x={512} y={479} textAnchor="end" fontSize={28}>
          replica
        </Label>
      </g>

      <g data-other-current-replica>
        <path
          d={inkFrame(880, 430, 480, 86, 14)}
          fill={colors.paper}
          stroke={colors.line}
          strokeWidth={2}
        />
        <Label x={904} y={482} fontSize={42} mono>
          b
        </Label>
        <Label x={954} y={481} fontSize={26} fill={colors.muted}>
          primary
        </Label>
        <Label x={1336} y={481} textAnchor="end" fontSize={24} fill={colors.accent}>
          güncel term 3
        </Label>
      </g>
    </StoryScene>
  )
}
