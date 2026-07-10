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
import type { Department } from '../types/departments';
import type { Role } from '../types/roles';
import DeleteUserDialog from './DeleteUserDialog';
import UserFormModal from './UserFormModal';
import ResetUserPassword from './ResetUserPassword';
import Can from '@/features/permissions/Can';

interface Props {
    users: {
        data: User[];
    };
    departments: Department[];
    roles: Role[];
}

export default function UserTable({ users, departments, roles }: Props) {
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
                                        user.status === 'active'
                                            ? 'default'
                                            : 'secondary'
                                    }
                                >
                                    {user.status}
                                </Badge>
                            </TableCell>

                            <TableCell>
                                <div className="flex items-center justify-center gap-2">
                                    <Can permission="users.reset-password">
                                        {' '}
                                        <ResetUserPassword user={user} />
                                    </Can>

                                    <Can permission="users.update">
                                        <UserFormModal
                                            mode="edit"
                                            user={user}
                                            departments={departments}
                                            roles={roles}
                                        />
                                    </Can>

                                    <Can permission="users.delete">
                                        {' '}
                                        <DeleteUserDialog user={user} />
                                    </Can>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
