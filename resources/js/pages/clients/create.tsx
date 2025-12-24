import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Clients', href: '/clients' },
    { title: 'New Client', href: '/clients/create' },
];

export default function ClientsCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        company: '',
        email: '',
        phone: '',
        address: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/clients');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="New Client" />

            <div className="mx-auto max-w-3xl p-6">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            New Client
                        </h1>
                        <p className="text-muted-foreground">
                            Add a new client to your database.
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

                        {/* Company */}
                        <div className="space-y-2">
                            <Label htmlFor="company">Company Name</Label>
                            <Input
                                id="company"
                                value={data.company}
                                onChange={(e) =>
                                    setData('company', e.target.value)
                                }
                                placeholder="Acme Corporation"
                            />
                            {errors.company && (
                                <p className="text-sm text-destructive">
                                    {errors.company}
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

                        {/* Phone */}
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                placeholder="+62 812 3456 7890"
                            />
                            {errors.phone && (
                                <p className="text-sm text-destructive">
                                    {errors.phone}
                                </p>
                            )}
                        </div>

                        {/* Address */}
                        <div className="col-span-2 space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Textarea
                                id="address"
                                value={data.address}
                                onChange={(e) =>
                                    setData('address', e.target.value)
                                }
                                placeholder="Full address..."
                                rows={3}
                            />
                            {errors.address && (
                                <p className="text-sm text-destructive">
                                    {errors.address}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button variant="outline" asChild>
                            <Link href="/clients">Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Creating...' : 'Create Client'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
