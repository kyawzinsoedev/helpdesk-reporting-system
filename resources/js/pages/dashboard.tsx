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
    User,
} from 'lucide-react';
import RecentTickets from '@/features/dashboard/components/RecentTickets';
import RecentActivities from '@/features/dashboard/components/RecentActivities';

export type TicketItem = {
    id: string | number;
    title: string;
    form: string;
    priority: string;
    status: string;
    date: string;
};

export type ActivityLog = {
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
            icon: User,
            color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40',
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

            <div className="mx-auto max-w-7xl space-y-6 px-6 py-3">
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
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={i}>
                                <CardContent className="flex items-center justify-between p-4">
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
                        <RecentTickets recentTickets={recentTickets} />

                        <RecentActivities recentActivities={recentActivities} />
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
                                    <Link href="/forms">
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
