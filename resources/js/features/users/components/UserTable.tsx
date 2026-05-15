import { Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import type { User } from '@/features/users/types/user';

interface Props {
    users: {
        data: User[];
    };
}

export default function UserTable({ users }: Props) {
    return (
        <div className="overflow-hidden rounded-md border bg-card shadow-sm">
            <Table>
                <TableHeader className="bg-muted/50">
                    <TableRow>
                        <TableHead className="w-[250px]">User</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {users.data?.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>
                                <div className="flex flex-col">
                                    <span className="font-medium">
                                        {user.name}
                                    </span>

                                    <span className="text-sm text-muted-foreground">
                                        {user.email}
                                    </span>
                                </div>
                            </TableCell>

                            <TableCell>{user.phone}</TableCell>

                            <TableCell>{user.department?.name}</TableCell>

                            <TableCell>
                                <Badge
                                    variant={
                                        user.status === 'Active'
                                            ? 'default'
                                            : 'secondary'
                                    }
                                >
                                    {user.status}
                                </Badge>
                            </TableCell>

                            <TableCell>
                                <div className="flex items-center justify-center gap-2">
                                    <Button variant="outline" size="icon">
                                        <Pencil className="h-4 w-4" />
                                    </Button>

                                    <Button variant="destructive" size="icon">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
