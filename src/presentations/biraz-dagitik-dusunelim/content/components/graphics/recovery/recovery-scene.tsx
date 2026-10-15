import { colors, Label } from '../primitives'
import { Topology } from '../topology/topology'

export function RecoveryScene({ phase }: { phase: 'acknowledged' | 'election' }) {
  const election = phase === 'election'
  const groupStart = election ? 552 : 42
  const groupEnd = groupStart + 846

  return (
    <Topology
      label={
        election
          ? 'a’ya artık ulaşılamıyor. b’de ayşe’nin kalıcı kaydı aynı yerde duruyor. c’de bu kayıt yok. yeni primary seçimine katılabilen çoğunluk b ve c. önceki kayıt çoğunluğuyla ortak makine b olduğundan seçim b’nin oyunu gerektiriyor.'
          : 'bu kez ayşe’nin isteğini a ve b kalıcı olarak kaydetti. üç makinenin ikisinde kayıt doğrulandı ve ayşe koltuk senin cevabını aldı. c’de henüz bu kayıt yok.'
      }
      nodes={[
        {
          id: 'a',
          role: 'primary',
          entries: ['reserve(s17, ayşe)'],
          status: election ? 'ulaşılamıyor' : 'kalıcı kayıt',
          active: !election,
          unreachable: election,
        },
        {
          id: 'b',
          role: 'replica',
          entries: ['reserve(s17, ayşe)'],
          status: 'kalıcı kayıt',
          active: true,
        },
        { id: 'c', role: 'replica', entries: [], status: 'bu kayıt yok' },
      ]}
    >
      <Label
        x={(groupStart + groupEnd) / 2}
        y={20}
        textAnchor="middle"
        fontSize={30}
        fill={colors.accent}
      >
        {election ? 'yeni primary’yi seçecek çoğunluk' : 'onay için gereken çoğunluk'}
      </Label>
      <path
        d={`M ${groupStart} 74 V 60 Q ${groupStart} 48 ${groupStart + 12} 48 H ${groupEnd - 12} Q ${groupEnd} 48 ${groupEnd} 60 V 74`}
        fill="none"
        stroke={colors.accent}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Topology>
  )
}
