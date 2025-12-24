import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Leads', href: '/leads' },
    { title: 'New Lead', href: '/leads/create' },
];

export default function LeadsCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        service_interest: '',
        message: '',
        status: 'new',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/leads');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="New Lead" />

            <div className="mx-auto max-w-3xl p-6">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            New Lead
                        </h1>
                        <p className="text-muted-foreground">
                            Add a new lead to your pipeline.
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-8 rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-900"
                >
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="John Doe"
                                required
                            />
                            {errors.name && (
                                <p className="text-sm text-destructive">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="john@example.com"
                                required
                            />
                            {errors.email && (
                                <p className="text-sm text-destructive">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Service Interest */}
                        <div className="col-span-2 space-y-2">
                            <Label htmlFor="service_interest">
                                Service Interest
                            </Label>
                            <Input
                                id="service_interest"
                                value={data.service_interest}
                                onChange={(e) =>
                                    setData('service_interest', e.target.value)
                                }
                                placeholder="e.g. Web Development, Mobile App"
                                required
                            />
                            {errors.service_interest && (
                                <p className="text-sm text-destructive">
                                    {errors.service_interest}
                                </p>
                            )}
                        </div>

                        {/* Message */}
                        <div className="col-span-2 space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                                id="message"
                                value={data.message}
                                onChange={(e) =>
                                    setData('message', e.target.value)
                                }
                                placeholder="Tell us about your project..."
                                rows={4}
                                required
                            />
                            {errors.message && (
                                <p className="text-sm text-destructive">
                                    {errors.message}
                                </p>
                            )}
                        </div>

                        {/* Status */}
                        <div className="col-span-2 space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={data.status}
                                onValueChange={(val) => setData('status', val)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="new">New</SelectItem>
                                    <SelectItem value="contacted">
                                        Contacted
                                    </SelectItem>
                                    <SelectItem value="deal">Deal</SelectItem>
                                    <SelectItem value="closed">
                                        Closed
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.status && (
                                <p className="text-sm text-destructive">
                                    {errors.status}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button variant="outline" asChild>
                            <Link href="/leads">Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Creating...' : 'Create Lead'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
