<?php

namespace App\Http\Controllers;

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

     // ... Stubs ...
     public function create() {}
     public function store(Request $request) {}
     public function show(Lead $lead) {}
     public function edit(Lead $lead) {}
     public function update(Request $request, Lead $lead) {}
     public function destroy(Lead $lead) {}
}
