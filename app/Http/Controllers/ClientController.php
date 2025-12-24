<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clients = Client::withCount('projects')
            ->latest()
            ->paginate(10);

        return inertia('clients/index', [
            'clients' => $clients
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
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'company' => 'nullable|string|max:255',
            'email' => 'required|email|unique:clients,email',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
        ]);

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
    public function update(Request $request, Client $client)
    {
        \Log::info('🚀 [CLIENT UPDATE] Request received', [
            'client_id' => $client->id,
            'client_name' => $client->name,
            'request_method' => $request->method(),
        ]);

        \Log::info('📦 [CLIENT UPDATE] Request data', [
            'all_data' => $request->except(['_token']),
        ]);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'company' => 'nullable|string|max:255',
            'email' => 'required|email|unique:clients,email,' . $client->id,
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
        ]);

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
