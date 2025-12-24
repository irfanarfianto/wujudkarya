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
import { Client, Project } from '@/types';
import { ArrowLeft } from 'lucide-react';

interface EditProjectProps {
    project: Project;
    clients: Client[];
}

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Projects', href: '/projects' },
    { title: 'Edit Project', href: '#' },
];

export default function ProjectsEdit({ project, clients }: EditProjectProps) {
    const { data, setData, put, processing, errors } = useForm({
        title: project.title || '',
        client_id: String(project.client_id) || '',
        type: project.type || 'web',
        description: project.description || '',
        tech_stack_input: Array.isArray(project.tech_stack) ? project.tech_stack.join(', ') : '',
        demo_url: project.demo_url || '',
        published_at: project.published_at || '',
        is_featured: project.is_featured || false,
        thumbnail: null as File | null,
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Project - ${project.title}`} />

            <div className="mx-auto max-w-3xl p-6">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Edit Project
                        </h1>
                        <p className="text-muted-foreground">
                            Update project information.
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        put(`/projects/${project.id}`, {
                            forceFormData: true,
                        });
                    }}
                    className="space-y-8 rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-900"
                >
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Title */}
                        <div className="col-span-2 space-y-2">
                            <Label htmlFor="title">Project Title</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) =>
                                    setData('title', e.target.value)
                                }
                                placeholder="e.g. E-Commerce Dashboard"
                                required
                            />
                            {errors.title && (
                                <p className="text-sm text-destructive">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        {/* Client */}
                        <div className="space-y-2">
                            <Label htmlFor="client_id">Client</Label>
                            <Select
                                value={data.client_id}
                                onValueChange={(val) =>
                                    setData('client_id', val)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a client" />
                                </SelectTrigger>
                                <SelectContent>
                                    {clients.map((client) => (
                                        <SelectItem
                                            key={client.id}
                                            value={String(client.id)}
                                        >
                                            {client.company || client.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.client_id && (
                                <p className="text-sm text-destructive">
                                    {errors.client_id}
                                </p>
                            )}
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
                                    <SelectItem value="web">
                                        Web Development
                                    </SelectItem>
                                    <SelectItem value="mobile">
                                        Mobile App
                                    </SelectItem>
                                    <SelectItem value="system">
                                        System / Backend
                                    </SelectItem>
                                    <SelectItem value="ui/ux">
                                        UI/UX Design
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.type && (
                                <p className="text-sm text-destructive">
                                    {errors.type}
                                </p>
                            )}
                        </div>

                        {/* Current Thumbnail Preview */}
                        {project.thumbnail && (
                            <div className="col-span-2 space-y-2">
                                <Label>Current Thumbnail</Label>
                                <div className="relative h-48 w-full overflow-hidden rounded-lg border">
                                    <img
                                        src={project.thumbnail}
                                        alt={project.title}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Thumbnail */}
                        <div className="col-span-2 space-y-2">
                            <Label
                                htmlFor="thumbnail"
                                className="flex items-center gap-1"
                            >
                                {project.thumbnail
                                    ? 'Replace Thumbnail'
                                    : 'Thumbnail Image'}
                                <span className="text-xs font-normal text-muted-foreground">
                                    (Optional)
                                </span>
                            </Label>
                            <Input
                                id="thumbnail"
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setData(
                                        'thumbnail',
                                        e.target.files
                                            ? e.target.files[0]
                                            : null,
                                    )
                                }
                                className="cursor-pointer"
                            />
                            {errors.thumbnail && (
                                <p className="text-sm text-destructive">
                                    {errors.thumbnail}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="col-span-2 space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                placeholder="Describe the project details..."
                                rows={4}
                            />
                            {errors.description && (
                                <p className="text-sm text-destructive">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        {/* Tech Stack */}
                        <div className="col-span-2 space-y-2">
                            <Label htmlFor="tech_stack">
                                Tech Stack (comma separated)
                            </Label>
                            <Input
                                id="tech_stack"
                                value={data.tech_stack_input}
                                onChange={(e) =>
                                    setData('tech_stack_input', e.target.value)
                                }
                                placeholder="Laravel, React, Tailwind, MySQL"
                            />
                            <p className="text-xs text-muted-foreground">
                                Separate technologies with commas.
                            </p>
                        </div>

                        {/* Demo URL */}
                        <div className="space-y-2">
                            <Label htmlFor="demo_url">Demo URL</Label>
                            <Input
                                id="demo_url"
                                type="url"
                                value={data.demo_url}
                                onChange={(e) =>
                                    setData('demo_url', e.target.value)
                                }
                                placeholder="https://example.com"
                            />
                            {errors.demo_url && (
                                <p className="text-sm text-destructive">
                                    {errors.demo_url}
                                </p>
                            )}
                        </div>

                        {/* Published Date */}
                        <div className="space-y-2">
                            <Label htmlFor="published_at">Published Date</Label>
                            <Input
                                id="published_at"
                                type="date"
                                value={data.published_at}
                                onChange={(e) =>
                                    setData('published_at', e.target.value)
                                }
                            />
                            {errors.published_at && (
                                <p className="text-sm text-destructive">
                                    {errors.published_at}
                                </p>
                            )}
                        </div>

                        {/* Featured Switch */}
                        <div className="col-span-2 flex items-center space-x-2 rounded-md border p-4">
                            <Checkbox
                                id="is_featured"
                                checked={data.is_featured}
                                onCheckedChange={(checked) =>
                                    setData('is_featured', !!checked)
                                }
                            />
                            <div className="grid gap-1.5 leading-none">
                                <Label
                                    htmlFor="is_featured"
                                    className="cursor-pointer"
                                >
                                    Feature this project
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                    Featured projects appear on the homepage
                                    hero section.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button variant="outline" asChild>
                            <Link href="/projects">Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Updating...' : 'Update Project'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
