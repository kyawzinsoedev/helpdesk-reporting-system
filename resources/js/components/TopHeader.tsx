import { router, usePage } from '@inertiajs/react';
import { Bell, LogOut, Mail, MessageSquare } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

interface Notification {
    id: string;
    data: {
        title: string;
        message: string;
        ticket_id: number;
    };
    read_at: string | null;
}

interface HeaderPageProps {
    notifications: Notification[];
}

export default function TopHeader() {
    const [currentTime, setCurrentTime] = useState<Date | null>(null);

    useEffect(() => {
        // setCurrentTime(new Date());

        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const date = currentTime
        ? currentTime.toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
          })
        : '';

    const time = currentTime
        ? currentTime.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: true,
          })
        : '';

    const { notifications } = usePage<HeaderPageProps>().props;

    const [hasUnread, setHasUnread] = useState(notifications.length > 0);

    return (
        <div className="border-b bg-card">
            <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-3 text-sm">
                {/* Left */}
                <div className="bg flex flex-wrap items-center gap-2 text-muted-foreground">
                    {currentTime ? (
                        <Badge
                            className="px-2 py-1 text-sm"
                            variant={'outline'}
                        >
                            {date}
                            <Separator
                                orientation="vertical"
                                className="mx-2 inline-block h-4"
                            />
                            {time}
                        </Badge>
                    ) : (
                        <div className="h-7 w-40 animate-pulse rounded-md bg-muted" />
                    )}
                </div>

                <div className="flex items-center gap-2">
                    {/* <Button variant="ghost" size="icon">
                        <Bell className="h-4 w-4" />
                    </Button> */}

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="relative"
                                onClick={() => setHasUnread(false)}
                            >
                                <Bell className="h-4 w-4" />

                                {hasUnread && (
                                    <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
                                        <Badge className="relative inline-flex h-2.5 w-2.5 rounded-full border-2 border-background bg-indigo-600 p-0" />
                                    </span>
                                )}
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-80">
                            <div className="space-y-3">
                                <h4 className="font-semibold">Notifications</h4>

                                {notifications.length === 0 ? (
                                    <p className="text-sm text-muted-foreground">
                                        No notifications
                                    </p>
                                ) : (
                                    notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className="rounded-md border p-3"
                                        >
                                            <p className="text-sm font-medium">
                                                {notification.data.title}
                                            </p>

                                            <p className="text-xs text-muted-foreground">
                                                {notification.data.message}
                                            </p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </PopoverContent>
                    </Popover>

                    <Button variant="ghost" size="icon">
                        <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <MessageSquare className="h-4 w-4" />
                    </Button>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <LogOut className="h-4 w-4" />
                            </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Are you sure you want to logout?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    You will need to login again to access your
                                    account.
                                </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>

                                <AlertDialogAction
                                    onClick={() => router.post('/logout')}
                                >
                                    Logout
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </div>
    );
}
