import { useState } from 'react';
import { router } from '@inertiajs/react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TicketFormStructure } from '../schemas/ticketSchema';

interface props {
    ticketForms: TicketFormStructure[];
    filters: {
        search?: string;
        ticket_form_id?: string;
        priority?: string;
        status?: string;
        from?: string;
        to?: string;
    };
}
export default function TicketFilter({ filters, ticketForms }: props) {
    const [filter, setFilter] = useState({
        search: filters.search ?? '',
        ticket_form_id: filters.ticket_form_id ?? '',
        priority: filters.priority ?? '',
        status: filters.status ?? '',
        from: filters.from ?? '',
        to: filters.to ?? '',
    });

    const search = () => {
        router.get('/tickets', filter, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <div>
            <div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <Input
                            placeholder="Search title..."
                            value={filter.search}
                            onChange={(e) =>
                                setFilter({
                                    ...filter,
                                    search: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Ticket Form
                        </label>
                        <Select
                            value={filter.ticket_form_id || 'all'}
                            onValueChange={(value) =>
                                setFilter({
                                    ...filter,
                                    ticket_form_id:
                                        value === 'all' ? '' : value,
                                })
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Ticket Form" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>

                                {ticketForms.map((form) => (
                                    <SelectItem
                                        key={form.id}
                                        value={String(form.id)}
                                    >
                                        {form.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Priority</label>
                        <Select
                            value={filter.priority || 'all'}
                            onValueChange={(value) =>
                                setFilter({
                                    ...filter,
                                    priority: value === 'all' ? '' : value,
                                })
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Priority" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="urgent">Urgent</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Status</label>
                        <Select
                            value={filter.status || 'all'}
                            onValueChange={(value) =>
                                setFilter({
                                    ...filter,
                                    status: value === 'all' ? '' : value,
                                })
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="open">Open</SelectItem>
                                <SelectItem value="processing">
                                    Processing
                                </SelectItem>
                                <SelectItem value="resolved">
                                    Resolved
                                </SelectItem>
                                <SelectItem value="closed">Closed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">From Date</label>
                        <Input
                            type="date"
                            value={filter.from}
                            onChange={(e) =>
                                setFilter({
                                    ...filter,
                                    from: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">To Date</label>
                        <Input
                            type="date"
                            value={filter.to}
                            onChange={(e) =>
                                setFilter({
                                    ...filter,
                                    to: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <Button
                        variant="outline"
                        onClick={() => router.get('/tickets')}
                    >
                        Reset
                    </Button>

                    <Button onClick={search}>Search</Button>
                </div>
            </div>
        </div>
    );
}
