import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, X } from 'lucide-react';

interface PdfPreviewDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    invoiceId: number;
    invoiceNumber: string;
}

export function PdfPreviewDialog({ open, onOpenChange, invoiceId, invoiceNumber }: PdfPreviewDialogProps) {
    const previewUrl = `/invoices/${invoiceId}/preview`;
    const downloadUrl = `/invoices/${invoiceId}/download`;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[95vw] max-w-[1400px] h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 py-4 border-b">
                    <div className="flex items-center justify-between gap-4">
                        <DialogTitle className="flex-1">Invoice Preview - {invoiceNumber}</DialogTitle>
                        <Button
                            variant="outline"
                            size="sm"
                            asChild
                        >
                            <a href={downloadUrl}>
                                <Download className="h-4 w-4 mr-2" />
                                Download PDF
                            </a>
                        </Button>
                    </div>
                </DialogHeader>
                <div className="flex-1 overflow-hidden">
                    <iframe
                        src={previewUrl}
                        className="w-full h-full border-0"
                        title={`Invoice ${invoiceNumber}`}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
