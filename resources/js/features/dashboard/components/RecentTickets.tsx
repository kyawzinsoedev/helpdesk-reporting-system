import { Badge } from '@/components/ui/badge';
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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { TicketItem } from '@/pages/dashboard';

import { Link } from '@inertiajs/react';
import { ArrowUpRight } from 'lucide-react';

interface Props {
    recentTickets: TicketItem[];
}
export default function RecentTickets({ recentTickets }: Props) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                    <CardTitle className="text-lg font-semibold">
                        Recent Tickets
                    </CardTitle>
                    <CardDescription>
                        Latest support requests submitted by users.
                    </CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/tickets" className="text-xs">
                        View All <ArrowUpRight className="ml-1 h-3 w-3" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent className="px-5">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="pl-6">Ticket ID</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Form Type</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentTickets.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    className="py-6 text-center text-xs text-muted-foreground italic"
                                >
                                    No recent tickets found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            recentTickets?.map((ticket) => (
                                <TableRow key={ticket.id}>
                                    <TableCell className="pl-6 font-mono text-xs font-semibold">
                                        {ticket.id}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="line-clamp-1 text-sm font-medium">
                                                {ticket.title}
                                            </span>
                                            <span className="text-xs text-muted-foreground sm:hidden">
                                                {ticket.date}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="outline"
                                            className="text-[11px]"
                                        >
                                            {ticket.form}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                ticket.status === 'resolved'
                                                    ? 'secondary'
                                                    : ticket.status ===
                                                        'in_progress'
                                                      ? 'default'
                                                      : 'destructive'
                                            }
                                            className="text-[10px] tracking-wider uppercase"
                                        >
                                            {ticket.status.replace('_', ' ')}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
