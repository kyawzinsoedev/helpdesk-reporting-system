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
}
export default function UserIndex({
    users,
    departments,
    roles,
}: UserIndexProps) {
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

                {/* Form Section  */}
                <UserFormModal
                    mode="create"
                    departments={departments}
                    roles={roles}
                />
            </div>

            {/* Filter Section */}
            <UserFilter />

            {/* Table Section */}
            <UserTable users={users} departments={departments} roles={roles} />
        </div>
    );
}
