import { colors, inkFrame, Label, useArrow } from '../../components/graphics/primitives'
import { StoryScene } from '../../components/graphics/recovery/story/scene'

const steps = [
  { y: 204, command: 'ayşe’nin s17 isteği', result: 'ayrıldı' },
  { y: 376, command: 'bora’nın s17 isteği', result: 'ret' },
] as const

function ReplicaApplication({ id, x }: { id: 'b' | 'c'; x: number }) {
  const arrow = useArrow()
  return (
    <g data-replica-application={id}>
      {arrow.marker}
      <path
        d={inkFrame(x, 24, 480, 492, 14)}
        fill={colors.white}
        stroke={colors.ink}
        strokeWidth={2.5}
      />
      <Label x={x + 24} y={69} fontSize={42} mono>
        {id}
      </Label>
      <Label x={x + 74} y={68} fontSize={26} fill={colors.muted}>
        {id === 'b' ? 'primary' : 'replica'}
      </Label>
      <Label x={x + 456} y={68} textAnchor="end" fontSize={24} fill={colors.muted}>
        yerel durum
      </Label>
      <path d={`M ${x + 2} 92 H ${x + 478}`} stroke={colors.line} strokeWidth={2} />

      <Label x={x + 24} y={140} fontSize={26} fill={colors.muted}>
        uygulamadan önce
      </Label>
      <Label data-initial-state x={x + 456} y={140} textAnchor="end" fontSize={30} mono>
        s17: boş
      </Label>

      {steps.map((step, index) => (
        <g key={step.command} data-application-step={index + 1}>
          <circle
            cx={x + 48}
            cy={step.y}
            r={22}
            fill={colors.paper}
            stroke={colors.accent}
            strokeWidth={2}
          />
          <Label
            x={x + 48}
            y={step.y + 8}
            textAnchor="middle"
            fontSize={22}
            fill={colors.accent}
            mono
          >
            {String(index + 1).padStart(2, '0')}
          </Label>
          <Label data-command x={x + 92} y={step.y + 10} fontSize={28}>
            {step.command}
          </Label>
          <path
            d={inkFrame(x + 76, step.y + 28, 388, 60, 8)}
            fill={index === 1 ? colors.tint : colors.paper}
          />
          <Label data-result-state x={x + 92} y={step.y + 69} fontSize={30} mono>
            s17: ayşe
          </Label>
          <Label
            data-command-result
            x={x + 448}
            y={step.y + 69}
            textAnchor="end"
            fontSize={28}
            fill={index === 1 ? colors.accent : colors.muted}
          >
            {step.result}
          </Label>
        </g>
      ))}

      <path
        data-application-order
        d={`M ${x + 48} 240 V 342`}
        fill="none"
        stroke={colors.ink}
        strokeWidth={2.5}
        strokeLinecap="round"
        markerEnd={arrow.end}
      />
    </g>
  )
}

export function ApplyOrderedRequests() {
  return (
    <StoryScene label="c de b’den commit index’i öğrendi. b ve c kendi makinelerinde kesinleşmiş ve henüz uygulamadıkları aynı iki komutu aynı rezervasyon kuralıyla log sırasıyla işliyor. iki sütunun başlangıç durumu aynı: s17 boş. birinci komut ayşe’nin s17 isteği; her iki kopyada s17 ayşe’ye ayrılıyor. ikinci komut bora’nın s17 isteği; her iki kopyada ret sonucu üretiliyor ve s17 ayşe’de kalıyor. eşittir işaretleri her adımdaki durum ve sonuçların eşitliğini gösteriyor. bu diyagram eşzamanlı çalışmayı değil iki kopyanın aynı sırayı uyguladıktan sonraki sonuçlarını karşılaştırıyor. gösterilenler yerel state machine sonuçları; ayşe’ye yeniden onay veya c’den müşteriye cevap gönderilmiyor. aynı başlangıç durumu, aynı komut sırası ve aynı deterministik kuralla iki kopya aynı durum ve sonuç dizisini üretiyor: replicated state machine.">
      <ReplicaApplication id="b" x={80} />
      <ReplicaApplication id="c" x={880} />
      <g aria-hidden="true">
        <Label x={720} y={140} textAnchor="middle" fontSize={42} fill={colors.muted}>
          =
        </Label>
        <Label x={720} y={273} textAnchor="middle" fontSize={42} fill={colors.muted}>
          =
        </Label>
        <Label x={720} y={445} textAnchor="middle" fontSize={42} fill={colors.accent}>
          =
        </Label>
      </g>
    </StoryScene>
  )
}
