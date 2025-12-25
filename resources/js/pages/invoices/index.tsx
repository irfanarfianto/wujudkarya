import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { DrawerForm } from '@/components/ui/drawer-form';
import { PdfPreviewDialog } from '@/components/invoices/pdf-preview-dialog';
import InvoiceForm from '@/components/invoices/invoice-form';
import { PaginatedData, Invoice, Client, Project } from '@/types';
import { Edit, Plus, Eye } from 'lucide-react';

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Invoices', href: '/invoices' },
];

interface InvoicesIndexProps {
    invoices: PaginatedData<Invoice>;
    clients: Client[];
    projects: Project[];
}

export default function InvoicesIndex({ invoices, clients, projects }: InvoicesIndexProps) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | undefined>(undefined);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewInvoice, setPreviewInvoice] = useState<Invoice | undefined>(undefined);

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'paid': return 'default'; 
            case 'sent': return 'secondary'; 
            case 'draft': return 'outline'; 
            case 'cancelled': return 'destructive';
            default: return 'outline';
        }
    };

    const openCreateDrawer = () => {
        setSelectedInvoice(undefined);
        setDrawerOpen(true);
    };

    const openEditDrawer = (invoice: Invoice) => {
        setSelectedInvoice(invoice);
        setDrawerOpen(true);
    };

    const openPreview = (invoice: Invoice) => {
        setPreviewInvoice(invoice);
        setPreviewOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
        setSelectedInvoice(undefined);
    };

    const handleFormSuccess = () => {
        handleDrawerClose();
        router.reload({ only: ['invoices'] });
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
                    <Button onClick={openCreateDrawer}>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Invoice
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
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    title="Preview PDF"
                                                    onClick={() => openPreview(invoice)}
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon"
                                                    title="Edit Invoice"
                                                    onClick={() => openEditDrawer(invoice)}
                                                >
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

            <DrawerForm
                open={drawerOpen}
                onOpenChange={setDrawerOpen}
                title={selectedInvoice ? 'Edit Invoice' : 'Create Invoice'}
                description={selectedInvoice ? 'Update invoice details and items.' : 'Create a new invoice for your client.'}
            >
                <InvoiceForm
                    invoice={selectedInvoice}
                    clients={clients}
                    projects={projects}
                    onSuccess={handleFormSuccess}
                />
            </DrawerForm>

            {previewInvoice && (
                <PdfPreviewDialog
                    open={previewOpen}
                    onOpenChange={setPreviewOpen}
                    invoiceId={previewInvoice.id}
                    invoiceNumber={previewInvoice.invoice_number}
                />
            )}
        </AppLayout>
    );
}
