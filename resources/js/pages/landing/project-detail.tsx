import { useEffect, useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { Project, SharedData } from '@/types';
import { Navbar, Footer } from '@/components/landing';
import { ArrowLeft, ExternalLink, Briefcase, Tag, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

interface ProjectDetailProps {
    project: Project;
    relatedProjects: Project[];
}

export default function ProjectDetail({ project, relatedProjects }: ProjectDetailProps) {
    const { settings } = usePage<{ settings: SharedData['settings'] }>().props;
    const [previewIndex, setPreviewIndex] = useState<number | null>(null);

    // Enforce light mode
    useEffect(() => {
        document.documentElement.classList.remove('dark');
    }, []);

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Safe values for meta tags
    const pageTitle = `${project?.title || 'Project'} - ${settings?.site_name || 'WujudKarya'}`;
    const pageDescription = project?.description || `Project ${project?.title || 'detail'}`;

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Head title={pageTitle}>
                <meta name="description" content={pageDescription} />
            </Head>

            <Navbar siteName={settings?.site_name || 'WujudKarya'} />

            <main className="pt-16">
                {/* Hero Section */}
                <section className="py-12 bg-muted/20">
                    <div className="container mx-auto px-4">
                        {/* Back Button */}
                        <Link 
                            href="/#portofolio"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
                        >
                            <ArrowLeft className="size-4" />
                            Kembali ke Portfolio
                        </Link>

                        <div className="max-w-6xl mx-auto">
                            {/* Project Title & Meta */}
                            <div className="mb-8">
                                <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
                                

                            </div>

                            {/* Main Content Grid */}
                            <div className="grid lg:grid-cols-3 gap-8">
                                {/* Left: Image Carousel */}
                                <div className="lg:col-span-2">
                                    {/* Combine all images */}
                                    {(() => {
                                        const allImages = [
                                            ...(project.thumbnail ? [{ id: 'main', image_path: project.thumbnail }] : []),
                                            ...(project.images || [])
                                        ];

                                        if (allImages.length === 0) {
                                            return (
                                                <div className="rounded-2xl overflow-hidden border border-border/40 shadow-sm bg-muted/30 aspect-video relative flex items-center justify-center">
                                                    <div className="text-center">
                                                        <Briefcase className="size-16 text-muted-foreground/30 mx-auto mb-4" />
                                                        <p className="text-muted-foreground">No Image Available</p>
                                                    </div>
                                                </div>
                                            );
                                        }


                                        return (
                                            <>
                                                <Carousel 
                                                    className="w-full"
                                                    plugins={[
                                                        Autoplay({
                                                            delay: 5000,
                                                        }),
                                                    ]}
                                                >
                                                    <CarouselContent>
                                                        {allImages.map((image, index) => (
                                                            <CarouselItem key={image.id || index}>
                                                                <div 
                                                                    className="rounded-xl overflow-hidden border border-border/40 shadow-sm bg-muted/30 aspect-video relative cursor-pointer hover:opacity-95 transition-opacity"
                                                                    onClick={() => setPreviewIndex(index)}
                                                                >
                                                                    <img
                                                                        src={image.image_path}
                                                                        alt={`${project.title} - Image ${index + 1}`}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                </div>
                                                            </CarouselItem>
                                                        ))}
                                                    </CarouselContent>
                                                    {/* Navigation Buttons for Carousel (not Modal) */}
                                                    {allImages.length > 1 && (
                                                        <>
                                                            <CarouselPrevious className="left-4" />
                                                            <CarouselNext className="right-4" />
                                                        </>
                                                    )}
                                                </Carousel>

                                                <Dialog open={previewIndex !== null} onOpenChange={(open) => !open && setPreviewIndex(null)}>
                                                    <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 bg-transparent border-none shadow-none flex items-center justify-center pointer-events-none [&>button:last-child]:hidden">
                                                         {/* Main container with pointer-events-auto to capture clicks on buttons/image */}
                                                         <div className="relative w-full h-full flex items-center justify-center pointer-events-auto outline-none" onClick={() => setPreviewIndex(null)}>
                                                            
                                                             {previewIndex !== null && (
                                                                <div 
                                                                    className="relative max-w-5xl max-h-[90vh] w-auto h-auto"
                                                                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image wrapper
                                                                >
                                                                     <img
                                                                        src={allImages[previewIndex].image_path}
                                                                        alt="Preview"
                                                                        className="w-auto h-auto max-w-full max-h-[85vh] object-contain rounded-md shadow-2xl"
                                                                    />

                                                                    {/* Navigation Controls */}
                                                                    {allImages.length > 1 && (
                                                                        <>
                                                                            <Button 
                                                                                variant="ghost" 
                                                                                size="icon" 
                                                                                className="absolute -left-12 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full w-10 h-10"
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    setPreviewIndex((prev) => (prev === 0 ? allImages.length - 1 : prev! - 1));
                                                                                }}
                                                                            >
                                                                                <ChevronLeft className="size-8" />
                                                                                <span className="sr-only">Previous</span>
                                                                            </Button>

                                                                            <Button 
                                                                                variant="ghost" 
                                                                                size="icon" 
                                                                                className="absolute -right-12 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full w-10 h-10"
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    setPreviewIndex((prev) => (prev === allImages.length - 1 ? 0 : prev! + 1));
                                                                                }}
                                                                            >
                                                                                <ChevronRight className="size-8" />
                                                                                <span className="sr-only">Next</span>
                                                                            </Button>
                                                                        </>
                                                                    )}

                                                                    {/* Close Button */}
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="absolute -top-10 right-0 text-white hover:bg-white/20 rounded-full"
                                                                        onClick={() => setPreviewIndex(null)}
                                                                    >
                                                                        <X className="size-6" />
                                                                        <span className="sr-only">Close</span>
                                                                    </Button>

                                                                    {/* Image Counter */}
                                                                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium">
                                                                        {previewIndex + 1} / {allImages.length}
                                                                    </div>
                                                                </div>
                                                             )}
                                                         </div>
                                                    </DialogContent>
                                                </Dialog>
                                            </>
                                        );
                                    })()}

                                    {/* Description */}
                                    {project.description && (
                                        <div className="mt-8">
                                            <h2 className="text-2xl font-bold mb-4">Tentang Project</h2>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {project.description}
                                            </p>
                                        </div>
                                    )}

                                    {/* Tech Stack */}
                                    {project.tech_stack && project.tech_stack.length > 0 && (
                                        <div className="mt-8">
                                            <h3 className="font-semibold mb-4 flex items-center gap-2">
                                                <Tag className="size-4" />
                                                Teknologi yang Digunakan
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {project.tech_stack.map((tech: string) => (
                                                    <span 
                                                        key={tech} 
                                                        className="px-3 py-1.5 bg-muted rounded-lg text-sm font-medium"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Right: Project Info Card */}
                                <div className="lg:col-span-1">
                                    <div className="rounded-xl p-6 border border-border/40 sticky top-24 space-y-6">
                                        <h3 className="font-bold text-lg">Detail Project</h3>

                                        {project.client && (
                                            <div>
                                                <p className="text-sm text-muted-foreground mb-1">Klien</p>
                                                <p className="font-medium">{project.client.company || project.client.name}</p>
                                            </div>
                                        )}

                                        {project.type && (
                                            <div>
                                                <p className="text-sm text-muted-foreground mb-1">Kategori</p>
                                                <p className="font-medium capitalize">{project.type}</p>
                                            </div>
                                        )}

                                        {project.published_at && (
                                            <div>
                                                <p className="text-sm text-muted-foreground mb-1">Tanggal Publikasi</p>
                                                <p className="font-medium">{formatDate(project.published_at)}</p>
                                            </div>
                                        )}

                                        {project.demo_url && (
                                            <div className="pt-4 border-t">
                                                <Button asChild className="w-full">
                                                    <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                                                        <ExternalLink className="size-4 mr-2" />
                                                        Lihat Demo
                                                    </a>
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 bg-gradient-to-br from-primary/5 to-primary/10">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-4">Tertarik dengan Project Serupa?</h2>
                        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Mari diskusikan bagaimana kami bisa membantu mewujudkan ide digital Anda
                        </p>
                        <Link href="/#kontak">
                            <Button size="lg">
                                Hubungi Kami
                                <ExternalLink className="ml-2 size-4" />
                            </Button>
                        </Link>
                    </div>
                </section>

                {/* Related Projects */}
                {relatedProjects.length > 0 && (
                    <section className="py-16">
                        <div className="container mx-auto px-4">
                            <h2 className="text-2xl font-bold mb-8 text-center">Project Lainnya</h2>
                            
                            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                                {relatedProjects.map((relatedProject) => (
                                    <Link
                                        key={relatedProject.id}
                                        href={`/projects-gallery/${relatedProject.slug}`}
                                        className="group"
                                    >
                                        <div className="bg-background rounded-xl border overflow-hidden hover:shadow-lg transition-all h-full">
                                            {relatedProject.thumbnail ? (
                                                <div className="aspect-video overflow-hidden">
                                                    <img 
                                                        src={relatedProject.thumbnail}
                                                        alt={relatedProject.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="aspect-video bg-muted flex items-center justify-center">
                                                    <Briefcase className="size-12 text-muted-foreground/30" />
                                                </div>
                                            )}
                                            
                                            <div className="p-6">
                                                <h3 className="font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                                    {relatedProject.title}
                                                </h3>
                                                {relatedProject.client && (
                                                    <p className="text-sm text-muted-foreground">
                                                        {relatedProject.client.company || relatedProject.client.name}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>

            <Footer siteName={settings?.site_name || 'WujudKarya'} settings={settings || {}} />
        </div>
    );
}
