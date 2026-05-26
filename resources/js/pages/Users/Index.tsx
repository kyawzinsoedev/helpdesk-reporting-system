import UserFilter from '@/features/users/components/UserFilter';
import UserFormModal from '@/features/users/components/UserFormModal';
import UserTable from '@/features/users/components/UserTable';
import type { User } from '@/features/users/types/user';

const users = {
    data: [
        {
            id: 1,
            name: 'John Doe',
            username: 'johndoe',
            email: 'john@example.com',
            phone: '+95 912345678',
            birthday: '1995-05-20',
            gender: 'male',
            address: 'Yangon',
            status: 'active',
            department_id: 1,
            department: { id: 1, name: 'IT Department' },
            roles: [{ id: 1, name: 'Admin', guard_name: 'web' }],
            created_at: '2026-05-14',
            updated_at: '2026-05-14',
        },
    ],
} as { data: User[] };

export default function UserIndex() {
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
                <UserFormModal mode="create" />
            </div>

            {/* Filter Section */}
            <UserFilter />

            {/* Table Section */}
            <UserTable users={users} />
        </div>
    );
}
