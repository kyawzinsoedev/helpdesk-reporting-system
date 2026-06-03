import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import type { Ticket } from '../types/tickets';
import DeleteTicketDialog from './DeleteTicketDialog';
import TicketFormModal from './TicketFormModal';

interface Props {
    tickets: Ticket[];
}

export default function TicketTable({ tickets }: Props) {
    return (
        <div className="overflow-hidden rounded-md border bg-card shadow-sm">
            <Table>
                <TableHeader className="bg-muted/50">
                    <TableRow>
                        <TableHead>Id</TableHead>

                        <TableHead className="w-[300px]">Title</TableHead>

                        <TableHead>Ticket's Form</TableHead>

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

                            <TableCell>{ticket.priority ?? '-'}</TableCell>

                            <TableCell>{ticket.status ?? '-'}</TableCell>

                            <TableCell>
                                <div className="flex items-center justify-center gap-2">
                                    <TicketFormModal
                                        mode="edit"
                                        ticket={ticket}
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
