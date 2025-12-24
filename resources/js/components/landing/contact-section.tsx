import { useForm, usePage } from '@inertiajs/react';
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
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { SharedData } from '@/types';

const services = [
    'Web Development',
    'Mobile App Development',
    'Website Company Profile',
    'E-Commerce / Toko Online',
    'Landing Page',
    'iOS App',
    'Android App',
    'Konsultasi',
    'Lainnya',
];

export function ContactSection() {
    const { flash, settings } = usePage<SharedData>().props;
    
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        service_interest: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/contact', {
            onSuccess: () => reset(),
        });
    };

    return (
        <section id="kontak" className="py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        Hubungi Kami
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                        Mari Wujudkan Proyek Anda
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Punya ide atau proyek? Kami siap membantu mewujudkannya. Hubungi kami sekarang!
                    </p>
                </div>

                {flash?.success && (
                    <div className="max-w-2xl mx-auto mb-8 p-6 bg-primary/10 border-2 border-primary/20 rounded-2xl flex items-start gap-4 animate-fade-in">
                        <CheckCircle2 className="size-6 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="font-semibold text-primary mb-1">Pesan Terkirim!</h4>
                            <p className="text-sm text-muted-foreground">{flash.success}</p>
                        </div>
                    </div>
                )}

                <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
                    {/* Contact Info - 2 columns */}
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold mb-6">Informasi Kontak</h3>
                            <p className="text-muted-foreground mb-8">
                                Kami siap membantu Anda. Jangan ragu untuk menghubungi kami melalui berbagai channel yang tersedia.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {/* Email */}
                            <div className="flex items-start gap-4 group">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    <Mail className="size-5" />
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Email</h4>
                                    <p className="text-muted-foreground text-sm">
                                        {settings.contact_email || 'hello@wujudkarya.com'}
                                    </p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-start gap-4 group">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    <Phone className="size-5" />
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Telepon</h4>
                                    <p className="text-muted-foreground text-sm">
                                        {settings.contact_phone || '+62 123 4567 890'}
                                    </p>
                                    {settings.business_hours && (
                                        <p className="text-muted-foreground text-sm">{settings.business_hours}</p>
                                    )}
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-start gap-4 group">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    <MapPin className="size-5" />
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Alamat</h4>
                                    <p className="text-muted-foreground text-sm">
                                        {settings.contact_address || ''}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form - 3 columns */}
                    <div className="lg:col-span-3">
                        <div className="bg-background rounded-2xl shadow-xl p-8 border border-border">
                            <h3 className="text-xl font-bold mb-6">Kirim Pesan</h3>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Name */}
                                <div>
                                    <Label htmlFor="name">Nama Lengkap *</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Masukkan nama Anda"
                                        className="mt-1.5"
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-destructive mt-1.5">{errors.name}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <Label htmlFor="email">Email *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="nama@email.com"
                                        className="mt-1.5"
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-destructive mt-1.5">{errors.email}</p>
                                    )}
                                </div>

                                {/* Service Interest */}
                                <div>
                                    <Label htmlFor="service_interest">Layanan yang Diminati *</Label>
                                    <Select
                                        value={data.service_interest}
                                        onValueChange={(value) => setData('service_interest', value)}
                                    >
                                        <SelectTrigger className="mt-1.5">
                                            <SelectValue placeholder="Pilih layanan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {services.map((service) => (
                                                <SelectItem key={service} value={service}>
                                                    {service}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.service_interest && (
                                        <p className="text-sm text-destructive mt-1.5">{errors.service_interest}</p>
                                    )}
                                </div>

                                {/* Message */}
                                <div>
                                    <Label htmlFor="message">Pesan *</Label>
                                    <Textarea
                                        id="message"
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        placeholder="Ceritakan tentang proyek Anda..."
                                        rows={5}
                                        className="mt-1.5"
                                    />
                                    {errors.message && (
                                        <p className="text-sm text-destructive mt-1.5">{errors.message}</p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full h-12 text-base shadow-lg hover:shadow-xl transition-all"
                                >
                                    {processing ? (
                                        'Mengirim...'
                                    ) : (
                                        <>
                                            <Send className="size-4 mr-2" />
                                            Kirim Pesan
                                        </>
                                    )}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
