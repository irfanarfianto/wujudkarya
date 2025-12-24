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
                'user' => $request->user(),
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
            ],
        ];
    }
}
