# First of All: Teknik Temeller ve Uygulama Standartları

Bu proje, yüksek ölçeklenebilirlik, veri tutarlılığı ve çok kanallı entegrasyon yeteneklerine sahip bir **"Topluluk Orkestrasyon ve Yönetim Yazılımı"**dır. Geliştirme süreci boyunca aşağıdaki teknoloji yığınına, mimari prensiplere ve güvenlik protokollerine sadık kalınacaktır.

## 🛠️ 1. Teknoloji Yığını (The Tech Stack - MOCKUP MODU)
Şu anki geliştirme fazında **SADECE FRONTEND** geliştirilecektir. Backend, Veritabanı ve Redis servisleri **KULLANILMAYACAKTIR**.

*   **Frontend:** Next.js (React) - App Router.
*   **Styling:** Tailwind CSS, Glassmorphism Design System.
*   **Data:** Tüm veriler (Etkinlikler, Üyeler, Başvurular) `mock` dosyalarında (JSON/JS Objects) tutulacak ve state üzerinden yönetilecektir.
*   **Backend/DB/Redis:** ❌ Devre dışı. (İleri fazlarda eklenecek).

## 🏗️ 2. Mimari Mimari ve Sunucu Yapılandırması
Sistem, karmaşıklıktan uzak ancak büyümeye açık bir yapıda kurgulanmıştır:

* **Mimari Yaklaşım:** Modüler Monolit (Modular Monolith). Tüm modüller (Ödeme, Entegrasyon, Stok) tek bir repo içinde ancak birbirinden kesin sınırlarla (Interface) ayrılmış şekilde tasarlanacaktır.
* **Entegrasyon Tasarımı:** Her dış platform (Meetup, Eventbrite, Luma) için Hexagonal Architecture (Ports and Adapters) prensibi uygulanacaktır. Bu, dış API'lardaki değişikliklerin sistemin çekirdek mantığını etkilemesini engeller.
* **Barındırma ve Deployment:**
    * Sistem Docker ile konteynerize edilecektir.
    * Sunucu olarak Türkiye'ye yakınlığı ve KVKK uyumu nedeniyle AWS (Frankfurt Region) veya DigitalOcean kullanılacaktır.
* **CI/CD:** Tüm kod canlıya geçiş süreci GitHub Actions üzerinden otomatize edilecektir.

## 🔐 3. Temiz Kod ve Güvenlik Standartları
Kodlama aşamasında "güvenlik ve sürdürülebilirlik" opsiyonel değil, bir zorunluluktur:

* **Temiz Kod (Clean Code):** Kodlar okunabilir, test edilebilir ve SOLID prensiplerine uygun olmalıdır. Karmaşık mantıklar (örneğin stok düşümü) mutlaka dokümante edilmelidir.
* **Güvenlik Protokolleri:**
    * Tüm API anahtarları ve OAuth2 token'ları veritabanında şifreli (Encryption at Rest) olarak saklanacaktır.
    * Dış platformlardan gelen webhook'lar, imza doğrulama (Signature Verification) yöntemiyle kontrol edilecektir.
* **KVKK Uyumu:** Kullanıcı verileri anonimleştirme desteğine sahip olacak ve yasal gerekliliklere göre saklanacaktır.
* **Hata Yönetimi:** Tüm dış API çağrıları "Exponential Backoff" stratejisiyle hata toleranslı hale getirilecektir.

## 💬 4. İletişim ve Operasyon Kuralları
* **Dil:** Yapay zeka, kullanıcıya verdiği tüm yanıtları, teknik açıklamaları ve dokümantasyonları Türkçe olarak sunacaktır.
* **Rol:** Yapay zeka, sadece bir kod yazıcı değil, aynı zamanda projenin teknik bütünlüğünü koruyan bir "Düşünce Ortağı" ve "Sistem Mimarı" gibi davranacaktır.
