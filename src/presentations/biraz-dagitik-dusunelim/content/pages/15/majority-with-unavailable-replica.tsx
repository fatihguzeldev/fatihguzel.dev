import {
  colors,
  Diagram,
  diagramType,
  inkOval,
  Label,
} from '../../components/graphics/primitives'

function Member({
  x,
  id,
  unreachable = false,
}: {
  x: number
  id: 'a' | 'b' | 'c'
  unreachable?: boolean
}) {
  return (
    <g>
      <path
        d={inkOval(x, 225, 69, 68, id === 'b' ? 1 : 0)}
        fill={unreachable ? colors.paper : colors.tint}
        stroke={unreachable ? colors.muted : colors.accent}
        strokeWidth={3}
        strokeDasharray={unreachable ? '8 8' : undefined}
        strokeLinecap="round"
      />
      <Label
        x={x}
        y={240}
        textAnchor="middle"
        fontSize={diagramType.node}
        mono
        fill={unreachable ? colors.muted : colors.ink}
      >
        {id}
      </Label>
      <Label
        x={x}
        y={333}
        textAnchor="middle"
        fontSize={diagramType.metadata}
        fill={colors.muted}
      >
        {unreachable ? 'yanıt yok' : 'kalıcı kayıt'}
      </Label>
    </g>
  )
}

export function MajorityWithUnavailableReplica() {
  return (
    <Diagram
      viewBox="0 -30 1440 540"
      label="aynı ayşe isteğini baştan farklı kurulmuş iki sistemde karşılaştırıyoruz. ikisinde de a primary olarak çalışıyor ve b’ye ulaşılamıyor. b’nin kaydedip kaydetmediğini bilmiyoruz. iki makineli sistemde yalnız a’daki kalıcı kayıt doğrulandı: çoğunluk için b’nin kaydı da doğrulanmalı ve onay bekliyor. üç makineli sistemde c baştan mevcut. a ve c’de aynı isteğin kalıcı kaydı doğrulandı: iki kayıt üç makinenin çoğunluğu ve a ayşe’ye onay verebiliyor. b her iki sistemde de toplam makine sayısına dahil."
    >
      <Label x={720} y={20} textAnchor="middle" fontSize={diagramType.label}>
        onay için iki makinede kalıcı kayıt gerekiyor.
      </Label>
      <path d="M 720 60 V 495" fill="none" stroke={colors.line} strokeWidth={2} />

      <g>
        <Label x={340} y={80} textAnchor="middle" fontSize={36}>
          iki makineli tasarım
        </Label>
        <Label x={340} y={132} textAnchor="middle" fontSize={diagramType.record} mono>
          a + b gerekiyor
        </Label>
        <Member x={220} id="a" />
        <Member x={460} id="b" unreachable />
        <Label x={340} y={422} textAnchor="middle" fontSize={diagramType.label}>
          b’den yanıt bekliyoruz.
        </Label>
        <Label x={340} y={474} textAnchor="middle" fontSize={diagramType.label}>
          ayşe’ye onay veremiyoruz.
        </Label>
      </g>

      <g>
        <Label x={1100} y={80} textAnchor="middle" fontSize={36}>
          üç makineli tasarım
        </Label>
        <Label x={1100} y={132} textAnchor="middle" fontSize={diagramType.record} mono>
          <tspan fill={colors.muted}>a + b</tspan>
          <tspan> veya </tspan>
          <tspan fill={colors.accentInk}>a + c</tspan>
        </Label>
        <Member x={880} id="a" />
        <Member x={1100} id="b" unreachable />
        <Member x={1320} id="c" />
        <Label x={1100} y={422} textAnchor="middle" fontSize={diagramType.label}>
          a ve c’de kayıt doğrulandı.
        </Label>
        <Label
          x={1100}
          y={474}
          textAnchor="middle"
          fontSize={diagramType.label}
          fill={colors.accent}
        >
          ayşe’ye onay verebiliyoruz.
        </Label>
      </g>
    </Diagram>
  )
}
