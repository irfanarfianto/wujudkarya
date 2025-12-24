import { Briefcase, Mail, Phone, MapPin, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';
import { SharedData } from '@/types';

interface FooterProps {
    siteName: string;
    settings: SharedData['settings'];
}

const quickLinks = [
    { href: '#layanan', label: 'Layanan' },
    { href: '#portofolio', label: 'Portofolio' },
    { href: '#tentang', label: 'Tentang Kami' },
    { href: '#kontak', label: 'Kontak' },
];

const legalLinks = [
    { href: '#', label: 'Kebijakan Privasi' },
    { href: '#', label: 'Syarat & Ketentuan' },
];

export function Footer({ siteName, settings }: FooterProps) {
    const scrollToSection = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    const socialLinks = [
        { href: settings.social_instagram, icon: Instagram, label: 'Instagram' },
        { href: settings.facebook_url, icon: Facebook, label: 'Facebook' },
        { href: settings.twitter_url, icon: Twitter, label: 'Twitter' },
        { href: settings.linkedin_url, icon: Linkedin, label: 'LinkedIn' },
    ].filter(link => link.href); // Only show if URL exists

    return (
        <footer className="bg-muted/30 border-t">
            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <img 
                                src="/logoWK2.png" 
                                alt={siteName} 
                                className="h-8 w-auto object-contain"
                                width={120}
                                height={32}
                            />
                        </div>
                        <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
                            {settings.site_description}
                        </p>
                        
                        {/* Contact Info */}
                        <div className="space-y-2 text-sm text-muted-foreground mb-6">
                            {settings.contact_email && (
                                <div className="flex items-center gap-2">
                                    <Mail className="size-4" />
                                    <a href={`mailto:${settings.contact_email}`} className="hover:text-primary transition-colors">
                                        {settings.contact_email}
                                    </a>
                                </div>
                            )}
                            {settings.contact_phone && (
                                <div className="flex items-center gap-2">
                                    <Phone className="size-4" />
                                    <a href={`tel:${settings.contact_phone}`} className="hover:text-primary transition-colors">
                                        {settings.contact_phone}
                                    </a>
                                </div>
                            )}
                            {settings.contact_address && (
                                <div className="flex items-center gap-2">
                                    <MapPin className="size-4" />
                                    <span>{settings.contact_address}</span>
                                </div>
                            )}
                            {settings.business_hours && (
                                <div className="flex items-center gap-2">
                                    <span className="text-xs">⏰ {settings.business_hours}</span>
                                </div>
                            )}
                        </div>

                        {/* Social Media */}
                        {socialLinks.length > 0 && (
                            <div className="flex items-center gap-3">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-9 h-9 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
                                        aria-label={social.label}
                                    >
                                        <social.icon className="size-4" />
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold mb-4">Navigasi Cepat</h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <a 
                                        href={link.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            scrollToSection(link.href);
                                        }}
                                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="font-semibold mb-4">Legal</h3>
                        <ul className="space-y-3">
                            {legalLinks.map((link) => (
                                <li key={link.href}>
                                    <a 
                                        href={link.href}
                                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-border">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                        <p>
                            &copy; {new Date().getFullYear()} {siteName}. Hak cipta dilindungi.
                        </p>
                        <p>
                            Dibuat dengan <span className="text-red-500">❤</span> di Indonesia
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
