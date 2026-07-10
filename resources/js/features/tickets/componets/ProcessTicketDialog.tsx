import { router } from '@inertiajs/react';
import { Settings } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import type { Ticket } from '../types/tickets';
import { Staff } from '@/pages/Admin/Tickets/Index';
import { DialogDescription } from '@radix-ui/react-dialog';
import { ticketFormStructureSchema } from '../schemas/ticketSchema';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Can from '@/features/permissions/Can';

interface Props {
    ticket: Ticket;
}

export default function ProcessTicketDialog({ ticket }: Props) {
    // console.log('Ticket From Process Ticket Dialog', ticket);

    const ticketAction = {
        open: {
            label: 'Assign',
            permission: 'tickets.assign',
        },
        assigned: {
            label: 'Process',
            permission: 'tickets.process',
        },
        processing: {
            label: 'Resolve',
            permission: 'tickets.resolve',
        },
        resolved: {
            label: 'Close',
            permission: 'tickets.close',
        },
        closed: {
            label: 'Done',
            permission: null,
        },
    };

    // const action = ticketAction[ticket.status as keyof typeof ticketAction];
    const action = ticketAction[ticket.status as keyof typeof ticketAction] ?? {
        label: 'Unknown',
        permission: null,
    };

    type FormData = {
        remark: string;
    };

    const { register, handleSubmit, reset } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        let endpoint = `/tickets/${ticket.id}/process`;
        let successMessage = 'Processed successfully';
        if (ticket.status === 'processing') {
            endpoint = `/tickets/${ticket.id}/resolve`;
            successMessage = 'Resolved successfully';
        } else if (ticket.status === 'resolved') {
            endpoint = `/tickets/${ticket.id}/close`;
            successMessage = 'Closed successfully';
        }
        router.patch(
            endpoint,
            {
                remark: data.remark,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success(successMessage);
                    reset();
                },
                onError: () => {
                    toast.error('Failed to update action');
                },
            },
        );
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                    <Settings className="h-4 w-4" />
                </Button>
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Title - {ticket.title}</DialogTitle>
                    <DialogDescription>
                        Description - {ticket.description}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Ticket Information */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Ticket Information</CardTitle>
                            </CardHeader>

                            <CardContent className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Ticket Form
                                    </p>
                                    <p>{ticket.form?.name}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Status
                                    </p>
                                    <p>{ticket.status}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Priority
                                    </p>
                                    <p className="capitalize">
                                        {ticket.priority}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Created At
                                    </p>
                                    <p>
                                        {new Date(
                                            ticket.created_at,
                                        ).toLocaleString()}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Updated At
                                    </p>
                                    <p>
                                        {new Date(
                                            ticket.updated_at,
                                        ).toLocaleString()}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Created By
                                    </p>
                                    <p>{ticket.user?.name}</p>
                                </div>

                                {ticket?.assigned_staff && (
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Assign Staff
                                        </p>
                                        <p>{ticket?.assigned_staff.name}</p>
                                    </div>
                                )}

                                {ticket?.remark && (
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Remark
                                        </p>
                                        <p>{ticket?.remark}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Custom Fields */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Custom Fields</CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-3">
                                {Object.entries(ticket.custom_fields ?? {}).map(
                                    ([key, value]) => (
                                        <div
                                            key={key}
                                            className="flex justify-between border-b pb-2"
                                        >
                                            <span className="font-medium capitalize">
                                                {key.replace(/_/g, ' ')}
                                            </span>

                                            <span>{String(value)}</span>
                                        </div>
                                    ),
                                )}
                            </CardContent>
                        </Card>

                        {/* Actions  */}
                        {ticket?.status !== 'closed' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Remark & Process</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Textarea
                                        placeholder="Type your remark."
                                        {...register('remark')}
                                    />
                                </CardContent>
                                <CardFooter className="flex justify-end gap-3">
                                    <Button
                                        type="button"
                                        variant={'outline'}
                                        onClick={() => router.visit('/tickets')}
                                    >
                                        Cancel
                                    </Button>

                                    <Can permission={action.permission}>
                                        <Button
                                            type="submit"
                                            disabled={
                                                ticket.status === 'closed' ||
                                                ticket.status === 'open'
                                            }
                                        >
                                            {action.label}
                                        </Button>
                                    </Can>
                                    {/* <Button
                                        type="submit"
                                        disabled={
                                            ticket.status === 'closed' ||
                                            ticket.status === 'open'
                                        }
                                    >
                                        {ticket.status === 'open'
                                            ? 'Open'
                                            : ticket.status === 'assigned'
                                              ? 'Processing'
                                              : ticket.status === 'processing'
                                                ? 'Resolving'
                                                : ticket.status === 'resolved'
                                                  ? 'Close'
                                                  : ticket.status === 'closed'
                                                    ? 'Done'
                                                    : 'Unknown'}
                                    </Button> */}
                                </CardFooter>
                            </Card>
                        )}
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
