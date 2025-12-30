# Full Automation & Financial Scaling Context

## 1. Temel Hedef: Operasyonel Yükün %80 Azaltılması
v3, projenin ticari olarak ölçeklendiği ve topluluk yöneticisinin sadece stratejiye odaklandığı aşamadır.

* **Odak Noktası:** Ödeme sistemlerinin otomasyonu, ileri seviye platform "hack"leri ve yerel iletişim kanallarının (SMS/WhatsApp) sisteme tam entegrasyonudur.
* **Vizyon:** Bir kullanıcı bilet aldığında; ödemenin doğrulanması, platformdaki kontenjanın düşmesi, QR kodlu biletin SMS ile gitmesi ve faturanın oluşması süreçlerinin tamamı el değmeden gerçekleşir.

## 2. Ödeme Entegrasyonu ve Otomatik Onay (Workaround Engine)
API desteği sınırlı veya olmayan ödeme yöntemleri için geliştirilen "Yaratıcı Mühendislik" çözümleri bu aşamada devreye girer:

* **Email Parsing (Fallback):** Ödeme sisteminden gelen "Ödeme alındı" e-postaları SendGrid veya Mailgun üzerinden sisteme yönlendirilir. Sistem, Regex (Düzenli İfadeler) kullanarak e-posta içeriğinden isim ve tutarı çeker, veritabanındaki kayıtla eşleştirip otomatik onay verir.
* **Metadata Injection:** Ödeme linklerine eklenen özel referans kodları (`?ref=USER_ID`) üzerinden kullanıcı ve ödeme eşleşmesi sağlanır.
* **Luma Onay Akışı:** Ödeme doğrulandığında, sistem Luma API'sine otomatik `approveGuest` isteği göndererek katılımcıyı "Onaylı" statüsüne geçirir.

## 3. İleri Seviye Platform Otomasyonları ("Hacks")
Platformların API kısıtlarını aşmak için geliştirilen stratejik çözümler:

* **Eventbrite Waitlist Hack:** Eventbrite API'si doğrudan bekleme listesinden bilet serbest bırakmayı desteklemediği için, sistem "Gizli Bilet" (Hidden Ticket) yöntemini kullanır. Yer açıldığında, sistem otomatik olarak şifreli bir bilet sınıfı oluşturur ve sıradaki kişiye bu linki e-posta ile gönderir.
* **Automated Waitlist Management:** Meetup üzerinde kontenjan dolduğunda, `rsvp_limit` anlık olarak mevcut katılımcı sayısına eşitlenerek yeni gelenlerin otomatik olarak Meetup'ın kendi bekleme listesine düşmesi sağlanır.

## 4. İletişim Otomasyonu ve Yerelleştirme (Türkiye Odaklı)
Yüksek maliyetli global çözümler (Twilio vb.) yerine yerel ve maliyet etkin çözümler entegre edilir:

* **Netgsm Entegrasyonu:** Global SMS maliyetlerini yaklaşık 4'te 1 oranına düşüren (0.30 - 0.50 TL bandı) Netgsm API'si üzerinden bilet ve onay mesajları gönderilir.
* **WhatsApp Business API:** Biletlerin yüksek açılma oranına sahip WhatsApp üzerinden, Meta onaylı şablonlarla iletilmesi sağlanır.

## 5. KVKK Uyumu ve Güvenlik
* **Veri Egemenliği:** Türkiye'deki kullanıcı verilerinin yerel entegratörler (Netgsm vb.) üzerinden işlenmesiyle KVKK uyumu güçlendirilir.
* **Unutulma Hakkı:** Kullanıcının talebiyle tüm platformlardaki verilerinin (Meetup, Eventbrite, Luma) tek tuşla anonimleştirilmesi veya silinmesi özelliği eklenir.
