import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Ticket,
    Clock,
    CheckCircle2,
    AlertCircle,
    PlusCircle,
    FileText,
    ArrowUpRight,
    Activity,
} from 'lucide-react';

type TicketItem = {
    id: string | number;
    title: string;
    form: string;
    priority: string;
    status: string;
    date: string;
};

type ActivityLog = {
    id: number;
    description: string;
    causer_name: string;
    date: string;
};

type Props = {
    statsData?: {
        total: number;
        open: number;
        assign: number;
        in_progress: number;
        resolved: number;
    };
    recentTickets: TicketItem[];
    recentActivities: ActivityLog[];
};

export default function Dashboard({
    statsData,
    recentTickets = [],
    recentActivities = [],
}: Props) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const displayedActivities = recentActivities.slice(0, 5);

    const stats = [
        {
            title: 'Open',
            value: statsData?.open ?? 0,
            icon: AlertCircle,
            color: 'text-destructive bg-destructive/10',
        },
        {
            title: 'Assign',
            value: statsData?.assign ?? 0,
            icon: AlertCircle,
            color: 'text-destructive bg-destructive/10',
        },
        {
            title: 'In Progress',
            value: statsData?.in_progress ?? 0,
            icon: Clock,
            color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40',
        },
        {
            title: 'Resolved',
            value: statsData?.resolved ?? 0,
            icon: CheckCircle2,
            color: 'text-green-600 bg-green-50 dark:bg-green-950/40',
        },
    ];

    return (
        <>
            <Head title="Dashboard" />

            <div className="mx-auto max-w-7xl space-y-8 p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Dashboard
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Helpdesk overview, recent tickets, and critical
                            activities.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button asChild>
                            <Link href="/tickets">
                                <PlusCircle className="mr-2 h-4 w-4" /> Create
                                Ticket
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={i}>
                                <CardContent className="flex items-center justify-between p-6">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-muted-foreground">
                                            {stat.title}
                                        </p>
                                        <p className="text-3xl font-bold">
                                            {stat.value}
                                        </p>
                                    </div>
                                    <div
                                        className={`rounded-xl p-3 ${stat.color}`}
                                    >
                                        <Icon className="h-5 w-5" />
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="space-y-6 lg:col-span-2">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                                <div>
                                    <CardTitle className="text-lg font-semibold">
                                        Recent Tickets
                                    </CardTitle>
                                    <CardDescription>
                                        Latest support requests submitted by
                                        users.
                                    </CardDescription>
                                </div>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href="/tickets" className="text-xs">
                                        View All{' '}
                                        <ArrowUpRight className="ml-1 h-3 w-3" />
                                    </Link>
                                </Button>
                            </CardHeader>
                            <CardContent className="px-5">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="pl-6">
                                                Ticket ID
                                            </TableHead>
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
                                                                ticket.status ===
                                                                'resolved'
                                                                    ? 'secondary'
                                                                    : ticket.status ===
                                                                        'in_progress'
                                                                      ? 'default'
                                                                      : 'destructive'
                                                            }
                                                            className="text-[10px] tracking-wider uppercase"
                                                        >
                                                            {ticket.status.replace(
                                                                '_',
                                                                ' ',
                                                            )}
                                                        </Badge>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                                <div>
                                    <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                                        <Activity className="h-5 w-5 text-orange-500" />
                                        Recent Activities
                                    </CardTitle>
                                    <CardDescription>
                                        Audit logs of actions performed by
                                        administrators.
                                    </CardDescription>
                                </div>
                                {recentActivities.length > 5 && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-xs"
                                        onClick={() => setIsDialogOpen(true)}
                                    >
                                        View All{' '}
                                        <ArrowUpRight className="ml-1 h-3 w-3" />
                                    </Button>
                                )}
                            </CardHeader>
                            <CardContent className="px-5">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="pl-6">
                                                Actor
                                            </TableHead>
                                            <TableHead>
                                                Activity Action
                                            </TableHead>
                                            <TableHead className="pr-6 text-right">
                                                Time
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {displayedActivities.length === 0 ? (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={3}
                                                    className="py-6 text-center text-xs text-muted-foreground italic"
                                                >
                                                    No recent activities found.
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            displayedActivities.map((log) => (
                                                <TableRow key={log.id}>
                                                    <TableCell className="pl-6 text-xs font-medium">
                                                        {log.causer_name}
                                                    </TableCell>
                                                    <TableCell className="text-xs text-gray-700 dark:text-gray-300">
                                                        {log.description}
                                                    </TableCell>
                                                    <TableCell className="pr-6 text-right text-[11px] whitespace-nowrap text-muted-foreground">
                                                        {log.date}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">
                                    Quick Actions
                                </CardTitle>
                                <CardDescription>
                                    Frequent helpdesk tasks
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-3">
                                <Button
                                    variant="outline"
                                    className="w-full justify-start"
                                    asChild
                                >
                                    <Link href="/tickets">
                                        <PlusCircle className="mr-2 h-4 w-4 text-blue-500" />{' '}
                                        New Support Ticket
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start"
                                    asChild
                                >
                                    <Link href="/settings">
                                        <FileText className="mr-2 h-4 w-4 text-purple-500" />{' '}
                                        Configure Form Fields
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base font-semibold">
                                    System Status
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">
                                        Form Builder Matrix
                                    </span>
                                    <span className="flex items-center gap-1 text-xs font-medium text-green-600">
                                        <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
                                        Active
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">
                                        Database Sync
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        Healthy
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="flex max-h-[85vh] max-w-3xl min-w-2xl flex-col overflow-hidden p-5">
                    <DialogHeader className="border-b p-6 pb-4">
                        <DialogTitle className="flex items-center gap-2 text-xl font-bold">
                            <Activity className="h-5 w-5 text-orange-500" />
                            System Audit Logs History
                        </DialogTitle>
                        <DialogDescription>
                            A comprehensive overview of all operational actions
                            executed by system actors.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto p-0">
                        <Table>
                            <TableHeader className="sticky top-0 z-10 bg-muted/50">
                                <TableRow>
                                    <TableHead className="w-[150px] pl-6">
                                        Actor
                                    </TableHead>
                                    <TableHead>
                                        Activity Action Description
                                    </TableHead>
                                    <TableHead className="w-[140px] pr-6 text-right">
                                        Timestamp
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentActivities.map((log) => (
                                    <TableRow
                                        key={log.id}
                                        className="transition-colors hover:bg-muted/40"
                                    >
                                        <TableCell className="pl-6 text-xs font-semibold text-gray-900 dark:text-gray-100">
                                            {log.causer_name}
                                        </TableCell>
                                        <TableCell className="py-3 text-xs leading-relaxed text-gray-700 dark:text-gray-300">
                                            {log.description}
                                        </TableCell>
                                        <TableCell className="pr-6 text-right font-mono text-[11px] text-muted-foreground">
                                            {log.date}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="flex justify-end border-t bg-muted/20 p-4">
                        <Button
                            variant="secondary"
                            onClick={() => setIsDialogOpen(false)}
                        >
                            Close
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
