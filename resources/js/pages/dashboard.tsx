import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Briefcase, Users, DollarSign, Inbox, TrendingUp } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
];

const chartConfig = {
  total: {
    label: "Total Revenue",
    color: "#2563eb", // blue-600
  },
} satisfies ChartConfig

interface DashboardStats {
    projects: number;
    clients: number;
    revenue: number;
    leads: number;
}

interface RecentActivity {
    type: 'lead' | 'project' | 'client';
    title: string;
    description: string;
    created_at: string;
}

interface RevenueChartData {
    name: string;
    total: number;
}

interface DashboardFilters {
    range?: number;
}

interface DashboardProps {
    stats: DashboardStats;
    recentActivities: RecentActivity[];
    revenueChart: RevenueChartData[];
    filters: DashboardFilters;
}

export default function Dashboard({ stats, recentActivities, revenueChart, filters }: DashboardProps) {
    
    const handleRangeChange = (value: string) => {
        router.get('/dashboard', { range: value }, {
            preserveState: true,
            preserveScroll: true,
            only: ['revenueChart', 'filters'], 
        });
    };

    const currentRange = filters?.range || 6;

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
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Overview Revenue</CardTitle>
                                    <CardDescription>{currentRange == 12 ? "Last 12 Months" : "Last 6 Months"}</CardDescription>
                                </div>
                                <div>
                                    <Select 
                                        defaultValue={String(currentRange)} 
                                        onValueChange={handleRangeChange}
                                    >
                                        <SelectTrigger className="h-8">
                                            <SelectValue placeholder="Select period" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="6">Last 6 Months</SelectItem>
                                            <SelectItem value="12">Last 12 Months</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {revenueChart && revenueChart.length > 0 ? (
                                <ChartContainer config={chartConfig}>
                                    <BarChart accessibilityLayer data={revenueChart}>
                                        <defs>
                                            <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="var(--color-total)" stopOpacity={1} />
                                                <stop offset="95%" stopColor="var(--color-total)" stopOpacity={0.1} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid vertical={false} />
                                        <XAxis
                                            dataKey="name"
                                            tickLine={false}
                                            tickMargin={10}
                                            axisLine={false}
                                            tickFormatter={(value) => value}
                                        />
                                        <ChartTooltip
                                            cursor={false}
                                            content={<ChartTooltipContent indicator="dashed" />}
                                        />
                                        <Bar dataKey="total" fill="url(#fillRevenue)" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ChartContainer>
                            ) : (
                                <div className="h-[200px] flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-md bg-muted/20">
                                    <p className="text-sm">No revenue data available yet</p>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="flex-col items-start gap-2 text-sm">
                            <div className="flex gap-2 leading-none font-medium">
                                Data is up to date <TrendingUp className="h-4 w-4" />
                            </div>
                            <div className="text-muted-foreground leading-none">
                                Showing total revenue for the last {currentRange} months
                            </div>
                        </CardFooter>
                     </Card>
                     
                     <Card className="col-span-3">
                         <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[425px] overflow-y-auto pr-4 space-y-8 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/40 transition-colors">
                                {recentActivities && recentActivities.length > 0 ? (
                                    recentActivities.map((activity, i) => (
                                        <div key={i} className="flex items-center">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-full border bg-background shrink-0">
                                                {activity.type === 'lead' && <Inbox className="h-4 w-4 text-primary" />}
                                                {activity.type === 'project' && <Briefcase className="h-4 w-4 text-blue-500" />}
                                                {activity.type === 'client' && <Users className="h-4 w-4 text-green-500" />}
                                            </div>
                                            <div className="ml-4 space-y-1">
                                                <p className="text-sm font-medium leading-none">{activity.title}</p>
                                                <p className="text-xs text-muted-foreground line-clamp-1">
                                                    {activity.description}
                                                </p>
                                            </div>
                                            <div className="ml-auto font-medium text-xs text-muted-foreground whitespace-nowrap pl-2">
                                                {new Date(activity.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="h-full flex items-center justify-center">
                                        <p className="text-sm text-muted-foreground">No recent activity logged.</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                     </Card>
                </div>
            </div>
        </AppLayout>
    );
}
