import {
  colors,
  connectorGap,
  Diagram,
  diagramType,
  inkFrame,
  inkOval,
  Label,
  useArrow,
} from '../../components/graphics/primitives'

function StepNumber({ x, number }: { x: number; number: string }) {
  return (
    <g>
      <path
        d={inkOval(x, 85, 26, 26)}
        fill={colors.paper}
        stroke={colors.accent}
        strokeWidth={2}
      />
      <Label
        x={x}
        y={94}
        textAnchor="middle"
        fontSize={diagramType.metadata}
        mono
        fill={colors.accent}
      >
        {number}
      </Label>
    </g>
  )
}

export function ReplicationBeforeApproval() {
  const arrow = useArrow(colors.accent)
  return (
    <Diagram
      viewBox="0 -30 1440 540"
      label="ayşe’nin isteğini yeni yaklaşımla baştan işliyoruz. bu kez kopyaladığımız şey uygulanmış koltuk durumu değil reserve(s17, ayşe) komutu. önce a komutu kalıcı saklıyor, sonra b aynı komutu kalıcı saklıyor. b’de komut henüz uygulanmadı. a ancak bundan sonra komutu uygulayıp s17’yi ayşe’ye ayırıyor ve ayşe’ye koltuk senin cevabını veriyor. oklar işlem sırasını gösteriyor. kalıcı komut kaydı ile komut uygulanınca oluşan yerel durum farklı şeyler."
    >
      {arrow.marker}
      {[60, 570].map((x) => (
        <path
          key={x}
          d={`M ${x + 26 + connectorGap} 85 H ${x + 510 - 26 - connectorGap}`}
          fill="none"
          stroke={colors.accent}
          strokeWidth={2.5}
          strokeLinecap="round"
          markerEnd={arrow.end}
        />
      ))}

      <g>
        <StepNumber x={60} number="01" />
        <Label x={30} y={162} fontSize={36}>
          a’ya kaydet
        </Label>
        <path
          d={inkFrame(30, 220, 360, 100, 12)}
          fill={colors.white}
          stroke={colors.ink}
          strokeWidth={2.5}
        />
        <Label x={54} y={280} fontSize={diagramType.metadata} mono>
          reserve(s17, ayşe)
        </Label>
        <Label x={30} y={374} fontSize={diagramType.metadata} fill={colors.muted}>
          kalıcı komut kaydı
        </Label>
      </g>

      <g>
        <StepNumber x={570} number="02" />
        <Label x={540} y={162} fontSize={36}>
          b’ye kopyala
        </Label>
        <path
          d={inkFrame(540, 220, 360, 100, 12)}
          fill={colors.tint}
          stroke={colors.accent}
          strokeWidth={2.5}
        />
        <Label x={564} y={280} fontSize={diagramType.metadata} mono>
          reserve(s17, ayşe)
        </Label>
        <Label x={540} y={374} fontSize={diagramType.metadata} fill={colors.muted}>
          kalıcı komut kaydı
        </Label>
        <Label x={540} y={432} fontSize={diagramType.metadata} fill={colors.accent}>
          b’de henüz uygulanmadı
        </Label>
      </g>

      <g>
        <StepNumber x={1080} number="03" />
        <Label x={1050} y={162} fontSize={36}>
          a’da uygula
        </Label>
        <path
          d={inkFrame(1050, 220, 360, 100, 12)}
          fill={colors.tint}
          stroke={colors.accent}
          strokeWidth={2.5}
        />
        <Label x={1230} y={282} textAnchor="middle" fontSize={36} mono>
          s17: ayşe
        </Label>
        <Label x={1050} y={374} fontSize={diagramType.metadata} fill={colors.muted}>
          ayşe’ye cevap
        </Label>
        <Label x={1050} y={432} fontSize={diagramType.metadata}>
          “koltuk senin.”
        </Label>
      </g>
    </Diagram>
  )
}
