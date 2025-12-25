import { useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { Project, Client, SharedData } from '@/types';
import {
    HeroSection,
    ServicesSection,
    PortfolioSection,
    AboutSection,
    ContactSection,
    Navbar,
    Footer,
} from '@/components/landing';

interface WelcomeProps {
    projects: Project[];
    clients: Client[];
}

export default function Welcome({ projects }: WelcomeProps) {
    const { settings } = usePage<{ settings: SharedData['settings'] }>().props;
    
    // Enforce light mode for landing page
    useEffect(() => {
        document.documentElement.classList.remove('dark');
    }, []);
    
    const seoTitle = `${settings.site_name} - Digital Agency Profesional Indonesia`;
    const seoDescription = settings.site_description || 'Kami adalah digital agency yang menghadirkan solusi web development, mobile app, dan UI/UX design berkualitas tinggi untuk mengembangkan bisnis Anda.';
    
    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
            <Head>
                {/* Primary Meta Tags */}
                <title>{seoTitle}</title>
                <meta name="title" content={seoTitle} />
                <meta name="description" content={seoDescription} />
                <meta name="keywords" content="digital agency, web development, mobile app, UI/UX design, jasa pembuatan website, aplikasi mobile, desain website, agency indonesia" />
                <meta name="author" content={settings.site_name} />
                <meta name="robots" content="index, follow" />
                <meta name="language" content="Indonesian" />
                
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : ''} />
                <meta property="og:title" content={seoTitle} />
                <meta property="og:description" content={seoDescription} />
                <meta property="og:site_name" content={settings.site_name} />
                <meta property="og:locale" content="id_ID" />
                
                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content={seoTitle} />
                <meta property="twitter:description" content={seoDescription} />
                
                {/* Additional SEO */}
                <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
            </Head>

            <Navbar siteName={settings.site_name} />

            <main className="pt-16">
                <HeroSection />
                <ServicesSection />
                <PortfolioSection projects={projects} />
                <AboutSection />
                <ContactSection />
            </main>

            <Footer siteName={settings.site_name} settings={settings} />
        </div>
    );
}
