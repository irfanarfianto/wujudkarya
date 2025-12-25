import { usePage } from '@inertiajs/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SharedData } from '@/types';

export function HeroSection() {
    const { settings } = usePage<SharedData>().props;
    
    const scrollToSection = (sectionId: string) => {
        const element = document.querySelector(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
            {/* Dot Pattern Background - ReactBits Style */}
            <div className="absolute inset-0 bg-dot-pattern opacity-40" />
            
            {/* Gradient Fade */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
            
            {/* Subtle Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

            {/* Content */}
            <div className="container relative z-10 mx-auto px-4 py-20">
                <div className="max-w-5xl mx-auto text-center">
                    {/* Badge */}
                    <div 
                        className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-8 backdrop-blur-sm animate-fade-in"
                    >
                        <Sparkles className="size-4" />
                        <span>{settings.hero_tagline || 'Partner Digital Terpercaya'}</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 animate-fade-in-up leading-none">
                        <span className="inline-block">
                            {settings.hero_headline_1 || 'Mewujudkan Ide'}
                        </span>
                        <br />
                        <span className="inline-block bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent pb-2">
                            {settings.hero_headline_2 || 'Menjadi Digital'}
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in-up animation-delay-200">
                        {settings.hero_description || 'Kami membantu UMKM, startup, dan perusahaan mewujudkan ide digital melalui web development dan mobile app development yang profesional.'}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up animation-delay-400">
                        <Button 
                            size="lg" 
                            className="h-14 px-8 text-base shadow-lg hover:shadow-xl transition-all group"
                            onClick={() => scrollToSection('#kontak')}
                        >
                            <span className="flex items-center gap-2">
                                {settings.hero_cta_primary || 'Konsultasi Gratis'}
                                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Button>
                        
                        <Button 
                            size="lg" 
                            variant="outline"
                            className="h-14 px-8 text-base border-2"
                            onClick={() => scrollToSection('#portofolio')}
                        >
                            {settings.hero_cta_secondary || 'Lihat Portfolio'}
                        </Button>
                    </div>

                    {/* Stats with Clean Cards */}
                    <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto animate-fade-in-up animation-delay-600">
                        {[
                            { value: settings.stats_projects_count || '50+', label: 'Project Selesai' },
                            { value: settings.stats_clients_count || '30+', label: 'Klien Puas' },
                            { value: settings.stats_years_exp || '5+', label: 'Tahun Pengalaman' },
                        ].map((stat, i) => (
                            <div 
                                key={i}
                                className="relative group p-6 rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm hover:border-primary/30 hover:bg-card/50 transition-all"
                            >
                                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-border/40 rounded-full flex items-start justify-center p-2">
                    <div className="w-1.5 h-3 bg-primary/50 rounded-full animate-scroll" />
                </div>
            </div>
        </section>
    );
}
