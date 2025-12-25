import * as React from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DataTableToolbarProps {
    searchPlaceholder?: string;
    searchValue: string;
    onSearchChange: (value: string) => void;
    onSearchSubmit?: () => void;
    children?: React.ReactNode;
    onReset?: () => void; 
    hasFilter?: boolean;
    className?: string;
}

export function DataTableToolbar({
    searchPlaceholder = "Search...",
    searchValue,
    onSearchChange,
    onSearchSubmit,
    children,
    onReset,
    hasFilter,
    className,
}: DataTableToolbarProps) {
    return (
        <div className={`flex flex-col sm:flex-row justify-between gap-4 ${className || ''}`}>
            <div className="relative flex-1 sm:max-w-xs transition-all duration-300 focus-within:sm:max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder={searchPlaceholder}
                    className="pl-9 w-full bg-background"
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && onSearchSubmit) {
                            onSearchSubmit();
                        }
                    }}
                />
            </div>

            <div className="flex flex-wrap items-center gap-3">
                {children && <span className="text-sm font-medium text-muted-foreground mr-1 hidden sm:inline-block">Filter by:</span>}
                
                {children}

                {hasFilter && onReset && (
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={onReset} 
                        className="h-9 px-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    >
                        <X className="mr-2 h-3.5 w-3.5" />
                        Reset
                    </Button>
                )}
            </div>
        </div>
    );
}
