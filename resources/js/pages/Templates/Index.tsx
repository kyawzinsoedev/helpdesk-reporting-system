import { router } from '@inertiajs/react';
import { useState } from 'react';
import CreateTemplate from '@/components/templates/CreateTemplate';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface Template {
    id: number;
    name: string;
    created_at: string;
    report?: {
        name: string;
    };
}

interface Report {
    id: number;
    name: string;
    username: string;
}

interface Props {
    templates: Template[];
    reports: Report[];
}

export default function Index({ templates, reports }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this template?')) {
            router.delete(`/templates/${id}`);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <span className="text-xl font-bold">Templates</span>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button>Create</Button>
                    </DialogTrigger>
                    <CreateTemplate setIsOpen={setIsOpen} reports={reports} />
                </Dialog>
            </div>

            <Table>
                <TableCaption>A list of your templates.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Report</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {templates?.length > 0 ? (
                        templates.map((template) => (
                            <TableRow key={template.id}>
                                <TableCell className="font-medium">
                                    {template.id}
                                </TableCell>
                                <TableCell>{template.name}</TableCell>
                                <TableCell>
                                    {template.report ? (
                                        template.report.name
                                    ) : (
                                        <span className="text-xs text-muted-foreground italic">
                                            No Report
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {new Date(
                                        template.created_at,
                                    ).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="flex items-center justify-center gap-3">
                                    <Button variant="outline" size="sm">
                                        Edit
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() =>
                                            handleDelete(template.id)
                                        }
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={5}
                                className="py-10 text-center text-muted-foreground"
                            >
                                No templates found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
