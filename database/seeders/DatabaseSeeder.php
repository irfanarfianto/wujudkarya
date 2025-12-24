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

        // // 1. Create Admin
        // User::firstOrCreate(
        //     ['email' => 'admin@wujudkarya.com'],
        //     [
        //         'name' => 'Admin WujudKarya',
        //         'password' => 'password',
        //         'email_verified_at' => now(),
        //     ]
        // );

        // // 2. Seed Default Settings
        // $defaultSettings = [
        //     'site_name' => 'WujudKarya',
        //     'site_description' => 'We build premium web applications, specialized systems, and stunning digital experiences that drive growth.',
        //     'contact_email' => 'hello@wujudkarya.com',
        //     'contact_phone' => '+62 812-3456-7890',
        //     'social_instagram' => 'https://instagram.com/wujudkarya',
        // ];

        // foreach ($defaultSettings as $key => $value) {
        //     \App\Models\Setting::firstOrCreate(
        //         ['key' => $key],
        //         ['value' => $value]
        //     );
        // }

        // 3. Create Clients with Projects and Invoices
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

        // 4. Create Leads (Potential Clients)
        \App\Models\Lead::factory(20)->create();

        // 5. Ensure Revenue Data for Last 12 Months (Chart Filler)
        $months = 12;
        $clients = \App\Models\Client::all();
        
        if ($clients->isEmpty()) {
             $clients = \App\Models\Client::factory(5)->create();
        }

        for ($i = 0; $i < $months; $i++) {
            $date = now()->subMonths($i);
            
            // Create 1-3 invoices per month to ensure data exists
            $count = rand(1, 4); 
            
            for ($j = 0; $j < $count; $j++) {
                $subtotal = rand(5000000, 50000000);
                $tax = $subtotal * 0.11;
                
                $invoice = \App\Models\Invoice::create([
                    'client_id' => $clients->random()->id,
                    'invoice_number' => 'WK/INV/' . $date->format('Y') . '/' . date('m') . rand(1000, 9999),
                    'issued_date' => $date,
                    'due_date' => $date->copy()->addDays(30),
                    'created_at' => $date, // Important for chart query
                    'updated_at' => $date,
                    'subtotal' => $subtotal,
                    'tax_amount' => $tax,
                    'total' => $subtotal + $tax,
                    'status' => 'paid', // Must be paid to show in chart
                    'notes' => 'Generated for Chart Seeding',
                ]);

                \App\Models\InvoiceItem::create([
                    'invoice_id' => $invoice->id,
                    'description' => 'Service for ' . $date->format('F Y'),
                    'quantity' => 1,
                    'price' => $subtotal,
                    'amount' => $subtotal,
                ]);
            }
        }
    }
}
