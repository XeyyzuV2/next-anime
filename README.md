# Next Anime

Selamat datang di Next Anime, sebuah platform streaming anime gratis yang dibangun dengan teknologi web modern. Proyek ini berfungsi sebagai situs web kaya fitur di mana pengguna dapat menemukan, menonton, dan melacak anime favorit mereka.

Aplikasi ini dibuat menggunakan Next.js dan mengambil data dari [Consumet API](https://github.com/consumet/api).

<!-- Ganti dengan URL screenshot proyek Anda -->
<!-- ![Screenshot](https://i.imgur.com/your-screenshot.png) -->

## ✨ Fitur Utama

- **Pencarian & Filter**: Cari anime berdasarkan judul atau filter berdasarkan genre.
- **Detail Anime**: Lihat informasi lengkap tentang anime, termasuk sinopsis, karakter, dan relasi.
- **Streaming Video**: Tonton episode anime langsung di dalam aplikasi dengan pemutar video terintegrasi.
- **Daftar Tontonan Pribadi**: Pengguna dapat masuk dan menambahkan anime ke daftar tontonan pribadi mereka.
- **Sistem Komentar**: Berdiskusi dengan pengguna lain di setiap halaman anime.
- **Desain Responsif**: Antarmuka yang dioptimalkan untuk desktop dan perangkat seluler.
- **Pemuatan Cepat**: Dibangun dengan Incremental Static Regeneration (ISR) dari Next.js untuk performa optimal.

## 🚀 Teknologi yang Digunakan

- **Framework**: [Next.js](https://nextjs.org/) 13 (Pages Router)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database & ORM**: [MongoDB](https://www.mongodb.com/) dengan [Prisma](https://www.prisma.io/)
- **Autentikasi**: [NextAuth.js](https://next-auth.js.org/)
- **Data Fetching (Client)**: [React Query](https://tanstack.com/query/v3/)
- **Komponen UI**: [Swiper.js](https://swiperjs.com/), [React Icons](https://react-icons.github.io/react-icons/), [React Hot Toast](https://react-hot-toast.com/)

## 🛠️ Panduan Setup Lokal

Untuk menjalankan proyek ini di lingkungan lokal Anda, ikuti langkah-langkah berikut:

1.  **Clone Repositori**
    ```bash
    git clone https://github.com/username/repo-name.git
    cd repo-name
    ```

2.  **Install Dependensi**
    ```bash
    npm install
    ```

3.  **Setup Variabel Lingkungan**
    Buat file bernama `.env` di root proyek dan tambahkan variabel berikut.
    ```env
    # URL koneksi ke database MongoDB Anda
    DATABASE_URL="mongodb+srv://user:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority"

    # Kunci rahasia untuk NextAuth.js (buat kunci acak)
    # Anda bisa membuatnya dengan `openssl rand -base64 32` di terminal
    NEXTAUTH_SECRET="your-super-secret-key"
    NEXTAUTH_URL="http://localhost:4099"

    # Konfigurasi Provider OAuth (Contoh: Google)
    GOOGLE_CLIENT_ID="your-google-client-id"
    GOOGLE_CLIENT_SECRET="your-google-client-secret"
    ```

4.  **Generate Prisma Client**
    Skrip `postinstall` seharusnya sudah menjalankan ini, tetapi jika Anda mengubah `schema.prisma`, jalankan perintah ini secara manual.
    ```bash
    npx prisma generate
    ```

5.  **Jalankan Server Development**
    ```bash
    npm run dev
    ```
    Aplikasi akan berjalan di [http://localhost:4099](http://localhost:4099).

## 🚀 Panduan Deployment

Proyek ini dioptimalkan untuk deployment di [Vercel](https://vercel.com/).

1.  **Push ke Repositori Git** (GitHub, GitLab, Bitbucket).
2.  **Impor Proyek di Vercel**: Hubungkan akun Git Anda ke Vercel dan impor repositori.
3.  **Konfigurasi Proyek**: Vercel akan secara otomatis mendeteksi bahwa ini adalah proyek Next.js. Pengaturan build default seharusnya sudah cukup.
4.  **Tambahkan Environment Variables**: Buka pengaturan proyek di Vercel, navigasi ke **Settings -> Environment Variables**, dan tambahkan semua variabel yang ada di file `.env` Anda.
5.  **Deploy**: Vercel akan memulai proses build dan deployment secara otomatis setiap kali Anda melakukan push ke branch utama.

## 📝 Catatan Tambahan

- **Dependensi Eksternal**: Ketersediaan data anime sangat bergantung pada **Consumet API**. Jika API tersebut tidak aktif, beberapa bagian dari aplikasi mungkin tidak berfungsi.
- **Strategi Rendering**: Proyek ini menggunakan **Incremental Static Regeneration (ISR)** (`fallback: 'blocking'`). Ini berarti halaman detail anime akan dibuat saat pertama kali diakses dan kemudian di-cache untuk performa yang lebih baik. Hal ini normal dan bukan merupakan error.
- **Image**: Aplikasi ini tidak menggunakan `next/image` untuk gambar eksternal, melainkan `react-lazy-load-image-component` yang merender tag `<img>` standar. Ini menghindari keharusan untuk mengonfigurasi domain gambar di `next.config.js`.
