import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import { useAppearance, type Appearance } from '@/hooks/use-appearance';
import { Moon, Sun, Monitor, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
    const { appearance, updateAppearance } = useAppearance();

    const themes: { value: Appearance; label: string; icon: typeof Sun }[] = [
        { value: 'light', label: 'Light', icon: Sun },
        { value: 'dark', label: 'Dark', icon: Moon },
        { value: 'system', label: 'System', icon: Monitor },
    ];

    const currentTheme = themes.find(t => t.value === appearance) || themes[2];
    const CurrentIcon = currentTheme.icon;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton 
                    tooltip="Theme"
                    className="data-[state=open]:bg-sidebar-accent"
                >
                    <CurrentIcon className="size-4" />
                    <span>{currentTheme.label}</span>
                </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
                align="end" 
                side="right"
                className="w-48"
            >
                {themes.map((theme) => {
                    const Icon = theme.icon;
                    const isActive = appearance === theme.value;
                    
                    return (
                        <DropdownMenuItem
                            key={theme.value}
                            onClick={() => updateAppearance(theme.value)}
                            className="flex items-center justify-between gap-2 px-3 py-2 cursor-pointer"
                        >
                            <div className="flex items-center gap-2">
                                <Icon className="size-4" />
                                <span>{theme.label}</span>
                            </div>
                            {isActive && (
                                <Check className="size-4 text-primary" />
                            )}
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
