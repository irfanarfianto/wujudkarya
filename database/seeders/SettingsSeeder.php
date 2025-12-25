<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            // Site Identity
            ['key' => 'site_name', 'value' => 'WujudKarya'],
            ['key' => 'site_description', 'value' => 'Digital agency profesional yang siap membantu mewujudkan transformasi digital untuk bisnis Anda dengan solusi terbaik dan teknologi terkini.'],
            
            // Hero Section
            ['key' => 'hero_tagline', 'value' => 'Partner Digital Terpercaya'],
            ['key' => 'hero_headline_1', 'value' => 'Mewujudkan Ide'],
            ['key' => 'hero_headline_2', 'value' => 'Menjadi Digital'],
            ['key' => 'hero_description', 'value' => 'Kami membantu UMKM, startup, dan perusahaan mewujudkan ide digital melalui web development dan mobile app development yang profesional.'],
            ['key' => 'hero_cta_primary', 'value' => 'Konsultasi Gratis'],
            ['key' => 'hero_cta_secondary', 'value' => 'Lihat Portofolio'],

            // Stats
            ['key' => 'stats_projects_count', 'value' => '50+'],
            ['key' => 'stats_clients_count', 'value' => '30+'],
            ['key' => 'stats_years_exp', 'value' => '5+'],

            // About Section
            ['key' => 'about_title', 'value' => 'Siapa WujudKarya?'],
            ['key' => 'about_subtitle', 'value' => 'Partner Digital Terpercaya Anda'],
            ['key' => 'about_description_1', 'value' => 'WujudKarya adalah digital agency yang berfokus pada pengembangan web dan mobile app untuk membantu UMKM, startup, dan perusahaan mewujudkan ide digital mereka.'],
            ['key' => 'about_description_2', 'value' => 'Dengan pengalaman yang solid dan puluhan project yang telah diselesaikan, kami memahami kebutuhan bisnis Indonesia dan siap menjadi partner teknologi Anda.'],
            ['key' => 'vision', 'value' => 'Menjadi partner digital terpercaya yang membantu bisnis Indonesia bertransformasi di era digital.'],
            ['key' => 'mission', 'value' => 'Memberikan solusi digital inovatif dengan standar kualitas tinggi dan layanan prima.'],

            // Contact Info
            ['key' => 'contact_email', 'value' => 'hello@wujudkarya.com'],
            ['key' => 'contact_phone', 'value' => '+62 821 1234 5678'],
            ['key' => 'contact_address', 'value' => 'Jl. Jenderal Sudirman No. 45, Jakarta Selatan'],
            ['key' => 'business_hours', 'value' => 'Senin - Jumat, 09:00 - 17:00'],

            // Social Media
            ['key' => 'social_instagram', 'value' => 'https://instagram.com/wujudkarya'],
            ['key' => 'facebook_url', 'value' => ''],
            ['key' => 'twitter_url', 'value' => ''],
            ['key' => 'linkedin_url', 'value' => ''],

            // Owner / Legal (Optional)
            ['key' => 'owner_name', 'value' => 'Irfan Arfianto'],
            ['key' => 'owner_email', 'value' => 'irfan@wujudkarya.com'],
            ['key' => 'owner_phone', 'value' => ''],
            ['key' => 'bank_name', 'value' => 'BCA'],
            ['key' => 'bank_account_number', 'value' => '1234567890'],
            ['key' => 'bank_account_name', 'value' => 'WujudKarya Digital'],
        ];

        foreach ($settings as $setting) {
            Setting::updateOrCreate(
                ['key' => $setting['key']],
                ['value' => $setting['value']]
            );
        }
    }
}
