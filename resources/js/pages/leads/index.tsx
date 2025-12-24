import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { PaginatedData, Lead } from '@/types';
import { Mail, Calendar, Edit, Plus } from 'lucide-react';

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Leads', href: '/leads' },
];

export default function LeadsIndex({ leads }: { leads: PaginatedData<Lead> }) {

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'new': return 'default'; 
            case 'contacted': return 'secondary';
            case 'deal': return 'outline';
            case 'closed': return 'destructive';
            default: return 'outline';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Leads" />

            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Leads</h1>
                        <p className="text-muted-foreground">Inquiries from contact form.</p>
                    </div>
                    <Button asChild>
                        <Link href="/leads/create">
                            <Plus className="mr-2 h-4 w-4" />
                            New Lead
                        </Link>
                    </Button>
                </div>

                <div className="rounded-md border bg-white dark:bg-gray-900 shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Interest</TableHead>
                                <TableHead>Message</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leads.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center">No leads found.</TableCell>
                                </TableRow>
                            ) : (
                                leads.data.map((lead) => (
                                    <TableRow key={lead.id}>
                                         <TableCell className="w-[120px]">
                                            <div className="flex items-center text-muted-foreground text-xs">
                                                <Calendar className="mr-2 h-3 w-3" />
                                                {new Date(lead.created_at).toLocaleDateString()}
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            <div>{lead.name}</div>
                                            <div className="text-xs text-muted-foreground flex items-center">
                                                <Mail className="mr-1 h-3 w-3" /> {lead.email}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{lead.service_interest}</Badge>
                                        </TableCell>
                                        <TableCell className="max-w-[300px] truncate" title={lead.message}>
                                            {lead.message}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={getStatusColor(lead.status) as any}>
                                                {lead.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" asChild>
                                                    <Link href={`/leads/${lead.id}/edit`}>
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
                    {leads.links.prev && (
                        <Button variant="outline" size="sm" asChild>
                            <Link href={leads.links.prev}>Previous</Link>
                        </Button>
                    )}
                    {leads.links.next && (
                        <Button variant="outline" size="sm" asChild>
                             <Link href={leads.links.next}>Next</Link>
                        </Button>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
