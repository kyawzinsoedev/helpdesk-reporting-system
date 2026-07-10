import { router } from '@inertiajs/react';
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
import { Separator } from '@/components/ui/separator';

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
                    <Button variant="ghost" size="icon">
                        <Bell className="h-4 w-4" />
                    </Button>
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
