import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { SharedData } from '@/types';

export function useFlashMessages() {
    const { flash } = usePage<SharedData>().props;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success, { id: `flash-success-${JSON.stringify(flash.success)}` });
        }
        if (flash?.error) {
            toast.error(flash.error, { id: `flash-error-${JSON.stringify(flash.error)}` });
        }
        if (flash?.warning) {
            toast.warning(flash.warning, { id: `flash-warning-${JSON.stringify(flash.warning)}` });
        }
        if (flash?.info) {
            toast.info(flash.info, { id: `flash-info-${JSON.stringify(flash.info)}` });
        }
    }, [flash]);
}
