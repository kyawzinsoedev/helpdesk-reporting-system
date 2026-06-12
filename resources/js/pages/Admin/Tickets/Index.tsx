import TicketFormModal from '@/features/tickets/componets/TicketFormModal';
import TicketTable from '@/features/tickets/componets/TicketTable';
import type { TicketFormStructure } from '@/features/tickets/schemas/ticketSchema';
import type { Ticket } from '../../../../js/features/tickets/types/tickets';

interface Props {
    tickets: Ticket[];
    ticketForms: TicketFormStructure[];
}
export default function Index({ tickets, ticketForms }: Props) {
    return (
        <div className="space-y-4 p-6">
            {/* Header */}
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Tickets Management
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Manage your organization's tickets.
                    </p>
                </div>

                {/* Create From  */}
                <TicketFormModal mode="create" ticketForms={ticketForms} />
            </div>

            {/* Table */}
            <TicketTable tickets={tickets} />
        </div>
    );
}
