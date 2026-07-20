import TicketFormModal from '@/features/tickets/componets/TicketFormModal';
import TicketTable from '@/features/tickets/componets/TicketTable';
import type { TicketFormStructure } from '@/features/tickets/schemas/ticketSchema';
import type {
    PaginatedData,
    Ticket,
} from '../../../../js/features/tickets/types/tickets';
import Can from '@/features/permissions/Can';

import TicketFilter from '@/features/tickets/componets/TicketFilter';

export interface Staff {
    id: number;
    name: string;
    department_id: string | number;
    department_name: string;
    status: string;
}
interface Props {
    tickets: PaginatedData<Ticket>;
    ticketForms: TicketFormStructure[];
    staffs: Staff[];
    filters: {
        search?: string;
        ticket_form_id?: string;
        priority?: string;
        status?: string;
        from?: string;
        to?: string;
    };
}
export default function Index({
    tickets,
    ticketForms,
    staffs,
    filters,
}: Props) {
    // console.log('Ticket form index ', tickets);

    return (
        <div className="space-y-4 px-6 py-3">
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
                <Can permission="tickets.create">
                    {' '}
                    <TicketFormModal mode="create" ticketForms={ticketForms} />
                </Can>
            </div>

            {/* Filter  */}
            <TicketFilter ticketForms={ticketForms} filters={filters} />

            {/* Table */}
            <TicketTable
                tickets={tickets}
                ticketForms={ticketForms}
                staffs={staffs}
            />
        </div>
    );
}
