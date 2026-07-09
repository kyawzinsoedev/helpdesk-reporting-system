import Can from '@/features/permissions/Can';
import RoleFormModal from '@/features/roles/components/RoleFormModal';
import RoleTable from '@/features/roles/components/RoleTable';

export interface Permission {
    id: number;
    name: string;
}
export interface Role {
    id: number;
    name: string;
    permissions: Permission[];
}
interface Props {
    roles: Role[];
    permissions: Permission[];
}
export default function RoleIndex({ roles, permissions }: Props) {
    return (
        <div className="space-y-6 p-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Role Management
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Manage your organization's roles and permissions.
                    </p>
                </div>

                <Can permission="roles.create">
                    <RoleFormModal permissions={permissions} />
                </Can>
            </div>

            <RoleTable permissions={permissions} roles={roles} />
        </div>
    );
}
