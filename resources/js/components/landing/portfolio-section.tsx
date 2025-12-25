import { Project } from '@/types';
import { Briefcase, Calendar, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface PortfolioSectionProps {
    projects: Project[];
}

export function PortfolioSection({ projects }: PortfolioSectionProps) {
    return (
        <section id="portofolio" className="py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        Portofolio
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                        Karya Terbaik Kami
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Beberapa proyek yang telah kami kerjakan dengan hasil yang memuaskan klien
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))
                    ) : (
                        <div className="col-span-full py-16 text-center">
                            <Briefcase className="size-16 mx-auto text-muted-foreground/30 mb-4" />
                            <p className="text-muted-foreground text-lg">
                                Portofolio akan segera ditampilkan
                            </p>
                        </div>
                    )}
                </div>

                <div className="mt-12 text-center">
                    <Link href="/projects-gallery">
                        <Button variant="outline" size="lg" className="min-w-[200px]">
                            Lihat Semua Project
                            <ExternalLink className="ml-2 size-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}

function ProjectCard({ project }: { project: Project }) {
    return (
        <Link href={`/projects-gallery/${project.slug}`} className="block">
            <div className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm hover:shadow-sm hover:border-primary/20 transition-all duration-300 h-full">
                {/* Project Image */}
                <div className="aspect-video bg-gradient-to-br from-primary/5 to-primary/10 relative overflow-hidden">
                    {project.thumbnail ? (
                        <img 
                            src={project.thumbnail} 
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Briefcase className="size-16 text-primary/20" />
                        </div>
                    )}
                </div>

                {/* Project Info */}
                <div className="p-6">
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
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
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
                        <div className="flex items-center text-xs text-muted-foreground">
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
