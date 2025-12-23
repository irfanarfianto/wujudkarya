# Struktur Database (Schema)

Berikut adalah rancangan skema database untuk WujudKarya.

## A. Tabel Utama

### 1. Settings
Menyimpan konfigurasi dinamis website (nama situs, info bank, kontak owner).
```php
Schema::create('settings', function (Blueprint $table) {
    $table->id();
    $table->string('key')->unique(); 
    $table->text('value')->nullable();
    $table->timestamps();
});
```

### 2. Clients
Data pelanggan/klien untuk keperluan CRM dan Invoicing.
```php
Schema::create('clients', function (Blueprint $table) {
    $table->id();
    $table->string('name'); // Nama PIC
    $table->string('company')->nullable(); // Nama PT/CV
    $table->string('email')->unique();
    $table->string('phone')->nullable();
    $table->text('address')->nullable(); // Alamat Penagihan
    $table->timestamps();
});
```

### 3. Projects
Menyimpan portofolio karya.
```php
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
```

### 4. Project Images
Galeri gambar tambahan untuk setiap project (carousel/slider).
```php
Schema::create('project_images', function (Blueprint $table) {
    $table->id();
    $table->foreignId('project_id')->constrained()->onDelete('cascade');
    $table->string('image_path');
    $table->integer('sort_order')->default(0);
    $table->timestamps();
});
```

### 5. Invoices
Data tagihan ke klien.
```php
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
```

### 6. Invoice Items
Detail item dalam satu invoice.
```php
Schema::create('invoice_items', function (Blueprint $table) {
    $table->id();
    $table->foreignId('invoice_id')->constrained()->onDelete('cascade');
    $table->string('description');
    $table->integer('quantity')->default(1);
    $table->decimal('price', 15, 2);
    $table->decimal('amount', 15, 2);
    $table->timestamps();
});
```

### 7. Leads
Data dari formulir "Wujudkan Ide" (Contact Form).
```php
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

## B. Seeders (Data Awal)

### SettingSeeder
Data default untuk konfigurasi website.
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
