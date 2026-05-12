import { usePage } from '@inertiajs/react';
import React from 'react';

interface Template {
    id: number;
    name: string;
}
interface Report {
    id: number;
    name: string;
    templates: Template[];
}
interface PageProps {
    reports: Report[];
    [key: string]: any;
}
export default function Index() {
    const { reports } = usePage<PageProps>().props;

    return (
        <div>
            {reports?.map((report: Report) => (
                <div key={report.id}>
                    <p>
                        {report.id} , {report.name}
                    </p>
                    <p>
                        {report?.templates.map((template) => (
                            <span key={template.id}>
                                Template id - {template.id} {template.name}
                            </span>
                        ))}
                    </p>
                </div>
            ))}
        </div>
    );
}
