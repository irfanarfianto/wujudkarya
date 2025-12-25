<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;

class ContentController extends Controller
{
    public function index()
    {
        $settings = Setting::pluck('value', 'key')->all();

        return inertia('content/index', [
            'settings' => $settings
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            // Landing Page - Hero
            'hero_tagline'      => 'nullable|string|max:255',
            'hero_headline_1'   => 'nullable|string|max:255',
            'hero_headline_2'   => 'nullable|string|max:255',
            'hero_description'  => 'nullable|string',
            'hero_cta_primary'  => 'nullable|string|max:255',
            'hero_cta_secondary'=> 'nullable|string|max:255',

            // Landing Page - Stats
            'stats_projects_count' => 'nullable|string|max:255',
            'stats_clients_count'  => 'nullable|string|max:255',
            'stats_years_exp'      => 'nullable|string|max:255',

            // Landing Page - About
            'about_title'         => 'nullable|string|max:255',
            'about_subtitle'      => 'nullable|string|max:255',
            'about_description_1' => 'nullable|string',
            'about_description_2' => 'nullable|string',
            'vision'              => 'nullable|string',
            'mission'             => 'nullable|string',
        ]);

        foreach ($validated as $key => $value) {
            Setting::updateOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }

        // Clear the settings cache so changes reflect immediately
        \Illuminate\Support\Facades\Cache::forget('site_settings');

        return redirect()->back()->with('success', 'Konten berhasil diperbarui');
    }
}
