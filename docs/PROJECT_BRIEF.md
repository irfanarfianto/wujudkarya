# PROJECT BRIEF: WujudKarya.com

**Owner:** [Nama Anda]  
**Role:** Founder & Lead Developer  
**Platform:** Web & Mobile Portfolio + Business Management System  
**Tech Stack:** Laravel 11, Inertia.js (React), SSR (Server-Side Rendering), MySQL.

---

## 1. Visi & Identitas Brand
*   **Tagline:** "Mewujudkan Ide Menjadi Digital."
*   **Tone of Voice:** Profesional, Solutif, Indonesia, Terpercaya.
*   **Target Audience:** Pemilik Bisnis (UMKM/PT), Founder Startup, dan Agensi yang butuh partner teknis.

---

## 2. Spesifikasi Teknis (Architecture)
Karena Anda ingin performa tinggi dan SEO maksimal:

*   **Framework:** Laravel 11.
*   **Frontend:** React.js 18+ via Inertia.js.
*   **Rendering:** SSR (Server-Side Rendering) aktif. (Wajib install Node.js di server VPS).
*   **UI Library:** Shadcn/ui + Tailwind CSS (Desain bersih, modern, dan cepat).
*   **Database:** MySQL 8.0+.
*   **PDF Engine:** barryvdh/laravel-dompdf (Untuk cetak invoice).

---

## 3. Fitur Utama

### A. Sisi Publik (WujudKarya.com - Guest)
**Fokus:** Kecepatan, SEO, dan Konversi.

1.  **Showcase Portfolio:**
    *   Grid proyek dengan filter (Web / Mobile App / System).
    *   Image Carousel: Slider gambar untuk screenshot aplikasi mobile.
2.  **Layanan (Services):**
    *   Paket "Web Development" (Laravel/React).
    *   Paket "Mobile App" (Flutter/Native).
3.  **Halaman "Tentang WujudKarya":**
    *   Menjelaskan bahwa ini adalah brand profesional Anda, bukan sekadar freelancer cabutan.
4.  **Formulir "Wujudkan Ide":**
    *   Menggantikan "Contact Us". Form interaktif yang masuk ke database leads.

### B. Sisi Admin (Dashboard Owner)
**Fokus:** Manajemen Bisnis.

1.  **Dashboard Utama:** Ringkasan Earnings (Pendapatan) & Proyek Aktif.
2.  **Manajemen Proyek:**
    *   Upload banyak gambar (Gallery).
    *   Set status proyek (On Progress/Done).
3.  **CRM Klien:** Data lengkap klien (Nama PT, Alamat).
4.  **Generator Invoice:**
    *   Pilih Klien -> Input Item -> Cetak PDF dengan Kop Surat "WujudKarya".
    *   Kirim via Email otomatis.
5.  **Pengaturan (Settings):** Ubah info rekening bank, nomor WA, dll tanpa koding.

---

## 4. Struktur Database Lengkap (Schema)
Silakan copy-paste ini ke dalam file Migration Laravel Anda.

### A. Tabel Utama

```php
// 1. SETTINGS (Menyimpan Konfigurasi Website & Bank)
Schema::create('settings', function (Blueprint $table) {
    $table->id();
    $table->string('key')->unique(); 
    $table->text('value')->nullable();
    $table->timestamps();
});

// 2. CLIENTS (Data Pelanggan)
Schema::create('clients', function (Blueprint $table) {
    $table->id();
    $table->string('name'); // Nama PIC
    $table->string('company')->nullable(); // Nama PT/CV
    $table->string('email')->unique();
    $table->string('phone')->nullable();
    $table->text('address')->nullable(); // Alamat Penagihan
    $table->timestamps();
});

// 3. PROJECTS (Portofolio)
Schema::create('projects', function (Blueprint $table) {
    $table->id();
    $table->foreignId('client_id')->nullable()->constrained()->onDelete('set null');
    $table->string('title');
    $table->string('slug')->unique(); // wujudkarya.com/project/aplikasi-toko
    $table->text('excerpt')->nullable(); // Untuk SEO Description
    $table->longText('description')->nullable(); 
    $table->json('tech_stack')->nullable(); // ["Laravel", "React", "Flutter"]
    $table->enum('type', ['web', 'mobile', 'system', 'ui/ux']);
    $table->date('published_at')->nullable(); // Tanggal rilis
    $table->string('thumbnail')->nullable();
    $table->string('demo_url')->nullable();
    $table->boolean('is_featured')->default(false);
    $table->text('private_notes')->nullable(); // Catatan internal/request khusus klien
    $table->timestamps();
});

// 4. PROJECT_IMAGES (Galeri Carousel)
Schema::create('project_images', function (Blueprint $table) {
    $table->id();
    $table->foreignId('project_id')->constrained()->onDelete('cascade');
    $table->string('image_path');
    $table->integer('sort_order')->default(0);
    $table->timestamps();
});

// 5. INVOICES (Keuangan)
Schema::create('invoices', function (Blueprint $table) {
    $table->id();
    $table->foreignId('client_id')->constrained();
    $table->foreignId('project_id')->nullable()->constrained()->onDelete('set null');
    $table->string('invoice_number')->unique(); // WK/INV/2024/001
    $table->date('issued_date');
    $table->date('due_date');
    $table->decimal('subtotal', 15, 2);
    $table->decimal('tax_amount', 15, 2)->default(0); // Jika ada PPN
    $table->decimal('total', 15, 2);
    $table->enum('status', ['draft', 'sent', 'paid', 'cancelled'])->default('draft');
    $table->text('notes')->nullable(); // Catatan kaki invoice
    $table->timestamps();
});

// 6. INVOICE_ITEMS (Detail Tagihan)
Schema::create('invoice_items', function (Blueprint $table) {
    $table->id();
    $table->foreignId('invoice_id')->constrained()->onDelete('cascade');
    $table->string('description');
    $table->integer('quantity')->default(1);
    $table->decimal('price', 15, 2);
    $table->decimal('amount', 15, 2);
    $table->timestamps();
});

// 7. LEADS (Formulir Kontak)
Schema::create('leads', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('email');
    $table->string('service_interest'); // Web / Mobile
    $table->text('message');
    $table->enum('status', ['new', 'contacted', 'deal', 'closed'])->default('new');
    $table->timestamps();
});
```

### B. Seeder Awal (SettingSeeder.php)
Jalankan ini agar fitur Invoice langsung punya data kop surat.

```php
public function run()
{
    \App\Models\Setting::insert([
        ['key' => 'site_name', 'value' => 'WujudKarya'],
        ['key' => 'owner_name', 'value' => 'Nama Lengkap Anda'],
        ['key' => 'company_address', 'value' => 'Jl. Digital No. 1, Jakarta'],
        ['key' => 'bank_name', 'value' => 'BCA'],
        ['key' => 'bank_account', 'value' => '1234567890'],
        ['key' => 'bank_holder', 'value' => 'Nama Anda'],
        ['key' => 'invoice_prefix', 'value' => 'WK/INV/'],
    ]);
}
```

---

## 5. Roadmap Pengerjaan (Step-by-Step)

### Minggu 1: Fondasi & Branding
- [ ] Install Laravel + Inertia SSR.
- [ ] Setup Database & Model.
- [ ] Desain Logo Sederhana: Fokus pada huruf "W" atau "WK" yang terlihat seperti balok bangunan (mencerminkan "Karya/Build").
- [ ] Setup Layout React dengan warna dominan Brand.

### Minggu 2: Portofolio (Public)
- [ ] Buat halaman Home & Project List.
- [ ] Buat halaman Detail Project dengan Slider Gambar.
- [ ] Optimasi SEO (Meta tags dinamis di `<Head>` Inertia).

### Minggu 3: Bisnis (Admin)
- [ ] Fitur Login Admin.
- [ ] CRUD Projects & Clients.
- [ ] Fitur Invoice: Ini prioritas agar Anda terlihat profesional saat menagih klien pertama. Desain PDF Invoice harus rapi dan menggunakan logo WujudKarya.
