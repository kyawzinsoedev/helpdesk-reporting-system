import RoleFilter from '@/features/roles/components/RoleFilter';
import RoleFormModal from '@/features/roles/components/RoleFormModal';
import RoleTable from '@/features/roles/components/RoleTable';
import type { Role } from '@/features/roles/types/role';

const roles = {
    data: [
        {
            id: 1,
            name: 'Admin',
            guard_name: 'web',
            created_at: '2026-05-14',
            updated_at: '2026-05-14',
        },
        {
            id: 2,
            name: 'User',
            guard_name: 'web',
            created_at: '2026-05-14',
            updated_at: '2026-05-14',
        },
    ],
} as { data: Role[] };

export default function RoleIndex() {
    return (
        <div className="space-y-6 p-6">
            {/* Header Section */}
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Role Management
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Manage your organization's roles and permissions.
                    </p>
                </div>

                {/* Role Form Modal (Create Mode) */}
                <RoleFormModal mode="create" />
            </div>

            {/* Filter Section */}
            <RoleFilter />

            {/* Table Section */}
            <RoleTable roles={roles} />
        </div>
    );
}
