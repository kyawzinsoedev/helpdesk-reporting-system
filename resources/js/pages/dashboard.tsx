import { Head, Link } from '@inertiajs/react';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';

import {
    AlertCircle,
    CheckCircle2,
    Clock,
    FileText,
    PlusCircle,
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

            <div className="mx-auto w-full max-w-7xl space-y-4 px-3 py-4 sm:space-y-6 sm:px-4 md:px-6 lg:px-8">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Dashboard
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Helpdesk overview, recent tickets, and critical
                        activities.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                    {stats.map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <Card key={stat.title}>
                                <CardContent className="flex items-center justify-between p-4 sm:p-5">
                                    <div className="min-w-0 space-y-1">
                                        <p className="truncate text-xs font-medium text-muted-foreground sm:text-sm">
                                            {stat.title}
                                        </p>

                                        <p className="text-2xl font-bold sm:text-3xl">
                                            {stat.value}
                                        </p>
                                    </div>

                                    <div
                                        className={`shrink-0 rounded-xl p-2.5 sm:p-3 ${stat.color}`}
                                    >
                                        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
                    {/* Main */}
                    <div className="space-y-4 sm:space-y-6 lg:col-span-2">
                        <RecentTickets recentTickets={recentTickets} />

                        <RecentActivities recentActivities={recentActivities} />
                    </div>

                    {/* Sidebar */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-1">
                        {/* Quick Actions */}
                        <Card>
                            <CardHeader className="pb-4">
                                <CardTitle className="text-base font-semibold sm:text-lg">
                                    Quick Actions
                                </CardTitle>

                                <CardDescription className="text-xs sm:text-sm">
                                    Frequent helpdesk tasks
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="grid gap-3">
                                <Button
                                    variant="outline"
                                    className="h-auto min-h-10 w-full justify-start px-3 py-2.5 text-left whitespace-normal"
                                    asChild
                                >
                                    <Link href="/tickets">
                                        <PlusCircle className="mr-2 h-4 w-4 shrink-0 text-blue-500" />

                                        <span>New Support Ticket</span>
                                    </Link>
                                </Button>

                                <Button
                                    variant="outline"
                                    className="h-auto min-h-10 w-full justify-start px-3 py-2.5 text-left whitespace-normal"
                                    asChild
                                >
                                    <Link href="/forms">
                                        <FileText className="mr-2 h-4 w-4 shrink-0 text-purple-500" />

                                        <span>Configure Form Fields</span>
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* System Status */}
                        <Card>
                            <CardHeader className="pb-4">
                                <CardTitle className="text-base font-semibold">
                                    System Status
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-4 text-sm">
                                <div className="flex items-center justify-between gap-4">
                                    <span className="min-w-0 text-muted-foreground">
                                        Form Builder Matrix
                                    </span>

                                    <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-green-600">
                                        <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-500" />
                                        Active
                                    </span>
                                </div>

                                <div className="flex items-center justify-between gap-4">
                                    <span className="min-w-0 text-muted-foreground">
                                        Database Sync
                                    </span>

                                    <span className="shrink-0 text-xs text-muted-foreground">
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
