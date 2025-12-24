<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function index()
    {
        $settings = Setting::pluck('value', 'key')->all();

        return inertia('settings/index', [
            'settings' => $settings
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            // Site Info
            'site_name' => 'required|string|max:255',
            'site_description' => 'nullable|string',
            
            // Contact Info
            'contact_email' => 'nullable|email',
            'contact_phone' => 'nullable|string',
            'contact_address' => 'nullable|string',
            
            // Bank Info
            'bank_name' => 'nullable|string|max:255',
            'bank_account_number' => 'nullable|string|max:255',
            'bank_account_name' => 'nullable|string|max:255',
            
            // Owner Contact
            'owner_name' => 'nullable|string|max:255',
            'owner_phone' => 'nullable|string|max:255',
            'owner_email' => 'nullable|email',
            
            // Social Media
            'social_instagram' => 'nullable|string',
            'facebook_url' => 'nullable|url',
            'twitter_url' => 'nullable|url',
            'linkedin_url' => 'nullable|url',
            
            // Business Info
            'company_address' => 'nullable|string',
            'tax_id' => 'nullable|string|max:255',
            'business_hours' => 'nullable|string',
        ]);

        foreach ($validated as $key => $value) {
            Setting::updateOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }

        // Clear the settings cache so changes reflect immediately
        \Illuminate\Support\Facades\Cache::forget('site_settings');

        return redirect()->back();
    }
}
