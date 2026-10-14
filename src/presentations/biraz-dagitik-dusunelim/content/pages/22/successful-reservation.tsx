import { colors, inkFrame, Label, useArrow } from '../../components/graphics/primitives'
import { StoryScene } from '../../components/graphics/recovery/story/scene'

function NextCommand({ id, x }: { id: 'b' | 'c'; x: number }) {
  const arrow = useArrow()
  return (
    <g data-next-command={id}>
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
      <Label x={x + 456} y={68} textAnchor="end" fontSize={24} fill={colors.accent}>
        güncel term 3
      </Label>
      <path d={`M ${x + 2} 92 H ${x + 478}`} stroke={colors.line} strokeWidth={2} />

      <Label x={x + 24} y={140} fontSize={24} fill={colors.muted}>
        01–02 uygulandı
      </Label>
      <Label
        data-preserved-state
        x={x + 456}
        y={140}
        textAnchor="end"
        fontSize={28}
        mono
      >
        s17: ayşe
      </Label>

      <circle
        cx={x + 48}
        cy={204}
        r={22}
        fill={colors.paper}
        stroke={colors.accent}
        strokeWidth={2}
      />
      <Label
        x={x + 48}
        y={212}
        textAnchor="middle"
        fontSize={22}
        fill={colors.accent}
        mono
      >
        03
      </Label>
      <Label data-new-command x={x + 92} y={214} fontSize={28}>
        bora’nın s18 isteği
      </Label>
      <path d={inkFrame(x + 76, 232, 388, 60, 8)} fill={colors.tint} />
      <Label x={x + 92} y={273} fontSize={26} fill={colors.muted}>
        kalıcı kayıt
      </Label>
      <Label
        data-new-command-term
        x={x + 448}
        y={273}
        textAnchor="end"
        fontSize={24}
        fill={colors.accent}
        mono
      >
        term 3
      </Label>

      {id === 'b' && (
        <g>
          <g data-commit-boundary>
            <path
              d={`M ${x + 16} 300 H ${x + 464}`}
              fill="none"
              stroke={colors.accent}
              strokeWidth={3}
              strokeLinecap="round"
            />
            <Label x={x + 24} y={332} fontSize={24} fill={colors.muted}>
              2 / 3 kopyada
            </Label>
            <Label
              x={x + 448}
              y={332}
              textAnchor="end"
              fontSize={24}
              fill={colors.accent}
            >
              commit index: 03
            </Label>
          </g>
          <path
            data-apply-order
            d={`M ${x + 240} 350 V 388`}
            fill="none"
            stroke={colors.ink}
            strokeWidth={2.5}
            strokeLinecap="round"
            markerEnd={arrow.end}
          />
          <Label x={x + 24} y={384} fontSize={24} fill={colors.muted}>
            uygulama
          </Label>
          <path d={inkFrame(x + 24, 400, 432, 64, 8)} fill={colors.tint} />
          <Label data-new-state x={x + 48} y={443} fontSize={30} mono>
            s18: boş → bora
          </Label>
        </g>
      )}
    </g>
  )
}

export function SuccessfulReservation() {
  const arrow = useArrow()
  const accentArrow = useArrow(colors.accent)
  return (
    <StoryScene label="a’ya hala ulaşılamıyor. 21’de b ve c önceki 01 ve 02 komutlarını uygulamıştı; her iki panelin üst özeti s17’nin ayşe’de kaldığını koruyor. bora bu kez boş s18 için yeni bir istek gönderiyor. b bu isteği log’un üçüncü konumuna kendi güncel term 3 damgasıyla ekliyor. sağa giden ok yalnız yeni 03 komutunun c’ye aktarımını gösteriyor. c komutu kalıcı saklayıp b’ye cevap veriyor. geri dönen kalıcı kayıt cevabı oku b’deki commit index 03’e yöneliyor. üç üyeden ikisinde doğrulanan current-term kayıt kesinleşiyor. b bundan sonra yalnız yeni 03 komutunu uygulayıp boş s18’i bora’ya ayırıyor; iç dikey ok commit öncesi uygulanmadığını gösteriyor. en alttaki dışa çıkan ok primary b’den müşteri bora’ya s18 senin cevabını taşıyor. c’ye commit 03 bilgisinin geldiği veya c’nin yeni komutu henüz uyguladığı gösterilmiyor. c’nin durable cevabı b’ye, rezervasyon onayı ise yalnız b’den bora’ya gider. ayşe’nin s17 rezervasyonu korunurken a’yı beklemeden yeni bir rezervasyon tamamlandı.">
      {arrow.marker}
      {accentArrow.marker}
      <NextCommand id="b" x={80} />
      <NextCommand id="c" x={880} />

      <g fill="none" strokeWidth={3} strokeLinecap="round">
        <path
          data-recovery-step="replicate-new-command"
          d="M 572 260 H 868"
          stroke={colors.ink}
          markerEnd={arrow.end}
        />
        <path
          data-recovery-step="durable-reply"
          d="M 868 300 H 572"
          stroke={colors.accent}
          markerEnd={accentArrow.end}
        />
        <path
          data-client-response
          d="M 572 474 H 678"
          stroke={colors.accent}
          markerEnd={accentArrow.end}
        />
      </g>
      <Label x={720} y={202} textAnchor="middle" fontSize={26} fill={colors.muted}>
        yeni komut
      </Label>
      <Label x={720} y={238} textAnchor="middle" fontSize={30} mono>
        03
      </Label>
      <Label x={720} y={338} textAnchor="middle" fontSize={26} fill={colors.accent}>
        kalıcı kaydettim.
      </Label>

      <g data-client="bora">
        <Label x={628} y={454} textAnchor="middle" fontSize={24} fill={colors.accent}>
          s18 senin.
        </Label>
        <circle
          cx={720}
          cy={448}
          r={12}
          fill={colors.paper}
          stroke={colors.ink}
          strokeWidth={2.5}
        />
        <path
          d="M 694 484 V 479 C 694 463 746 463 746 479 V 484"
          fill="none"
          stroke={colors.ink}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Label x={720} y={524} textAnchor="middle" fontSize={26}>
          bora
        </Label>
      </g>
    </StoryScene>
  )
}
