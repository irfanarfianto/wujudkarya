import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface DrawerFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    className?: string; // For styling the SheetContent
    width?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
}

export function DrawerForm({ 
    open, 
    onOpenChange, 
    title, 
    description, 
    children, 
    footer,
    className,
    width = "2xl" 
}: DrawerFormProps) {
    
    // Map width prop to max-width classes, ensuring w-full on mobile
    const widthClasses = {
        sm: "w-full sm:max-w-sm",
        md: "w-full sm:max-w-md",
        lg: "w-full sm:max-w-lg",
        xl: "w-full sm:max-w-xl",
        "2xl": "w-full sm:max-w-2xl",
        "3xl": "w-full sm:max-w-3xl",
        full: "w-full sm:max-w-none"
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent 
                onOpenAutoFocus={(e) => e.preventDefault()}
                className={cn(
                    "flex flex-col h-full p-0 gap-0", // Flex column for sticky header/footer layout
                    widthClasses[width] || widthClasses["2xl"],
                    className
                )}
            >
                {/* Header - Fixed at top */}
                <div className="flex-none border-b">
                    <SheetHeader>
                        <SheetTitle>{title}</SheetTitle>
                        {description && (
                            <SheetDescription>
                                {description}
                            </SheetDescription>
                        )}
                    </SheetHeader>
                </div>

                {/* Content - Scrollable */}
                <div className="flex-1 overflow-y-auto px-4 py-4">
                    {children}
                </div>

                {/* Footer - Fixed at bottom (optional) */}
                {footer && (
                    <div className="flex-none px-4 border-t bg-background">
                        <SheetFooter>
                            {footer}
                        </SheetFooter>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
