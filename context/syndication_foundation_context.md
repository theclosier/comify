# Syndication & Foundation Context

## 1. Temel Hedef ve Kapsam
MVP'nin birincil amacı, "Yazılıma Dayalı Topluluk Orkestrasyonu"nun (Software-Defined Community Orchestration) temelini atmaktır. Karmaşık stok yönetimi ve tam otomatik ödeme sistemleri v2 ve v3'e bırakılmıştır.

* **Odak Noktası:** Etkinliklerin tek merkezden yayınlanması (Publishing) ve katılımcı verilerinin merkezi bir veritabanında toplanmasıdır.
* **Ödeme Yönetimi:** Manuel kontrol üzerine kuruludur; sistem ödeme bildirimini alır ancak nihai onay yönetici tarafından verilir.
* **Kontenjan:** Bu aşamada "Sınırsız Bilet" veya her platform için statik (elle belirlenmiş) kontenjanlar kullanılır.

## 2. MVP Modülleri ve Sorumlulukları
Sistem, "Modüler Monolit" mimarisiyle aşağıdaki bağımsız modüllerden oluşur:

### A. Orkestrasyon Çekirdeği (Orchestration Core)
Sistemin beynidir; kullanıcıdan gelen `createEvent` komutunu alır ve veritabanına kaydeder. Ardından, ilgili kanal adaptörlerini (Meetup, Eventbrite, Luma) tetikleyerek içeriğin dağıtımını (Syndication) başlatır.

### B. Kanal Adaptörleri (Channel Adapters - v1)
Her platform için "Hexagonal Architecture" prensibine uygun adaptörler geliştirilir:
* **Meetup Adaptörü:** OAuth2 döngüsünü yönetir ve etkinlikleri API üzerinden `publishStatus: DRAFT` parametresiyle oluşturur.
* **Eventbrite Adaptörü:** REST v3 endpointlerini kullanarak temel etkinlik bilgilerini ve bilet sınıflarını oluşturur.
* **Luma Adaptörü:** Etkinlikleri "Onay Gerekli" (Approval Required) modunda açarak manuel kontrol sürecine hazırlar.

### C. Katılımcı Konsolidasyonu (Participant Management)
Farklı platformlardan gelen katılımcı verilerini (Webhooks aracılığıyla) yakalar ve merkezi PostgreSQL veritabanında birleştirir. Her katılımcı için `Pending`, `Approved` veya `Rejected` statülerini takip eden basit bir "Status Machine" içerir.

## 3. MVP Veritabanı Şeması (PostgreSQL - v1)
Veri bütünlüğü için ACID garantisi sağlayan ilişkisel bir yapı kurgulanmalıdır:
* **Events Tablosu:** Başlık, açıklama, tarih, mekan ve platformlara özel ID'ler (Meetup_ID vb.). Ham API yanıtları için JSONB alanı.
* **Tickets/Registrations Tablosu:** Katılımcı bilgileri, hangi platformdan geldiği, ödeme durumu ve platform bazlı kayıt ID'leri.
* **Integrations Tablosu:** Platform bazlı OAuth2 tokenları ve API anahtarlarının şifreli (Encrypted) saklandığı tablo.

## 4. Teknik İş Akışı (Workflow)
* **Giriş:** Yönetici Next.js dashboard üzerinden etkinlik bilgilerini girer.
* **Dağıtım:** Backend, Meetup, Eventbrite ve Luma API'lerine eşzamanlı istekler atar.
* **İzleme:** Eventbrite `order.placed` veya Luma kayıt webhooks'ları sisteme düşer.
* **Manuel Onay:** Yönetici, dashboard'da katılımcıyı görür, ödemeyi (Ruul veya banka üzerinden) teyit eder ve "Onayla" butonuna basar.
* **Geri Bildirim:** Sistem, ilgili platformun API'sine (örn: Luma `approveGuest`) onay isteği gönderir.
