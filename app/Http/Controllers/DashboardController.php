<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Invoice;
use App\Models\Lead;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Fetch recent activities
        $activities = collect();

        // 1. New Leads
        $leads = Lead::latest()->take(5)->get()->map(function ($item) {
            return [
                'id' => $item->id,
                'type' => 'lead',
                'title' => 'New Lead: ' . $item->name,
                'description' => 'Just sent a message via contact form.',
                'created_at' => $item->created_at,
            ];
        });

        // 2. New Projects
        $projects = Project::latest()->take(5)->get()->map(function ($item) {
            return [
                'id' => $item->id,
                'type' => 'project',
                'title' => 'Project Created: ' . $item->title,
                'description' => 'Status: ' . $item->status,
                'created_at' => $item->created_at,
            ];
        });

        // 3. New Clients
        $clients = Client::latest()->take(5)->get()->map(function ($item) {
            return [
                'id' => $item->id,
                'type' => 'client',
                'title' => 'New Client: ' . $item->company ?? $item->name,
                'description' => 'Client has been added.',
                'created_at' => $item->created_at,
            ];
        });

        // Merge, Sort, and Take recent 10
        $recentActivities = $activities
            ->concat($leads)
            ->concat($projects)
            ->concat($clients)
            ->sortByDesc('created_at')
            ->take(10)
            ->values();

        // Revenue Chart Data (Last 6 Months)
        // Group invoices by month
        // Revenue Chart Data
        $range = request()->get('range', 6); // Default 6 months
        $months = (int) $range;

        // 1. Get raw data from DB
        $rawData = Invoice::where('status', 'paid')
            ->where('created_at', '>=', now()->subMonths($months)->startOfMonth())
            ->selectRaw("TO_CHAR(created_at, 'YYYY-MM') as month_key, SUM(total) as total")
            ->groupBy('month_key')
            ->orderBy('month_key')
            ->get()
            ->keyBy('month_key'); // Key by '2025-01' for easy lookup

        // 2. Generate full period array & merge
        $revenueData = collect();
        $currentDate = now()->subMonths($months - 1)->startOfMonth(); // Start from X months ago

        for ($i = 0; $i < $months; $i++) {
            $monthKey = $currentDate->format('Y-m');
            $displayName = $currentDate->translatedFormat('M'); // Jan
            
            $revenueData->push([
                'name' => $displayName,
                'total' => isset($rawData[$monthKey]) ? (int) $rawData[$monthKey]->total : 0,
                'full_date' => $monthKey // Optional debugging
            ]);

            $currentDate->addMonth();
        }

        return Inertia::render('dashboard', [
            'stats' => [
                'projects' => Project::count(),
                'clients' => Client::count(),
                'revenue' => Invoice::where('status', 'paid')->sum('total'),
                'leads' => Lead::where('status', 'new')->count(),
            ],
            'recentActivities' => $recentActivities,
            'revenueChart' => $revenueData,
            'filters' => [
                'range' => $months
            ]
        ]);
    }
}
