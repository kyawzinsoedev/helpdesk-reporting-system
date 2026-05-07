import { Bell, LogOut, Mail, MessageSquare } from 'lucide-react';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function TopHeader() {
    return (
        <div className="border-b bg-card">
            <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-3 text-sm">
                {/* Left */}
                <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
                    <Badge variant="destructive">05-May-2026 14:53</Badge>

                    <Separator orientation="vertical" className="h-4" />

                    <span>
                        Hello :
                        <span className="ml-1 font-semibold text-primary">
                            kzs2002
                        </span>
                    </span>

                    <Separator orientation="vertical" className="h-4" />

                    <span>
                        User Type :
                        <span className="ml-1 font-semibold text-primary">
                            Administrator
                        </span>
                    </span>

                    <Separator orientation="vertical" className="h-4" />

                    <span>
                        Bank :
                        <span className="ml-1 font-semibold text-primary">
                            AYA Bank
                        </span>
                    </span>

                    <Separator orientation="vertical" className="h-4" />

                    <span>
                        Branch :
                        <span className="ml-1 font-semibold text-primary">
                            Head Office
                        </span>
                    </span>
                </div>

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
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
}
