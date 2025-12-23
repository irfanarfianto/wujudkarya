<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Client;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        // Fetch featured or latest projects
        $projects = Project::with('client')
            ->whereNotNull('published_at')
            ->where('is_featured', true)
            ->latest('published_at')
            ->take(6)
            ->get();

        $clients = Client::select('id', 'name', 'company')->take(10)->get();

        return inertia('welcome', [
            'projects' => $projects,
            'clients' => $clients,
        ]);
    }
}
