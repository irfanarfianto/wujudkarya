import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Settings', href: '/settings' },
];

export default function SettingsIndex({ settings }: { settings: Record<string, string> }) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        site_name: settings.site_name || 'WujudKarya',
        site_description: settings.site_description || '',
        contact_email: settings.contact_email || 'admin@wujudkarya.com',
        contact_phone: settings.contact_phone || '',
        social_instagram: settings.social_instagram || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/settings', {
            preserveScroll: true,
        });
    };

    useEffect(() => {
        if (recentlySuccessful) {
            toast.success('Settings has been updated.');
        }
    }, [recentlySuccessful]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Settings" />
            
            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall 
                        title="General Site Settings" 
                        description="Configure generic site details, public contact info, and meta tags." 
                    />
                    
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="site_name">Site Name</Label>
                            <Input 
                                id="site_name" 
                                value={data.site_name} 
                                onChange={e => setData('site_name', e.target.value)}
                            />
                            {errors.site_name && <p className="text-sm text-destructive">{errors.site_name}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="site_description">Description</Label>
                            <Textarea 
                                id="site_description" 
                                value={data.site_description} 
                                onChange={e => setData('site_description', e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="contact_email">Public Email</Label>
                                <Input 
                                    id="contact_email" 
                                    type="email"
                                    value={data.contact_email} 
                                    onChange={e => setData('contact_email', e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="contact_phone">Public Phone</Label>
                                <Input 
                                    id="contact_phone" 
                                    type="tel"
                                    value={data.contact_phone} 
                                    onChange={e => setData('contact_phone', e.target.value)}
                                />
                            </div>
                        </div>
                            <div className="grid gap-2">
                            <Label htmlFor="social_instagram">Instagram URL</Label>
                            <Input 
                                id="social_instagram" 
                                value={data.social_instagram} 
                                onChange={e => setData('social_instagram', e.target.value)}
                                placeholder="https://instagram.com/wujudkarya"
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button type="submit" disabled={processing}>
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
