<?php

namespace App\Http\Controllers;

use App\Http\Requests\Leads\StoreLeadRequest;
use App\Http\Requests\Leads\UpdateLeadRequest;
use App\Models\Lead;
use Illuminate\Http\Request;

class LeadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $leads = Lead::latest()->paginate(10);

        return inertia('leads/index', [
            'leads' => $leads
        ]);
    }


     public function create()
     {
         return inertia('leads/create');
     }

     public function store(StoreLeadRequest $request)
     {
         $validated = $request->validated();

         Lead::create($validated);

         return redirect()->route('leads.index')->with('success', 'Lead created successfully!');
     }

     public function show(Lead $lead) {}

     public function edit(Lead $lead)
     {
         return inertia('leads/edit', [
             'lead' => $lead
         ]);
     }

     public function update(UpdateLeadRequest $request, Lead $lead)
     {
         \Log::info('🚀 [LEAD UPDATE] Request received', [
             'lead_id' => $lead->id,
             'lead_name' => $lead->name,
             'request_method' => $request->method(),
         ]);

         \Log::info('📦 [LEAD UPDATE] Request data', [
             'all_data' => $request->except(['_token']),
         ]);

         $validated = $request->validated();

         \Log::info('✅ [LEAD UPDATE] Validation passed', [
             'validated_data' => $validated
         ]);

         \Log::info('💾 [LEAD UPDATE] Updating lead in database', [
             'lead_id' => $lead->id,
             'changes' => $validated
         ]);

         $lead->update($validated);

         \Log::info('🎉 [LEAD UPDATE] Lead updated successfully', [
             'lead_id' => $lead->id,
             'lead_name' => $lead->name,
         ]);

         return redirect()->route('leads.index')->with('success', 'Lead updated successfully!');
     }

     public function destroy(Lead $lead) {}
}
