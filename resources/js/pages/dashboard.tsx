import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Users, DollarSign, Inbox } from 'lucide-react';

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
];

export default function Dashboard({ stats }: { stats: any }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0 mt-6">
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.projects}</div>
                            <p className="text-xs text-muted-foreground">Portfolio items</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                             <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.clients}</div>
                             <p className="text-xs text-muted-foreground">Trusted partners</p>
                        </CardContent>
                    </Card>
                    <Card>
                         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                             <div className="text-2xl font-bold">
                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(stats.revenue)}
                             </div>
                            <p className="text-xs text-muted-foreground">Paid invoices</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                             <CardTitle className="text-sm font-medium">New Leads</CardTitle>
                            <Inbox className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                             <div className="text-2xl font-bold">{stats.leads}</div>
                            <p className="text-xs text-muted-foreground">Unread inquiries</p>
                        </CardContent>
                    </Card>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
                     <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Recent Projects</CardTitle>
                        </CardHeader>
                        <CardContent className="pl-2">
                             <div className="h-[200px] flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-md">
                                 Chart Area Placeholder
                             </div>
                        </CardContent>
                     </Card>
                     <Card className="col-span-3">
                         <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">No recent activity logged.</p>
                        </CardContent>
                     </Card>
                </div>
            </div>
        </AppLayout>
    );
}
