<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Project::with('client');

        if ($request->has('type') && $request->type && $request->type !== 'all') {
            $query->where('type', $request->type);
        }

        if ($request->has('is_featured') && $request->is_featured !== null && $request->is_featured !== 'all') {
            $isFeatured = filter_var($request->is_featured, FILTER_VALIDATE_BOOLEAN);
            $query->where('is_featured', $isFeatured);
        }

        if ($request->has('status') && $request->status && $request->status !== 'all') {
            if ($request->status === 'published') {
                $query->whereNotNull('published_at');
            } elseif ($request->status === 'draft') {
                $query->whereNull('published_at');
            }
        }

        if ($request->has('tech_stack') && $request->tech_stack && $request->tech_stack !== 'all') {
            $query->whereJsonContains('tech_stack', $request->tech_stack);
        }

        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhereHas('client', function ($cq) use ($search) {
                      $cq->where('name', 'like', "%{$search}%")
                         ->orWhere('company', 'like', "%{$search}%");
                  });
            });
        }

        $projects = $query->latest()
            ->paginate(10)
            ->withQueryString();

        // Get all unique tech stacks for filter dropdown
        $allTechStacks = Project::pluck('tech_stack')
            ->flatten()
            ->filter()
            ->unique()
            ->values()
            ->sort()
            ->values();

        return inertia('projects/index', [
            'projects' => $projects,
            'filters' => $request->only(['type', 'is_featured', 'status', 'tech_stack', 'search']),
            'availableTechStacks' => $allTechStacks,
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

        return redirect()->route('projects.index')->with('success', 'Project created successfully!');
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
        $project->load('client');
        $clients = \App\Models\Client::select('id', 'name', 'company')->orderBy('name')->get();

        return inertia('projects/edit', [
            'project' => $project,
            'clients' => $clients
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        \Log::info('🚀 [PROJECT UPDATE] Request received', [
            'project_id' => $project->id,
            'project_title' => $project->title,
            'request_method' => $request->method(),
            'has_file' => $request->hasFile('thumbnail'),
        ]);

        \Log::info('📦 [PROJECT UPDATE] Request data', [
            'all_data' => $request->except(['thumbnail', '_token']),
            'files' => $request->allFiles(),
        ]);

        if ($request->has('tech_stack_input')) {
            $stack = array_map('trim', explode(',', $request->input('tech_stack_input')));
            $stack = array_filter($stack);
            $request->merge(['tech_stack' => array_values($stack)]);
            \Log::info('🔧 [PROJECT UPDATE] Tech stack processed', ['tech_stack' => array_values($stack)]);
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

        \Log::info('✅ [PROJECT UPDATE] Validation passed', [
            'validated_data' => Arr::except($validated, ['thumbnail'])
        ]);

        if ($request->hasFile('thumbnail')) {
            \Log::info('📸 [PROJECT UPDATE] Processing thumbnail upload');
            
            // Delete old thumbnail if exists
            if ($project->thumbnail && file_exists(public_path($project->thumbnail))) {
                unlink(public_path($project->thumbnail));
                \Log::info('🗑️ [PROJECT UPDATE] Old thumbnail deleted', ['path' => $project->thumbnail]);
            }
            
            $path = $request->file('thumbnail')->store('projects', 'public');
            $validated['thumbnail'] = '/storage/' . $path;
            \Log::info('💾 [PROJECT UPDATE] New thumbnail saved', ['path' => $validated['thumbnail']]);
        }

        // Update slug only if title changed
        if ($validated['title'] !== $project->title) {
            $validated['slug'] = \Illuminate\Support\Str::slug($validated['title']) . '-' . rand(1000, 9999);
            \Log::info('🔗 [PROJECT UPDATE] Slug updated', [
                'old_slug' => $project->slug,
                'new_slug' => $validated['slug']
            ]);
        }

        $validated['tech_stack'] = $validated['tech_stack'] ?? [];

        \Log::info('💾 [PROJECT UPDATE] Updating project in database', [
            'project_id' => $project->id,
            'changes' => Arr::except($validated, ['thumbnail'])
        ]);

        $project->update($validated);

        \Log::info('🎉 [PROJECT UPDATE] Project updated successfully', [
            'project_id' => $project->id,
            'project_title' => $project->title,
        ]);

        return redirect()->route('projects.index')->with('success', 'Project updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        // Delete thumbnail if exists
        if ($project->thumbnail && file_exists(public_path($project->thumbnail))) {
            unlink(public_path($project->thumbnail));
        }

        $project->delete();

        return redirect()->route('projects.index')->with('success', 'Project deleted successfully!');
    }
}
