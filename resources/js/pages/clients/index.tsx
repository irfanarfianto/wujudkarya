import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
import { Edit, Plus, Phone, Mail, Eye, MapPin, Building2, User, ArrowUpDown, Briefcase } from 'lucide-react';
import { useState, useEffect } from 'react';
import { DrawerForm } from '@/components/ui/drawer-form';
import { ClientForm } from '@/components/clients/client-form';
import { DataTableToolbar } from '@/components/ui/data-table-toolbar';

import { DataTablePagination } from '@/components/data-table-pagination';

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Clients', href: '/clients' },
];

interface ClientsIndexProps {
    clients: PaginatedData<Client>;
    filters?: {
        search?: string;
        sort?: string;
        has_projects?: string;
    };
}

export default function ClientsIndex({ clients, filters = {} }: ClientsIndexProps) {
    // View Details Sheet State
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [isViewSheetOpen, setIsViewSheetOpen] = useState(false);

    // Create/Edit Drawer State
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [editingClient, setEditingClient] = useState<Client | null>(null);
    
    // Search State
    const [searchTerm, setSearchTerm] = useState(filters.search || '');

    useEffect(() => {
        setSearchTerm(filters.search || '');
    }, [filters.search]);

    const updateFilter = (key: string, value: string) => {
        const newFilters = { ...filters, [key]: value };
        if (value === 'all' || value === '') delete newFilters[key as keyof typeof filters];
        if (key === 'sort' && value === 'newest') delete newFilters[key as keyof typeof filters];
        
        router.get('/clients', newFilters, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const handleSearchSubmit = () => {
        updateFilter('search', searchTerm);
    };

    const clearFilters = () => {
        setSearchTerm('');
        router.get('/clients', {}, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    }

    const openViewSheet = (client: Client) => {
        setSelectedClient(client);
        setIsViewSheetOpen(true);
    };

    const openCreateDrawer = () => {
        setEditingClient(null);
        setIsDrawerOpen(true);
    };

    const openEditDrawer = (client: Client) => {
        setEditingClient(client);
        setIsDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
        setEditingClient(null);
    };

    const handleFormSuccess = () => {
        setIsDrawerOpen(false);
        setEditingClient(null);
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
                    <Button onClick={openCreateDrawer}>
                        <Plus className="mr-2 h-4 w-4" />
                        New Client
                    </Button>
                </div>

                <DataTableToolbar
                    searchPlaceholder="Search clients..."
                    searchValue={searchTerm}
                    onSearchChange={setSearchTerm}
                    onSearchSubmit={handleSearchSubmit}
                    onReset={clearFilters}
                    hasFilter={Object.keys(filters).length > 0} 
                >
                    <Select 
                        value={filters.sort || 'newest'} 
                        onValueChange={(val) => updateFilter('sort', val)}
                    >
                        <SelectTrigger className="w-[180px] h-9 bg-background">
                            <div className="flex items-center gap-2 text-muted-foreground w-full">
                                <ArrowUpDown className="h-3.5 w-3.5 flex-shrink-0" />
                                <SelectValue placeholder="Newest Added" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="newest">Newest Added</SelectItem>
                            <SelectItem value="oldest">Oldest Added</SelectItem>
                            <SelectItem value="name_asc">Name (A-Z)</SelectItem>
                            <SelectItem value="name_desc">Name (Z-A)</SelectItem>
                            <SelectItem value="projects_desc">Most Projects</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select 
                        value={filters.has_projects || 'all'} 
                        onValueChange={(val) => updateFilter('has_projects', val)}
                    >
                        <SelectTrigger className="w-[180px] h-9 bg-background">
                            <div className="flex items-center gap-2 text-muted-foreground w-full">
                                <Briefcase className="h-3.5 w-3.5 flex-shrink-0" />
                                <SelectValue placeholder="All Clients" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Clients</SelectItem>
                            <SelectItem value="yes">With Projects</SelectItem>
                            <SelectItem value="no">Without Projects</SelectItem>
                        </SelectContent>
                    </Select>
                </DataTableToolbar>

                <div className="rounded-md border bg-white dark:bg-gray-900 shadow-sm mt-6">
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
                                                    onClick={() => openViewSheet(client)}
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="hover:bg-muted"
                                                    onClick={() => openEditDrawer(client)}
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
                  
                <DataTablePagination data={clients} resourceName="clients" />

                {/* Client Details Sheet (View Only) */}
                <Sheet open={isViewSheetOpen} onOpenChange={setIsViewSheetOpen}>
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

                {/* Create/Edit Drawer */}
                <DrawerForm
                    open={isDrawerOpen}
                    onOpenChange={setIsDrawerOpen}
                    title={editingClient ? 'Edit Client' : 'New Client'}
                    description={editingClient 
                        ? 'Make changes to client details here. Click save when you\'re done.' 
                        : 'Add a new client to your database. Click create when you\'re done.'}
                    width="xl"
                    footer={
                        <div className="flex w-full justify-end gap-2">
                            <Button variant="outline" onClick={handleDrawerClose}>
                                Cancel
                            </Button>
                            <Button type="submit" form="client-form">
                                {editingClient ? 'Save Changes' : 'Create Client'}
                            </Button>
                        </div>
                    }
                >
                    {isDrawerOpen && (
                        <ClientForm 
                            client={editingClient} 
                            onSuccess={handleFormSuccess}
                            formId="client-form"
                            hideSubmit={true}
                        />
                    )}
                </DrawerForm>
            </div>
        </AppLayout>
    );
}
