import * as React from 'react';
import { useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Client } from '@/types';
import { Loader2 } from 'lucide-react';

interface ClientFormProps {
    client?: Client | null;
    onSuccess: () => void;
    formId?: string;
    hideSubmit?: boolean;
}

export function ClientForm({ client, onSuccess, formId, hideSubmit = false }: ClientFormProps) {
    const isEditing = !!client;

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: client?.name || '',
        company: client?.company || '',
        email: client?.email || '',
        phone: client?.phone || '',
        address: client?.address || '',
    });

    // Reset form when client changes
    React.useEffect(() => {
        if (client) {
            setData({
                name: client.name,
                company: client.company,
                email: client.email,
                phone: client.phone || '',
                address: client.address || '',
            });
        } else {
            reset();
        }
    }, [client]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing && client) {
            put(`/clients/${client.id}`, {
                onSuccess: () => onSuccess(),
            });
        } else {
            post('/clients', {
                onSuccess: () => onSuccess(),
            });
        }
    };

    return (
        <form id={formId} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
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
                        onChange={(e) => setData('company', e.target.value)}
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
                <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                        id="address"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
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

            {!hideSubmit && (
                <div className="sticky bottom-0 bg-background pt-4 border-t flex justify-end p-4">
                    <Button type="submit" disabled={processing} className="w-full sm:w-auto">
                        {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isEditing ? 'Save Changes' : 'Create Client'}
                    </Button>
                </div>
            )}
        </form>
    );
}
