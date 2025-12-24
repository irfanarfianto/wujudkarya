import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
} from "@/components/ui/sheet"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { PaginatedData, Lead } from '@/types';
import { Mail, Calendar, Edit, Check, AlertCircle } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Leads', href: '/leads' },
];

export default function LeadsIndex({ leads }: { leads: PaginatedData<Lead> }) {
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [updateState, setUpdateState] = useState<'idle' | 'success' | 'error'>('idle');

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'new': return 'default'; 
            case 'contacted': return 'secondary';
            case 'deal': return 'outline';
            case 'closed': return 'destructive';
            default: return 'outline';
        }
    };

    const openSheet = (lead: Lead) => {
        setSelectedLead(lead);
        setUpdateState('idle');
        setIsSheetOpen(true);
    };

    const handleStatusChange = (status: string) => {
        if (selectedLead) {
            setUpdateState('idle');
            router.put(`/leads/${selectedLead.id}`, {
                status: status
            }, {
                preserveScroll: true,
                onSuccess: () => {
                   setSelectedLead(prev => prev ? {...prev, status: status} : null);
                   setUpdateState('success');
                   setTimeout(() => setUpdateState('idle'), 3000);
                },
                onError: () => {
                    setUpdateState('error');
                    setTimeout(() => setUpdateState('idle'), 3000);
                }
            });
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
                                                {new Date(lead.created_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })}
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
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    onClick={() => openSheet(lead)}
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

                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetContent className="sm:max-w-[500px] overflow-y-auto p-6">
                        <SheetHeader className="mb-6 p-0">
                            <SheetTitle>Lead Details</SheetTitle>
                            <SheetDescription>
                                Review inquiry details and update current status.
                            </SheetDescription>
                        </SheetHeader>
                        
                        {selectedLead && (
                            <div className="space-y-6">
                                {/* Status Section - Highlighted */}
                                <div className="bg-muted/50 p-4 rounded-lg border">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Current Status</Label>
                                            {updateState === 'success' && (
                                                <span className="text-xs font-medium text-green-600 flex items-center animate-pulse">
                                                    <Check className="w-3 h-3 mr-1" /> Saved
                                                </span>
                                            )}
                                            {updateState === 'error' && (
                                                <span className="text-xs font-medium text-destructive flex items-center">
                                                    <AlertCircle className="w-3 h-3 mr-1" /> Failed
                                                </span>
                                            )}
                                        </div>
                                        <Select 
                                            defaultValue={selectedLead.status} 
                                            onValueChange={handleStatusChange}
                                        >
                                            <SelectTrigger className="w-full bg-background">
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="new">New</SelectItem>
                                                <SelectItem value="contacted">Contacted</SelectItem>
                                                <SelectItem value="deal">Deal</SelectItem>
                                                <SelectItem value="closed">Closed / Lost</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <p className="text-[10px] text-muted-foreground pt-1">
                                            Changing status will update the lead immediately.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Date Received</Label>
                                            <p className="text-sm font-medium">
                                                {new Date(selectedLead.created_at).toLocaleString("id-ID", { 
                                                    weekday: 'long', 
                                                    year: 'numeric', 
                                                    month: 'long', 
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Service Interest</Label>
                                            <Badge variant="outline" className="text-sm font-normal py-1 px-3">
                                                {selectedLead.service_interest}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="space-y-1 pt-2">
                                        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Sender Info</Label>
                                        <div className="flex flex-col gap-1 p-3 rounded-md border bg-card">
                                            <div className="font-semibold text-base">{selectedLead.name}</div>
                                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                                                <Mail className="h-3.5 w-3.5" />
                                                <a href={`mailto:${selectedLead.email}`} className="hover:underline hover:text-primary transition-colors">
                                                    {selectedLead.email}
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-1 pt-2">
                                        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Message</Label>
                                        <div className="text-sm leading-relaxed p-4 rounded-md bg-muted/30 border whitespace-pre-wrap min-h-[100px]">
                                            {selectedLead.message}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <SheetFooter className="mt-8">
                             {/* Footer content if needed */}
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
        </AppLayout>
    );
}
