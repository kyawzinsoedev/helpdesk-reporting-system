import { Badge } from '@/components/ui/badge';
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
            <div className="w-full overflow-x-auto">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            {/* ID - Tablet and Desktop */}
                            <TableHead className="hidden w-20 md:table-cell">
                                ID
                            </TableHead>

                            {/* Role Name */}
                            <TableHead className="min-w-30">
                                Role Name
                            </TableHead>

                            {/* Permissions */}
                            <TableHead>Permissions</TableHead>

                            {/* Actions */}
                            <TableHead className="w-24 text-right sm:w-32 md:text-center">
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
                                    {/* ID */}
                                    <TableCell className="hidden font-medium md:table-cell">
                                        {role.id}
                                    </TableCell>

                                    {/* Role Name */}
                                    <TableCell className="font-medium">
                                        <span className="capitalize">
                                            {role.name}
                                        </span>
                                    </TableCell>

                                    {/* Permissions */}
                                    <TableCell>
                                        {/* Mobile & Tablet */}
                                        <div className="lg:hidden">
                                            <Badge
                                                variant="secondary"
                                                className="whitespace-nowrap"
                                            >
                                                {role.permissions.length}{' '}
                                                permissions
                                            </Badge>
                                        </div>

                                        {/* Desktop */}
                                        <div className="hidden space-y-3 lg:block">
                                            {Object.entries(
                                                groupedPermissions,
                                            ).map(([module, actions]) => (
                                                <div
                                                    key={module}
                                                    className="flex flex-wrap items-start gap-2"
                                                >
                                                    <Badge
                                                        variant="outline"
                                                        className="min-w-25 justify-center capitalize"
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
                                            ))}
                                        </div>
                                    </TableCell>

                                    {/* Actions */}
                                    <TableCell>
                                        <div className="flex justify-end gap-1 sm:justify-center sm:gap-2">
                                            <Can permission="roles.update">
                                                <RoleFormModal
                                                    mode="edit"
                                                    permissions={permissions}
                                                    role={role}
                                                />
                                            </Can>

                                            <Can permission="roles.delete">
                                                <DeleteRoleDialog role={role} />
                                            </Can>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}

                        {/* Empty State */}
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
        </div>
    );
}
