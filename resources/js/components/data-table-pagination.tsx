import { router } from '@inertiajs/react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { PaginatedData } from '@/types';

interface DataTablePaginationProps<T> {
    data: PaginatedData<T>;
    resourceName?: string;
}

export function DataTablePagination<T>({ data, resourceName = 'items' }: DataTablePaginationProps<T>) {
    // Generate page numbers for pagination
    const generatePageNumbers = () => {
        const pages: (number | string)[] = [];
        const currentPage = data.current_page;
        const lastPage = data.last_page;
        
        // Always show first page
        pages.push(1);
        
        // Show ellipsis or pages around current page
        if (currentPage > 3) {
            pages.push('ellipsis-start');
        }
        
        // Show pages around current page
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(lastPage - 1, currentPage + 1); i++) {
            if (!pages.includes(i)) {
                pages.push(i);
            }
        }
        
        // Show ellipsis before last page
        if (currentPage < lastPage - 2) {
            pages.push('ellipsis-end');
        }
        
        // Always show last page if there's more than 1 page
        if (lastPage > 1) {
            pages.push(lastPage);
        }
        
        return pages;
    };

    // Don't render if only 1 page
    if (data.last_page <= 1) {
        return null;
    }

    return (
        <div className="flex items-center justify-between mt-4">
            {/* Page Info - Left */}
            <div className="text-sm text-muted-foreground">
                Showing {data.from} to {data.to} of {data.total} {resourceName}
            </div>

            {/* Pagination Controls - Right */}
            <Pagination>
                <PaginationContent>
                    {/* Previous Button */}
                    <PaginationItem>
                        <PaginationPrevious 
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (data.links.prev) {
                                    router.visit(data.links.prev);
                                }
                            }}
                            className={!data.links.prev ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        />
                    </PaginationItem>

                    {/* Page Numbers */}
                    {generatePageNumbers().map((page, index) => {
                        if (page === 'ellipsis-start' || page === 'ellipsis-end') {
                            return (
                                <PaginationItem key={`ellipsis-${index}`}>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            );
                        }

                        const pageNumber = page as number;
                        const isActive = pageNumber === data.current_page;
                        
                        // Get current path without query params
                        const currentPath = window.location.pathname;
                        const pageUrl = pageNumber === 1 
                            ? currentPath 
                            : `${currentPath}?page=${pageNumber}`;

                        return (
                            <PaginationItem key={pageNumber}>
                                <PaginationLink 
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (!isActive) {
                                            router.visit(pageUrl);
                                        }
                                    }}
                                    isActive={isActive}
                                    className={isActive ? 'pointer-events-none' : 'cursor-pointer'}
                                >
                                    {pageNumber}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    })}

                    {/* Next Button */}
                    <PaginationItem>
                        <PaginationNext 
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (data.links.next) {
                                    router.visit(data.links.next);
                                }
                            }}
                            className={!data.links.next ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
