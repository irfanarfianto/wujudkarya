import { Head, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Building2, Contact, CreditCard, Globe, User } from 'lucide-react';

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Settings', href: '/settings' },
];

const tabs = [
    { id: 'site', label: 'Site Info', icon: Building2 },
    { id: 'contact', label: 'Contact Info', icon: Contact },
    { id: 'bank', label: 'Bank Info', icon: CreditCard },
    { id: 'owner', label: 'Owner Contact', icon: User },
    { id: 'social', label: 'Social Media', icon: Globe },
];

export default function SettingsIndex({ settings }: { settings: Record<string, string> }) {
    const [activeTab, setActiveTab] = useState('site');
    
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        // Site Info
        site_name: settings.site_name || 'WujudKarya',
        site_description: settings.site_description || '',
        company_address: settings.company_address || '',
        tax_id: settings.tax_id || '',
        business_hours: settings.business_hours || '',
        
        // Contact Info
        contact_email: settings.contact_email || '',
        contact_phone: settings.contact_phone || '',
        contact_address: settings.contact_address || '',
        
        // Bank Info
        bank_name: settings.bank_name || '',
        bank_account_number: settings.bank_account_number || '',
        bank_account_name: settings.bank_account_name || '',
        
        // Owner Contact
        owner_name: settings.owner_name || '',
        owner_phone: settings.owner_phone || '',
        owner_email: settings.owner_email || '',
        
        // Social Media
        social_instagram: settings.social_instagram || '',
        facebook_url: settings.facebook_url || '',
        twitter_url: settings.twitter_url || '',
        linkedin_url: settings.linkedin_url || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/settings', {
            preserveScroll: true,
        });
    };

    useEffect(() => {
        if (recentlySuccessful) {
            toast.success('Pengaturan berhasil disimpan');
        }
    }, [recentlySuccessful]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Settings" />
            
            <SettingsLayout>
                <div className="space-y-6">
                    {/* Header */}
                    <div>
                        <h2 className="text-xl font-semibold mb-1">Pengaturan Umum</h2>
                        <p className="text-sm text-muted-foreground">
                            Kelola informasi website, kontak, bank, dan konfigurasi lainnya
                        </p>
                    </div>

                    {/* Tabs Navigation */}
                    <div className="border-b -mx-6 px-6">
                        <nav className="flex gap-4 overflow-x-auto">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-3 py-2.5 border-b-2 transition-colors whitespace-nowrap text-sm ${
                                        activeTab === tab.id
                                            ? 'border-primary text-primary font-medium'
                                            : 'border-transparent text-muted-foreground hover:text-foreground'
                                    }`}
                                >
                                    <tab.icon className="size-4" />
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                    
                    <form onSubmit={submit} className="space-y-6">
                        {/* Site Info Tab */}
                        {activeTab === 'site' && (
                            <div className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="site_name">Nama Website *</Label>
                                    <Input 
                                        id="site_name" 
                                        value={data.site_name} 
                                        onChange={e => setData('site_name', e.target.value)}
                                        placeholder="WujudKarya"
                                    />
                                    {errors.site_name && <p className="text-sm text-destructive">{errors.site_name}</p>}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="site_description">Deskripsi Website</Label>
                                    <Textarea 
                                        id="site_description" 
                                        value={data.site_description} 
                                        onChange={e => setData('site_description', e.target.value)}
                                        placeholder="Deskripsi singkat tentang website Anda"
                                        rows={4}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="company_address">Alamat Perusahaan</Label>
                                    <Textarea 
                                        id="company_address" 
                                        value={data.company_address} 
                                        onChange={e => setData('company_address', e.target.value)}
                                        placeholder="Alamat lengkap perusahaan"
                                        rows={3}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="tax_id">NPWP</Label>
                                        <Input 
                                            id="tax_id" 
                                            value={data.tax_id} 
                                            onChange={e => setData('tax_id', e.target.value)}
                                            placeholder="00.000.000.0-000.000"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="business_hours">Jam Operasional</Label>
                                        <Input 
                                            id="business_hours" 
                                            value={data.business_hours} 
                                            onChange={e => setData('business_hours', e.target.value)}
                                            placeholder="Senin - Jumat, 09:00 - 18:00"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Contact Info Tab */}
                        {activeTab === 'contact' && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="contact_email">Email Publik</Label>
                                        <Input 
                                            id="contact_email" 
                                            type="email"
                                            value={data.contact_email} 
                                            onChange={e => setData('contact_email', e.target.value)}
                                            placeholder="hello@wujudkarya.com"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="contact_phone">Telepon Publik</Label>
                                        <Input 
                                            id="contact_phone" 
                                            type="tel"
                                            value={data.contact_phone} 
                                            onChange={e => setData('contact_phone', e.target.value)}
                                            placeholder="+62 812 3456 7890"
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="contact_address">Alamat Publik</Label>
                                    <Textarea 
                                        id="contact_address" 
                                        value={data.contact_address} 
                                        onChange={e => setData('contact_address', e.target.value)}
                                        placeholder="Jakarta, Indonesia"
                                        rows={2}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Alamat yang ditampilkan di landing page
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Bank Info Tab */}
                        {activeTab === 'bank' && (
                            <div className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="bank_name">Nama Bank</Label>
                                    <Input 
                                        id="bank_name" 
                                        value={data.bank_name} 
                                        onChange={e => setData('bank_name', e.target.value)}
                                        placeholder="Bank BCA"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="bank_account_number">Nomor Rekening</Label>
                                    <Input 
                                        id="bank_account_number" 
                                        value={data.bank_account_number} 
                                        onChange={e => setData('bank_account_number', e.target.value)}
                                        placeholder="1234567890"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="bank_account_name">Nama Pemilik Rekening</Label>
                                    <Input 
                                        id="bank_account_name" 
                                        value={data.bank_account_name} 
                                        onChange={e => setData('bank_account_name', e.target.value)}
                                        placeholder="PT WujudKarya Digital"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Owner Contact Tab */}
                        {activeTab === 'owner' && (
                            <div className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="owner_name">Nama Pemilik</Label>
                                    <Input 
                                        id="owner_name" 
                                        value={data.owner_name} 
                                        onChange={e => setData('owner_name', e.target.value)}
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="owner_email">Email Pemilik</Label>
                                        <Input 
                                            id="owner_email" 
                                            type="email"
                                            value={data.owner_email} 
                                            onChange={e => setData('owner_email', e.target.value)}
                                            placeholder="owner@wujudkarya.com"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="owner_phone">Telepon Pemilik</Label>
                                        <Input 
                                            id="owner_phone" 
                                            type="tel"
                                            value={data.owner_phone} 
                                            onChange={e => setData('owner_phone', e.target.value)}
                                            placeholder="+62 812 3456 7890"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Social Media Tab */}
                        {activeTab === 'social' && (
                            <div className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="social_instagram">Instagram</Label>
                                    <Input 
                                        id="social_instagram" 
                                        value={data.social_instagram} 
                                        onChange={e => setData('social_instagram', e.target.value)}
                                        placeholder="https://instagram.com/wujudkarya"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="facebook_url">Facebook</Label>
                                    <Input 
                                        id="facebook_url" 
                                        value={data.facebook_url} 
                                        onChange={e => setData('facebook_url', e.target.value)}
                                        placeholder="https://facebook.com/wujudkarya"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="twitter_url">Twitter / X</Label>
                                    <Input 
                                        id="twitter_url" 
                                        value={data.twitter_url} 
                                        onChange={e => setData('twitter_url', e.target.value)}
                                        placeholder="https://twitter.com/wujudkarya"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="linkedin_url">LinkedIn</Label>
                                    <Input 
                                        id="linkedin_url" 
                                        value={data.linkedin_url} 
                                        onChange={e => setData('linkedin_url', e.target.value)}
                                        placeholder="https://linkedin.com/company/wujudkarya"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="flex items-center justify-between pt-4 border-t -mx-6 px-6 -mb-6 pb-6">
                            <p className="text-sm text-muted-foreground">
                                {recentlySuccessful && '✓ Perubahan tersimpan'}
                            </p>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </Button>
                        </div>
                    </form>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
