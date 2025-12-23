import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Client } from '@/types';
import { FormEventHandler } from 'react';
import { ArrowLeft, Save } from 'lucide-react';

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Projects', href: '/projects' },
    { title: 'New Project', href: '/projects/create' },
];

export default function ProjectsCreate({ clients }: { clients: Client[] }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        client_id: '',
        type: 'web',
        description: '',
        tech_stack_input: '', 
        demo_url: '',
        published_at: '',
        is_featured: false,
        thumbnail: null as File | null,
    });



    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="New Project" />

            <div className="max-w-3xl mx-auto p-6">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">New Project</h1>
                        <p className="text-muted-foreground">Add a new project to your portfolio.</p>
                    </div>
                </div>

                <form onSubmit={(e) => {
                    e.preventDefault();
                    // Custom transform logic implementation since useForm transform is better defined at hook init
                    // But here we just hack it cleanly:
                    const payload = {
                        ...data,
                        tech_stack: data.tech_stack_input.split(',').map(s => s.trim()).filter(s => s)
                    };
                    // @ts-ignore
                    post('/projects', { data: payload }); // Wait, post signature is (url, options). Data is taken from state.
                }} className="space-y-8 bg-white dark:bg-gray-900 p-6 rounded-lg border shadow-sm">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Title */}
                        <div className="space-y-2 col-span-2">
                            <Label htmlFor="title">Project Title</Label>
                            <Input 
                                id="title" 
                                value={data.title} 
                                onChange={e => setData('title', e.target.value)}
                                placeholder="e.g. E-Commerce Dashboard"
                                required
                            />
                            {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                        </div>

                        {/* Client */}
                        <div className="space-y-2">
                            <Label htmlFor="client_id">Client</Label>
                            <Select 
                                value={data.client_id} 
                                onValueChange={(val) => setData('client_id', val)} 
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a client" />
                                </SelectTrigger>
                                <SelectContent>
                                    {clients.map(client => (
                                        <SelectItem key={client.id} value={String(client.id)}>
                                            {client.company || client.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <input type="hidden" name="client_id" value={data.client_id} /> {/* Fallback/Hidden for safety if needed, usually not with managed state */}
                            {errors.client_id && <p className="text-sm text-destructive">{errors.client_id}</p>}
                        </div>

                        {/* Type */}
                        <div className="space-y-2">
                            <Label htmlFor="type">Project Type</Label>
                            <Select 
                                value={data.type} 
                                onValueChange={(val) => setData('type', val)} 
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="web">Web Development</SelectItem>
                                    <SelectItem value="mobile">Mobile App</SelectItem>
                                    <SelectItem value="system">System / Backend</SelectItem>
                                    <SelectItem value="ui/ux">UI/UX Design</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.type && <p className="text-sm text-destructive">{errors.type}</p>}
                        </div>


                        {/* Thumbnail */}
                        <div className="space-y-2 col-span-2">
                            <Label htmlFor="thumbnail" className="flex items-center gap-1">
                                Thumbnail Image
                                <span className="text-muted-foreground text-xs font-normal">(Optional)</span>
                            </Label>
                            <Input 
                                id="thumbnail" 
                                type="file"
                                accept="image/*"
                                onChange={e => setData('thumbnail', e.target.files ? e.target.files[0] : null)}
                                className="cursor-pointer"
                            />
                            {errors.thumbnail && <p className="text-sm text-destructive">{errors.thumbnail}</p>}
                        </div>

                        {/* Description */}
                        <div className="space-y-2 col-span-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea 
                                id="description" 
                                value={data.description} 
                                onChange={e => setData('description', e.target.value)}
                                placeholder="Describe the project details..."
                                rows={4}
                            />
                            {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                        </div>

                        {/* Tech Stack */}
                        <div className="space-y-2 col-span-2">
                            <Label htmlFor="tech_stack">Tech Stack (comma separated)</Label>
                            <Input 
                                id="tech_stack" 
                                value={data.tech_stack_input} 
                                onChange={e => setData('tech_stack_input', e.target.value)}
                                placeholder="Laravel, React, Tailwind, MySQL"
                            />
                            <p className="text-xs text-muted-foreground">Separate technologies with commas.</p>
                             {/* Note: Errors for tech_stack might come as 'tech_stack' array key from backend */}
                        </div>

                        {/* Demo URL */}
                        <div className="space-y-2">
                            <Label htmlFor="demo_url">Demo URL</Label>
                            <Input 
                                id="demo_url" 
                                type="url"
                                value={data.demo_url} 
                                onChange={e => setData('demo_url', e.target.value)}
                                placeholder="https://example.com"
                            />
                            {errors.demo_url && <p className="text-sm text-destructive">{errors.demo_url}</p>}
                        </div>

                         {/* Published Date */}
                         <div className="space-y-2">
                            <Label htmlFor="published_at">Published Date</Label>
                            <Input 
                                id="published_at" 
                                type="date"
                                value={data.published_at} 
                                onChange={e => setData('published_at', e.target.value)}
                            />
                            {errors.published_at && <p className="text-sm text-destructive">{errors.published_at}</p>}
                        </div>

                        {/* Featured Switch */}
                        <div className="col-span-2 flex items-center space-x-2 border p-4 rounded-md">
                            <Checkbox 
                                id="is_featured" 
                                checked={data.is_featured}
                                onCheckedChange={(checked) => setData('is_featured', !!checked)}
                            />
                            <div className="grid gap-1.5 leading-none">
                                <Label htmlFor="is_featured" className="cursor-pointer">
                                    Feature this project
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                    Featured projects appear on the homepage hero section.
                                </p>
                            </div>
                        </div>

                    </div>

                    <div className="flex justify-end gap-4">
                        <Button variant="outline" asChild>
                            <Link href="/projects">Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Create Project'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
