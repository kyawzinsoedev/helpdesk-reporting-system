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
import type { PaginatedData, Ticket } from '../types/tickets';
import AssignTicketDialog from './AssignTicketDialog';
import DeleteTicketDialog from './DeleteTicketDialog';
import TicketFormModal from './TicketFormModal';
import ProcessTicketDialog from './ProcessTicketDialog';
import Can from '@/features/permissions/Can';
import AppPagination from '@/features/common/pagination';

interface Props {
    tickets: PaginatedData<Ticket>;
    ticketForms: TicketFormStructure[];
    staffs: Staff[];
}

export default function TicketTable({ tickets, ticketForms, staffs }: Props) {
    console.log('Ticket From Ticket Table ', tickets);
    return (
        <div className="overflow-hidden rounded-md border bg-card shadow-sm">
            <Table>
                <TableCaption className="mb-3">
                    {tickets?.data.length === 0
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
                    {tickets?.data?.map((ticket) => (
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
                                    <Can permission="tickets.view">
                                        <ProcessTicketDialog ticket={ticket} />
                                    </Can>

                                    <Can permission="tickets.assign">
                                        <AssignTicketDialog
                                            ticket={ticket}
                                            staffs={staffs}
                                        />
                                    </Can>

                                    {ticket.can.update && (
                                        <TicketFormModal
                                            mode="edit"
                                            ticket={ticket}
                                            ticketForms={ticketForms}
                                        />
                                    )}

                                    {ticket.can.delete && (
                                        <DeleteTicketDialog ticket={ticket} />
                                    )}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex items-end justify-end p-3">
                <div>
                    <AppPagination pagination={tickets} />
                </div>
            </div>
        </div>
    );
}
