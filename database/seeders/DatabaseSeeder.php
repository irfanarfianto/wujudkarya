<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // 1. Create Admin
        User::firstOrCreate(
            ['email' => 'admin@wujudkarya.com'],
            [
                'name' => 'Admin WujudKarya',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );

        // 2. Create Clients with Projects and Invoices
        \App\Models\Client::factory(10)->create()->each(function ($client) {
            
            // Create 1-3 Projects for this client
            $projects = \App\Models\Project::factory(rand(1, 3))->create([
                'client_id' => $client->id
            ]);

            // Create Invoices (some linked to projects, some general)
            \App\Models\Invoice::factory(rand(1, 5))->create([
                'client_id' => $client->id,
                'project_id' => $projects->random()->id ?? null, // Link to one of client's project
            ])->each(function ($invoice) {
                // Create Invoice Items
                \App\Models\InvoiceItem::create([
                    'invoice_id' => $invoice->id,
                    'description' => 'Jasa Pembuatan Website (Term 1)',
                    'quantity' => 1,
                    'price' => $invoice->subtotal,
                    'amount' => $invoice->subtotal,
                ]);
            });
        });

        // 3. Create Leads (Potential Clients)
        \App\Models\Lead::factory(20)->create();
    }
}
