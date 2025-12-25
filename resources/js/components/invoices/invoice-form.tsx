import { router, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CurrencyInput } from '@/components/ui/currency-input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Client, Project, Invoice, InvoiceItem } from '@/types';
import { Plus, Trash2 } from 'lucide-react';

interface InvoiceFormProps {
    invoice?: Invoice;
    clients: Client[];
    projects: Project[];
    onSuccess?: () => void;
}

export default function InvoiceForm({ invoice, clients, projects, onSuccess }: InvoiceFormProps) {
    const isEditing = !!invoice;
    
    const { data, setData, post, put, processing, errors } = useForm({
        client_id: invoice?.client_id?.toString() || '',
        project_id: invoice?.project_id?.toString() || '',
        invoice_number: invoice?.invoice_number || '',
        issued_date: invoice?.issued_date || new Date().toISOString().split('T')[0],
        due_date: invoice?.due_date || '',
        status: invoice?.status || 'draft',
        notes: invoice?.notes || '',
        items: invoice?.items || [
            { description: '', quantity: 1, price: 0, amount: 0 }
        ] as InvoiceItem[],
    });

    const [filteredProjects, setFilteredProjects] = useState<Project[]>(
        invoice?.client_id ? projects.filter(p => p.client_id === invoice.client_id) : []
    );

    const handleClientChange = (clientId: string) => {
        setData('client_id', clientId);
        setData('project_id', '');
        setFilteredProjects(projects.filter(p => p.client_id === parseInt(clientId)));
    };

    const addItem = () => {
        setData('items', [...data.items, { description: '', quantity: 1, price: 0, amount: 0 }]);
    };

    const removeItem = (index: number) => {
        if (data.items.length > 1) {
            setData('items', data.items.filter((_, i) => i !== index));
        }
    };

    const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
        const newItems = [...data.items];
        newItems[index] = { ...newItems[index], [field]: value };
        
        // Calculate amount
        if (field === 'quantity' || field === 'price') {
            newItems[index].amount = newItems[index].quantity * newItems[index].price;
        }
        
        setData('items', newItems);
    };

    const calculateSubtotal = () => {
        return data.items.reduce((sum, item) => sum + item.amount, 0);
    };

    const calculateTax = () => {
        return calculateSubtotal() * 0.11; // PPN 11%
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateTax();
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // Manually set calculated values
        const subtotal = calculateSubtotal();
        const taxAmount = calculateTax();
        const total = calculateTotal();

        // Create a new data object with calculated values
        const submitData = {
            ...data,
            subtotal,
            tax_amount: taxAmount,
            total,
        };

        if (isEditing) {
            // For edit, we need to use router.put with the data
            router.put(`/invoices/${invoice.id}`, submitData as any, {
                onSuccess: () => onSuccess?.(),
            });
        } else {
            // For create, use router.post
            router.post('/invoices', submitData as any, {
                onSuccess: () => onSuccess?.(),
            });
        }
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            {/* Client & Project */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="client_id">Client *</Label>
                    <Select value={data.client_id} onValueChange={handleClientChange}>
                        <SelectTrigger id="client_id">
                            <SelectValue placeholder="Select client" />
                        </SelectTrigger>
                        <SelectContent>
                            {clients.map((client) => (
                                <SelectItem key={client.id} value={client.id.toString()}>
                                    {client.company || client.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.client_id && <p className="text-sm text-destructive">{errors.client_id}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="project_id">Project (Optional)</Label>
                    <Select 
                        value={data.project_id} 
                        onValueChange={(value) => setData('project_id', value)}
                        disabled={!data.client_id}
                    >
                        <SelectTrigger id="project_id">
                            <SelectValue placeholder="Select project" />
                        </SelectTrigger>
                        <SelectContent>
                            {filteredProjects.map((project) => (
                                <SelectItem key={project.id} value={project.id.toString()}>
                                    {project.title}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Invoice Details */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="invoice_number">Invoice Number *</Label>
                    <Input
                        id="invoice_number"
                        value={data.invoice_number}
                        onChange={(e) => setData('invoice_number', e.target.value)}
                        placeholder="INV-001"
                    />
                    {errors.invoice_number && <p className="text-sm text-destructive">{errors.invoice_number}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                        <SelectTrigger id="status">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="sent">Sent</SelectItem>
                            <SelectItem value="paid">Paid</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="issued_date">Issued Date *</Label>
                    <Input
                        id="issued_date"
                        type="date"
                        value={data.issued_date}
                        onChange={(e) => setData('issued_date', e.target.value)}
                    />
                    {errors.issued_date && <p className="text-sm text-destructive">{errors.issued_date}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="due_date">Due Date *</Label>
                    <Input
                        id="due_date"
                        type="date"
                        value={data.due_date}
                        onChange={(e) => setData('due_date', e.target.value)}
                    />
                    {errors.due_date && <p className="text-sm text-destructive">{errors.due_date}</p>}
                </div>
            </div>

            {/* Invoice Items */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label>Invoice Items *</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addItem}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Item
                    </Button>
                </div>

                {/* Column Headers */}
                <div className="grid grid-cols-12 gap-2 px-3 pb-2 border-b">
                    <div className="col-span-5">
                        <Label className="text-xs text-muted-foreground">Description</Label>
                    </div>
                    <div className="col-span-2">
                        <Label className="text-xs text-muted-foreground">Qty</Label>
                    </div>
                    <div className="col-span-2">
                        <Label className="text-xs text-muted-foreground">Price</Label>
                    </div>
                    <div className="col-span-2">
                        <Label className="text-xs text-muted-foreground">Amount</Label>
                    </div>
                    <div className="col-span-1"></div>
                </div>

                <div className="space-y-3">
                    {data.items.map((item, index) => (
                        <div key={index} className="grid grid-cols-12 gap-2 items-start p-3 border rounded-lg">
                            <div className="col-span-5">
                                <Input
                                    placeholder="Description"
                                    value={item.description}
                                    onChange={(e) => updateItem(index, 'description', e.target.value)}
                                />
                            </div>
                            <div className="col-span-2">
                                <Input
                                    type="number"
                                    placeholder="Qty"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
                                    onFocus={(e) => e.target.select()}
                                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>
                            <div className="col-span-2">
                                <CurrencyInput
                                    placeholder="Price"
                                    value={item.price}
                                    onChange={(value) => updateItem(index, 'price', value)}
                                />
                            </div>
                            <div className="col-span-2">
                                <Input
                                    value={new Intl.NumberFormat('id-ID').format(item.amount)}
                                    disabled
                                    className="bg-muted"
                                />
                            </div>
                            <div className="col-span-1 flex justify-end">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeItem(index)}
                                    disabled={data.items.length === 1}
                                >
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Totals */}
                <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal:</span>
                        <span className="font-medium">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(calculateSubtotal())}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tax (11%):</span>
                        <span className="font-medium">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(calculateTax())}
                        </span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t pt-2">
                        <span>Total:</span>
                        <span>
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(calculateTotal())}
                        </span>
                    </div>
                </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                    id="notes"
                    value={data.notes}
                    onChange={(e) => setData('notes', e.target.value)}
                    placeholder="Additional notes or payment terms..."
                    rows={3}
                />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-2 pt-4 border-t">
                <Button type="submit" disabled={processing}>
                    {processing ? 'Saving...' : isEditing ? 'Update Invoice' : 'Create Invoice'}
                </Button>
            </div>
        </form>
    );
}
