# Frontend Sismedika

Aplikasi Frontend untuk manajemen pesanan makanan (Sismedika), dibangun dengan **React**, **Vite**, dan **TailwindCSS**.

## 📋 Prasyarat

Pastikan Anda telah menginstal:
- [Node.js](https://nodejs.org/) (versi LTS, minimal v18)
- [NPM](https://www.npmjs.com/) (biasanya sudah termasuk dalam Node.js)

## 🚀 Cara Menjalankan

Ikuti langkah-langkah berikut untuk menjalankan aplikasi di komputer lokal Anda:

1.  **Masuk ke direktori frontend**:
    ```bash
    cd frontend
    ```

2.  **Install dependensi**:
    Jalankan perintah ini untuk mengunduh semua library yang dibutuhkan:
    ```bash
    npm install
    ```

3.  **Konfigurasi API (Opsional)**:
    Secara default, aplikasi akan mencoba menghubungi backend di `http://localhost:8000`. 
    Jika backend Anda berjalan di alamat berbeda, pastikan untuk menyesuaikan konfigurasi di `src/api/api.ts` atau buat file `.env` (jika didukung).

4.  **Jalankan Mode Pengembangan**:
    ```bash
    npm run dev
    ```
    Buka browser dan akses URL yang muncul (biasanya `http://localhost:5173`).

## 🛠️ Script yang Tersedia

- `npm run dev`: Menjalankan server pengembangan dengan Hot Module Replacement (HMR).
- `npm run build`: Mengompilasi aplikasi untuk produksi ke folder `dist`.
- `npm run preview`: Meninjau hasil build produksi secara lokal.
- `npm run lint`: Memeriksa kode untuk kesalahan sintaks dan gaya penulisan.

## 📂 Struktur Proyek

- **`src/api`**: Konfigurasi koneksi ke backend (Axios).
- **`src/components`**: Komponen UI yang dapat digunakan kembali (Tombol, Input, Modal, dll).
- **`src/pages`**: Halaman-halaman utama aplikasi (Login, Dashboard, Menu, dll).
- **`src/store`**: Manajemen state global menggunakan **Zustand**.
- **`src/layouts`**: Layout utama aplikasi (misal: Sidebar, Navbar).
- **`src/types`**: Definisi tipe TypeScript.

## 🔐 Akun Default (Backend)

Pastikan backend sudah berjalan dan di-seed. Gunakan akun berikut untuk login:
- **Kasir:** `hanifkasir@mail.com` / `password`
- **Pelayan:** `hanifwaiter@mail.com` / `password`

## 🎨 Teknologi

- **React 19**: Library UI utama.
- **Vite**: Build tool super cepat.
- **TailwindCSS 4**: Framework CSS utility-first.
- **Zustand**: State management yang ringan.
- **Axios**: HTTP Client untuk request ke API.
- **Lucide React**: Ikon open-source.
- **Shadcn UI / Radix UI**: Komponen dasar UI yang aksesibel.
