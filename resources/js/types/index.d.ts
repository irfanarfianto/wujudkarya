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
    // Site Info
    site_name: string;
    site_description: string;
    
    // Contact Info
    contact_email: string;
    contact_phone: string;
    contact_address: string;
    
    // Bank Info
    bank_name: string;
    bank_account_number: string;
    bank_account_name: string;
    
    // Owner Contact
    owner_name: string;
    owner_phone: string;
    owner_email: string;
    
    // Social Media
    social_instagram: string;
    facebook_url: string;
    twitter_url: string;
    linkedin_url: string;
    
    // Business Info
    company_address: string;
    tax_id: string;
    business_hours: string;

    // Landing Page - Hero
    hero_tagline?: string;
    hero_headline_1?: string;
    hero_headline_2?: string;
    hero_description?: string;
    hero_cta_primary?: string;
    hero_cta_secondary?: string;

    // Landing Page - Stats
    stats_projects_count?: string;
    stats_clients_count?: string;
    stats_years_exp?: string;

    // Landing Page - About
    about_title?: string;
    about_subtitle?: string;
    about_description_1?: string;
    about_description_2?: string;
    vision?: string;
    mission?: string;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    settings: SiteSettings;
    flash?: {
        success?: string;
        error?: string;
        warning?: string;
        info?: string;
    };
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
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta?: {
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
    address?: string;
    projects_count?: number;
}

export interface Project {
    id: number;
    client_id: number;
    title: string;
    slug: string;
    client?: Client;
    type: string;
    description?: string;
    tech_stack: string[];
    thumbnail?: string;
    demo_url?: string;
    excerpt?: string;
    published_at: string | null;
    is_featured: boolean;
    private_notes?: string;
    images?: { id: number; image_path: string }[];
    created_at: string;
    updated_at: string;
}

export interface InvoiceItem {
    id?: number;
    invoice_id?: number;
    description: string;
    quantity: number;
    price: number;
    amount: number;
}

export interface Invoice {
    id: number;
    client_id: number;
    project_id?: number;
    invoice_number: string;
    client: Client;
    project?: Project;
    issued_date: string;
    due_date: string;
    subtotal: number;
    tax_amount: number;
    total: number;
    status: string;
    notes?: string;
    items?: InvoiceItem[];
    created_at: string;
    updated_at: string;
}

export interface Lead {
    id: number;
    name: string;
    email: string;
    service_interest: string;
    message: string;
    status: string;
    created_at: string;
}
