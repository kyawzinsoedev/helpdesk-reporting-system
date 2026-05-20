import { Link, router } from '@inertiajs/react';
import { Calendar, Ticket, User, ArrowRight, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

import tickets from '@/routes/tickets';

type Props = {
    tickets: {
        data: any[];
    };
};

export default function Index({ tickets: ticketData }: Props) {
    const handleDelete = (id: number) => {
        if (!confirm('Are you sure you want to delete this ticket?')) return;

        router.delete(`/tickets/${id}`, {
            preserveScroll: true,
        });
    };

    const getPriorityColor = (priority: string) => {
        switch (priority?.toLowerCase()) {
            case 'high':
                return 'bg-red-50 text-red-700 ring-red-600/10 dark:bg-red-500/10 dark:text-red-400';
            case 'medium':
                return 'bg-amber-50 text-amber-700 ring-amber-600/10 dark:bg-amber-500/10 dark:text-amber-400';
            default:
                return 'bg-green-50 text-green-700 ring-green-600/10 dark:bg-green-500/10 dark:text-green-400';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'closed':
                return 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300';
            case 'in_progress':
                return 'bg-blue-50 text-blue-700 ring-blue-700/10 dark:bg-blue-500/10 dark:text-blue-400';
            default:
                return 'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400';
        }
    };

    return (
        <div className="mx-auto max-w-7xl space-y-6 p-6">
            {/* HEADER */}
            <div className="flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Tickets
                    </h1>
                    <p className="mt-1 text-muted-foreground">
                        Manage and track all submitted customer support tickets
                    </p>
                </div>
                <Button asChild className="self-start shadow-sm sm:self-center">
                    <Link href={tickets.create().url} className="gap-2">
                        <Ticket className="h-4 w-4" /> Create Ticket
                    </Link>
                </Button>
            </div>

            {ticketData.data.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-card/50 p-16 text-center">
                    <div className="mb-4 rounded-full bg-muted p-4">
                        <Ticket className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-semibold">No Tickets Found</h2>
                    <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                        There are no active tickets at the moment. Submitted
                        tickets from users will appear here.
                    </p>
                    <Button asChild variant="outline" className="mt-5">
                        <Link href={tickets.create().url}>
                            Create Your First Ticket
                        </Link>
                    </Button>
                </div>
            )}

            {/* TICKET GRID LIST */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {ticketData.data.map((ticket: any) => (
                    <div
                        key={ticket.id}
                        className="group flex flex-col justify-between rounded-xl border bg-card p-5 shadow-sm transition-all hover:border-border/80 hover:shadow-md"
                    >
                        <div className="space-y-4">
                            {/* TOP TITLE & STATUS BADGES */}
                            <div className="flex items-start justify-between gap-4">
                                <div className="space-y-1">
                                    <h2 className="line-clamp-1 text-lg leading-snug font-semibold transition-colors group-hover:text-primary">
                                        {ticket.title || 'Untitled Ticket'}
                                    </h2>
                                    <p className="text-xs font-medium text-muted-foreground">
                                        Form:{' '}
                                        <span className="text-foreground/80">
                                            {ticket.form?.name || 'N/A'}
                                        </span>
                                    </p>
                                </div>
                                <div className="flex flex-col items-end gap-1.5 sm:flex-row sm:items-center">
                                    <span
                                        className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${getPriorityColor(ticket.priority)}`}
                                    >
                                        {ticket.priority}
                                    </span>
                                    <span
                                        className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${getStatusColor(ticket.status)}`}
                                    >
                                        {ticket.status?.replace('_', ' ')}
                                    </span>
                                </div>
                            </div>

                            {/* DESCRIPTION */}
                            {ticket.description && (
                                <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                                    {ticket.description}
                                </p>
                            )}
                        </div>

                        {/* BOTTOM META & ACTION BUTTONS */}
                        <div className="mt-6 flex flex-col justify-between gap-3 border-t pt-4 sm:flex-row sm:items-center">
                            {/* META INFO */}
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <User className="h-3.5 w-3.5" />
                                    <span className="max-w-[120px] truncate">
                                        {ticket.user?.name || 'Unknown'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-3.5 w-3.5" />
                                    <span>
                                        {new Date(
                                            ticket.created_at,
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            {/* ACTIONS */}
                            <div className="flex items-center gap-2 self-end sm:self-center">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    asChild
                                    className="h-8 gap-1.5"
                                >
                                    <Link href={`/tickets/${ticket.id}`}>
                                        <Eye className="h-3.5 w-3.5" /> View
                                    </Link>
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 gap-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                                    onClick={() => handleDelete(ticket.id)}
                                >
                                    <Trash2 className="h-3.5 w-3.5" /> Delete
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
