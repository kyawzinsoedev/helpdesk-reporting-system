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
    TableCaption,
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
    DialogTrigger,
} from '@/components/ui/dialog';
import { ActivityLog } from '@/pages/dashboard';
import { Activity, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

interface props {
    recentActivities: ActivityLog[];
}
export default function RecentActivities({ recentActivities }: props) {
    const displayedActivities = recentActivities.slice(0, 5);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div>
                        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                            <Activity className="h-5 w-5 text-orange-500" />
                            Recent Activities
                        </CardTitle>
                        <CardDescription>
                            Audit logs of actions performed by administrators.
                        </CardDescription>
                    </div>
                    {recentActivities.length > 5 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs"
                            onClick={() => setIsDialogOpen(true)}
                        >
                            View All <ArrowUpRight className="ml-1 h-3 w-3" />
                        </Button>
                    )}
                </CardHeader>
                <CardContent className="px-5">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="pl-6">Actor</TableHead>
                                <TableHead>Activity Action</TableHead>
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
                                        <TableCell className="pl-6 text-sm font-medium">
                                            {log.causer_name}
                                        </TableCell>
                                        <TableCell className="text-sm text-gray-900 dark:text-gray-300">
                                            {log.description}
                                        </TableCell>
                                        <TableCell className="pr-6 text-right text-[12px] whitespace-nowrap text-muted-foreground">
                                            {log.date}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
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
                                        <TableCell className="pl-6 text-sm font-semibold text-gray-900 dark:text-gray-100">
                                            {log.causer_name}
                                        </TableCell>
                                        <TableCell className="text-md py-3 leading-relaxed text-gray-900 dark:text-gray-300">
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
