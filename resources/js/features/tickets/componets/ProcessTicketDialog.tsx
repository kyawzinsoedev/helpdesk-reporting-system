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

interface Props {
    ticket: Ticket;
}

export default function ProcessTicketDialog({ ticket }: Props) {
    // console.log('ticket', ticket);

    type FormData = {
        remark: string;
    };

    const { register, handleSubmit, reset } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        router.patch(
            `/tickets/${ticket.id}/process`,
            {
                remark: data.remark,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Process successfully');
                    reset();
                },
                onError: () => {
                    toast.error('Failed to process');
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
                                <Button type="submit">Process</Button>
                            </CardFooter>
                        </Card>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
