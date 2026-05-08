import { Bell, LogOut, Mail, MessageSquare, CircleUser } from 'lucide-react';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function TopHeader() {
    return (
        <div className="border-b bg-card">
            <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-3 text-sm">
                {/* Left */}
                <div className="bg flex flex-wrap items-center gap-2 text-muted-foreground">
                    <Badge className="px-2 py-1 text-sm" variant={'outline'}>
                        05-May-2026{''}
                        <Separator orientation="vertical" className="h-4" />
                        {' | '}
                        <Separator orientation="vertical" className="h-4" />
                        {''}
                        14 : 53 (AM)
                    </Badge>

                    {/* <Separator orientation="vertical" className="h-4" /> */}
                </div>

                {/* <div>
                    <span className="ml-1 text-2xl font-semibold text-primary">
                        Help Desk Reporting System
                    </span>
                </div> */}

                {/* Right */}
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

                    <Button variant="outline" size="sm">
                        <CircleUser className="mr-2 h-7 w-7" />
                        UserName
                    </Button>
                </div>
            </div>
        </div>
    );
}
