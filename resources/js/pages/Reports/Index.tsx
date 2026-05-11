import { router } from '@inertiajs/react';
import { useState } from 'react';
import CreateReport from '@/components/reports/CreateReport';
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

interface Report {
    id: number;
    name: string;
    created_at: string;
}
interface Props {
    reports: Report[];
}
export default function Index({ reports }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this report?')) {
            router.delete(`/reports/${id}`);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between">
                <span className="text-xl font-bold">Reports</span>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button>Create</Button>
                    </DialogTrigger>
                    {/* Create Report Form  */}
                    <CreateReport setIsOpen={setIsOpen} />
                    {/* End Create Report Form  */}
                </Dialog>
            </div>
            <Table>
                <TableCaption>A list of your reporst.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Created At </TableHead>
                        <TableHead className="flex items-center justify-center text-right">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {reports?.length > 0 ? (
                        reports.map((report) => (
                            <TableRow>
                                <TableCell className="font-medium">
                                    {report.id}
                                </TableCell>
                                <TableCell>{report.name}</TableCell>
                                <TableCell>
                                    {new Date(
                                        report.created_at,
                                    ).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="flex items-center justify-center gap-3">
                                    <Button variant="outline" size="sm">
                                        Edit
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleDelete(report.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={4}
                                className="py-10 text-center text-muted-foreground"
                            >
                                No reports found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
