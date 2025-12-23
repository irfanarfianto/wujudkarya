<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. SETTINGS
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique(); 
            $table->text('value')->nullable();
            $table->timestamps();
        });

        // 2. CLIENTS
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Nama PIC
            $table->string('company')->nullable(); // Nama PT/CV
            $table->string('email')->unique();
            $table->string('phone')->nullable();
            $table->text('address')->nullable(); // Alamat Penagihan
            $table->timestamps();
        });

        // 3. PROJECTS
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
            $table->text('private_notes')->nullable(); // Catatan internal
            $table->timestamps();
        });

        // 4. PROJECT_IMAGES
        Schema::create('project_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->onDelete('cascade');
            $table->string('image_path');
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // 5. INVOICES
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained();
            $table->foreignId('project_id')->nullable()->constrained()->onDelete('set null');
            $table->string('invoice_number')->unique(); // WK/INV/2024/001
            $table->date('issued_date');
            $table->date('due_date');
            $table->decimal('subtotal', 15, 2);
            $table->decimal('tax_amount', 15, 2)->default(0); 
            $table->decimal('total', 15, 2);
            $table->enum('status', ['draft', 'sent', 'paid', 'cancelled'])->default('draft');
            $table->text('notes')->nullable(); 
            $table->timestamps();
        });

        // 6. INVOICE_ITEMS
        Schema::create('invoice_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invoice_id')->constrained()->onDelete('cascade');
            $table->string('description');
            $table->integer('quantity')->default(1);
            $table->decimal('price', 15, 2);
            $table->decimal('amount', 15, 2);
            $table->timestamps();
        });

        // 7. LEADS
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('service_interest'); // Web / Mobile
            $table->text('message');
            $table->enum('status', ['new', 'contacted', 'deal', 'closed'])->default('new');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leads');
        Schema::dropIfExists('invoice_items');
        Schema::dropIfExists('invoices');
        Schema::dropIfExists('project_images');
        Schema::dropIfExists('projects');
        Schema::dropIfExists('clients');
        Schema::dropIfExists('settings');
    }
};
