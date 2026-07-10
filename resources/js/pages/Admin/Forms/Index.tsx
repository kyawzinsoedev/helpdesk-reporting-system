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
import Can from '@/features/permissions/Can';

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
                <Can permission="ticket_forms.create">
                    <Button asChild>
                        <Link href={createForm().url}>Create Form</Link>
                    </Button>
                </Can>
            </div>

            <Table>
                <TableCaption className="mb-3">
                    {forms?.length === 0
                        ? 'No Froms Abaliable.'
                        : 'A list of your recent invoices.'}
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {forms.map((form) => (
                        <TableRow key={form.id}>
                            <TableCell className="font-medium">
                                {form.id}
                            </TableCell>
                            <TableCell>{form.name}</TableCell>
                            <TableCell>{form.description}</TableCell>
                            <TableCell className="text-center">
                                <Can permission="ticket_forms.view">
                                    <Button asChild>
                                        <Link href={fields.index(form.id).url}>
                                            Manage Fields
                                        </Link>
                                    </Button>
                                </Can>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
