import { Head, Link } from '@inertiajs/react';
import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface PublicLayoutProps {
    children: ReactNode;
    title?: string;
}

export default function PublicLayout({ children, title }: PublicLayoutProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Portfolio', href: '/portfolio' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <>
            {title && <Head title={title} />}
            
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
                {/* Navigation */}
                <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            {/* Logo */}
                            <Link href="/" className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">W</span>
                                </div>
                                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    WujudKarya
                                </span>
                            </Link>

                            {/* Desktop Navigation */}
                            <div className="hidden md:flex items-center space-x-8">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                <Button asChild>
                                    <Link href="/contact">Get Started</Link>
                                </Button>
                            </div>

                            {/* Mobile menu button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                {mobileMenuOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {mobileMenuOpen && (
                        <div className="md:hidden border-t border-gray-200 dark:border-gray-800">
                            <div className="px-4 py-4 space-y-3">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                <Button asChild className="w-full">
                                    <Link href="/contact">Get Started</Link>
                                </Button>
                            </div>
                        </div>
                    )}
                </nav>

                {/* Main Content */}
                <main>{children}</main>

                {/* Footer */}
                <footer className="bg-gray-900 text-white mt-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {/* Brand */}
                            <div className="col-span-1 md:col-span-2">
                                <div className="flex items-center space-x-2 mb-4">
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">W</span>
                                    </div>
                                    <span className="text-xl font-bold">WujudKarya</span>
                                </div>
                                <p className="text-gray-400 mb-4">
                                    Transforming ideas into exceptional digital experiences. 
                                    We create beautiful, functional websites and applications.
                                </p>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h3 className="font-semibold mb-4">Quick Links</h3>
                                <ul className="space-y-2">
                                    {navigation.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className="text-gray-400 hover:text-white transition-colors"
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Contact Info */}
                            <div>
                                <h3 className="font-semibold mb-4">Contact</h3>
                                <ul className="space-y-2 text-gray-400">
                                    <li>Email: hello@wujudkarya.com</li>
                                    <li>Phone: +62 123 4567 890</li>
                                </ul>
                            </div>
                        </div>

                        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                            <p>&copy; {new Date().getFullYear()} WujudKarya. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
