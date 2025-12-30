# Internal Clones & Native Participation Context

## 1. Temel Hedef: Bağımsız Topluluk Ekosistemi
v5'in amacı, dış platformların (Meetup, Luma, Eventbrite) sağladığı "network etkisinden" faydalanırken, aynı zamanda bu platformların UX kısıtlamalarına takılmadan kendi üzerinizden katılım alabilmektir.

* **Native Landing Pages:** Her etkinlik için Next.js tabanlı, yüksek performanslı ve SEO uyumlu "clone" sayfalar oluşturulur.
* **Doğrudan Katılım:** Üyeler, dış platformlara gitmeden doğrudan bu dashboard üzerinden kayıt olabilir ve bilet alabilirler.

## 2. Teknik Uygulama: Dahili Kayıt Akışı
Dahili kayıtlar, sistem tarafından "en yüksek öncelikli" olaylar olarak kabul edilir:

* **Instant Inventory Deduction:** Kullanıcı "Kayıt Ol" butonuna bastığı an, Redis tabanlı "Trafik Polisi" devreye girer ve toplam kontenjandan (Total Capacity) anında düşüm yapar.
* **Dış Platform Senkronizasyonu:** Dahili bir kayıt oluştuğunda, sistem asenkron olarak (BullMQ) Meetup, Eventbrite ve Luma API'lerini çağırarak oradaki kontenjanları da 1 adet düşürür. Bu, platformlar arasında tam bir "ayna" etkisi yaratır.

## 3. Hibrit Üyelik ve Veri Konsolidasyonu
* **Unified Member Profile:** Üyenin Meetup'tan mı geldiği yoksa dahili "clone" sayfadan mı kayıt olduğu PostgreSQL üzerinde tek bir profilde birleştirilir.
* **Çapraz Platform Takibi:** Eğer bir üye daha önce Meetup üzerinden kayıt olmuşsa, dahili sayfaya geldiğinde sistem onu tanır ve "Zaten kayıtlısınız" uyarısı verir.

## 4. Envanter Önceliği ve "Master" Kontrol
Bu aşamada dashboard, tüm platformların üzerindeki "Master Authority" haline gelir:

* **Öncelikli Kota:** Yönetici, toplam 100 kişilik kontenjanın örneğin 40'ını sadece "Dahili Sayfa" (Dashboard Clone) için rezerve edebilir.
* **Otomatik Kapatma:** Dahili kayıtlar nedeniyle toplam kontenjan dolduğunda, sistem tüm dış platformlardaki (Meetup, Luma) etkinlikleri anında "Sold Out" durumuna çeker veya waitlist moduna alır.

## 5. Kullanıcı Deneyimi (UX) Özellikleri
* **Meetup/Luma "Look & Feel":** Dahili sayfalar, kullanıcı alışkanlıklarını bozmamak adına Meetup'ın topluluk odaklı yapısını veya Luma'nın estetik arayüzünü taklit eden temalarla sunulabilir.
* **Native Check-in:** Etkinlik günü yapılacak yoklama (check-in) işlemleri, dış platform aplikasyonlarına ihtiyaç duymadan doğrudan bu dashboard üzerinden QR kod okutularak yapılır.
