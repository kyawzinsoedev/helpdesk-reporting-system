import { router, useForm } from '@inertiajs/react';
import type { Dispatch, SetStateAction } from 'react';
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '../ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

// Types
export interface Role {
    id: number;
    name: string;
    guard_name: string;
}

export interface Department {
    id: number;
    name: string;
}

interface CreateUserProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    departments: Department[];
    roles: Role[];
}

export default function CreateUser({
    setIsOpen,
    departments,
    roles,
}: CreateUserProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        username: '',
        email: '',
        phone: '',
        birthday: '',
        gender: 'male',
        address: '',
        status: 'active',
        department_id: '',
        password: '',
        password_confirmation: '',
        role: '',
    });

    const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/users', {
            onSuccess: () => {
                reset();
                setIsOpen(false);
            },
        });
    };

    return (
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[700px]">
            <DialogHeader>
                <DialogTitle>Create New User</DialogTitle>
                <DialogDescription>
                    Fill in the details below to create a new user.
                </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmitForm} className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && (
                            <p className="text-xs text-destructive">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Username */}
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            value={data.username}
                            onChange={(e) =>
                                setData('username', e.target.value)
                            }
                        />
                        {errors.username && (
                            <p className="text-xs text-destructive">
                                {errors.username}
                            </p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Email */}
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        {errors.email && (
                            <p className="text-xs text-destructive">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                            id="phone"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                        />
                        {errors.phone && (
                            <p className="text-xs text-destructive">
                                {errors.phone}
                            </p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Birthday */}
                    <div className="space-y-2">
                        <Label htmlFor="birthday">Birthday</Label>
                        <Input
                            id="birthday"
                            type="date"
                            value={data.birthday}
                            onChange={(e) =>
                                setData('birthday', e.target.value)
                            }
                        />
                        {errors.birthday && (
                            <p className="text-xs text-destructive">
                                {errors.birthday}
                            </p>
                        )}
                    </div>

                    {/* Gender */}
                    <div className="space-y-2">
                        <Label>Gender</Label>
                        <Select
                            onValueChange={(val) => setData('gender', val)}
                            defaultValue={data.gender}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Department */}
                    <div className="space-y-2">
                        <Label>Department</Label>
                        <Select
                            onValueChange={(val) =>
                                setData('department_id', val)
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Dept" />
                            </SelectTrigger>
                            <SelectContent>
                                {departments?.map((dept) => (
                                    <SelectItem
                                        key={dept.id}
                                        value={dept.id.toString()}
                                    >
                                        {dept.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.department_id && (
                            <p className="text-xs text-destructive">
                                {errors.department_id}
                            </p>
                        )}
                    </div>

                    {/* Role */}
                    <div className="space-y-2">
                        <Label>Role</Label>
                        <Select onValueChange={(val) => setData('role', val)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Role" />
                            </SelectTrigger>
                            <SelectContent>
                                {roles?.map((role) => (
                                    <SelectItem key={role.id} value={role.name}>
                                        {role.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.role && (
                            <p className="text-xs text-destructive">
                                {errors.role}
                            </p>
                        )}
                    </div>
                </div>

                {/* Address */}
                <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                        id="address"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                    />
                    {errors.address && (
                        <p className="text-xs text-destructive">
                            {errors.address}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Password */}
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                        />
                        {errors.password && (
                            <p className="text-xs text-destructive">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                        <Label htmlFor="password_confirmation">
                            Confirm Password
                        </Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                        />
                    </div>
                </div>

                <DialogFooter className="pt-4">
                    <Button
                        variant="outline"
                        type="button"
                        onClick={() => {
                            reset();
                            setIsOpen(false);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={processing}>
                        {processing ? 'Creating...' : 'Create User'}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
}
