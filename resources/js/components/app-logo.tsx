import { usePage } from '@inertiajs/react';
import { useSidebar } from '@/components/ui/sidebar';
import { SharedData } from '@/types';
import { cn } from '@/lib/utils';

export default function AppLogo() {
    const { settings } = usePage<{ settings: SharedData['settings'] }>().props;
    const { state } = useSidebar();
    
    // Check if collapsed
    const isCollapsed = state === 'collapsed';

    return (
        <div className={cn(
            "flex items-center transition-all duration-200",
            isCollapsed ? "justify-center w-8" : "justify-start w-auto"
        )}>
            {/* 
               Jika collapsed, kita crop image untuk menampilkan icon saja.
               Strategi: Kecilkan height image (h-5) agar width proporsionalnya mengecil,
               sehingga bagian "WK" muat di dalam container w-8.
            */}
            <div className={cn(
                "relative flex items-center overflow-hidden transition-all duration-200",
                isCollapsed ? "w-8 justify-center" : "w-[140px]" 
            )}>
                <img 
                    src="/logoWK2.png" 
                    alt={settings.site_name || 'WujudKarya.com'} 
                    className={cn(
                        "object-contain object-left transition-all duration-200",
                        isCollapsed ? "h-4 w-auto max-w-none" : "h-8 w-full"
                    )}
                    width={120}
                    height={32}
                    loading="eager"
                />
            </div>
        </div>
    );
}
