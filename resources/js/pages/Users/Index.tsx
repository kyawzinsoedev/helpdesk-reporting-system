import Can from '@/features/permissions/Can';
import UserFilter from '@/features/users/components/UserFilter';
import UserFormModal from '@/features/users/components/UserFormModal';
import UserTable from '@/features/users/components/UserTable';
import type { Department } from '@/features/users/types/departments';
import type { Role } from '@/features/users/types/roles';
import type { User } from '@/features/users/types/user';

interface UserIndexProps {
    users: { data: User[] };
    departments: Department[];
    roles: Role[];
    filters: {
        search?: string;
    };
}
export default function UserIndex({
    users,
    departments,
    roles,
    filters,
}: UserIndexProps) {
    return (
        <div className="space-y-4 px-6 py-3">
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

                {/* Form Section  */}
                <Can permission="users.create">
                    <UserFormModal
                        mode="create"
                        departments={departments}
                        roles={roles}
                    />
                </Can>
            </div>

            {/* Filter Section */}
            <Can permission="users.view">
                <UserFilter filters={filters} />
            </Can>

            {/* Table Section */}
            <UserTable users={users} departments={departments} roles={roles} />
        </div>
    );
}
