---
title: 'mühendisliğin evrimi ve kocaman yanılgılar'
slug: 'muhendisligin-evrimi-ve-kocaman-yanilgilar'
publishedAt: '2026-07-08'
description: 'yazılım sandığımız bazı yüzey işlerin değiştiği; mühendisliğin ise yeniden tanımlandığı bir döneme bakış.'
language: 'tr'
tags: ['software engineering', 'AI', 'career']
draft: false
---

## giriş

yazılım mühendisliğinin önümüzdeki yıllarda hangi yönlere gidebileceği üzerine uzun zamandır düşünüyorum. hatta bunu sadece yazılım mühendisliğiyle sınırlamak istemiyorum, düşündüğüm eksen epey geniş; bilgisayar bilimi, ürün geliştirme, mühendislik kültürü ve insan emeğinin yazılım üretimindeki yeri de aynı tartışmanın içinde.

"dünya bir gaz bulutuydu" kısmını hızlıca geçmek için şunu en baştan söyleyelim: son birkaç yılda yaşadığımız değişim, klasik teknoloji döngülerine pek benzemiyor. eskiden yeni bir aracın ya da yaklaşımın etkisini görmek için aylar, bazen yıllar geçmesi gerekiyordu. bugün ise bir modelin, bir geliştirme aracının ya da yeni bir üretim biçiminin etkisini bazen aynı gün içinde bile hissedebiliyoruz. sektör, kendi feedback loop'unun içine girmiş gibi.

bu yüzden "yazılım bitiyor mu?" sorusu bana giderek daha da eksik geliyor, çünkü **yazılım dediğimiz şey tek bir katmandan oluşmuyor**. bir "yazılımcı" buton component'i yazıyorken, başka bir "yazılımcı" dağıtık bir sistemin davranışını anlamaya çalışıyor. bambaşka bir yerde, başka bir "yazılımcı" tarif edilmiş bir ticket'ı kapatmaya çalışıyorken, bir diğer "yazılımcı" belirsiz bir problemi mühendislik kararlarına dönüştürmeye çalışıyor.

burada tartışacağımız şey, yazılımın bitip bitmediğinden çok, hayatımızda nelerin değiştiği. bir sektör raporu, çözüm önerisi ya da kesin bir tahmin üretme iddiam yok. daha çok, bir süredir kafamın içinde dönüp duran düşünceleri toparlama denemesi. yazılımın nereye gittiğini, bu değişimin sektörün farklı katmanlarında nasıl hissedildiğini ve bazı şeylerin neden artık eskisi kadar doğal görünmediğini anlamaya çalışıyorum.

## bolluk yanılgısı

yazılım sektörünü konuşurken bazen en basit şeyi atlıyoruz; bu da nihayetinde bir piyasa. bir endüstri. **arz ve talep** dengesiyle büyüyor, şişiyor, yön değiştiriyor. bazen de daralıyor. yazılımın etrafında kurduğumuz romantik anlatılar, mühendislik idealleri, teknoloji kültürü ya da "geleceğin mesleği" söylemleri bu gerçeği değiştirmiyor.

bir şeye duyulan ihtiyaç artıyorsa ve bu ihtiyacı karşılayabilecek insan sayısı sınırlıysa o şey kıymetlenir. bu arzın talebi karşılamadığı çok basit bir denklem. bu sadece yazılım sektörü için geçerli değil; dünyadaki neredeyse her meslek, her ürün, her hizmet bir noktada bu basit dengeye göre şekilleniyor.

yazılımı uzun süre özel yapan şeylerden biri de buydu: dünya daha fazla yazılıma ihtiyaç duyuyordu ama **bu ihtiyacı karşılayabilecek yeterli insan yoktu**.

pandemi öncesi dönemi böyle okumak gerektiğini düşünüyorum. dünya zaten çok büyük bir dijitalleşme kuşağındaydı. şirketler daha fazla uygulama (hem mobil hem web), daha fazla otomasyon, daha fazla dashboard, daha fazla entegrasyon, daha fazla veri işleme kabiliyeti istiyordu. yazılım artık yalnızca teknoloji şirketlerinin işi değildi; bankadan lojistiğe, eğitimden sağlığa, e-ticaretten insan kaynaklarına kadar her sektörün içine zaten sızmıştı.

bu da yazılım emeğini doğal olarak, bizler için, değerli hale getirdi. iyi yazılımcı bulmak zordu, bence hala çok zor, yazılım ekipleri büyüyordu. şirketler teknik kapasiteyi doğrudan rekabet avantajı olarak görmeye zaten başlamıştı. bilgisayar mühendisliği de bu yüzden sadece "bilgisayarları seven insanların seçtiği bölüm" olmaktan çıktı. kaç tanemiz gerçekten bölümün içeriğini biliyordu? bence bu iyi bir araştırma konusu. genel olarak insanları "cezbeden" imkanlar mevcuttu:

- iyi maaş
- global çalışma ihtimali
- remote iş
- statü ve sınıf atlama vaadi

insanların bu alana yönelmesi bu yüzden hiç de irrasyonel değil. oldukça rasyonel hatta. piyasa yıllarca çok net bir sinyal verdi:

> burada talep var. para var. büyüme var. hareket alanı devasa.
> üniversite ya da ilgili bölüm mezunu olmanıza da gerek yok, bootcamp'e girin gelin.

akabinde gelen self-taught hikayeleri, kariyer değişim hikayeleri ve "developer olun" anlatısı da bunların hepsini harmanlayan şeyler. biri birinin sonucu değil, hepsi bir bütün.

yukarıda bahsettiğim piyasa sinyallerinin de ilginç bir tarafı var: hepsi gecikmeli çalışıyor. talep bugün yükselebilir, fakat bu talebe cevap olarak yetişen arz birkaç yıl sonra piyasaya giriyor. yani bir şirketin daha fazla yazılımcıya ihtiyaç duymasıyla, gerçekten production ortamında sorumluluk alabilecek yazılımcının yetişmesi aynı hızda gerçekleşmiyor.

> diploma almak, kurs bitirmek ya da bir framework'ü öğrenmenin arzı sayısal olarak artabilir; mühendislik olgunluğu çok daha yavaş gerçekleşir.

bence, buradaki en büyük yanılgılardan birisi de böyle ortaya çıktı. yazılımın o dönemki ekonomik değerini, yalnızca kendi doğasından geliyor sandık. halbuki o değerin önemli bir kısmı, _talebin arzdan hızlı büyümesinden_ geliyordu. başka bir deyişle yazılım sadece önemli olduğu için değil, aynı zamanda yeterince insan tarafından iyi yapılamadığı için de pahalıydı.

bu ayrımın çok önemli olduğunu düşünüyorum. burayı bu yüzden bu kadar uzun ve detaylı tuttum. çünkü bir şeyin önemli olması, onu piyasadaki her katmanının sonsuza dek aynı değerde kalacağı anlamına gelmiyor. bugün görüyoruz. elektrik de önemli, lojistik de önemli. muhasebe de önemli, hukuk da önemli. ama her alanda değer, o alanın içindeki hangi becerinin kıt/eksik olduğuna göre şekilleniyor.

yazılımda da bugün değişen şey biraz bu. "yazılımın değeri düştü mü?" sorusuna sizlerle paylaşabileceğim net bir cevabım yok; **yazılım emeğinin hangi kısmının kıt/eksik olduğunun** kesinlikle değişmeye başladığını düşünüyorum. pandemi de bu dengeyi başlatan aktör değil, sadece abarttı.

## aynı kelimenin altında: yazılım mühendisliği

burada biraz durup başka bir yanılgıya geçmemiz gerekiyor:

> yazılımı tek bir meslekmiş gibi konuşmak.

gündelik dilde bunu çok rahat yapıyoruz. "yazılımcı" diyoruz, "software engineer" diyoruz, "developer" diyoruz. ama bu kelimelerin altında birbirinden epey farklı gerçekler yaşıyor. bir insan gününün büyük bir kısmını product backlog'undan gelen tarif edilmiş işleri kapatarak geçirirken, başka biri sistemin production'daki davranışını anlamaya çalışıyor. biri react component'i yazıyor, biri veri tutarlılığı problemini çözüyor. biri HTML form validasyonu yapıyor, biri latency, maliyet, güvenlik ya da ölçek problemiyle uğraşıyor.

bunların hepsi yazılımın içinde. **fakat aynı ağırlıkta değiller.**

buradaki amacım kesinlikle bir işi diğerinden daha "onurlu" göstermek değil. zaten ürün geliştirme dediğimiz şey, bu katmanların hepsine ihtiyaç duyuyor. buton da yazılacak, form da yapılacak, API da bağlanacak, dashboard da geliştirilecek. problem bunların hiçbirisi değil. problem, bu işlerin tamamını aynı mesleki derinlikteymiş gibi konuşmaya başladığımızda ortaya çıkıyor.

çünkü bir ünvan fazla genişlediğinde _ayırt etme gücünü_ kaybediyor. "software engineer" dediğimizde bazen framework bilen uygulama geliştiricisini, bazen sistem tasarlayan mühendisi, bazen ürün problemini teknik kararlara çeviren kişiyi, bazen de yalnızca kendisine verilmiş küçük parçaları uygulayan birini kastediyoruz. aynı kelime, birbirinden çok farklı seviyeleri taşımaya çalışıyor.

> aslında doğru tedrisattan geçmiş, bilgisayar mühendisliği eğitimi almış, işin teorisini öğrenmiş bir mühendisten hepsini belirli kapasitelerde yapabilmesini beklemeliyiz.
> değil mi?

uzun süre bu çok büyük bir problem gibi görünmedi gözüme. belki hala birçoğunuz için bir sorun değil. çünkü piyasa çok genişti. talep fazlaydı. şirketler büyüyordu. yazılım ekipleri kalabalıklaşıyordu. böyle bir ortamda tek bir framework etrafında mesleki kimlik kurmak bile yeterliydi.

"react developer", "angular developer", "backend developer", "full-stack developer" gibi etiketler piyasa içinde anlamlı sinyaller üretiyordu.

ben, çok uzun bir süredir, bu sinyallerin aşırı zayıf olduğunu hissediyorum.

react bilmenin hala bir değeri var, eskisi kadar olmasa da. node bilmek hala değerli olabilir. bir framework'ü çok iyi kullanmak hala değer taşıyor olabilir. ama bunlar tek başına, eskisi kadar, güçlü bir mesleki kimlik taşımıyor. daha çok mühendislik pratiğinin içindeki araçlara dönüşüyorlar. başka hiçbir alanda tek bir aleti kullanabilmek, o alanın tamamını temsil etmiyor. yazılımda ise uzun süre araç bilgisiyle mesleki kimliği birbirine çok yakın tuttuk.

- yıldız tornavida ustası
- avuç taşlama ustası
- hilti ustası

bence bugün çatırdayan şeylerden birisi de bu.

yazılımın bazı katmanları hala büyüyor, bazıları dönüşüyor, bazıları daralıyor. ama hepsini aynı kelimeyle anlattığımız için, olan biteni de yanlış okuyoruz. "yazılım bitiyor mu?" sorusu biraz da bu yüzden eksik. hangi yazılım? hangi katman? hangi sorumluluk seviyesi? hangi problem?

bu soruları sormadan verilen cevaplar bana çok yüzeyde kalıyor.

## kolay olanın ucuzlaması

yapay zekanın yazılım üzerindeki etkisini doğru okuyabilmek için önce hangi yazılımdan bahsettiğimizi netleştirmek gerekiyor.

"AI yazılımı bitirecek" söylemi bu yüzden çok yüzeysel. çünkü **AI'ın etkisi her katmanda aynı değil**. bir dağıtık sistemin davranışını anlamakla, var olan bir tasarım sistemine uygun yeni bir card component'i yazmak aynı şey değil. production'da sebebi belirsiz bir latency problemini çözmekle, tarif edilmiş bir crud ekranını çıkarmak aynı şey değil. ikisi de yazılımın içinde ama ikisi de aynı şekilde etkilenmiyor.

bugün büyük dil modellerinin en güçlü olduğu yerlerden biri, iyi tariflenmiş ve daha önce defalarca çözülmüş problemlerin etrafı.

- boilerplate kod
- component iskeleti
- basit endpoint'ler
- form validasyonu
- test suite yazmak
- küçük refactor'ler
- migration'lar
- dokümantasyon
- API bağlama işleri
- styling düzenlemeleri

listeyi oldukça uzatabiliriz. bunların tamamı gerçek işler. fakat aynı zamanda _örüntüsü çok güçlü_ işler.

#### örüntüsü güçlü olan şey de ucuzluyor.

burada "ucuzlamak" kelimesini özellikle kullanıyorum. çünkü bu işlerin tamamen yok olduğunu düşünmüyorum. buton yine yazılacak. form yine yapılacak. dashboard yine geliştirilecek. müşteri yine bir flow isteyecek. ürün ekibi yine yeni bir feature çıkaracak. ama bu işleri yapmanın _marjinal maliyeti_ oldukça değişmiş durumda. aynı işi daha az insanla, daha kısa sürede, daha az koordinasyon maliyetiyle yapabildiğiniz bir dünyada, o işin etrafında eskisi kadar koltuk oluşmuyor. çok mantıklı değil mi?

bence birçok insanın hissettiği sıkışma biraz buradan geliyor.

yazılımın yüzey katmanı hala var, ama **eskisi kadar insan taşımıyor**. ürünlerin görünen tarafında, tekrar eden işlerde, iyi tariflenmiş ticket'larda, framework reçetesiyle çözülebilen alanlarda üretkenlik ciddi şekilde artıyor. üretkenlik arttığında da piyasa aynı işi yapmak için eskisi kadar çok kişiye ihtiyaç duymuyor.

bu kötü bir şey mi, iyi bir şey mi bilmiyorum. hatta bu yazıda buna bir ahlaki değer de biçmek istemiyorum. sadece olan şeyin bu olduğunu düşünüyorum. bir iş daha hızlı yapılabilir hale geldiğinde, o işin piyasadaki ağırlığı değişir. bu marangozlukta da böyledir, muhasebede de böyledir, tasarımda da böyledir. yazılımda da böyle.

seri üretim.

asıl yanılgı, bu işleri "kolay" oldukları için önemsiz sanmak değil. tam tersi, bu işler uzun süre _sektörün giriş kapısıydı_. birçok insan yazılımı bu katmanda öğrendi. ben de o insanlardan birisiyim. component yazarak, form yaparak, küçük bug'lar çözerek, API bağlayarak, codebase'in içinde kaybola kaybola öğrendim. bunlar sadece ürün üretmenin değil, mühendislik olgunluğu kazanmanın da yoluydu.

bugün garip olan şey şu: öğrenmek için hala bu işlere ihtiyacımız var, ama piyasa bu işlere eskisi kadar sabır ve koltuk ayırmak istemiyor. piyasa aslında birisi değil. o yüzden bu kararını sorgulayamıyoruz. kabul ediyoruz. değişmek zorundayız.

mesele yalnızca "AI bazı işleri otomatikleştiriyor" değil. daha da derindeki mesele şu:

> yazılımın en görünür ve en kalabalık katmanında, insan emeğinin ekonomik karşılığı yeniden hesaplanıyor.

ve bu hesap, maalesef ki, mesleğe giriş kapısında gerçekleşiyor.

## gürültünün içinde sinyal aramak

yeni mezun bir mühendis, bir anda dağıtık sistem tasarlayarak, production incident çözerek ya da büyük bir mimari kararın sorumluluğunu alarak başlayamaz. o yüzey katmanına bir ölçüde ihtiyacı var. çünkü çoğu insan bu mesleği küçük küçük parçalarla öğreniyor.

bir component yazıyorsun, sonra o component'in neden kötü yazıldığını production'dan gelen canlı feedback'ler ile öğreniyorsun. bir feedback loop. teknik olarak doğru olmasa da basit bir reinforcement learning örneği. bir şey yapıyorsun, gerçek dünyadan bir sinyal alıyorsun, sonra davranışını güncelliyorsun.

ya da, bir bug çözüyorsun sonra o bug'ın arkasında domain modelinin, state yönetiminin veya yanlış bir abstraction'un yattığını görüyorsun.

bu süreçleri defalarca kez yaşamak, süreçlerle sürtünme yaşamak ve kafa patlatmış olmak bizleri derinleştiren şeyler. yani yüzey katman sadece "kolay işlerin" olduğu yer değil. aynı zamanda **mesleğin öğrenildiği yer**.

bugün çelişki biraz da burada. piyasa bu işleri hala istiyor, ama bu işlerin etrafında eskisi kadar öğrenme alanı açmak istemiyor. şirketler daha hızlı output istiyor, daha az kişiyle daha çok şey yapmak istiyor. daha az risk almak istiyor. haliyle mesleğe yeni girecek insanlardan bile daha önce birkaç kez denemiş ve yanılmış, birkaç kez sistem bozmuş, birkaç kez production görmüş gibi davranmalarını bekliyor.

bu beklenti başta kulağa tuhaf geliyor olabilir. çünkü tecrübe dediğimiz şey zaten yaşanarak oluşuyor. ama piyasa bir noktadan sonra "tecrübe kazanabileceğin koltuğu" azaltıp, o koltuğa oturmak için tecrübeli olmanı beklemeye başlıyor.

bunun sonucunda ortaya çok büyük bir sinyal problemi çıkıyor.

aday sayısı çok fazla. herkes bir şeyler öğrenmiş, herkes bir şeyler yapmış, herkes bir yerden başlamaya çalışıyor. github profilleri, portfolio siteleri, bootcamp projeleri, clone app'ler, todo list'ler, dashboard'lar, next.js starter'lar, "full-stack developer" bio'ları... bunların hiçbirisi tek başına kötü değil. hatta bir noktada hepsi çok doğal. insanlar kendilerini göstermek için ellerindeki imkanlarla sinyal üretmeye çalışıyor.

fakat herkes benzer sinyaller ürettiğinde, **sinyal gürültüye dönüşüyor**.

bir adayın gerçekten iyi olup olmadığını anlamak zorlaşıyor. yalnızca iyi olup olmadığını değil, neyde iyi olduğunu anlamak da zorlaşıyor. biri hızlı kod yazıyor olabilir, ama sistemi anlamıyor olabilir. biri framework'ü iyi biliyor olabilir ama problem çözme tarafında zayıf olabilir. biri çok iyi öğreniyor olabilir ama henüz gösterecek doğru fırsatı bulamamış olabilir. biri de ortalama bir işi çok iyi pazarlıyor olabilir.

dışarıdan bakınca bunların çoğu birbirine benziyor.

şirketler de bu kalabalığın içinde hızlı filtreleme yapmak zorunda kalıyor. hızlı filtreleme de her zaman adil çalışmıyor. hatta çoğu zaman adil çalışmıyor. çünkü insanı gerçekten ayırt eden şeyler, cv'nin üstünden hızlıca geçerken görünmeyebiliyor. birinin belirsizlikte nasıl düşündüğü, production'da sorun çıktığında nasıl davrandığı, bir requirement'ı nasıl sorguladığı, ne zaman "daha basit" çözümü seçtiği, ne zaman abstraction'dan kaçtığı, ne zaman sorumluluk aldığı kolay ölçülen şeyler değil.

kolay ölçülen şeyler ise genelde daha yüzeyde kalıyor:

- kaç yıl deneyim?
- hangi okul?
- geçmişinde hangi şirketler?
- hangi stack?
- hangi framework'ler?
- kaç proje?
- github dolu mu?
- linkedin profili nasıl?

bunların tamamen anlamsız olduğunu söylemiyorum. ama bunların hiçbiri tek başına mühendislik olgunluğunu göstermiyor. sadece hızlı karar vermek zorunda kalan bir piyasanın kullanabileceği kaba filtreler bunlar.

bence bugünün en can sıkıcı taraflarından biri de bu. iyi insanın öne çıkması çok zorlaştı. çünkü kalabalık arttıkça, _doğru sinyali üretmek_ de _doğru sinyali okumak_ da zorlaşıyor. eskiden "ben yapabiliyorum" demek bir sinyaldi. bugün bu cümle hiçbir anlam ifade etmiyor.

> neyi, hangi bağlamda, hangi sorumluluk seviyesinde yapabiliyorsun?

bu yüzden mesele yalnızca aday sayısının artması ya da pozisyon sayısının azalması değil. mesele, aynı anda hem koltukların daha seçici hale gelmesi hem de o koltuklara ulaşmaya çalışan insanların birbirine çok benzeyen sinyallerle piyasaya çıkması.

burada yazılımcı adaylarını suçlamanın "kolaya kaçmak" olduğunu düşünüyorum. insanlar piyasanın verdiği sinyalleri yıllarca takip ettiler. öğrenin dendi, öğrendiler. proje yapın dendi, yaptılar. github doldurun dendi, doldurdular. linkedin'i düzenleyin dendi, düzenlediler. ama piyasa değiştiğinde, dün yeterli görülen sinyaller bugün çok zayıf kalmaya başladı.

bu da doğal olarak büyük bir sıkışma hissi yarattı.

çünkü sorun sadece "iş bulmak zorlaştı" kadar basit bir şey değil. sorun, neyin değerli olduğuna dair ortak zeminin kaymaya başlaması. hatta baya baya kayması. eskiden bir framework'ü iyi bilmek, bir şeyler deploy etmiş olmak, birkaç proje göstermek, temel seviyede ürün geliştirebilmek güçlü sinyallerdi.

> yazılım üretmek kolaylaşıyor, yazılım mühendisi olarak ayrışmak zorlaşıyor.

## geriye ne kalıyor?

kolay olan ucuzladığında geriye zor olan kalıyor. burada "zor" derken daha karmaşık syntax, daha egzotik framework'ler ya da daha havalı mimarilerden bahsetmiyorum.

bence yazılımda zor olan şey **kodun kendisi değil**. kodun neden var olduğunu anlamak. hangi problemi çözdüğünü, hangi sınırlar içinde çalıştığını, nerede kırılacağını, kimin hayatını kolaylaştıracağını, kimin operasyonunu bozacağını, hangi maliyeti üreteceğini ve hangi sorumluluğu beraberinde getirdiğini görebilmek.

mühendislik burada başlıyor. en azından ben öyle hissediyorum.

_tarif edilmiş bir işi yapmakla_, tarifin kendisini sorgulamak aynı şey değil. bir ticket'ı kapatmakla, o ticket'ın gerçekten doğru problemi çözüp çözmediğini anlamak aynı şey değil. çalışan kod yazmakla, o kodun production'da nasıl davranacağını öngörmek aynı şey değil. hatta bazen en iyi mühendislik kararı, kod yazmamak oluyor. yeni bir abstraction eklememek, yeni bir servis açmamak, sistemi daha da parçalamamak, var olan karmaşayı "daha modern" görünen bir karmaşayla değiştirmemek oluyor.

bunlar kulağa çok basit geliyor ama inanın öyle değiller. bence asıl zor olan şeyler bunlar.

**neyi neden tercih ettiğini bilmek.**

büyük dil modelleri bu noktada ilginç bir ayna tutuyor. çünkü artık kod üretmek çok kolay. hatta bazen rahatsız edici derecede kolay. birkaç cümleyle mükemmel çalışan bir component çıkartabiliyoruz, endpoint yazdırabiliyoruz, test ürettirebiliyoruz, migration hazırlayabiliyoruz, bir dosyayı refactor ettirebiliyoruz. bu muazzam bir şey. fakat aynı zamanda şunu daha görünür hale getiriyor:

**kod üretmek ile mühendislik yapmak aynı şey değil.**

AI bir şeyler önerebilir, alternatifler çıkarabilir, hız kazandırabilir, daha önce gördüğü örüntüleri inanılmaz bir şekilde yeniden kullanabilir. ama hangi çözümün hangi bağlamda doğru olduğuna karar verme meselesi hala insanda kalıyor. en azından bugün için bu böyle. çünkü **bağlam dediğimiz şey sadece koddan ibaret değil**. ürün var, kullanıcı var, şirketin hedefleri var, ekip kapasitesi var, bakım maliyeti var, güvenlik var, operasyon var, eski kararların tortusu var, gelecekte alınacak kararların ihtimalleri var.

yani mesele biraz da:

> sen AI'ın yazdığı kodun ne anlama geldiğini anlayabiliyor musun?

bu soru, bence, bu dönemin en kritik ayrımlarından biri. çünkü üretmek kolaylaştıkça, denetlemek daha önemli hale geliyor. doğrulamak, yani verify edebilmek.

sevdiğim bir arkadaşım olan Alperen Keleş'in [verifiability is the limit](https://alperenkeles.com/posts/verifiability-is-the-limit/) yazısında anlattığı yerden bakarsak, sınır çoğu zaman üretimde değil; üretilen şeyi doğrulayabilme kapasitemizde ortaya çıkıyor.

bana kalırsa yazılım mühendisliğinin evrildiği yer biraz burası. stack bilgisi önemsizleşiyor demiyorum. en azından demek istemiyorum. tam tersine, iyi mühendis hala araçlarını iyi bilmeli. react bilen, node bilen, postgres bilen, AWS bilen, runtime bilen insan hala değerli. ama bunlar artık tek başlarına değerli sinyaller değiller. hepsi daha büyük bir şeyin parçaları gibi. tek başına kimlik değil; karar verme kapasitesini destekleyen araçlar. çünkü mesele, sonunda, yine aynı yere geliyor:

**sorumluluk.**

"software engineer" kelimesinin ağırlığı burada yeniden şekilleniyor. daha fazla output üreten insan değil sadece. daha fazla belirsizliği taşıyabilen, daha doğru sorular sorabilen, sistemi sadece yazıldığı haliyle değil, _yaşadığı haliyle_ de anlayabilen insanlar. yani "e geriye ne kalıyor o zaman?" sorusuna verebileceğin en kısa cevap şu:

> geriye, kodun ötesindeki sorumluluk kalıyor.

## kapanış

sanırım bu yazı boyunca dönüp dolaşıp aynı yere geldim: **yazılım bitmiyor, ama yazılım hakkında kurduğumuz bazı cümleler bitiyor.**

"yazılımcı" dediğimizde neyi kastettiğimiz, "software engineer" dediğimizde hangi sorumluluk seviyesinden bahsettiğimiz, bir becerinin gerçekten değerli olup olmadığını neye göre ölçtüğümüz eskisi kadar net değil. belki de hiçbir zaman net değildi. sadece bolluk döneminde bu belirsizlik bu kadar can yakmıyordu. bugün ise bazı yanılgılar daha görünür hale geliyor. yazılımı tek bir meslek gibi konuşmanın yanılgısı. piyasanın geçici iştahını kalıcı normal zannetmenin yanılgısı. üretim kolaylaştıkça mühendisliğin de kolaylaşacağını düşünmenin yanılgısı.

değişen şey, yazılım emeğinin hangi kısmının kıymetli olduğuna dair hesabın yeniden yapılması. bazı işler eskisi kadar ayırt edici değil. bazı beceriler hala değerli ama tek başına kimlik taşımıyor. bazı kapılar hala açık ama eskisi kadar geniş değil. bu yüzden bu dönemi yalnızca bir daralma hikayesi olarak okumak bana eksik geliyor. daha çok _ayrışma dönemi_ gibi görüyorum. yüzeydeki üretim muazzam hızlanmış durumda, araçlar güçleniyor, çıktı almak hiç olmadığı kadar kolay.

belki de mühendisliğin evrimi dediğimiz şey budur. bir dönem değerli olan şeyler tamamen yok olabilir, olmayabilir de. zaten evrim böyle bir şey değil mi? ağırlık merkezi değişir, bazı davranışlar ödüllendirilir. bazıları cezalandırılır ve sonucunda bir kısmı elenir.

bu yüzden "yazılım bitiyor mu?" sorusuna net bir cevap vermek istemiyorum. bırakalım biraz daha havada kalsın, biraz daha tartışılsın. yazılımın geleceğini anlamaya çalışırken **en büyük yanılgı, onu tek bir şey sanmak.**

sizin bu konular hakkında neler düşündüğünüzü merak ediyorum. [hello@fatihguzel.dev](mailto:hello@fatihguzel.dev) adresinden bana yazarsanız çok sevinirim. ilginizi çektiyse başkalarıyla da paylaşabilirsiniz. sonraki yazımda görüşürüz.
