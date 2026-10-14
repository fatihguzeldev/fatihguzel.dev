import { CustomerSequence } from '../../components/graphics/customer-sequence/customer-sequence'

export function StaleReadAfterApproval() {
  return (
    <CustomerSequence
      label="aynı örnekte bora rezervasyon yapmak yerine yalnızca koltuğun durumunu sorsaydı: ayşe, a’dan s17 için koltuk senin cevabını alıyor. bu onaydan sonra bora, diğer veritabanı kopyası b’ye s17 boş mu diye soruyor. rezervasyon b’ye henüz ulaşmadığı için b boş cevabını veriyor. linearizability istiyorsak onaydan sonra başlayan bu sorguya boş cevabını veremeyiz."
      events={[
        {
          title: 'ayşe onayı aldı',
          message: '“koltuk senin.”',
          notes: ['a’da s17 ayşe’nin.'],
          emphasized: true,
        },
        {
          title: 'bu kez bora sordu',
          message: '“s17 boş mu?”',
          notes: ['b: diğer veritabanı kopyası'],
        },
        {
          title: 'b’nin cevabı',
          message: '“boş.”',
          notes: ['rezervasyon b’ye', 'henüz ulaşmadı.'],
          emphasized: true,
        },
      ]}
    />
  )
}
