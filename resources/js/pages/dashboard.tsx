import { usePage } from '@inertiajs/react';
import React, { useState } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

interface Template {
    id: number;
    name: string;
}

interface Report {
    id: number;
    name: string;
    templates: Template[];
}

export default function Dashboard() {
    const { reports } = usePage<{ reports: Report[] }>().props;

    const [selectedTemplates, setSelectedTemplates] = useState<number[]>([]);

    const handleTemplateCheck = (templateId: number) => {
        setSelectedTemplates((prev) =>
            prev.includes(templateId)
                ? prev.filter((id) => id !== templateId)
                : [...prev, templateId],
        );
    };

    const handleReportCheck = (report: Report) => {
        const templateIds = report.templates.map((t) => t.id);
        const allSelected = templateIds.every((id) =>
            selectedTemplates.includes(id),
        );

        if (allSelected) {
            setSelectedTemplates((prev) =>
                prev.filter((id) => !templateIds.includes(id)),
            );
        } else {
            setSelectedTemplates((prev) =>
                Array.from(new Set([...prev, ...templateIds])),
            );
        }
    };

    return (
        <div className="max-w-6xl p-4">
            <span className="text-xl font-bold">Department</span>

            <div className="space-y-2 p-2">
                {reports?.map((report) => {
                    const isAllSelected =
                        report.templates.length > 0 &&
                        report.templates.every((t) =>
                            selectedTemplates.includes(t.id),
                        );

                    return (
                        <div key={report.id} className="group">
                            {/* Report Header Row */}
                            <div className="flex items-center space-x-3 py-2">
                                <Checkbox
                                    id={`report-${report.id}`}
                                    checked={isAllSelected}
                                    onCheckedChange={() =>
                                        handleReportCheck(report)
                                    }
                                    className="h-4 w-4 border-2 border-primary"
                                />
                                <label
                                    htmlFor={`report-${report.id}`}
                                    className="text-md cursor-pointer font-bold select-none"
                                >
                                    {report.name}
                                </label>
                                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-muted-foreground">
                                    {report.templates.length} templates
                                </span>
                            </div>

                            {/* Templates List Under the Report */}
                            <div className="mt-2 ml-8 grid grid-cols-1 gap-3 pb-4 sm:grid-cols-2">
                                {report.templates.map((template) => (
                                    <div
                                        key={template.id}
                                        className="flex items-center space-x-3 rounded-md border border-transparent p-2 transition-colors hover:bg-slate-50"
                                    >
                                        <Checkbox
                                            id={`temp-${template.id}`}
                                            checked={selectedTemplates.includes(
                                                template.id,
                                            )}
                                            onCheckedChange={() =>
                                                handleTemplateCheck(template.id)
                                            }
                                        />
                                        <label
                                            htmlFor={`temp-${template.id}`}
                                            className="cursor-pointer text-sm font-medium text-slate-600 select-none"
                                        >
                                            {template.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <Separator className="group-last:hidden" />
                        </div>
                    );
                })}

                {reports?.length === 0 && (
                    <p className="py-10 text-center text-muted-foreground">
                        No reports found.
                    </p>
                )}
            </div>

            {/* Selection Summary */}
            <div className="mt-6 text-sm text-muted-foreground">
                Total Selected Templates:{' '}
                <span className="font-bold text-primary">
                    {selectedTemplates.length}
                </span>
            </div>
        </div>
    );
}
