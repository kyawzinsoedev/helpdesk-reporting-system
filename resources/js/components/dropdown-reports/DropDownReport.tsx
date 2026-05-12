import { usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';

interface Report {
    id: number;
    name: string;
}

interface PageProps {
    reports: Report[];
    [key: string]: any;
}
export default function DropDownReport() {
    const { reports } = usePage<PageProps>().props;

    const [open, setOpen] = useState(false);

    const [selectedReport, setSelectedReport] = useState<any>(null);

    const handleReportClick = (report: any) => {
        console.log(report);
        setSelectedReport(report);
        setOpen(true);
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-1">
                        Reports <ChevronDown className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                    {reports && reports.length > 0 ? (
                        reports.map((report) => (
                            <DropdownMenuItem
                                key={report.id}
                                onClick={() => handleReportClick(report)}
                                className="cursor-pointer"
                            >
                                {report.name}
                            </DropdownMenuItem>
                        ))
                    ) : (
                        <div className="px-2 py-1.5 text-sm text-muted-foreground">
                            No reports available
                        </div>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {selectedReport?.name} - Templates
                        </DialogTitle>
                        <DialogDescription className="sr-only">
                            Template selection dialog for {selectedReport?.name}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="w-full space-y-2">
                        <label
                            htmlFor="template-select"
                            className="text-sm font-medium"
                        >
                            Select Template
                        </label>

                        {selectedReport?.templates?.length > 0 ? (
                            <select
                                id="template-select"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none"
                                onChange={(e) => {
                                    const selectedId = e.target.value;
                                    console.log('Selected ID:', selectedId);
                                }}
                            >
                                <option value="">
                                    -- Choose a template --
                                </option>
                                {selectedReport.templates.map((temp: any) => (
                                    <option key={temp.id} value={temp.id}>
                                        {temp.name}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <div className="rounded-md border border-dashed p-4">
                                <p className="text-center text-sm text-muted-foreground">
                                    No templates found for this report.
                                </p>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
