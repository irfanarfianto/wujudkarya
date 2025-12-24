import { cn, isSameUrl, resolveUrl } from '@/lib/utils';
import { index as settingsIndex } from '@/routes/settings';
import { edit } from '@/routes/profile';
import { edit as editPassword } from '@/routes/user-password';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import { Building2, User, KeyRound } from 'lucide-react';

const sidebarNavItems: NavItem[] = [
    {
        title: 'General',
        href: settingsIndex(),
        icon: Building2,
    },
    {
        title: 'Profile',
        href: edit(),
        icon: User,
    },
    {
        title: 'Password',
        href: editPassword(),
        icon: KeyRound,
    },
];

const descriptions: Record<string, string> = {
    'General': 'Site info & configurations',
    'Profile': 'Personal information',
    'Password': 'Security settings',
};

export default function SettingsLayout({ children }: PropsWithChildren) {
    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }

    const currentPath = window.location.pathname;

    return (
        <div className="px-4 py-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground mt-2">
                    Manage your profile and account settings
                </p>
            </div>

            {/* Main Layout: Sidebar + Content */}
            <div className="grid lg:grid-cols-[280px_1fr] gap-8">
                {/* Sidebar Navigation */}
                <aside className="space-y-2">
                    <nav className="space-y-1">
                        {sidebarNavItems.map((item, index) => {
                            const isActive = isSameUrl(currentPath, item.href);
                            const Icon = item.icon;
                            
                            return (
                                <Link
                                    key={`${resolveUrl(item.href)}-${index}`}
                                    href={item.href}
                                    className={cn(
                                        'flex items-start gap-3 px-4 py-3 rounded-lg transition-colors text-left w-full',
                                        isActive
                                            ? 'bg-primary/10 text-primary font-medium'
                                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                    )}
                                >
                                    {Icon && <Icon className="size-5 mt-0.5 flex-shrink-0" />}
                                    <div className="flex-1 min-w-0">
                                        <div className="font-medium">{item.title}</div>
                                        <div className="text-xs text-muted-foreground mt-0.5">
                                            {descriptions[item.title]}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </nav>
                </aside>

                {/* Content Area */}
                <div className="bg-card border rounded-lg">
                    <div className="p-6">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
