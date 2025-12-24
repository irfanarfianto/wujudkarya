<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Client;
use App\Models\Lead;
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

        return inertia('landing/welcome', [
            'projects' => $projects,
            'clients' => $clients,
        ]);
    }

    public function submitContact(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'service_interest' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $validated['status'] = 'new';

        Lead::create($validated);

        return redirect()->route('home')->with('success', 'Terima kasih atas pesan Anda! Kami akan segera menghubungi Anda.');
    }

    public function showProject(Project $project)
    {
        // Only show published projects
        if (!$project->published_at) {
            abort(404);
        }

        $project->load('client');

        // Get related projects (same client or featured)
        $relatedProjects = Project::with('client')
            ->whereNotNull('published_at')
            ->where('id', '!=', $project->id)
            ->where(function($query) use ($project) {
                $query->where('client_id', $project->client_id)
                      ->orWhere('is_featured', true);
            })
            ->latest('published_at')
            ->take(3)
            ->get();

        return inertia('landing/project-detail', [
            'project' => $project,
            'relatedProjects' => $relatedProjects,
        ]);
    }
}
