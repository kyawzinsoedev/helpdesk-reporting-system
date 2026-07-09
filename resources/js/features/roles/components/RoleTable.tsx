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
import { Permission, Role } from '@/pages/Admin/Roles/Index';
import RoleFormModal from './RoleFormModal';
import DeleteRoleDialog from './DeleteRoleDialog';
import Can from '@/features/permissions/Can';

interface Props {
    roles: Role[];
    permissions: Permission[];
}

export default function RoleTable({ roles, permissions }: Props) {
    return (
        <div className="overflow-hidden rounded-md border bg-card shadow-sm">
            <Table>
                <TableHeader className="bg-muted/50">
                    <TableRow>
                        <TableHead className="w-20">ID</TableHead>
                        <TableHead className="w-48">Role Name</TableHead>
                        <TableHead>Permissions</TableHead>
                        <TableHead className="w-40 text-center">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {roles.map((role) => {
                        const groupedPermissions = role.permissions.reduce(
                            (groups, permission) => {
                                const [module, action] =
                                    permission.name.split('.');

                                if (!groups[module]) {
                                    groups[module] = [];
                                }

                                groups[module].push(action);

                                return groups;
                            },
                            {} as Record<string, string[]>,
                        );

                        return (
                            <TableRow key={role.id}>
                                <TableCell className="font-medium">
                                    {role.id}
                                </TableCell>

                                <TableCell className="font-medium">
                                    {role.name}
                                </TableCell>

                                <TableCell>
                                    <div className="space-y-3">
                                        {Object.entries(groupedPermissions).map(
                                            ([module, actions]) => (
                                                <div
                                                    key={module}
                                                    className="flex flex-wrap items-start gap-2"
                                                >
                                                    <Badge
                                                        variant="outline"
                                                        className="min-w-20 justify-center bg-indigo-300 capitalize"
                                                    >
                                                        {module}
                                                    </Badge>

                                                    <div className="flex flex-wrap gap-1">
                                                        {actions.map(
                                                            (action) => (
                                                                <Badge
                                                                    key={action}
                                                                    variant="secondary"
                                                                    className="capitalize"
                                                                >
                                                                    {action}
                                                                </Badge>
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <div className="flex justify-center gap-2">
                                        <RoleFormModal
                                            mode="edit"
                                            permissions={permissions}
                                            role={role}
                                        />

                                        <Can permission="roles.delete">
                                            <DeleteRoleDialog role={role} />
                                        </Can>
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}

                    {roles.length === 0 && (
                        <TableRow>
                            <TableCell
                                colSpan={4}
                                className="py-8 text-center text-muted-foreground"
                            >
                                No roles found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
