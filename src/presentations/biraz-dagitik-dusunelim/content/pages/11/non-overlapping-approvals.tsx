import { CustomerSequence } from '../../components/graphics/customer-sequence/customer-sequence'

export function NonOverlappingApprovals() {
  return (
    <CustomerSequence
      orderLabel="sonra"
      label="az önceki failover’ın müşterilere görünen akışı. ayşe, a’dan s17 için koltuk senin onayını alıyor. ancak bu onaydan sonra bora rezervasyon istiyor. eksik kopya b primary yapılıyor ve bora da koltuk senin cevabını alıyor. a ve b kendi kopyalarında boş gördükleri koltuğu birer kez ayırdılar; fakat aynı s17 için iki onay verdiler. istekler aynı anda gelmese de sistem hatalı davranabiliyor."
      events={[
        {
          title: 'ayşe onayı aldı',
          message: '“koltuk senin.”',
          notes: ['a boş gördü.', 'ayşe’ye ayırdı.'],
          emphasized: true,
        },
        {
          title: 'bora rezervasyon istedi',
          message: '“s17’yi istiyorum.”',
          notes: ['b’yi primary yaptık.'],
        },
        {
          title: 'bora da onay aldı',
          message: '“koltuk senin.”',
          notes: ['b boş gördü.', 'bora’ya ayırdı.'],
          emphasized: true,
        },
      ]}
    />
  )
}
