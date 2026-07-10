import { Link } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import Can from '@/features/permissions/Can';

export default function DropDownUserAdmin() {
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-1">
                        User Admin <ChevronDown className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                    <DropdownMenuGroup>
                        <Can permission="users.view">
                            <DropdownMenuItem
                                asChild
                                className="cursor-pointer"
                            >
                                <Link href="/users" className="w-full">
                                    User Management
                                </Link>
                            </DropdownMenuItem>
                        </Can>
                        <Can permission="roles.view">
                            <DropdownMenuItem
                                asChild
                                className="cursor-pointer"
                            >
                                <Link href="/roles" className="w-full">
                                    Role Management
                                </Link>
                            </DropdownMenuItem>
                        </Can>
                        <Can permission="departments.view">
                            <DropdownMenuItem
                                asChild
                                className="cursor-pointer"
                            >
                                <Link href="/departments" className="w-full">
                                    Departments
                                </Link>
                            </DropdownMenuItem>
                        </Can>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <Can permission="ticket_forms.view">
                            <DropdownMenuItem
                                asChild
                                className="cursor-pointer"
                            >
                                <Link href="/forms" className="w-full">
                                    Ticket Form Management
                                </Link>
                            </DropdownMenuItem>
                        </Can>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
