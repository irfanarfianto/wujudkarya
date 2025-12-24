import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { DataTablePagination } from '@/components/data-table-pagination';
import { PaginatedData, Project } from '@/types';
import { Edit, Plus, Trash2 } from 'lucide-react';

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Projects', href: '/projects' },
];

export default function ProjectsIndex({ projects }: { projects: PaginatedData<Project> }) {
    const handleDelete = (project: Project) => {
        if (confirm(`Are you sure you want to delete "${project.title}"? This action cannot be undone.`)) {
            router.delete(`/projects/${project.id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects" />

            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
                        <p className="text-muted-foreground">
                            Manage your portfolio projects here.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/projects/create">
                            <Plus className="mr-2 h-4 w-4" />
                            New Project
                        </Link>
                    </Button>
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
                                                <Button variant="ghost" size="icon" asChild>
                                                    <Link href={`/projects/${project.id}/edit`}>
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                                    onClick={() => handleDelete(project)}
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
            </div>
        </AppLayout>
    );
}
