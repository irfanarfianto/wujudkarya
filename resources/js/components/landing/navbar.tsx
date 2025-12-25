import { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Phone, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavbarProps {
    siteName: string;
}

const navLinks = [
    { href: '#layanan', label: 'Layanan' },
    { href: '#portofolio', label: 'Portofolio' },
    { href: '#tentang', label: 'Tentang Kami' },
    { href: '#kontak', label: 'Kontak' },
];

export function Navbar({ siteName }: NavbarProps) {
    const { url } = usePage();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);


        // If we are not on the home page, redirect to home with anchor
        if (url !== '/' && !url.startsWith('/#')) {
            router.visit(`/${href}`);
            return;
        }

        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            // Update URL hash without scroll
            history.pushState(null, '', href);
        }
    };

    const isPortfolioActive = url.startsWith('/projects-gallery');

    return (
        <>
            <header 
                className={cn(
                    "fixed top-0 w-full z-50 transition-all duration-300 border-b",
                    (isScrolled) ? "bg-background/80 backdrop-blur-md shadow-sm supports-[backdrop-filter]:bg-background/60" : "bg-transparent border-transparent"
                )}
            >
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    {/* Logo - Left */}
                    <div className="flex-shrink-0 z-50">
                        <Link href="/" className="block w-fit">
                            <img 
                                src="/logoWK2.png" 
                                alt={siteName} 
                                className="h-8 w-auto object-contain"
                                width={120} // Estimasi width agar aspect ratio terjaga
                                height={32}
                                loading="eager"
                                fetchPriority="high"
                            />
                        </Link>
                    </div>
                    
                    {/* Desktop Navigation - Center */}
                    <nav className="hidden md:flex gap-8 text-sm font-medium absolute left-1/2 -translate-x-1/2">
                        {navLinks.map((link) => {
                            const isActive = link.href === '#portofolio' && isPortfolioActive;
                            
                            return (
                                <a 
                                    key={link.href} 
                                    href={link.href} 
                                    onClick={(e) => handleSmoothScroll(e, link.href)}
                                    className={cn(
                                        "transition-colors relative group",
                                        isActive ? "text-primary font-bold" : "hover:text-primary"
                                    )}
                                >
                                    {link.label}
                                    <span className={cn(
                                        "absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full",
                                        isActive && "w-full"
                                    )}></span>
                                </a>
                            );
                        })}
                    </nav>
                    
                    {/* Desktop CTA & Mobile Toggle - Right */}
                    <div className="flex items-center gap-4 z-50">
                        <div className="hidden md:block">
                            <Button 
                                size="sm" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSmoothScroll(e, '#kontak');
                                }}
                            >
                                <Phone className="size-4 mr-2" />
                                Hubungi Kami
                            </Button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button 
                            className="md:hidden p-2 text-foreground hover:bg-muted rounded-md transition-colors"
                            onClick={() => setIsMobileMenuOpen(true)}
                            aria-label="Open menu"
                        >
                            <Menu className="size-6" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Drawer & Backdrop */}
            {/* Backdrop */}
            <div 
                className={cn(
                    "fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] md:hidden transition-opacity duration-300",
                    isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Drawer Panel */}
            <div 
                className={cn(
                    "fixed inset-y-0 right-0 w-[300px] bg-background z-[70] md:hidden transition-transform duration-300 ease-in-out shadow-2xl border-l flex flex-col",
                    isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                {/* Drawer Header */}
                <div className="h-16 flex items-center justify-between px-4 border-b">
                     <span className="font-bold text-lg">Menu</span>
                     <button 
                        className="p-2 hover:bg-muted rounded-md transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                        aria-label="Close menu"
                    >
                        <X className="size-5" />
                    </button>
                </div>

                {/* Drawer Content */}
                <nav className="flex-1 flex flex-col p-4 gap-2 overflow-y-auto">
                    {navLinks.map((link) => {
                        const isActive = link.href === '#portofolio' && isPortfolioActive;
                        return (
                            <a 
                                key={link.href} 
                                href={link.href} 
                                onClick={(e) => handleSmoothScroll(e, link.href)}
                                className={cn(
                                    "text-base font-medium transition-colors py-3 px-3 rounded-md",
                                    isActive ? "bg-primary/10 text-primary" : "hover:bg-muted/50 hover:text-primary"
                                )}
                            >
                                {link.label}
                            </a>
                        );
                    })}
                </nav>

                {/* Drawer Footer */}
                <div className="p-4 border-t bg-muted/20">
                    <Button 
                        className="w-full" 
                        size="default"
                        onClick={(e) => {
                            e.preventDefault();
                            handleSmoothScroll(e, '#kontak');
                        }}
                    >
                        <Phone className="size-4 mr-2" />
                        Hubungi Kami
                    </Button>
                    <p className="text-xs text-center text-muted-foreground mt-4">
                        &copy; {new Date().getFullYear()} {siteName}
                    </p>
                </div>
            </div>
        </>
    );
}
