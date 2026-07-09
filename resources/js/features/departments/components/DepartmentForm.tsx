import { useForm } from '@inertiajs/react';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import type {
    Department,
    DepartmentFormData,
} from '@/features/departments/shcemas/departmentSchema';
import Can from '@/features/permissions/Can';

interface DepartmentFormProps {
    mode?: 'create' | 'edit';
    department?: Department;
    setOpen?: (open: boolean) => void;
}

export default function DepartmentForm({
    mode = 'create',
    department,
    setOpen,
}: DepartmentFormProps) {
    const { data, setData, post, put, processing, errors } =
        useForm<DepartmentFormData>({
            name: department?.name || '',
            department_code: department?.department_code || '',
        });

    useEffect(() => {
        if (department && mode === 'edit') {
            // console.log('this is edit render');
            setData({
                name: department.name || '',
                department_code: department.department_code || '',
            });
        }
    }, [department, mode, setData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (mode === 'create') {
            post('/departments', {
                onSuccess: () => {
                    // setData('');
                    setOpen?.(false);
                },
            });
        } else {
            put(`/departments/${department?.id}`, {
                onSuccess: () => {
                    setOpen?.(false);
                },
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="space-y-2">
                <Label>Name</Label>

                <Input
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Enter department name"
                />

                {errors.name && (
                    <p className="text-sm text-red-500">{errors.name}</p>
                )}
            </div>

            {/* Department Code */}
            <div className="space-y-2">
                <Label>Department Code</Label>

                <Input
                    value={data.department_code}
                    onChange={(e) => setData('department_code', e.target.value)}
                    placeholder="Enter department code"
                />

                {errors.department_code && (
                    <p className="text-sm text-red-500">
                        {errors.department_code}
                    </p>
                )}
            </div>

            {/* Submit */}
            <div className="flex justify-end">
                <Can
                    permission={
                        mode === 'create'
                            ? 'departments.create'
                            : 'departments.update'
                    }
                >
                    <Button type="submit" disabled={processing}>
                        {mode === 'create'
                            ? 'Create Department'
                            : 'Update Department'}
                    </Button>
                </Can>
            </div>
        </form>
    );
}
