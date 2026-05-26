import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { UserFormData } from '../schemas/userSchema';
import type { User } from '../types/user';
// import type { User } from '@/types';

interface UserFormProps {
    mode?: 'create' | 'edit';
    user?: User;
}
export default function UserForm({ mode = 'create', user }: UserFormProps) {
    const { data, setData, post, put, processing, errors } =
        useForm<UserFormData>({
            name: user?.name || '',
            username: user?.username || '',
            email: user?.email || '',
            phone: user?.phone || '',
            birthday: user?.birthday || '',
            gender: user?.gender || '',
            address: user?.address || '',
            status: user?.status || 'active',
            department_id: user?.department_id,
        });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('type = ' + { mode });

        if (mode === 'create') {
            post('/users');
        } else {
            put(`/users/${user?.id}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
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

            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    placeholder="Enter email address"
                />
                {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                )}
            </div>
            <div className="flex justify-end gap-2">
                <Button type="submit" disabled={processing}>
                    {mode === 'create' ? 'Create User' : 'Update User'}
                </Button>
            </div>
        </form>
    );
}
