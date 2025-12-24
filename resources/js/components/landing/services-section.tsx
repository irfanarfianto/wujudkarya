import { Code2, Smartphone, Palette, Zap, Shield, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

const services = [
    {
        icon: Code2,
        title: 'Web Development',
        description: 'Website modern, responsif, dan performa tinggi untuk bisnis Anda',
        features: ['Landing Page', 'Company Profile', 'E-Commerce', 'Web App'],
        gradient: 'from-blue-500/20 to-cyan-500/20',
        iconColor: 'text-blue-500',
        span: 'md:col-span-2',
    },
    {
        icon: Smartphone,
        title: 'Mobile App Development',
        description: 'Aplikasi mobile native dan cross-platform yang user-friendly',
        features: ['iOS & Android', 'Flutter', 'React Native', 'Progressive Web App'],
        gradient: 'from-purple-500/20 to-pink-500/20',
        iconColor: 'text-purple-500',
        span: 'md:col-span-2',
    },
    {
        icon: Palette,
        title: 'UI/UX Design',
        description: 'Desain antarmuka yang menarik dan pengalaman pengguna yang optimal',
        gradient: 'from-orange-500/20 to-red-500/20',
        iconColor: 'text-orange-500',
        span: 'md:col-span-1',
    },
    {
        icon: Zap,
        title: 'Fast Performance',
        description: 'Optimasi kecepatan dan performa untuk hasil terbaik',
        gradient: 'from-yellow-500/20 to-orange-500/20',
        iconColor: 'text-yellow-500',
        span: 'md:col-span-1',
    },
    {
        icon: Shield,
        title: 'Secure & Reliable',
        description: 'Keamanan data dan sistem yang terjamin',
        gradient: 'from-green-500/20 to-emerald-500/20',
        iconColor: 'text-green-500',
        span: 'md:col-span-1',
    },
    {
        icon: Rocket,
        title: 'Quick Deployment',
        description: 'Proses pengembangan yang efisien dan tepat waktu',
        gradient: 'from-indigo-500/20 to-blue-500/20',
        iconColor: 'text-indigo-500',
        span: 'md:col-span-1',
    },
];

export function ServicesSection() {
    return (
        <section id="layanan" className="py-24 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
            
            <div className="container relative z-10 mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 backdrop-blur-sm">
                        Layanan Kami
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                        Solusi Digital{' '}
                        <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            Terlengkap
                        </span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Kami menyediakan berbagai layanan pengembangan digital untuk membantu bisnis Anda berkembang
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid md:grid-cols-4 gap-4 max-w-6xl mx-auto">
                    {services.map((service, i) => (
                        <div
                            key={i}
                            className={cn(
                                'group relative overflow-hidden rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300',
                                service.span
                            )}
                        >
                            {/* Gradient Background */}
                            <div className={cn(
                                'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300',
                                service.gradient
                            )} />
                            
                            {/* Content */}
                            <div className="relative z-10">
                                {/* Icon */}
                                <div className="mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-background/80 backdrop-blur-sm border border-border/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <service.icon className={cn('size-6', service.iconColor)} />
                                    </div>
                                </div>

                                {/* Title & Description */}
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    {service.description}
                                </p>

                                {/* Features (only for main services) */}
                                {service.features && (
                                    <ul className="space-y-2">
                                        {service.features.map((feature, j) => (
                                            <li key={j} className="flex items-center gap-2 text-sm">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                <span className="text-muted-foreground">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Shine Effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
