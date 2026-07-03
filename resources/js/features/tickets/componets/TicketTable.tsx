import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import type { Staff } from '@/pages/Admin/Tickets/Index';
import type { TicketFormStructure } from '../schemas/ticketSchema';
import type { Ticket } from '../types/tickets';
import AssignTicketDialog from './AssignTicketDialog';
import DeleteTicketDialog from './DeleteTicketDialog';
import TicketFormModal from './TicketFormModal';
import ProcessTicketDialog from './ProcessTicketDialog';

interface Props {
    tickets: Ticket[];
    ticketForms: TicketFormStructure[];
    staffs: Staff[];
}

export default function TicketTable({ tickets, ticketForms, staffs }: Props) {
    return (
        <div className="overflow-hidden rounded-md border bg-card shadow-sm">
            <Table>
                <TableCaption className="mb-3">
                    {tickets?.length === 0
                        ? 'No Tickets Abaliable'
                        : 'A list of your recent tickets.'}
                </TableCaption>
                <TableHeader className="bg-muted/50">
                    <TableRow>
                        <TableHead>Id</TableHead>

                        <TableHead>Title</TableHead>

                        <TableHead>Ticket's Form</TableHead>

                        {/* <TableHead>Fields</TableHead> */}

                        <TableHead>Priority</TableHead>

                        <TableHead>Status</TableHead>

                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {tickets?.map((ticket) => (
                        <TableRow key={ticket.id}>
                            <TableCell>{ticket.id ?? '-'}</TableCell>

                            <TableCell>
                                <div className="flex flex-col">
                                    <span className="font-medium">
                                        {ticket.title}
                                    </span>

                                    <span className="text-sm text-muted-foreground">
                                        {ticket.description}
                                    </span>
                                </div>
                            </TableCell>

                            <TableCell>{ticket.form?.name ?? '-'}</TableCell>

                            {/* <TableCell>
                                <div className="flex flex-col gap-1">
                                    {ticket?.custom_fields &&
                                        Object.entries(
                                            ticket.custom_fields,
                                        ).map(([key, value]) => (
                                            <div key={key} className="text-sm">
                                                <span className="font-medium">
                                                    {key}:
                                                </span>{' '}
                                                <span className="text-muted-foreground">
                                                    {String(value)}
                                                </span>
                                            </div>
                                        ))}
                                </div>
                            </TableCell> */}

                            <TableCell>{ticket.priority ?? '-'}</TableCell>

                            <TableCell>{ticket.status ?? '-'}</TableCell>

                            <TableCell>
                                <div className="flex items-center justify-center gap-2">
                                    <ProcessTicketDialog ticket={ticket} />

                                    <AssignTicketDialog
                                        ticket={ticket}
                                        staffs={staffs}
                                    />

                                    <TicketFormModal
                                        mode="edit"
                                        ticket={ticket}
                                        ticketForms={ticketForms}
                                    />

                                    <DeleteTicketDialog ticket={ticket} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
