import { router } from '@inertiajs/react';
import { Bell, Mail, MessageSquare } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">Profile</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                                <DropdownMenuLabel>
                                    My Account
                                </DropdownMenuLabel>
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>
                                    <button
                                        onClick={() => router.post('/logout')}
                                    >
                                        Logout
                                    </button>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>Team</DropdownMenuItem>
                                <DropdownMenuItem>
                                    Subscription
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
}
