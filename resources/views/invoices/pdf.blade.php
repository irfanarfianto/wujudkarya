<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Invoice {{ $invoice->invoice_number }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'DejaVu Sans', sans-serif;
            font-size: 12px;
            color: #333;
            line-height: 1.6;
        }
        .container {
            padding: 40px;
            max-width: 800px;
            margin: 0 auto;
        }
        .header {
            margin-bottom: 40px;
            border-bottom: 3px solid #2563eb;
            padding-bottom: 20px;
            position: relative;
        }
        .header-content {
            display: table;
            width: 100%;
        }
        .header-left {
            display: table-cell;
            vertical-align: middle;
            width: 70%;
        }
        .header-right {
            display: table-cell;
            vertical-align: middle;
            width: 30%;
            text-align: right;
        }
        .logo {
            height: 25px;
            margin-bottom: 10px;
        }
        .company-name {
            font-size: 28px;
            font-weight: bold;
            color: #2563eb;
            margin-bottom: 5px;
        }
        .company-info {
            font-size: 11px;
            color: #666;
        }
        .invoice-title {
            font-size: 32px;
            font-weight: bold;
            color: #1e40af;
        }
        .invoice-meta {
            width: 100%;
            margin-bottom: 30px;
        }
        .invoice-meta table {
            width: 100%;
            border: none;
            margin: 0;
        }
        .invoice-meta td {
            vertical-align: top;
            padding: 0;
            border: none;
        }
        .bill-to {
            width: 50%;
        }
        .invoice-details {
            width: 50%;
            text-align: right;
        }
        .section-title {
            font-size: 11px;
            font-weight: bold;
            color: #666;
            text-transform: uppercase;
            margin-bottom: 8px;
        }
        .client-name {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .detail-row {
            margin-bottom: 5px;
            line-height: 1.8;
        }
        .detail-label {
            font-weight: bold;
            display: inline-block;
            min-width: 100px;
        }
        table.items-table {
            width: 100%;
            border-collapse: collapse;
            margin: 30px 0;
        }
        .items-table thead {
            background-color: #2563eb;
            color: white;
        }
        .items-table th {
            padding: 12px 10px;
            text-align: left;
            font-weight: bold;
            font-size: 11px;
            text-transform: uppercase;
        }
        .items-table th.text-right, .items-table td.text-right {
            text-align: right;
        }
        .items-table th.text-center, .items-table td.text-center {
            text-align: center;
        }
        .items-table tbody tr {
            border-bottom: 1px solid #e5e7eb;
        }
        .items-table tbody tr:last-child {
            border-bottom: 2px solid #2563eb;
        }
        .items-table td {
            padding: 10px;
            border: none;
        }
        .totals {
            margin-top: 20px;
            width: 100%;
        }
        .totals table {
            width: 300px;
            float: right;
            border: none;
            margin: 0;
        }
        .totals td {
            padding: 8px 10px;
            border-bottom: 1px solid #e5e7eb;
        }
        .totals .total-label {
            font-weight: bold;
            text-align: left;
        }
        .totals .total-value {
            text-align: right;
        }
        .totals .grand-total td {
            font-size: 16px;
            font-weight: bold;
            background-color: #f3f4f6;
            border-bottom: none;
            padding: 12px 10px;
        }
        .notes {
            clear: both;
            margin-top: 60px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
        }
        .notes-title {
            font-weight: bold;
            margin-bottom: 8px;
        }
        .notes-content {
            color: #666;
            font-size: 11px;
        }
        .footer {
            margin-top: 60px;
            text-align: center;
            font-size: 10px;
            color: #999;
            border-top: 1px solid #e5e7eb;
            padding-top: 20px;
        }
        .status-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 4px;
            font-size: 10px;
            font-weight: bold;
            text-transform: uppercase;
        }
        .status-draft { background-color: #f3f4f6; color: #6b7280; }
        .status-sent { background-color: #dbeafe; color: #1e40af; }
        .status-paid { background-color: #d1fae5; color: #065f46; }
        .status-cancelled { background-color: #fee2e2; color: #991b1b; }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="header-content">
                <div class="header-left">
                    <img src="{{ public_path('logoWK.png') }}" alt="Logo" class="logo">
                    <div class="company-info">
                        {{ $settings['company_address'] ?? '' }}<br>
                        Email: {{ $settings['contact_email'] ?? '' }} | Phone: {{ $settings['contact_phone'] ?? '' }}
                    </div>
                </div>
                <div class="header-right">
                    <div class="invoice-title">INVOICE</div>
                </div>
            </div>
        </div>

        <!-- Invoice Meta -->
        <table class="invoice-meta">
            <tr>
                <td class="bill-to">
                    <div class="section-title">Bill To:</div>
                    <div class="client-name">{{ $invoice->client->company ?? $invoice->client->name }}</div>
                    <div>{{ $invoice->client->email }}</div>
                    @if($invoice->client->phone)
                    <div>{{ $invoice->client->phone }}</div>
                    @endif
                    @if($invoice->client->address)
                    <div>{{ $invoice->client->address }}</div>
                    @endif
                </td>
                <td class="invoice-details">
                    <div class="detail-row">
                        <span class="detail-label">Invoice Number:</span><br>
                        <strong>{{ $invoice->invoice_number }}</strong>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Issue Date:</span><br>
                        {{ \Carbon\Carbon::parse($invoice->issued_date)->format('d M Y') }}
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Due Date:</span><br>
                        {{ \Carbon\Carbon::parse($invoice->due_date)->format('d M Y') }}
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Status:</span><br>
                        <span class="status-badge status-{{ $invoice->status }}">{{ ucfirst($invoice->status) }}</span>
                    </div>
                    @if($invoice->project)
                    <div class="detail-row">
                        <span class="detail-label">Project:</span><br>
                        {{ $invoice->project->title }}
                    </div>
                    @endif
                </td>
            </tr>
        </table>

        <!-- Items Table -->
        <table class="items-table">
            <thead>
                <tr>
                    <th style="width: 50%">Description</th>
                    <th class="text-center" style="width: 15%">Quantity</th>
                    <th class="text-right" style="width: 17.5%">Price</th>
                    <th class="text-right" style="width: 17.5%">Amount</th>
                </tr>
            </thead>
            <tbody>
                @foreach($invoice->items as $item)
                <tr>
                    <td>{{ $item->description }}</td>
                    <td class="text-center">{{ $item->quantity }}</td>
                    <td class="text-right">Rp {{ number_format($item->price, 0, ',', '.') }}</td>
                    <td class="text-right">Rp {{ number_format($item->amount, 0, ',', '.') }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>

        <!-- Totals -->
        <div class="totals">
            <table>
                <tr>
                    <td class="total-label">Subtotal:</td>
                    <td class="total-value">Rp {{ number_format($invoice->subtotal, 0, ',', '.') }}</td>
                </tr>
                <tr>
                    <td class="total-label">Tax (11%):</td>
                    <td class="total-value">Rp {{ number_format($invoice->tax_amount, 0, ',', '.') }}</td>
                </tr>
                <tr class="grand-total">
                    <td class="total-label">TOTAL:</td>
                    <td class="total-value">Rp {{ number_format($invoice->total, 0, ',', '.') }}</td>
                </tr>
            </table>
        </div>

        <!-- Notes -->
        @if($invoice->notes)
        <div class="notes">
            <div class="notes-title">Notes:</div>
            <div class="notes-content">{{ $invoice->notes }}</div>
        </div>
        @endif

        <!-- Footer -->
        <div class="footer">
            <p>Thank you for your business!</p>
            <p>{{ $settings['site_name'] ?? 'WujudKarya' }} - {{ $settings['contact_email'] ?? '' }}</p>
        </div>
    </div>
</body>
</html>
