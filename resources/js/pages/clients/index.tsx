import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { PaginatedData, Client } from '@/types';
import { Edit, Plus, Phone, Mail, Eye, MapPin, Building2, User } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Clients', href: '/clients' },
];

export default function ClientsIndex({ clients }: { clients: PaginatedData<Client> }) {
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const openSheet = (client: Client) => {
        setSelectedClient(client);
        setIsSheetOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clients" />

            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Clients</h1>
                        <p className="text-muted-foreground">Manage your customer database.</p>
                    </div>
                    <Button asChild>
                        <Link href="/clients/create">
                            <Plus className="mr-2 h-4 w-4" />
                            New Client
                        </Link>
                    </Button>
                </div>

                <div className="rounded-md border bg-white dark:bg-gray-900 shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Company</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead className="text-center">Projects</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {clients.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center">No clients found.</TableCell>
                                </TableRow>
                            ) : (
                                clients.data.map((client) => (
                                    <TableRow key={client.id}>
                                        <TableCell className="font-medium">{client.name}</TableCell>
                                        <TableCell>{client.company}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col space-y-1 text-sm text-muted-foreground">
                                                <div className="flex items-center">
                                                    <Mail className="mr-2 h-3 w-3" />
                                                    {client.email}
                                                </div>
                                                {client.phone && (
                                                    <div className="flex items-center">
                                                        <Phone className="mr-2 h-3 w-3" />
                                                        {client.phone}
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {client.projects_count}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="hover:bg-muted" 
                                                    onClick={() => openSheet(client)}
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="hover:bg-muted" asChild>
                                                    <Link href={`/clients/${client.id}/edit`}>
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
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
                    {clients.links.prev && (
                        <Button variant="outline" size="sm" asChild>
                            <Link href={clients.links.prev}>Previous</Link>
                        </Button>
                    )}
                    {clients.links.next && (
                        <Button variant="outline" size="sm" asChild>
                             <Link href={clients.links.next}>Next</Link>
                        </Button>
                    )}
                </div>

                {/* Client Details Sheet */}
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetContent className="sm:max-w-[500px] overflow-y-auto p-6">
                        <SheetHeader className="mb-6 p-0">
                            <SheetTitle>Client Details</SheetTitle>
                            <SheetDescription>
                                Full detailed information about the client.
                            </SheetDescription>
                        </SheetHeader>
                        
                        {selectedClient && (
                            <div className="space-y-6">
                                <div className="flex flex-col gap-4">
                                     <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 border">
                                        <div className="p-2 bg-background rounded-full border shadow-sm">
                                            <Building2 className="h-6 w-6 text-primary" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Company</Label>
                                            <p className="font-semibold text-lg">{selectedClient.company}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="space-y-1">
                                            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Contact Person</Label>
                                            <div className="flex items-center gap-2">
                                                <User className="h-4 w-4 text-muted-foreground" />
                                                <span className="font-medium">{selectedClient.name}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</Label>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                                                    <a href={`mailto:${selectedClient.email}`} className="hover:underline hover:text-primary transition-colors">
                                                        {selectedClient.email}
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Phone</Label>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                                                    {selectedClient.phone || '-'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-1 pt-2">
                                        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Complete Address</Label>
                                        <div className="flex items-start gap-2 p-3 rounded-md border bg-card text-sm leading-relaxed">
                                            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                                            <span>{selectedClient.address || 'No address provided.'}</span>
                                        </div>
                                    </div>

                                    {/* Project Stats - Optional */}
                                    <div className="space-y-1 pt-2">
                                        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Project History</Label>
                                        <div className="flex items-center justify-between p-3 rounded-md border bg-muted/30">
                                            <span className="text-sm font-medium">Total Projects</span>
                                            <span className="text-lg font-bold">{selectedClient.projects_count || 0}</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}
                        <SheetFooter className="mt-8">
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
        </AppLayout>
    );
}
