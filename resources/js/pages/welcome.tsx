import { Head, Link, usePage } from '@inertiajs/react';
import { Project, Client, SharedData } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Layout, Rocket, Star } from 'lucide-react';

interface WelcomeProps {
    projects: Project[];
    clients: Client[];
}

export default function Welcome({ projects, clients }: WelcomeProps) {
    const { settings } = usePage<{ settings: SharedData['settings'] }>().props;
    
    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
            <Head title={`${settings.site_name} - Digital Solutions`} />

            {/* Navbar */}
            <header className="fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur-md">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xl">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <Layout className="size-4" />
                        </div>
                        {settings.site_name}.
                    </div>
                    <nav className="hidden md:flex gap-6 text-sm font-medium">
                        <a href="#services" className="hover:text-primary transition">Services</a>
                        <a href="#portfolio" className="hover:text-primary transition">Portfolio</a>
                        <a href="#about" className="hover:text-primary transition">About</a>
                        <a href="#contact" className="hover:text-primary transition">Contact</a>
                    </nav>
                    <div>
                        <Link href="/dashboard">
                            <Button size="sm" variant="outline">Client Login</Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="pt-16">
                {/* Hero Section */}
                <section className="relative py-20 md:py-32 overflow-hidden">
                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 mb-6">
                            We are open for new projects
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                            Turning Vision into <br className="hidden md:block"/> Digital Reality
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                            {settings.site_description || 'We build premium web applications, specialized systems, and stunning digital experiences that drive growth.'}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="h-12 px-8 text-base">
                                Start a Project <Rocket className="ml-2 size-4" />
                            </Button>
                            <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                                View Our Work
                            </Button>
                        </div>
                    </div>
                    
                    {/* Abstract Background Elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl opacity-50" />
                </section>

                {/* Services Section */}
                <section id="services" className="py-20 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold tracking-tight mb-4">What We Do</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Comprehensive digital solutions tailored to your business needs.
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { icon: Layout, title: 'Web Development', desc: 'Custom websites and web applications built with modern frameworks.' },
                                { icon: Code, title: 'System Architecture', desc: 'Scalable backend systems and API integrations for complex needs.' },
                                { icon: Star, title: 'UI/UX Design', desc: 'User-centric design interfaces that are beautiful and functional.' },
                            ].map((service, i) => (
                                <div key={i} className="bg-background p-8 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6">
                                        <service.icon className="size-6" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                                    <p className="text-muted-foreground">{service.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Portfolio Section */}
                <section id="portfolio" className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight mb-4">Latest Work</h2>
                                <p className="text-muted-foreground">Some of our recent projects and success stories.</p>
                            </div>
                            <Button variant="ghost" className="hidden md:flex">
                                View All Projects <ArrowRight className="ml-2 size-4" />
                            </Button>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.length > 0 ? projects.map((project) => (
                                <div key={project.id} className="group relative overflow-hidden rounded-xl border bg-background shadow-sm hover:shadow-md transition-all">
                                    <div className="aspect-video bg-muted relative overflow-hidden">
                                        {/* Placeholder for project image if none */}
                                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20">
                                            <Layout className="size-12" />
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{project.title}</h3>
                                                <p className="text-sm text-muted-foreground">{project.client?.company || 'Confidential'}</p>
                                            </div>
                                            <div className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs font-medium">
                                                {project.type}
                                            </div>
                                        </div>
                                        <p className="text-muted-foreground text-sm line-clamp-2 mt-2">
                                            {project.excerpt || 'No description available.'}
                                        </p>
                                        <div className="mt-4 flex gap-2 flex-wrap">
                                            {project.tech_stack && Array.isArray(project.tech_stack) && project.tech_stack.slice(0, 3).map((tech: string) => (
                                                <span key={tech} className="text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div className="col-span-full py-12 text-center text-muted-foreground bg-muted/20 rounded-xl border border-dashed">
                                    <p>No projects showcased yet Check back soon!</p>
                                </div>
                            )}
                        </div>
                        
                         <div className="mt-8 text-center md:hidden">
                            <Button variant="ghost">
                                View All Projects <ArrowRight className="ml-2 size-4" />
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section id="contact" className="py-24 bg-primary text-primary-foreground">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start your project?</h2>
                        <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-10 text-lg">
                            Let's discuss how we can help your business grow with our digital solutions. We are just one email away.
                        </p>
                        <Button size="lg" variant="secondary" className="h-14 px-8 text-lg font-semibold">
                            Get in Touch
                        </Button>
                    </div>
                </section>
                
                {/* Footer */}
                <footer className="py-12 bg-background border-t">
                     <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-sm text-muted-foreground">
                            &copy; {new Date().getFullYear()} {settings.site_name}. All rights reserved.
                        </div>
                         <div className="flex gap-6 text-sm text-muted-foreground">
                             <a href="#" className="hover:text-foreground">Privacy Policy</a>
                             <a href="#" className="hover:text-foreground">Terms of Service</a>
                         </div>
                     </div>
                </footer>
            </main>
        </div>
    );
}
