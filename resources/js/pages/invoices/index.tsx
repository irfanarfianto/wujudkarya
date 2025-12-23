import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { PaginatedData, Invoice } from '@/types';
import { Edit, Plus, Download } from 'lucide-react';

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Invoices', href: '/invoices' },
];

export default function InvoicesIndex({ invoices }: { invoices: PaginatedData<Invoice> }) {

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'paid': return 'default'; 
            case 'sent': return 'secondary'; 
            case 'draft': return 'outline'; 
            case 'cancelled': return 'destructive';
            default: return 'outline';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Invoices" />

            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Invoices</h1>
                        <p className="text-muted-foreground">Manage billing and payments.</p>
                    </div>
                    <Button asChild>
                        <Link href="#">
                            <Plus className="mr-2 h-4 w-4" />
                            Create Invoice
                        </Link>
                    </Button>
                </div>

                <div className="rounded-md border bg-white dark:bg-gray-900 shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Invoice #</TableHead>
                                <TableHead>Client</TableHead>
                                <TableHead>Due Date</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center">No invoices found.</TableCell>
                                </TableRow>
                            ) : (
                                invoices.data.map((invoice) => (
                                    <TableRow key={invoice.id}>
                                        <TableCell className="font-medium font-mono">
                                            {invoice.invoice_number}
                                        </TableCell>
                                        <TableCell>{invoice.client?.company || invoice.client?.name}</TableCell>
                                        <TableCell>
                                            {new Date(invoice.due_date).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(invoice.total)}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={getStatusColor(invoice.status) as any} className="capitalize">
                                                {invoice.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                 <Button variant="ghost" size="icon" title="Download PDF">
                                                    <Download className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
                  <div className="flex items-center justify-end space-x-2 py-4">
                    {invoices.links.prev && (
                        <Button variant="outline" size="sm" asChild>
                            <Link href={invoices.links.prev}>Previous</Link>
                        </Button>
                    )}
                    {invoices.links.next && (
                        <Button variant="outline" size="sm" asChild>
                             <Link href={invoices.links.next}>Next</Link>
                        </Button>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
