import { Link } from '@inertiajs/react';
import { Button } from '../ui/button';

export function CTASection() {
    return (
        <section id="contact" className="py-24 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Ready to start your project?
                </h2>
                <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-10 text-lg">
                    Let's discuss how we can help your business grow with our digital solutions. We are just one email away.
                </p>
                <Button size="lg" variant="secondary" className="h-14 px-8 text-lg font-semibold" asChild>
                    <Link href="/contact">
                        Get in Touch
                    </Link>
                </Button>
            </div>
        </section>
    );
}
