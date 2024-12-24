Bu eğitim çalışması [Arin Yazılım](https://www.youtube.com/@ArinYazilim) kanalından takip edilerek yapılmıştır. Sizler de abone olup takip edebilirsiniz. Hocamızın gerçekten çok güzel bir anlatımı var.

# Node.js & Express.js Projesi

Bu proje, **Node.js** ve **Express.js** kullanımı üzerine pratik yapmak ve temel web sunucusu mantığını öğrenmek için oluşturulmuştur. Proje kapsamında bir Express.js sunucusu kurulmuş ve basit bir yapı üzerinde çeşitli özellikler eklenmiştir.

---

## ✨ Amaç

Bu çalışmanın temel amacı:

- Node.js ile temel sunucu kurulumu yapmak
- Express.js kullanarak HTTP isteklerini yönetmek
- **Middleware** yapısını anlamak
- **nodemon** gibi geliştirici araçları kullanmak

---

## 🔧 Proje Kurulumu

Bu projeyi bilgisayarınıza kurmak ve çalıştırmak için aşağıdaki adımları izleyebilirsiniz.

### 1. Gerekli Araçlar

Bu proje için Node.js'in ve npm'in kurulu olması gerekmektedir.
- Node.js: [Node.js Kurulumu](https://nodejs.org/)

### 2. Depoyu Klonlayın
```bash
git clone <repository-url>
cd <project-folder>
```

### 3. Bağımlılıkları Kurun
```bash
npm install
```

### 4. Projeyi Çalıştırın
Geliştirici modunda projeyi çalıştırmak için **nodemon** kullanabilirsiniz:
```bash
npm run dev
```
Eğer `nodemon` global olarak yüklenmemişse şu komut ile yükleyebilirsiniz:
```bash
npm install -g nodemon
```

Sunucu başarıyla başlatıldıktan sonra tarayıcınızda şu adresi ziyaret edin:
```
http://localhost:3000
```

---

## 🔄 Komutlar

Bu projede kullanabileceğiniz npm komutları:

| Komut              | Açıklama                             |
|--------------------|--------------------------------------|
| `npm start`        | Projeyi normal modda çalıştırır      |
| `npm run dev`      | Nodemon ile geliştirici modda çalıştırır |

---

## 🛠 Teknolojiler

Bu projede kullanılan temel teknolojiler:

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Nodemon](https://nodemon.io/) (Geliştirici Araç)

---

## ⚡ Proje Yapısı

```plaintext
.
|-- package.json        # Proje bağımlılıkları
|-- app.js              # Ana sunucu dosyası
|-- /routes             # Route tanımlamaları
|-- /middleware         # Middleware dosyaları
|-- /public             # Statik dosyalar (CSS, JS, vb.)
|-- /views              # Template dosyaları (EJS, Pug vb.)
```

---

## 📝 Ek Notlar

- Proje geliştirme süresince **nodemon** kullanıldığı için, kodunuzda yaptığınız değişiklikler otomatik olarak algılanacak ve sunucu yeniden başlatılacaktır.
- **Middleware** kullanarak temel loglama veya hata yönetimi eklenebilir.

---

## 💼 Katkı Sağlama

Projeye katkıda bulunmak isteyenler aşağıdaki adımları takip edebilir:

1. Projeyi forklayın.
2. Yeni bir branch oluşturun.
3. Değişikliklerinizi yapın ve commit atın.
4. Pull request (PR) gönderin.

---

## ❤ Teşekkürler

Bu proje Node.js ve Express.js kullanımını pekistirmek için hazırlanmıştır. Destek ve geri bildirimleriniz için teşekkürler!
