<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::with('client')
            ->latest()
            ->paginate(10);

        return inertia('projects/index', [
            'projects' => $projects
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $clients = \App\Models\Client::select('id', 'name', 'company')->orderBy('name')->get();

        return inertia('projects/create', [
            'clients' => $clients
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if ($request->has('tech_stack_input')) {
            $stack = array_map('trim', explode(',', $request->input('tech_stack_input')));
            $stack = array_filter($stack);
            $request->merge(['tech_stack' => array_values($stack)]);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'client_id' => 'required|exists:clients,id',
            'type' => 'required|in:web,mobile,system,ui/ux',
            'description' => 'nullable|string',
            'tech_stack' => 'nullable|array',
            'demo_url' => 'nullable|url',
            'published_at' => 'nullable|date',
            'is_featured' => 'boolean',
            'thumbnail' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('projects', 'public');
            $validated['thumbnail'] = '/storage/' . $path;
        }

        $validated['slug'] = \Illuminate\Support\Str::slug($validated['title']) . '-' . rand(1000, 9999);
        $validated['tech_stack'] = $validated['tech_stack'] ?? [];

        Project::create($validated);

        return redirect()->route('projects.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }
}
