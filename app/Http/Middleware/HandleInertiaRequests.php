<?php

namespace App\Http\Middleware;

use App\Models\Setting;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        // Cache settings for 1 hour to reduce DB queries
        $settings = Cache::remember('site_settings', 3600, function () {
            return Setting::pluck('value', 'key')->all();
        });

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'email_verified_at' => $request->user()->email_verified_at,
                ] : null,
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'settings' => [
                // Site Info
                'site_name' => $settings['site_name'] ?? 'WujudKarya',
                'site_description' => $settings['site_description'] ?? '',
                
                // Contact Info
                'contact_email' => $settings['contact_email'] ?? '',
                'contact_phone' => $settings['contact_phone'] ?? '',
                'contact_address' => $settings['contact_address'] ?? '',
                
                // Bank Info
                'bank_name' => $settings['bank_name'] ?? '',
                'bank_account_number' => $settings['bank_account_number'] ?? '',
                'bank_account_name' => $settings['bank_account_name'] ?? '',
                
                // Owner Contact
                'owner_name' => $settings['owner_name'] ?? '',
                'owner_phone' => $settings['owner_phone'] ?? '',
                'owner_email' => $settings['owner_email'] ?? '',
                
                // Social Media
                'social_instagram' => $settings['social_instagram'] ?? '',
                'facebook_url' => $settings['facebook_url'] ?? '',
                'twitter_url' => $settings['twitter_url'] ?? '',
                'linkedin_url' => $settings['linkedin_url'] ?? '',
                
                // Business Info
                'company_address' => $settings['company_address'] ?? '',
                'tax_id' => $settings['tax_id'] ?? '',
                'business_hours' => $settings['business_hours'] ?? '',

                // Landing Page - Hero
                'hero_tagline'      => $settings['hero_tagline'] ?? 'Partner Digital Terpercaya',
                'hero_headline_1'   => $settings['hero_headline_1'] ?? 'Mewujudkan Ide',
                'hero_headline_2'   => $settings['hero_headline_2'] ?? 'Menjadi Digital',
                'hero_description'  => $settings['hero_description'] ?? 'Kami membantu UMKM, startup, dan perusahaan mewujudkan ide digital melalui web development dan mobile app development yang profesional.',
                'hero_cta_primary'  => $settings['hero_cta_primary'] ?? 'Konsultasi Gratis',
                'hero_cta_secondary'=> $settings['hero_cta_secondary'] ?? 'Lihat Portofolio',

                // Landing Page - Stats
                'stats_projects_count' => $settings['stats_projects_count'] ?? '50+',
                'stats_clients_count'  => $settings['stats_clients_count'] ?? '30+',
                'stats_years_exp'      => $settings['stats_years_exp'] ?? '5+',

                // Landing Page - About
                'about_title'         => $settings['about_title'] ?? 'Siapa WujudKarya?',
                'about_subtitle'      => $settings['about_subtitle'] ?? 'Partner Digital Terpercaya Anda',
                'about_description_1' => $settings['about_description_1'] ?? '',
                'about_description_2' => $settings['about_description_2'] ?? '',
                'vision'              => $settings['vision'] ?? '',
                'mission'             => $settings['mission'] ?? '',
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
                'warning' => fn () => $request->session()->get('warning'),
                'info' => fn () => $request->session()->get('info'),
            ],
        ];
    }
}
