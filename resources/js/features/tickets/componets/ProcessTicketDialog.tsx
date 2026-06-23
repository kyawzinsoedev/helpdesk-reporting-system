import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { Staff } from '@/pages/Admin/Tickets/Index';
import type { Ticket } from '../types/tickets';

import { Separator } from 'radix-ui';

interface Props {
    ticket: Ticket;
    // staffs: Staff[];
}
export default function ProcessTicketDialog({ ticket }: Props) {
    console.log('Ticket ', ticket);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Settings className="mr-2 h-4 w-4" />
                </Button>
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[700px]">
                <DialogHeader>
                    <DialogTitle>Process Ticket</DialogTitle>

                    <DialogDescription>
                        Update ticket status and add remarks about the
                        investigation or resolution process.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>{ticket.title}</CardTitle>
                            <CardDescription>
                                Ticket #{ticket.id}
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div>
                                <p className="font-medium">Description</p>
                                <p>{ticket.description}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="font-medium">Form</p>
                                    <p>{ticket.form?.name}</p>
                                </div>

                                <div>
                                    <p className="font-medium">Priority</p>
                                    <p>{ticket.priority}</p>
                                </div>

                                <div>
                                    <p className="font-medium">Status</p>
                                    <p>{ticket.status}</p>
                                </div>

                                <div>
                                    <p className="font-medium">
                                        Assigned Staff
                                    </p>
                                    {/* <p>{ticket.assigned_staff?.name}</p> */}
                                </div>
                            </div>

                            {/* <Separator /> */}

                            <div>
                                <p className="mb-2 font-medium">
                                    Custom Fields
                                </p>

                                <div className="space-y-2">
                                    {/* {ticket.answers?.[0]?.answers?.map(
                                            (field) => (
                                                <div
                                                    key={field.field_id}
                                                    className="flex justify-between rounded border p-2"
                                                >
                                                    <span>
                                                        {field.field_label}
                                                    </span>
                                                    <span>{field.value}</span>
                                                </div>
                                            ),
                                        )} */}
                                </div>
                            </div>

                            {/* <Separator /> */}

                            <div className="space-y-2">
                                <Label>Remark</Label>

                                <Textarea placeholder="Write your processing note..." />
                            </div>
                        </CardContent>

                        <CardFooter>
                            <Button>Start Processing</Button>
                        </CardFooter>
                    </Card>
                </div>
            </DialogContent>
        </Dialog>
    );
}
