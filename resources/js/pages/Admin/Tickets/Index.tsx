import TicketFormModal from '@/features/tickets/componets/TicketFormModal';
import TicketTable from '@/features/tickets/componets/TicketTable';
import type { TicketFormStructure } from '@/features/tickets/schemas/ticketSchema';
import type { Ticket } from '../../../../js/features/tickets/types/tickets';

export interface Staff {
    id: number;
    name: string;
    department_id: string | number;
    department_name: string;
    status: string;
}
interface Props {
    tickets: Ticket[];
    ticketForms: TicketFormStructure[];
    staffs: Staff[];
}
export default function Index({ tickets, ticketForms, staffs }: Props) {
    // console.log('Ticket form index ', tickets);
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
            <TicketTable
                tickets={tickets}
                ticketForms={ticketForms}
                staffs={staffs}
            />
        </div>
    );
}
