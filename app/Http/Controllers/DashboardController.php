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
        return Inertia::render('dashboard', [
            'stats' => [
                'projects' => Project::count(),
                'clients' => Client::count(),
                'revenue' => Invoice::where('status', 'paid')->sum('total'),
                'leads' => Lead::where('status', 'new')->count(),
            ]
        ]);
    }
}
