import { useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { Project, SharedData, PaginatedData } from '@/types';
import { Navbar, Footer } from '@/components/landing';
import { Briefcase, Calendar, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PortfolioPageProps {
    projects: PaginatedData<Project>;
}

export default function PortfolioPage({ projects }: PortfolioPageProps) {
    const { settings } = usePage<{ settings: SharedData['settings'] }>().props;
    
    // Enforce light mode
    useEffect(() => {
        document.documentElement.classList.remove('dark');
    }, []);

    const seoTitle = `Portofolio - ${settings?.site_name || 'WujudKarya'}`;
    const seoDescription = "Lihat koleksi karya terbaik kami dalam pengembangan website, aplikasi mobile, dan desain sistem.";

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Head title={seoTitle}>
                <meta name="description" content={seoDescription} />
            </Head>

            <Navbar siteName={settings?.site_name || 'WujudKarya'} />

            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                            Karya & Project
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                            Portofolio lengkap dari solusi digital yang telah kami kerjakan untuk berbagai klien
                        </p>
                    </div>

                    {/* Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
                        {projects.data.length > 0 ? (
                            projects.data.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))
                        ) : (
                            <div className="col-span-full py-16 text-center">
                                <Briefcase className="size-16 mx-auto text-muted-foreground/30 mb-4" />
                                <p className="text-muted-foreground text-lg">
                                    Belum ada project yang ditampilkan.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {projects.meta && projects.meta.links.length > 3 && (
                        <div className="flex justify-center gap-2">
                             {projects.meta.links.map((link, i) => (
                                link.url ? (
                                    <Link
                                        key={i}
                                        href={link.url}
                                        preserveScroll
                                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                            link.active 
                                                ? 'bg-primary text-primary-foreground' 
                                                : 'bg-muted hover:bg-muted/80 text-foreground'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ) : (
                                    <span
                                        key={i}
                                        className="px-4 py-2 rounded-md text-sm font-medium bg-muted/50 text-muted-foreground"
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                )
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer siteName={settings?.site_name || 'WujudKarya'} settings={settings || {}} />
        </div>
    );
}

function ProjectCard({ project }: { project: Project }) {
    return (
        <Link href={`/projects-gallery/${project.slug}`} className="block h-full">
            <div className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 h-full flex flex-col">
                {/* Project Image */}
                <div className="aspect-video bg-gradient-to-br from-primary/5 to-primary/10 relative overflow-hidden">
                    {project.thumbnail ? (
                        <img 
                            src={project.thumbnail} 
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Briefcase className="size-16 text-primary/20" />
                        </div>
                    )}
                </div>

                {/* Project Info */}
                <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                            <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">
                                {project.title}
                            </h3>
                            {project.client && (
                                <p className="text-sm text-muted-foreground">
                                    {project.client.company || project.client.name}
                                </p>
                            )}
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium capitalize whitespace-nowrap ml-2">
                            {project.type}
                        </span>
                    </div>

                    {project.excerpt && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                            {project.excerpt}
                        </p>
                    )}

                    {/* Tech Stack */}
                    {project.tech_stack && project.tech_stack.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.tech_stack.slice(0, 3).map((tech: string) => (
                                <span 
                                    key={tech} 
                                    className="text-xs bg-muted px-2.5 py-1 rounded-md text-muted-foreground font-medium"
                                >
                                    {tech}
                                </span>
                            ))}
                            {project.tech_stack.length > 3 && (
                                <span className="text-xs text-muted-foreground">
                                    +{project.tech_stack.length - 3}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Date */}
                    {project.published_at && (
                        <div className="flex items-center text-xs text-muted-foreground mt-auto">
                            <Calendar className="size-3 mr-1" />
                            {new Date(project.published_at).toLocaleDateString('id-ID', {
                                month: 'long',
                                year: 'numeric'
                            })}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}
