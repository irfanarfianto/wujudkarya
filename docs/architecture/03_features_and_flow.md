# Fitur & Alur Sistem

## A. Sisi Publik (Guest/User)
Diakses oleh calon klien. Fokus pada konversi dan branding.

### 1. Homepage & Portfolio
- **Showcase:** Grid proyek dengan filter kategori (Web, Mobile, System).
- **Detail Project:** 
    - Deskripsi studi kasus.
    - Teknlogi yang digunakan.
    - Carousel screenshot (untuk mobile apps).
    - Link demo (jika ada).

### 2. Services Page
- Menampilkan paket layanan:
    - Web Development (Laravel/React).
    - Mobile App Development (Flutter/Native).
    - UI/UX Design.

### 3. Lead Generation (Form "Wujudkan Ide")
- Pengganti halaman "Contact Us" kaku.
- Form interaktif yang langsung menyimpan data ke tabel `leads`.
- Field: Nama, Email, Minat Layanan, Pesan.

## B. Sisi Admin (Dashboard Owner)
Diakses oleh Anda sebagai pemilik untuk manajemen bisnis.

### 1. Dashboard Ringkasan
- Statistik Earnings (Pendapatan).
- Jumlah Proyek Aktif.
- Leads baru yang belum dihubungi.

### 2. Manajemen Proyek (CMS)
- CRUD Data Proyek.
- **Image Gallery Uploader:** Upload multiple screenshot untuk satu project.
- Toggle Status: Draft, Published, Featured.

### 3. CRM & Invoicing System
- **Client Management:** Database klien (Nama, PT, Alamat).
- **Invoice Generator:** 
    - Buat invoice baru pilih klien.
    - Tambah item tagihan secara dinamis.
    - Hitung subtotal, pajak, dan total otomatis.
    - **Action:** Generate PDF (Kop Surat WujudKarya) & Kirim Email.

### 4. Settings
- Halaman form sederhana untuk update `settings` table (No Rekening, Alamat, dll) tanpa perlu mengubah code.
