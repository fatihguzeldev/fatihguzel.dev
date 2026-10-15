import { colors, diagramType, Label } from '../primitives'
import { Database, ReplicationScene } from './scene/scene'

export function AlternativeHistories() {
  return (
    <ReplicationScene label="rezervasyon yapılmamış da olabilir, ayşe onay almış ama kopya b’ye ulaşmamış da; iki geçmişte b’nin kaydı s17 boş ve a’dan yanıt yok">
      <Database id="b" role="replica" owner="boş" observation="a’dan yanıt yok" />
      <g>
        <Label x={30} y={145} fontSize={diagramType.metadata} fill={colors.muted}>
          başka bir olasılık
        </Label>
        <Label x={30} y={224} fontSize={diagramType.label}>
          rezervasyon yapılmadı.
        </Label>
        <Label x={30} y={276} fontSize={diagramType.record} mono>
          a’da s17: boş
        </Label>
      </g>
      <g>
        <Label x={1010} y={145} fontSize={diagramType.metadata} fill={colors.accent}>
          mevcut geçmiş
        </Label>
        <Label x={1010} y={224} fontSize={diagramType.label}>
          ayşe onay aldı.
        </Label>
        <Label x={1010} y={276} fontSize={diagramType.record} mono>
          a’da s17: ayşe
        </Label>
        <Label x={1010} y={326} fontSize={diagramType.metadata} fill={colors.muted}>
          kayıt b’ye ulaşmadı.
        </Label>
      </g>
    </ReplicationScene>
  )
}
