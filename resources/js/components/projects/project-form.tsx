import { useForm } from '@inertiajs/react';
import * as React from 'react';
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
import { CalendarIcon, Loader2 } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface ProjectFormProps {
    project?: Project | null;
    clients: Client[];
    onSuccess: () => void;
    formId?: string; // ID for the form element to allow external triggering
    hideSubmit?: boolean; // Hide internal submit button if using external actions
}

export function ProjectForm({ project, clients, onSuccess, formId, hideSubmit = false }: ProjectFormProps) {
    const isEditing = !!project;

    const { data, setData, post, processing, errors, reset, transform } = useForm({
        title: project?.title || '',
        client_id: project?.client_id ? String(project.client_id) : '',
        type: project?.type || 'web',
        description: project?.description || '',
        tech_stack_input: project?.tech_stack ? (Array.isArray(project.tech_stack) ? project.tech_stack.join(', ') : '') : '',
        demo_url: project?.demo_url || '',
        published_at: project?.published_at || '',
        status: project?.published_at ? 'published' : 'draft',
        is_featured: project?.is_featured || false,
        thumbnail: null as File | null,
        project_images: [] as File[],
    });

    const [thumbnailPreview, setThumbnailPreview] = React.useState<string | null>(project?.thumbnail || null);
    const [galleryPreviews, setGalleryPreviews] = React.useState<string[]>([]); // Don't preload existing gallery for now to keep it simple, or maybe later

    // Reset form when project changes (e.g. switching from edit to create)
    React.useEffect(() => {
        if (project) {
            setData({
                title: project.title,
                client_id: String(project.client_id),
                type: project.type,
                description: project.description || '',
                tech_stack_input: Array.isArray(project.tech_stack) ? project.tech_stack.join(', ') : '',
                demo_url: project.demo_url || '',
                published_at: project.published_at || '',
                status: project.published_at ? 'published' : 'draft',
                is_featured: project.is_featured,
                thumbnail: null,
                project_images: [],
            });
            setThumbnailPreview(project.thumbnail || null);
            setGalleryPreviews([]);
        } else {
            reset();
            setThumbnailPreview(null);
            setGalleryPreviews([]);
        }
    }, [project, reset, setData]);

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setData('thumbnail', file);
        if (file) {
            setThumbnailPreview(URL.createObjectURL(file));
        } else if (project?.thumbnail && !file) {
             setThumbnailPreview(project.thumbnail);
        } else {
            setThumbnailPreview(null);
        }
    };

    const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        setData('project_images', files);
        
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setGalleryPreviews(newPreviews);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing && project) {
            // Use POST with _method: PUT for file uploads
            transform((data) => ({
                ...data,
                tech_stack: data.tech_stack_input.split(',').map((s: string) => s.trim()).filter((s: string) => s),
                _method: 'PUT',
            }));

            post(`/projects/${project.id}`, {
                forceFormData: true,
                onSuccess: () => onSuccess(),
            });
        } else {
            transform((data) => ({
                ...data,
                tech_stack: data.tech_stack_input.split(',').map((s: string) => s.trim()).filter((s: string) => s),
            }));

            post('/projects', {
                onSuccess: () => onSuccess(),
            });
        }
    };

    return (
        <form id={formId} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
                {/* Title */}
                <div className="space-y-2">
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
                <div className="space-y-4">
                    <Label htmlFor="thumbnail" className="flex items-center gap-1">
                        {isEditing ? 'Replace Thumbnail' : 'Thumbnail Image'}
                        <span className="text-muted-foreground text-xs font-normal">(1280x720)</span>
                    </Label>
                    
                    {thumbnailPreview && (
                        <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                            <img 
                                src={thumbnailPreview} 
                                alt="Thumbnail Review" 
                                className="h-full w-full object-cover"
                            />
                        </div>
                    )}

                    <Input 
                        id="thumbnail" 
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailChange}
                        className="cursor-pointer"
                    />
                    {errors.thumbnail && <p className="text-sm text-destructive">{errors.thumbnail}</p>}
                </div>

                    {/* Project Images (Gallery) */}
                    <div className="space-y-4">
                    <Label htmlFor="project_images" className="flex items-center gap-1">
                        Gallery Images
                        <span className="text-muted-foreground text-xs font-normal">(Multiple)</span>
                    </Label>

                    {galleryPreviews.length > 0 && (
                        <div className="grid grid-cols-2 gap-2">
                            {galleryPreviews.map((preview, index) => (
                                <div key={index} className="relative aspect-video w-full overflow-hidden rounded-lg border">
                                    <img 
                                        src={preview} 
                                        alt={`Preview ${index}`} 
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    <Input 
                        id="project_images" 
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleGalleryChange}
                        className="cursor-pointer"
                    />
                    {/* Main array error */}
                    {errors.project_images && <p className="text-sm text-destructive">{errors.project_images}</p>}
                    
                    {/* Individual file errors */}
                    {Object.keys(errors).map((key) => {
                        if (key.startsWith('project_images.')) {
                            return <p key={key} className="text-sm text-destructive">{errors[key as keyof typeof errors]}</p>;
                        }
                        return null;
                    })}
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                        id="description" 
                        value={data.description} 
                        onChange={e => setData('description', e.target.value)}
                        placeholder="Describe the project..."
                        rows={4}
                    />
                    {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                </div>

                {/* Tech Stack */}
                <div className="space-y-2">
                    <Label htmlFor="tech_stack">Tech Stack</Label>
                    <Input 
                        id="tech_stack" 
                        value={data.tech_stack_input} 
                        onChange={e => setData('tech_stack_input', e.target.value)}
                        placeholder="React, Laravel, MySQL"
                    />
                    <p className="text-xs text-muted-foreground">Separate with commas.</p>
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

                {/* Status & Published Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                            value={data.status}
                            onValueChange={(val: 'published' | 'draft') => {
                                setData((data) => ({
                                    ...data,
                                    status: val,
                                    published_at: val === 'published' && !data.published_at 
                                        ? format(new Date(), 'yyyy-MM-dd') 
                                        : (val === 'draft' ? '' : data.published_at),
                                    is_featured: val === 'draft' ? false : data.is_featured
                                }));
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="published">Published</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {data.status === 'published' && (
                        <div className="flex flex-col space-y-2">
                            <Label htmlFor="published_at">Published Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full pl-3 text-left font-normal",
                                            !data.published_at && "text-muted-foreground"
                                        )}
                                    >
                                        {data.published_at ? (
                                            format(new Date(data.published_at), "PPP")
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={data.published_at ? new Date(data.published_at) : undefined}
                                        onSelect={(date) => setData('published_at', date ? format(date, 'yyyy-MM-dd') : '')}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            {errors.published_at && <p className="text-sm text-destructive">{errors.published_at}</p>}
                        </div>
                    )}
                </div>

                {/* Featured Switch */}
                {/* Featured Switch */}
                {data.status === 'published' && (
                    <div className="flex items-center space-x-2 border p-4 rounded-md">
                        <Checkbox 
                            id="is_featured" 
                            checked={data.is_featured}
                            onCheckedChange={(checked) => setData('is_featured', !!checked)}
                        />
                        <div className="grid gap-1.5 leading-none">
                            <Label htmlFor="is_featured" className="cursor-pointer">
                                Feature project
                            </Label>
                            <p className="text-xs text-muted-foreground">
                                Show on homepage.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {!hideSubmit && (
                <div className="sticky bottom-0 bg-background pt-4 border-t flex justify-end p-4">
                    <Button type="submit" disabled={processing} className="w-full sm:w-auto">
                        {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isEditing ? 'Save Changes' : 'Create Project'}
                    </Button>
                </div>
            )}
        </form>
    );
}
