import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Content Management', href: '/content' },
];

export default function ContentIndex({ settings }: { settings: Record<string, string> }) {
    const { data, setData, post, processing, recentlySuccessful } = useForm({
        // Landing Page - Hero
        hero_tagline: settings.hero_tagline || '',
        hero_headline_1: settings.hero_headline_1 || '',
        hero_headline_2: settings.hero_headline_2 || '',
        hero_description: settings.hero_description || '',
        hero_cta_primary: settings.hero_cta_primary || '',
        hero_cta_secondary: settings.hero_cta_secondary || '',

        // Landing Page - Stats
        stats_projects_count: settings.stats_projects_count || '',
        stats_clients_count: settings.stats_clients_count || '',
        stats_years_exp: settings.stats_years_exp || '',

        // Landing Page - About
        about_subtitle: settings.about_subtitle || '',
        about_title: settings.about_title || '',
        about_description_1: settings.about_description_1 || '',
        about_description_2: settings.about_description_2 || '',
        vision: settings.vision || '',
        mission: settings.mission || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/content', {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Content Management" />
            
            <div className="space-y-6 p-6">
                {/* Header */}
                <div>
                    <h2 className="text-xl font-semibold mb-1">Content Management</h2>
                    <p className="text-sm text-muted-foreground">
                        Kelola konten landing page seperti Hero, About, dan Statistics
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-8">
                    {/* Hero Section */}
                    <div className="rounded-lg border bg-card p-6 space-y-4">
                        <h3 className="text-lg font-medium border-b pb-2">Hero Section</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="hero_tagline">Tagline Badge</Label>
                                <Input 
                                    id="hero_tagline" 
                                    value={data.hero_tagline} 
                                    onChange={e => setData('hero_tagline', e.target.value)} 
                                    placeholder="Partner Digital Terpercaya" 
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="hero_headline_1">Headline Baris 1</Label>
                                <Input 
                                    id="hero_headline_1" 
                                    value={data.hero_headline_1} 
                                    onChange={e => setData('hero_headline_1', e.target.value)} 
                                    placeholder="Mewujudkan Ide" 
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="hero_headline_2">Headline Baris 2</Label>
                                <Input 
                                    id="hero_headline_2" 
                                    value={data.hero_headline_2} 
                                    onChange={e => setData('hero_headline_2', e.target.value)} 
                                    placeholder="Menjadi Digital" 
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="hero_description">Deskripsi Hero</Label>
                            <Textarea 
                                id="hero_description" 
                                value={data.hero_description} 
                                onChange={e => setData('hero_description', e.target.value)} 
                                placeholder="Deskripsi singkat di bawah headline..." 
                                rows={3} 
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="hero_cta_primary">Tombol Utama</Label>
                                <Input 
                                    id="hero_cta_primary" 
                                    value={data.hero_cta_primary} 
                                    onChange={e => setData('hero_cta_primary', e.target.value)} 
                                    placeholder="Konsultasi Gratis" 
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="hero_cta_secondary">Tombol Sekunder</Label>
                                <Input 
                                    id="hero_cta_secondary" 
                                    value={data.hero_cta_secondary} 
                                    onChange={e => setData('hero_cta_secondary', e.target.value)} 
                                    placeholder="Lihat Portofolio" 
                                />
                            </div>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="rounded-lg border bg-card p-6 space-y-4">
                        <h3 className="text-lg font-medium border-b pb-2">Statistics Section</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="stats_projects_count">Total Projects</Label>
                                <Input 
                                    id="stats_projects_count" 
                                    value={data.stats_projects_count} 
                                    onChange={e => setData('stats_projects_count', e.target.value)} 
                                    placeholder="50+" 
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="stats_clients_count">Total Clients</Label>
                                <Input 
                                    id="stats_clients_count" 
                                    value={data.stats_clients_count} 
                                    onChange={e => setData('stats_clients_count', e.target.value)} 
                                    placeholder="30+" 
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="stats_years_exp">Years Experience</Label>
                                <Input 
                                    id="stats_years_exp" 
                                    value={data.stats_years_exp} 
                                    onChange={e => setData('stats_years_exp', e.target.value)} 
                                    placeholder="5+" 
                                />
                            </div>
                        </div>
                    </div>

                    {/* About Section */}
                    <div className="rounded-lg border bg-card p-6 space-y-4">
                        <h3 className="text-lg font-medium border-b pb-2">About Section</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="about_subtitle">Sub-Judul</Label>
                                <Input 
                                    id="about_subtitle" 
                                    value={data.about_subtitle} 
                                    onChange={e => setData('about_subtitle', e.target.value)} 
                                    placeholder="Partner Digital Terpercaya Anda" 
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="about_title">Judul Utama</Label>
                                <Input 
                                    id="about_title" 
                                    value={data.about_title} 
                                    onChange={e => setData('about_title', e.target.value)} 
                                    placeholder="Siapa WujudKarya?" 
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="about_description_1">Paragraf 1</Label>
                            <Textarea 
                                id="about_description_1" 
                                value={data.about_description_1} 
                                onChange={e => setData('about_description_1', e.target.value)} 
                                rows={3} 
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="about_description_2">Paragraf 2</Label>
                            <Textarea 
                                id="about_description_2" 
                                value={data.about_description_2} 
                                onChange={e => setData('about_description_2', e.target.value)} 
                                rows={3} 
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="vision">Visi</Label>
                            <Textarea 
                                id="vision" 
                                value={data.vision} 
                                onChange={e => setData('vision', e.target.value)} 
                                rows={2} 
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="mission">Misi</Label>
                            <Textarea 
                                id="mission" 
                                value={data.mission} 
                                onChange={e => setData('mission', e.target.value)} 
                                rows={2} 
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-between pt-4 border-t">
                        <p className="text-sm text-muted-foreground">
                            {recentlySuccessful && '✓ Perubahan tersimpan'}
                        </p>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
