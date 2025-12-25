import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTablePagination } from '@/components/data-table-pagination';
import { PaginatedData, Project, Client } from '@/types';
import { Edit, Plus, Trash2, Layers, Activity, Star, Code } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ProjectForm } from '@/components/projects/project-form';
import { DrawerForm } from '@/components/ui/drawer-form';
import { DataTableToolbar } from '@/components/ui/data-table-toolbar';


const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Projects', href: '/projects' },
];

interface ProjectsIndexProps {
    projects: PaginatedData<Project>;
    filters?: {
        type?: string;
        status?: string;
        is_featured?: string;
        tech_stack?: string;
        search?: string;
    };
    availableTechStacks?: string[];
    clients: Client[];
}

export default function ProjectsIndex({ projects, filters = {}, availableTechStacks = [], clients }: ProjectsIndexProps) {
    const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    
    // Drawer State
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);

    const openCreateDrawer = () => {
        setEditingProject(null);
        setIsDrawerOpen(true);
    };

    const openEditDrawer = (project: Project) => {
        setEditingProject(project);
        setIsDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
        setEditingProject(null); // Reset after close animation ideally, but this is fine for now
    };

    const handleFormSuccess = () => {
        setIsDrawerOpen(false);
        setEditingProject(null);
    };

    // Update local state when filters prop changes (e.g. after clear)
    useEffect(() => {
        setSearchTerm(filters.search || '');
    }, [filters.search]);

    const confirmDelete = () => {
        if (projectToDelete) {
            router.delete(`/projects/${projectToDelete.id}`, {
                onFinish: () => setProjectToDelete(null),
            });
        }
    };

    const updateFilter = (key: string, value: string) => {
        const newFilters = { ...filters, [key]: value };
        if (value === 'all' || value === '') delete newFilters[key as keyof typeof filters];
        
        router.get('/projects', newFilters, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const handleSearchSubmit = () => {
        updateFilter('search', searchTerm);
    };

    const clearFilters = () => {
        setSearchTerm('');
        router.get('/projects', {}, {
             preserveState: true,
             preserveScroll: true,
             replace: true,
        });
    }

    const hasActiveFilters = Object.keys(filters).length > 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects" />

            <div className="p-6">
                <div className="flex flex-col gap-6 mb-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
                            <p className="text-muted-foreground">
                                Manage your portfolio projects here.
                            </p>
                        </div>
                        <Button onClick={openCreateDrawer}>
                            <Plus className="mr-2 h-4 w-4" />
                            New Project
                        </Button>
                    </div>

                    {/* Filters */}
                    <DataTableToolbar
                    searchPlaceholder="Search projects..."
                    searchValue={searchTerm}
                    onSearchChange={setSearchTerm}
                    onSearchSubmit={handleSearchSubmit}
                    onReset={clearFilters}
                    hasFilter={hasActiveFilters}
                >
                    <Select 
                        value={filters.type || 'all'} 
                        onValueChange={(val) => updateFilter('type', val)}
                    >
                        <SelectTrigger className="w-[160px] h-9 bg-background">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Layers className="h-3.5 w-3.5" />
                                <SelectValue placeholder="Type" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="web">Web Development</SelectItem>
                            <SelectItem value="mobile">Mobile App</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                            <SelectItem value="ui/ux">UI/UX Design</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select 
                        value={filters.status || 'all'} 
                        onValueChange={(val) => updateFilter('status', val)}
                    >
                        <SelectTrigger className="w-[150px] h-9 bg-background">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Activity className="h-3.5 w-3.5" />
                                <SelectValue placeholder="Status" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select 
                        value={filters.tech_stack || 'all'} 
                        onValueChange={(val) => updateFilter('tech_stack', val)}
                    >
                        <SelectTrigger className="w-[160px] h-9 bg-background">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Code className="h-3.5 w-3.5" />
                                <SelectValue placeholder="Tech Stack" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Tech Stacks</SelectItem>
                            {availableTechStacks.map((tech) => (
                                <SelectItem key={tech} value={tech}>{tech}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select 
                        value={filters.is_featured || 'all'} 
                        onValueChange={(val) => updateFilter('is_featured', val)}
                    >
                        <SelectTrigger className="w-[160px] h-9 bg-background">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Star className="h-3.5 w-3.5" />
                                <SelectValue placeholder="Featured" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Featured</SelectItem>
                            <SelectItem value="true">Featured Only</SelectItem>
                            <SelectItem value="false">Not Featured</SelectItem>
                        </SelectContent>
                    </Select>
                </DataTableToolbar>
                </div>

                <div className="rounded-md border bg-white dark:bg-gray-900 shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Client</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Tech Stack</TableHead>
                                <TableHead>Published</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {projects.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center">
                                        No projects found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                projects.data.map((project) => (
                                    <TableRow key={project.id}>
                                        <TableCell className="font-medium">
                                            {project.title}
                                            {project.is_featured && (
                                                <Badge variant="secondary" className="ml-2 text-xs">Featured</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {project.client?.company || project.client?.name || '-'}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="capitalize">
                                                {project.type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {project.tech_stack?.slice(0, 3).map((tech) => (
                                                    <span key={tech} className="inline-flex items-center rounded-sm bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                                                        {tech}
                                                    </span>
                                                ))}
                                                {(project.tech_stack?.length || 0) > 3 && (
                                                    <span className="text-xs text-muted-foreground">+{project.tech_stack!.length - 3} more</span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {project.published_at ? new Date(project.published_at).toLocaleDateString() : (
                                                <span className="text-muted-foreground italic">Draft</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    onClick={() => openEditDrawer(project)}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                                    onClick={() => setProjectToDelete(project)}
                                                >
                                                     <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                <DataTablePagination data={projects} resourceName="projects" />

                <AlertDialog open={!!projectToDelete} onOpenChange={(open) => !open && setProjectToDelete(null)}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the project
                                <span className="font-medium text-foreground"> "{projectToDelete?.title}" </span>
                                and remove its data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                <DrawerForm
                    open={isDrawerOpen}
                    onOpenChange={setIsDrawerOpen}
                    title={editingProject ? 'Edit Project' : 'New Project'}
                    description={editingProject 
                        ? 'Make changes to your project here. Click save when you\'re done.' 
                        : 'Add a new project to your portfolio. Click create when you\'re done.'}
                    width="2xl"
                    footer={
                        <div className="flex w-full justify-end gap-2">
                            <Button variant="outline" onClick={handleDrawerClose}>
                                Cancel
                            </Button>
                            <Button type="submit" form="project-form">
                                {editingProject ? 'Save Changes' : 'Create Project'}
                            </Button>
                        </div>
                    }
                >
                    {/* Render form only when drawer is open to ensure fresh state or properly reset */}
                    {isDrawerOpen && (
                        <ProjectForm 
                            project={editingProject} 
                            clients={clients} 
                            onSuccess={handleFormSuccess}
                            formId="project-form"
                            hideSubmit={true}
                        />
                    )}
                </DrawerForm>
            </div>
        </AppLayout>
    );
}
