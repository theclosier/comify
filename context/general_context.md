# Proje Adı: Çoklu Platform Entegrasyonlu Topluluk Yönetim Paneli (Community Orchestration Dashboard)

# Proje Adı: Çoklu Platform Entegrasyonlu Topluluk Yönetim Paneli (Community Orchestration Dashboard)

**Temel Vizyon:** Topluluk yöneticilerinin hem kendi alt alan adlarında (sub-domain) komünitelerini yönetebilecekleri hem de etkinliklerini diğer platformlara (Meetup, Luma vb.) dağıtabilecekleri hibrit bir yapı oluşturmak.

**⚠️ ÖNEMLİ: MOCKUP MODU**
Sistem şu an **sadece Mockup Modunda** çalışacaktır. Backend (NestJS/PostgreSQL/Redis) geliştirilmeyecek, tüm veriler frontend tarafında mock (taklit) olarak tutulacaktır.

## 1. Topluluk Sayfası ve Üyelik Akışı
*   **Sub-domain Yapısı:** Topluluk yöneticisi, ana domain altında kendi topluluğu için bir sayfa açabilir (örn: `yazilimcilar.orgordash.com`).
*   **Sayfa İçeriği:** Bu sayfada yönetici tarafından belirlenen logo, sosyal medya linkleri, etkinlik akışı ve üyelik formu standart bir formatta sunulur.
*   **Üyelik Sistemi:**
    *   Yönetici, üyelik formuna özel sorular ekleyebilir.
    *   Kullanıcı formu doldurduğunda talep dashboard'a düşer.
    *   Yönetici onayı sonrası kullanıcı "Kulüp Üyesi" olur ve etkinliklere bu statüyle başvurabilir.

## 2. Mimari Prensipler (Vizyon)
*   **Trafik Polisi:** (İleri Fazda) Platformlar arası stok yönetimi.
*   **Olay Güdümlü:** (İleri Fazda) Asenkron senkronizasyon.

## 3. Teknoloji Yığını (Güncel - Mockup Fazı)
*   **Frontend:** Next.js (React) - Tailwind CSS - Glassmorphism UI.
*   **Backend:** YOK (Mock Data).
*   **DB:** YOK (Local State / JSON).

## 3. Entegrasyon Stratejisi
* **Hexagonal Architecture:** Her platform (Meetup, Eventbrite, Luma) için özel "Adaptörler" yazılacaktır. Çekirdek iş mantığı, dış API'ların (GraphQL veya REST) karmaşıklığından izole edilecektir.
* **Hata Yönetimi:** API hatalarına karşı "Exponential Backoff" ve otomatik tekrar deneme (Retry) mekanizmaları zorunludur.
