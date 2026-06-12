import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { create as createForm } from '@/routes/forms';
import fields from '@/routes/forms/fields';

type Form = {
    id: number;
    name: string;
    description: string | null;
};

type Props = {
    forms: Form[];
};

export default function Index({ forms }: Props) {
    return (
        <div className="space-y-6 p-6">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Ticket Forms</h1>
                <Button asChild>
                    <Link href={createForm().url}>Create Form</Link>
                </Button>
            </div>

            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {forms.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                            No forms available.
                        </p>
                    ) : (
                        forms.map((form) => (
                            <TableRow key={form.id}>
                                <TableCell className="font-medium">
                                    {form.id}
                                </TableCell>
                                <TableCell>{form.name}</TableCell>
                                <TableCell>{form.description}</TableCell>
                                <TableCell className="text-center">
                                    <Button asChild>
                                        <Link href={fields.index(form.id).url}>
                                            Manage Fields
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
