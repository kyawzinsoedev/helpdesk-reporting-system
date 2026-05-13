import { Link, router } from '@inertiajs/react';
import {
    MoreHorizontal,
    Plus,
    Search,
    UserPlus,
    Mail,
    Phone,
    Building2,
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import CreateUser from '@/components/users/CreateUser';
import type { UserPagination } from '@/types';

export interface Role {
    id: number;
    name: string;
    guard_name: string;
}

export interface Department {
    id: number;
    name: string;
}

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    birthday: string;
    gender: 'male' | 'female';
    address: string;
    status: 'active' | 'draft' | string;
    department_id: number;

    department?: Department;
    roles?: Role[];

    // Timestamps
    created_at: string;
    updated_at: string;
}

export interface UserPagination {
    data: User[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

interface Props {
    users: UserPagination;
}

export default function UserIndex({ users }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this user?')) {
            router.delete(`/users/${id}`);
        }
    };

    return (
        <div className="space-y-6 p-6">
            {/* Header Section */}
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        User Management
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Manage your organization's user.
                    </p>
                </div>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button>Create User</Button>
                    </DialogTrigger>

                    <CreateUser setIsOpen={setIsOpen} users={users} />
                </Dialog>
            </div>

            {/* Filter Section */}
            <div className="flex items-center gap-2">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search users..."
                        className="bg-background pl-9"
                    />
                </div>
                {/* Optional: Add Department Filter Select here */}
            </div>

            {/* Table Section */}
            <div className="overflow-hidden rounded-md border bg-card shadow-sm">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead className="w-[250px]">User</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-center">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.data.length > 0 ? (
                            users.data.map((user: User) => (
                                <TableRow
                                    key={user.id}
                                    className="transition-colors hover:bg-muted/30"
                                >
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold">
                                                {user.name}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                @{user.username}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-1 text-xs">
                                            <div className="flex items-center gap-2">
                                                <Mail className="h-3 w-3 text-muted-foreground" />
                                                {user.email}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone className="h-3 w-3 text-muted-foreground" />
                                                {user.phone}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Building2 className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm">
                                                {user.department?.name || 'N/A'}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                user.status === 'active'
                                                    ? 'default'
                                                    : 'secondary'
                                            }
                                            className="font-medium capitalize"
                                        >
                                            {user.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>
                                                    Actions
                                                </DropdownMenuLabel>
                                                <DropdownMenuItem asChild>
                                                    <Link
                                                        href={`/users/${user.id}/edit`}
                                                    >
                                                        Edit User
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    className="text-destructive focus:text-destructive"
                                                    onClick={() =>
                                                        handleDelete(user.id)
                                                    }
                                                >
                                                    Delete User
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={5}
                                    className="h-24 text-center"
                                >
                                    No users found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination links များကို အောက်တွင် ထည့်ပေးရန် */}
        </div>
    );
}
