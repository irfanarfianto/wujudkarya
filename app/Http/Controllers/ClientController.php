<?php

namespace App\Http\Controllers;

use App\Http\Requests\Clients\StoreClientRequest;
use App\Http\Requests\Clients\UpdateClientRequest;
use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Client::withCount('projects');

        if ($request->has('has_projects') && $request->has_projects !== 'all') {
            if ($request->has_projects === 'yes') {
                $query->has('projects');
            } elseif ($request->has_projects === 'no') {
                $query->doesntHave('projects');
            }
        }

        // Search Filter
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('company', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Sorting
        if ($request->has('sort')) {
            switch ($request->sort) {
                case 'oldest':
                    $query->oldest();
                    break;
                case 'name_asc':
                    $query->orderBy('name', 'asc');
                    break;
                case 'name_desc':
                    $query->orderBy('name', 'desc');
                    break;
                case 'projects_desc':
                    $query->orderBy('projects_count', 'desc');
                    break;
                default:
                    $query->latest();
                    break;
            }
        } else {
            $query->latest();
        }

        $clients = $query->paginate(10)
            ->withQueryString();

        return inertia('clients/index', [
            'clients' => $clients,
            'filters' => $request->only(['search', 'sort', 'has_projects']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('clients/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClientRequest $request)
    {
        $validated = $request->validated();

        Client::create($validated);

        return redirect()->route('clients.index')->with('success', 'Client created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Client $client)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Client $client)
    {
        return inertia('clients/edit', [
            'client' => $client
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateClientRequest $request, Client $client)
    {
        \Log::info('🚀 [CLIENT UPDATE] Request received', [
            'client_id' => $client->id,
            'client_name' => $client->name,
            'request_method' => $request->method(),
        ]);

        \Log::info('📦 [CLIENT UPDATE] Request data', [
            'all_data' => $request->except(['_token']),
        ]);

        $validated = $request->validated();

        \Log::info('✅ [CLIENT UPDATE] Validation passed', [
            'validated_data' => $validated
        ]);

        \Log::info('💾 [CLIENT UPDATE] Updating client in database', [
            'client_id' => $client->id,
            'changes' => $validated
        ]);

        $client->update($validated);

        \Log::info('🎉 [CLIENT UPDATE] Client updated successfully', [
            'client_id' => $client->id,
            'client_name' => $client->name,
        ]);

        return redirect()->route('clients.index')->with('success', 'Client updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Client $client)
    {
        //
    }
}
