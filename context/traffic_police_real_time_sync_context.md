# Traffic Police & Real-Time Sync Context

## 1. Temel Hedef: Merkezi Kontenjan Yönetimi
v2'nin ana odak noktası, üç farklı platformda (Meetup, Eventbrite, Luma) eş zamanlı olarak satışa sunulan biletlerin toplam sayısının, belirlenen kapasiteyi asla aşmamasını garanti altına almaktır.

* **Sorun:** Farklı platformlardan aynı milisaniyede gelen bilet talepleri, klasik veritabanı "oku-kontrol et-yaz" döngüsünde çifte rezervasyona (Overbooking) neden olur.
* **Çözüm:** Redis tabanlı Dağıtık Kilit (Distributed Locking) ve Atomik Sayaçlar ile yönetilen "Trafik Polisi" modülü.

## 2. Teknik Derinlik: "Trafik Polisi" Algoritması
Sistem, stok kontrolünü ve düşümünü tek bir atomik adımda gerçekleştirmek için Redis Lua Scripting kullanır.

* **Atomik İşlem:** Lua scripti Redis üzerinde çalışırken araya başka bir işlemin girmesi imkansızdır; bu da yarış durumlarını doğal olarak engeller.
* **Script Mantığı:**
    1. Etkinlik stok anahtarını (`event:ID:stock`) kontrol et.
    2. Stok yeterliyse istenen adet kadar düş ve başarılı (1) dön.
    3. Yetersizse başarısız (0) dön.

## 3. "Soft Cap" ve Envanter Rebalancing Stratejisi
API gecikmeleri (latency) ve platformlar arası anlık senkronizasyon imkansızlığı nedeniyle "tamponlu" bir yönetim modeli uygulanır:

* **Soft Cap (%90):** Toplam kontenjanın %90'ı dolduğunda sistem "Kırmızı Alarm" durumuna geçer.
* **Dinamik Dengeleme (Rebalancing):** Satışların hızlı olduğu platforma (örneğin Meetup), satışın yavaş olduğu platformdaki (örneğin Luma) boş kontenjan otomatik olarak aktarılır.
* **Safety Stock (%10):** Kalan son %10'luk bilet dilimi, API senkronizasyon gecikmelerini absorbe etmek için platformlarda satışa kapatılır ve sadece dashboard üzerinden veya manuel onay ile satılır.

## 4. Olay Güdümlü Webhook Yönetimi (BullMQ)
Anlık trafik artışlarını (Ticket Drop) yönetmek için tüm dış bildirimler kuyruğa alınır:

* **Inbound Webhooks:** Eventbrite veya Luma'dan gelen `order.placed` bildirimleri doğrudan veritabanına yazılmaz; BullMQ kuyruğuna atılır.
* **Throttling:** Meetup gibi puan tabanlı hız sınırı uygulayan platformlara gönderilen istekler, Redis üzerindeki "Leaky Bucket" algoritmasıyla sınırlandırılarak bloklanma önlenir.

## 5. Kritik Senaryolar ve Troubleshooting (Hata Yönetimi)
AI'nın bilmesi gereken v2 hata senaryoları:

* **Redis Çökmesi:** Eğer Redis yanıt vermezse, sistem otomatik olarak "Fail-Safe Mode"'a geçer ve tüm platformlardaki satışları durdurarak "Sadece Bekleme Listesi" moduna alır.
* **Veri Uyuşmazlığı:** API hataları nedeniyle oluşan stok sapmalarını düzeltmek için her gece çalışan bir "Reconciliation Script" tüm platform verilerini çekip ana veritabanı ile eşitler.
