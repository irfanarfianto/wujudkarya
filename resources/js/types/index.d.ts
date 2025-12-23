import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SiteSettings {
    site_name: string;
    site_description: string;
    contact_email: string;
    contact_phone: string;
    social_instagram: string;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    settings: SiteSettings;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface PaginatedData<T> {
    data: T[];
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
}

export interface Client {
    id: number;
    name: string;
    company: string;
    email: string;
    phone?: string;
    projects_count?: number;
}

export interface Project {
    id: number;
    title: string;
    slug: string;
    client?: Client;
    type: string;
    tech_stack: string[];
    thumbnail?: string;
    excerpt?: string;
    published_at: string | null;
    is_featured: boolean;
    created_at: string;
}

export interface Invoice {
    id: number;
    invoice_number: string;
    client: Client;
    issued_date: string;
    due_date: string;
    total: number;
    status: 'draft' | 'sent' | 'paid' | 'cancelled';
}

export interface Lead {
    id: number;
    name: string;
    email: string;
    service_interest: string;
    message: string;
    status: 'new' | 'contacted' | 'deal' | 'closed';
    created_at: string;
}
