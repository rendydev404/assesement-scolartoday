# PostExplorer

Aplikasi web untuk menampilkan dan menjelajahi postingan dari JSONPlaceholder API. Dibangun dengan React, Vite, dan Tailwind CSS dengan desain bergaya iOS frosted glass.

## ✨ Fitur

- **Daftar Postingan** — Menampilkan 100 postingan dengan grid layout responsif
- **Detail Postingan** — Menampilkan isi lengkap, info penulis, dan komentar
- **Pencarian** — Cari postingan berdasarkan judul atau isi konten
- **Filter** — Filter postingan berdasarkan pengguna dengan dropdown custom
- **Dark/Light Mode** — Toggle tema gelap dan terang, disimpan di localStorage
- **Navigasi** — Navigasi antar postingan (previous/next)
- **Responsif** — Mobile-first design, tampil optimal di semua ukuran layar

## 🛠️ Teknologi

| Teknologi    | Versi | Kegunaan            |
| ------------ | ----- | ------------------- |
| React        | 19    | UI library          |
| Vite         | 6     | Build tool          |
| Tailwind CSS | 3     | Styling             |
| React Router | 7     | Client-side routing |

## 🎨 Desain

- **Tema:** iOS frosted glass blur effect
- **Warna:** Violet (`#8b5cf6`) sebagai warna aksen utama
- **Background:** Pure black (dark) / iOS gray `#f2f2f7` (light)
- **Font:** Inter (Google Fonts)
- **Icon:** SF Symbol-style SVG icons
- **Animasi:** Fade-in, slide-up, dan hover micro-interactions

## 📦 Instalasi & Menjalankan

```bash
# Clone repository
git clone <repository-url>
cd assesement

# Install dependencies
npm install

# Jalankan development server
npm run dev

# Build untuk production
npm run build
```

Aplikasi akan berjalan di `http://localhost:5173`

## 📁 Struktur Project

```
src/
├── components/
│   ├── Navbar.jsx          # Navigasi bar dengan frosted glass
│   ├── PostCard.jsx        # Kartu postingan
│   ├── GlassDropdown.jsx   # Custom dropdown iOS-style
│   ├── ThemeToggle.jsx     # Toggle dark/light mode
│   ├── LoadingSpinner.jsx  # Loading indicator
│   └── ErrorMessage.jsx    # Error state
├── context/
│   └── ThemeContext.jsx    # Dark/Light mode state management
├── pages/
│   ├── PostListPage.jsx    # Halaman daftar postingan
│   └── PostDetailPage.jsx  # Halaman detail postingan
├── services/
│   └── api.js              # API helper functions
├── App.jsx                 # Root component + routing
├── main.jsx                # Entry point
└── index.css               # Design system & theme variables
```

## 🌐 API

Data diambil dari [JSONPlaceholder](https://jsonplaceholder.typicode.com):

- `GET /posts` — Semua postingan
- `GET /posts/:id` — Detail postingan
- `GET /posts/:id/comments` — Komentar postingan
- `GET /users/:id` — Data pengguna

## 🤖 AI Disclosure

Project ini dibuat dengan bantuan **AI coding assistant** untuk mempercepat proses development. Berikut adalah prompt yang digunakan selama pengembangan:

### Prompts yang Digunakan

| No  | Prompt                                                                                                                                                                         | Tujuan                                      |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------- |
| 1   | _"Buatkan project menggunakan Vite dengan React sebagai framework utama"_                                                                                                      | Inisialisasi dan setup project              |
| 2   | _"Gunakan warna primary violet dan hitam, terapkan efek glass blur bergaya iOS/iPhone tanpa menggunakan gradient"_                                                             | Menentukan arah desain visual               |
| 3   | _"Tambahkan switch untuk mode gelap dan terang, serta ubah dropdown filter pengguna menjadi blur bergaya iPhone"_                                                              | Implementasi fitur tema dan komponen custom |
| 4   | _"Perbaiki dropdown agar tidak tertutup oleh card postingan, improve mode terang agar lebih user-friendly dan tidak monoton, pastikan mobile-first dan performa tetap ringan"_ | Bug fix, UX improvement, dan responsivitas  |
| 5   | _"Optimasi perpindahan tema agar tidak lag atau berat saat switching"_                                                                                                         | Optimasi performa rendering                 |
| 6   | _"Dropdown filter harus memiliki efek blur yang nyata seperti iPhone, bukan sekadar transparan"_                                                                               | Penyempurnaan komponen frosted glass        |
| 7   | _"Ubah keseluruhan layout agar lebih premium dan estetis bergaya iOS — dari tata letak, tipografi, hingga interaksi harus terasa user-friendly"_                               | Redesign menyeluruh untuk kualitas visual   |
| 8   | _"Gunakan ikon bergaya iOS SF Symbols, bukan emoji"_                                                                                                                           | Konsistensi visual dengan desain iOS        |

### Catatan

- AI digunakan sebagai alat bantu (tool), bukan sebagai pengganti pemahaman teknis
- Seluruh output AI telah di-review, diuji, dan disesuaikan sesuai kebutuhan project
- Keputusan desain dan arsitektur tetap ditentukan oleh developer

## 📝 Lisensi

Project ini dibuat sebagai bagian dari seleksi **Front-end Developer Intern** di ScholarToday.
