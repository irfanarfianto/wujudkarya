import { CheckCircle2, Target, Eye, Users } from 'lucide-react';

const whyChooseUs = [
    'Fokus pada solusi yang tepat untuk bisnis Anda',
    'Kualitas terjamin dengan standar profesional',
    'Tim berpengalaman di berbagai industri',
    'Transparansi dalam komunikasi dan proses',
];

export function AboutSection() {
    return (
        <section id="tentang" className="py-20 bg-background">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        Tentang Kami
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                        Partner Digital Terpercaya Anda
                    </h2>
                </div>

                {/* Main Content: Text Left + Image Right */}
                <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
                    {/* Left - Content */}
                    <div className="space-y-8">
                        {/* Company Story */}
                        <div>
                            <h3 className="text-2xl font-bold mb-4">Siapa WujudKarya?</h3>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                WujudKarya adalah digital agency yang berfokus pada pengembangan <strong className="text-foreground">web dan mobile app</strong> untuk 
                                membantu <strong className="text-foreground">UMKM, startup, dan perusahaan</strong> mewujudkan ide digital mereka.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                Dengan pengalaman lebih dari <strong className="text-primary">5 tahun</strong> dan <strong className="text-primary">50+ project</strong> yang telah diselesaikan, 
                                kami memahami kebutuhan bisnis Indonesia dan siap menjadi partner teknologi Anda.
                            </p>
                        </div>

                        {/* Vision & Mission */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 bg-card/50 rounded-xl border border-border/40 backdrop-blur-sm">
                                <div className="flex items-center gap-2 mb-2">
                                    <Eye className="size-5 text-primary" />
                                    <h4 className="font-bold text-sm">Visi Kami</h4>
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Menjadi partner digital terpercaya yang membantu bisnis Indonesia bertransformasi di era digital.
                                </p>
                            </div>

                            <div className="p-4 bg-card/50 rounded-xl border border-border/40 backdrop-blur-sm">
                                <div className="flex items-center gap-2 mb-2">
                                    <Target className="size-5 text-primary" />
                                    <h4 className="font-bold text-sm">Misi Kami</h4>
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Memberikan solusi digital berkualitas tinggi dengan harga terjangkau dan layanan profesional.
                                </p>
                            </div>
                        </div>

                        {/* Why Choose Us */}
                        <div>
                            <h4 className="font-bold mb-4">Mengapa Pilih Kami?</h4>
                            <div className="space-y-3">
                                {whyChooseUs.map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="size-5 text-primary flex-shrink-0 mt-0.5" />
                                        <span className="text-sm text-muted-foreground">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right - Image */}
                    <div className="lg:order-last">
                        <div className="relative rounded-2xl overflow-hidden border border-border/40 shadow-lg aspect-[4/3] bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5">
                            {/* Placeholder */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <Users className="size-16 text-primary/30 mx-auto mb-4" />
                                    <p className="text-muted-foreground font-medium">Team Photo / Office Space</p>
                                    <p className="text-sm text-muted-foreground/60 mt-2">Replace with actual image</p>
                                </div>
                            </div>
                            {/* Uncomment when ready:
                            <img 
                                src="/images/team-photo.jpg" 
                                alt="WujudKarya Team" 
                                className="w-full h-full object-cover"
                            />
                            */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
