import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { UserFormData } from '../schemas/userSchema';
import type { Department } from '../types/departments';
import type { Role } from '../types/roles';
import type { User } from '../types/user';
interface UserFormProps {
    mode?: 'create' | 'edit';
    user?: User;
    departments?: Department[];
    roles?: Role[];

    setOpen?: (open: boolean) => void;
}
export default function UserForm({
    mode = 'create',
    user,
    departments,
    roles,
    setOpen,
}: UserFormProps) {
    const { data, setData, post, put, processing, errors } =
        useForm<UserFormData>({
            name: user?.name || '',
            username: user?.username || '',
            email: user?.email || '',
            phone: user?.phone || '',
            birthday: user?.birthday || '',
            gender: user?.gender || 'male',
            address: user?.address || '',
            status: user?.status || 'active',
            department_id: user?.department_id || 0,
            role: user?.roles?.[0]?.name || '',
        });

    useEffect(() => {
        if (user && mode === 'edit') {
            setData({
                name: user?.name || '',
                username: user?.username || '',
                email: user?.email || '',
                phone: user?.phone || '',
                birthday: user?.birthday || '',
                gender: user?.gender || 'male',
                address: user?.address || '',
                status: user?.status || 'active',
                department_id: user?.department_id || 0,
                role: user?.roles?.[0]?.name || '',
            });
        }
    }, [user, mode, setData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (mode === 'create') {
            post('/users', {
                onSuccess: () => {
                    // setData('');
                    setOpen?.(false);
                },
            });
        } else {
            put(`/users/${user?.id}`, {
                onSuccess: () => {
                    setOpen?.(false);
                },
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Name */}
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Enter full name"
                    />
                    {errors.name && (
                        <p className="text-sm text-red-500">{errors.name}</p>
                    )}
                </div>

                {/* Username */}
                <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                        id="username"
                        value={data.username}
                        onChange={(e) => setData('username', e.target.value)}
                        placeholder="Enter username"
                    />
                    {errors.username && (
                        <p className="text-sm text-red-500">
                            {errors.username}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="Enter email"
                    />
                    {errors.email && (
                        <p className="text-sm text-red-500">{errors.email}</p>
                    )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                        id="phone"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        placeholder="Enter phone"
                    />
                    {errors.phone && (
                        <p className="text-sm text-red-500">{errors.phone}</p>
                    )}
                </div>

                {/* Birthday */}
                <div className="space-y-2">
                    <Label htmlFor="birthday">Birthday</Label>
                    <Input
                        id="birthday"
                        type="date"
                        value={data.birthday}
                        onChange={(e) => setData('birthday', e.target.value)}
                    />
                    {errors.birthday && (
                        <p className="text-sm text-red-500">
                            {errors.birthday}
                        </p>
                    )}
                </div>

                {/* Gender */}
                <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>

                    <select
                        id="gender"
                        value={data.gender}
                        onChange={(e) =>
                            setData(
                                'gender',
                                e.target.value as 'male' | 'female',
                            )
                        }
                        className="w-full rounded-md border bg-background px-3 py-2"
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>

                    {errors.gender && (
                        <p className="text-sm text-red-500">{errors.gender}</p>
                    )}
                </div>

                {/* Status */}
                <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>

                    <select
                        id="status"
                        value={data.status}
                        onChange={(e) =>
                            setData(
                                'status',
                                e.target.value as 'active' | 'draft',
                            )
                        }
                        className="w-full rounded-md border bg-background px-3 py-2"
                    >
                        <option value="active">Active</option>
                        <option value="draft">Draft</option>
                    </select>

                    {errors.status && (
                        <p className="text-sm text-red-500">{errors.status}</p>
                    )}
                </div>

                {/* Department */}
                <div className="space-y-2">
                    <Label htmlFor="department_id">Departments</Label>
                    <select
                        id="department_id"
                        value={data.department_id}
                        onChange={(e) =>
                            setData('department_id', Number(e.target.value))
                        }
                        className="w-full rounded-md border bg-background px-3 py-2"
                    >
                        <option value="">Select Department</option>
                        {departments?.map((dept: Department) => (
                            <option key={dept.id} value={dept.id}>
                                {dept.name}
                            </option>
                        ))}
                    </select>
                    {errors.department_id && (
                        <p className="text-sm text-red-500">
                            {errors.department_id}
                        </p>
                    )}
                </div>

                {/* Roles  */}
                <div className="space-y-2">
                    <Label htmlFor="role">Roles</Label>

                    <select
                        id="role"
                        value={data.role}
                        onChange={(e) => setData('role', e.target.value)}
                        className="w-full rounded-md border bg-background px-3 py-2"
                    >
                        <option value="">Select Role</option>

                        {roles?.map((role) => (
                            <option key={role.id} value={role.name}>
                                {role.name}
                            </option>
                        ))}
                    </select>

                    {errors.role && (
                        <p className="text-sm text-red-500">{errors.role}</p>
                    )}
                </div>

                {/* Address Full Width */}
                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>

                    <textarea
                        id="address"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        placeholder="Enter address"
                        rows={4}
                        className="w-full rounded-md border bg-background px-3 py-2"
                    />

                    {errors.address && (
                        <p className="text-sm text-red-500">{errors.address}</p>
                    )}
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
                <Button type="submit" disabled={processing}>
                    {mode === 'create' ? 'Create User' : 'Update User'}
                </Button>
            </div>
        </form>
    );
}
