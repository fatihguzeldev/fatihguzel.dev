import { colors, inkFrame, Label, useArrow } from '../../components/graphics/primitives'
import { StoryScene } from '../../components/graphics/recovery/story/scene'

const entries = [
  { y: 204, command: 'ayşe’nin s17 isteği', term: 1, note: 'önceki kayıt' },
  { y: 376, command: 'bora’nın s17 isteği', term: 3, note: 'yeni komut' },
] as const

function OrderedLog({ id, x }: { id: 'b' | 'c'; x: number }) {
  return (
    <g data-ordered-log={id}>
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
      <Label x={x + 456} y={68} textAnchor="end" fontSize={24} fill={colors.accent}>
        güncel term 3
      </Label>
      <path d={`M ${x + 2} 92 H ${x + 478}`} stroke={colors.line} strokeWidth={2} />
      <Label x={x + 24} y={140} fontSize={26} fill={colors.muted}>
        kalıcı komutlar
      </Label>

      {entries.map((entry, index) => (
        <g key={entry.command} data-log-position={index + 1}>
          <circle
            cx={x + 48}
            cy={entry.y}
            r={22}
            fill={colors.paper}
            stroke={colors.accent}
            strokeWidth={2}
          />
          <Label
            x={x + 48}
            y={entry.y + 8}
            textAnchor="middle"
            fontSize={22}
            fill={colors.accent}
            mono
          >
            {String(index + 1).padStart(2, '0')}
          </Label>
          <Label data-command x={x + 92} y={entry.y + 10} fontSize={28}>
            {entry.command}
          </Label>
          <path
            d={inkFrame(x + 76, entry.y + 28, 388, 60, 8)}
            fill={index === 1 ? colors.tint : colors.paper}
          />
          <Label x={x + 92} y={entry.y + 69} fontSize={26} fill={colors.muted}>
            {entry.note}
          </Label>
          <Label
            data-log-term
            x={x + 448}
            y={entry.y + 69}
            textAnchor="end"
            fontSize={24}
            mono
            fill={entry.term === 3 ? colors.accent : colors.muted}
          >
            term {entry.term}
          </Label>
        </g>
      ))}

      {id === 'b' && (
        <g data-commit-boundary>
          <path
            d={`M ${x + 16} 464 H ${x + 464}`}
            fill="none"
            stroke={colors.accent}
            strokeWidth={3}
            strokeLinecap="round"
          />
          <Label x={x + 24} y={498} fontSize={24} fill={colors.muted}>
            2 / 3 kopyada
          </Label>
          <Label
            x={x + 448}
            y={498}
            textAnchor="end"
            fontSize={24}
            fill={colors.accent}
          >
            commit index: 02
          </Label>
        </g>
      )}
    </g>
  )
}

export function ReplicateOrderedRequests() {
  const arrow = useArrow()
  const accentArrow = useArrow(colors.accent)
  return (
    <StoryScene label="19’da b term 3’te primary seçilmişti ama c’nin istek kayıtları hala boştu. bora s17’yi istiyor. b yeni komutu log’un ikinci konumuna, ayşe’nin term 1 kaydının arkasına term 3 ile ekliyor. iki panelde 01 ayşe ve 02 bora aynı konumlarda. sağa giden ok bu iki komutun aynı sırayla c’ye aktarıldığını gösteriyor. c ikisini de diske kaydedip b’ye cevap veriyor. geri dönen cevap oku b’de ikinci kaydın altındaki commit index’ine yöneliyor: b kendi term 3 kaydının b ve c’de, yani üç üyeden ikisinde kalıcı olduğunu doğruladığında commit index’i ikinci kayda ilerletiyor. yalnız b’de gösterilen commit index ortak geçmişte bora’nın ikinci konumdaki yerinin kesinleştiğini anlatıyor; ayşe’nin eski onayı veya sırası yeniden karara açılmıyor. c henüz commit bilgisini almadı. burada koltuk durumu veya rezervasyon sonucu hesaplanmıyor; kesinleşen şey komut sırası. bu log protokolünde consensus ile kesinleştirdiğimiz ortak karar bu sıra. sonraki sayfada aynı 01 ve 02 konumları iki kopyada uygulanıp yerel durum ve sonuç üretecek.">
      {arrow.marker}
      {accentArrow.marker}
      <OrderedLog id="b" x={80} />
      <OrderedLog id="c" x={880} />
      <g fill="none" strokeWidth={3} strokeLinecap="round">
        <path
          data-recovery-step="replicate-ordered-commands"
          d="M 572 260 H 868"
          stroke={colors.ink}
          markerEnd={arrow.end}
        />
        <path
          data-recovery-step="acknowledge"
          d="M 868 344 C 760 344 640 464 572 464"
          stroke={colors.accent}
          markerEnd={accentArrow.end}
        />
      </g>
      <Label x={720} y={202} textAnchor="middle" fontSize={26} fill={colors.muted}>
        aynı sıra
      </Label>
      <Label x={720} y={238} textAnchor="middle" fontSize={30} mono>
        01 → 02
      </Label>
      <Label x={720} y={326} textAnchor="middle" fontSize={26} fill={colors.accent}>
        kalıcı kaydettim.
      </Label>
    </StoryScene>
  )
}
