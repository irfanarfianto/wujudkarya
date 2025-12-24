import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { PaginatedData, Client } from '@/types';
import { Edit, Plus, Phone, Mail } from 'lucide-react';

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Clients', href: '/clients' },
];

export default function ClientsIndex({ clients }: { clients: PaginatedData<Client> }) {
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
            </div>
        </AppLayout>
    );
}
