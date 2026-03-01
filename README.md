# PostExplorer

Aplikasi web untuk menampilkan dan menjelajahi postingan dari JSONPlaceholder API. Dibangun dengan React, Vite, dan Tailwind CSS dengan desain bergaya **Threads by Meta** dan tema iOS frosted glass.

## ✨ Fitur

- **Threads-Style Feed** — Timeline postingan vertikal dengan avatar, username, dan thread line penghubung antar post
- **Detail Postingan** — Tampilan detail bergaya Threads dengan isi lengkap, gambar, statistik, dan komentar sebagai replies
- **Gambar Postingan** — Mengambil data gambar dari Photos API JSONPlaceholder (jika tersedia)
- **Interaksi Sosial** — Tombol like, comment, repost, dan share di setiap postingan
- **Pencarian** — Cari postingan berdasarkan judul atau isi konten
- **Filter** — Filter postingan berdasarkan pengguna dengan dropdown custom
- **Dark/Light Mode** — Toggle tema gelap dan terang, disimpan di localStorage
- **Navigasi** — Navigasi antar postingan (previous/next)
- **Responsif** — Mobile-first design, tampil optimal di semua ukuran layar

## 🛠️ Teknologi

| Teknologi    | Versi | Kegunaan            |
| ------------ | ----- | ------------------- |
| React        | 19    | UI library          |
| Vite         | 7     | Build tool          |
| Tailwind CSS | 3     | Styling             |
| React Router | 7     | Client-side routing |

## 🎨 Desain

- **Layout:** Threads-style vertical feed dengan thread lines dan avatar
- **Tema:** iOS frosted glass blur effect
- **Warna:** Violet (`#8b5cf6`) sebagai warna aksen utama
- **Background:** Pure black (dark) / iOS gray `#f2f2f7` (light)
- **Font:** Inter (Google Fonts)
- **Icon:** SF Symbol-style SVG icons + Threads interaction icons
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
│   ├── PostCard.jsx        # Thread-style post item (avatar, body, actions)
│   ├── GlassDropdown.jsx   # Custom dropdown iOS-style
│   ├── ThemeToggle.jsx     # Toggle dark/light mode
│   ├── LoadingSpinner.jsx  # Loading indicator
│   └── ErrorMessage.jsx    # Error state
├── context/
│   └── ThemeContext.jsx    # Dark/Light mode state management
├── pages/
│   ├── PostListPage.jsx    # Halaman feed Threads-style
│   └── PostDetailPage.jsx  # Halaman detail thread + replies
├── services/
│   └── api.js              # API helper functions (posts, users, photos)
├── App.jsx                 # Root component + routing
├── main.jsx                # Entry point
└── index.css               # Design system, theme variables, Threads CSS
```

## 🌐 API

Data diambil dari [JSONPlaceholder](https://jsonplaceholder.typicode.com):

- `GET /posts` — Semua postingan
- `GET /posts/:id` — Detail postingan
- `GET /posts/:id/comments` — Komentar postingan
- `GET /users` — Semua data pengguna
- `GET /users/:id` — Data pengguna berdasarkan ID
- `GET /photos?albumId=:id` — Gambar untuk postingan (opsional)

## 🤖 AI Disclosure

Project ini dibuat dengan bantuan **AI coding assistant** untuk mempercepat proses development. Berikut adalah prompt yang digunakan selama pengembangan:

### Prompts yang Digunakan

| No  | Prompt                                                                                                                                                                                                                                                                    | Tujuan                                      |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| 1   | _"Buatkan project menggunakan Vite dengan React sebagai framework utama dan tentang deksripsi atau ketentuan projek nya ada di dokumen ini tolong baca dan pahami https://docs.google.com/document/d/1FeMLtYfOlXzhpEIXnbhE81EvZ-QBre1YSHVjHEi8FUo/edit?usp=gmail_thread"_ | Inisialisasi dan setup project              |
| 2   | _"Gunakan warna primary violet dan hitam, terapkan efek glass blur bergaya iOS/iPhone tanpa menggunakan gradient"_                                                                                                                                                        | Menentukan arah desain visual               |
| 3   | _"Tambahkan switch untuk mode gelap dan terang, serta ubah dropdown filter pengguna menjadi blur bergaya iPhone"_                                                                                                                                                         | Implementasi fitur tema dan komponen custom |
| 4   | _"Perbaiki dropdown agar tidak tertutup oleh card postingan, improve mode terang agar lebih user-friendly dan tidak monoton, pastikan mobile-first dan performa tetap ringan"_                                                                                            | Bug fix, UX improvement, dan responsivitas  |
| 5   | _"Optimasi perpindahan tema agar tidak lag atau berat saat switching"_                                                                                                                                                                                                    | Optimasi performa rendering                 |
| 6   | _"Dropdown filter harus memiliki efek blur yang nyata seperti iPhone, bukan sekadar transparan"_                                                                                                                                                                          | Penyempurnaan komponen frosted glass        |
| 7   | _"Ubah keseluruhan layout agar lebih premium dan estetis bergaya iOS — dari tata letak, tipografi, hingga interaksi harus terasa user-friendly"_                                                                                                                          | Redesign menyeluruh untuk kualitas visual   |
| 8   | _"Gunakan ikon bergaya iOS SF Symbols, bukan emoji"_                                                                                                                                                                                                                      | Konsistensi visual dengan desain iOS        |
| 9   | _"Layout postingan dibuat seperti Threads — list post dan detail post bergaya Threads, ambil gambar dari API jika tersedia"_                                                                                                                                              | Redesign layout ke Threads-style feed       |

### Catatan

- AI digunakan sebagai alat bantu (tool), bukan sebagai pengganti pemahaman teknis
- Seluruh output AI telah di-review, diuji, dan disesuaikan sesuai kebutuhan project
- Keputusan desain dan arsitektur tetap ditentukan oleh developer

## 📝 Lisensi

Project ini dibuat sebagai bagian dari seleksi **Front-end Developer Intern** di ScholarToday.
