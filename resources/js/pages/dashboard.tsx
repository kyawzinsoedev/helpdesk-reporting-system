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
    Ticket,
    Clock,
    CheckCircle2,
    AlertCircle,
    PlusCircle,
    FileText,
    ArrowUpRight,
} from 'lucide-react';

export default function Dashboard() {
    // သာဓကအနေနဲ့ ကိန်းဂဏန်းများနှင့် Ticket ဒေတာများ ထည့်သွင်းထားခြင်း (Backend မှလာမည့် ဒေတာများနှင့် ချိတ်ဆက်နိုင်သည်)
    const stats = [
        {
            title: 'Total Tickets',
            value: '148',
            icon: Ticket,
            color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40',
        },
        {
            title: 'Open',
            value: '12',
            icon: AlertCircle,
            color: 'text-destructive bg-destructive/10',
        },
        {
            title: 'In Progress',
            value: '24',
            icon: Clock,
            color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40',
        },
        {
            title: 'Resolved',
            value: '112',
            icon: CheckCircle2,
            color: 'text-green-600 bg-green-50 dark:bg-green-950/40',
        },
    ];

    const recentTickets = [
        {
            id: 'TK-1024',
            subject: 'Cannot access internal database',
            form: 'IT Support',
            priority: 'high',
            status: 'open',
            date: '10 mins ago',
        },
        {
            id: 'TK-1023',
            subject: 'Requesting medical leave clearance',
            form: 'Leave Request',
            priority: 'medium',
            status: 'in_progress',
            date: '1 hour ago',
        },
        {
            id: 'TK-1022',
            subject: 'MacBook Pro monitor flickering issue',
            form: 'IT Support',
            priority: 'high',
            status: 'resolved',
            date: '2 hours ago',
        },
        {
            id: 'TK-1021',
            subject: 'Need replacement for office desk chair',
            form: 'Purchase Request',
            priority: 'low',
            status: 'open',
            date: '1 day ago',
        },
    ];

    return (
        <>
            <Head title="Dashboard" />

            <div className="mx-auto max-w-7xl space-y-8 p-6">
                {/* PAGE HEADER */}
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

                {/* STATS GRID */}
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

                {/* MAIN CONTENT AREA */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* RECENT TICKETS TABLE (Left & Middle Column) */}
                    <Card className="lg:col-span-2">
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
                                    View All{' '}
                                    <ArrowUpRight className="ml-1 h-3 w-3" />
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent className="p-0">
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
                                    {recentTickets.map((ticket) => (
                                        <TableRow key={ticket.id}>
                                            <TableCell className="pl-6 font-mono text-xs font-semibold">
                                                {ticket.id}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="line-clamp-1 text-sm font-medium">
                                                        {ticket.subject}
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
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    {/* QUICK ACTIONS & SYSTEM LINKS (Right Column) */}
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
        </>
    );
}
