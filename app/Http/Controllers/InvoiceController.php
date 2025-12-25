<?php

namespace App\Http\Controllers;

use App\Http\Requests\Invoices\StoreInvoiceRequest;
use App\Http\Requests\Invoices\UpdateInvoiceRequest;
use App\Models\Invoice;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $invoices = Invoice::with('client')
            ->latest()
            ->paginate(10);

        return inertia('invoices/index', [
            'invoices' => $invoices
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $clients = \App\Models\Client::select('id', 'name', 'company')->orderBy('name')->get();
        $projects = \App\Models\Project::select('id', 'title')->orderBy('title')->get();

        return inertia('invoices/create', [
            'clients' => $clients,
            'projects' => $projects,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreInvoiceRequest $request)
    {
        $validated = $request->validated();

        // Calculate totals
        $subtotal = 0;
        foreach ($validated['items'] as &$item) {
            $item['amount'] = $item['quantity'] * $item['price'];
            $subtotal += $item['amount'];
        }

        $taxAmount = $subtotal * 0.11; // 11% tax
        $total = $subtotal + $taxAmount;

        $validated['subtotal'] = $subtotal;
        $validated['tax_amount'] = $taxAmount;
        $validated['total'] = $total;

        $invoice = Invoice::create($validated);
        $invoice->items()->createMany($validated['items']);

        return redirect()->route('invoices.index')->with('success', 'Invoice created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Invoice $invoice)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Invoice $invoice)
    {
        $invoice->load(['client', 'project', 'items']);
        $clients = \App\Models\Client::select('id', 'name', 'company')->orderBy('name')->get();
        $projects = \App\Models\Project::select('id', 'title')->orderBy('title')->get();

        return inertia('invoices/edit', [
            'invoice' => $invoice,
            'clients' => $clients,
            'projects' => $projects,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInvoiceRequest $request, Invoice $invoice)
    {
        $validated = $request->validated();

        // Calculate totals
        $subtotal = 0;
        foreach ($validated['items'] as &$item) {
            $item['amount'] = $item['quantity'] * $item['price'];
            $subtotal += $item['amount'];
        }

        $taxAmount = $subtotal * 0.11; // 11% tax
        $total = $subtotal + $taxAmount;

        $validated['subtotal'] = $subtotal;
        $validated['tax_amount'] = $taxAmount;
        $validated['total'] = $total;

        // Delete old items and create new ones
        $invoice->items()->delete();
        $invoice->update($validated);
        $invoice->items()->createMany($validated['items']);

        return redirect()->route('invoices.index')->with('success', 'Invoice updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invoice $invoice)
    {
        //
    }
}
