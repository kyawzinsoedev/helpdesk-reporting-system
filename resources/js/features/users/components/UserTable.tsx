import { Badge } from '@/components/ui/badge';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import type { User } from '@/features/users/types/user';
import DeleteUserDialog from './DeleteUserDialog';
import UserFormModal from './UserFormModal';

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
                                    <UserFormModal mode="edit" />

                                    <DeleteUserDialog user={user} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
