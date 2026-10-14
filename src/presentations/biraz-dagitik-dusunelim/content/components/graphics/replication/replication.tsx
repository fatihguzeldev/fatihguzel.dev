import { colors, connectorGap, diagramType, Label } from '../primitives'
import {
  Application,
  CopyInFlight,
  Database,
  ReplicationScene,
  RequestRoute,
  UnansweredContact,
} from './scene/scene'

export function AsyncReservation() {
  return (
    <ReplicationScene label="uygulama ayşe’nin s17 isteğini primary a’ya yazdırdı; ayşe onay aldı, replica b’ye giden kopya hala yolda">
      <RequestRoute target="a" />
      <CopyInFlight />
      <Database id="a" role="primary" owner="ayşe" active />
      <Database id="b" role="replica" owner="boş" />
      <Application customer="ayşe" />
    </ReplicationScene>
  )
}

export function UnreachablePrimary() {
  return (
    <ReplicationScene label="a’ya hem b’den hem uygulamadan ulaşılamıyor; b hala replica ve s17 boş; bora’nın isteği yanıt bekliyor">
      <RequestRoute target="a" waiting />
      <UnansweredContact />
      <Database
        id="a"
        role="primary"
        owner="ayşe"
        unreachable
        observation="arıza mı, gecikme mi?"
      />
      <Database id="b" role="replica" owner="boş" />
      <Application customer="bora" waiting />
    </ReplicationScene>
  )
}

export function UnsafeFailover() {
  return (
    <ReplicationScene label="deneme olarak yazma yetkisi b’ye taşındı; b bora’yı onaylıyor, ayşe’nin daha önce aldığı onay hala geçerli">
      <RequestRoute target="b" />
      <Database id="a" role="eski primary" owner="ayşe" unreachable />
      <Database id="b" role="primary" owner="bora" active />
      <Application customer="bora" />
      <path
        d={`M 210 ${382 + connectorGap} V 408`}
        fill="none"
        stroke={colors.line}
        strokeWidth={2}
      />
      <Label x={210} y={446} textAnchor="middle" fontSize={diagramType.metadata}>
        önceki onay: ayşe
      </Label>
    </ReplicationScene>
  )
}
