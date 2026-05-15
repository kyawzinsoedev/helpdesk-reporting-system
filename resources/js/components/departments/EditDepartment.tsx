import { useForm } from '@inertiajs/react';
import { useState, type Dispatch, type SetStateAction, useEffect } from 'react';
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '../ui/button';

interface Department {
    id: number;
    name: string;
    department_code: string;
}

interface EditDepartmentProps {
    setIsEditOpen: Dispatch<SetStateAction<boolean>>;
    departments: Department[];
    department: Department;
}

export default function EditDepartment({
    setIsEditOpen,
    departments,
    department,
}: EditDepartmentProps) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: department.name || '',
        department_code: department.department_code || '',
    });

    const [clientError, setClientError] = useState<{
        name?: string;
        code?: string;
    }>({});

    useEffect(() => {
        setData({
            name: department.name || '',
            department_code: department.department_code || '',
        });
        setClientError({});
    }, [department, setData]);

    const checkDuplicateName = (val: string) => {
        const newValue = val.toLowerCase().trim();
        const currentValue = department.name.toLowerCase().trim();

        if (newValue === currentValue) {
            setClientError((prev) => ({
                ...prev,
                name: undefined,
            }));

            return false;
        }

        const exists = departments.some(
            (d) =>
                d.id !== department.id &&
                d.name.toLowerCase().trim() === newValue,
        );

        setClientError((prev) => ({
            ...prev,
            name: exists ? 'This department name already exists.' : undefined,
        }));

        return exists;
    };

    const checkDuplicateCode = (val: string) => {
        const newValue = val.toLowerCase().trim();
        const currentValue = department.department_code.toLowerCase().trim();

        if (newValue === currentValue) {
            setClientError((prev) => ({
                ...prev,
                code: undefined,
            }));

            return false;
        }

        const exists = departments.some(
            (d) =>
                d.id !== department.id &&
                d.department_code.toLowerCase().trim() === newValue,
        );

        setClientError((prev) => ({
            ...prev,
            code: exists ? 'This department code already exists.' : undefined,
        }));

        return exists;
    };

    const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const hasNameError = checkDuplicateName(data.name);
        const hasCodeError = checkDuplicateCode(data.department_code);

        if (hasNameError || hasCodeError) {
            return;
        }

        put(`/departments/${department.id}`, {
            onSuccess: () => {
                reset();
                setIsEditOpen(false);
            },
        });
    };

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Edit Department</DialogTitle>
                <DialogDescription>
                    Update department details and click save.
                </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmitForm} className="mt-4 space-y-5">
                {/* Name */}
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="name">Department Name</Label>
                    <Input
                        id="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        onBlur={(e) => checkDuplicateName(e.target.value)}
                        className={
                            clientError.name || errors.name
                                ? 'border-destructive'
                                : ''
                        }
                    />
                    {(clientError.name || errors.name) && (
                        <p className="text-sm text-destructive">
                            {clientError.name || errors.name}
                        </p>
                    )}
                </div>

                {/* Code */}
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="department_code">Department Code</Label>
                    <Input
                        id="department_code"
                        value={data.department_code}
                        onChange={(e) =>
                            setData('department_code', e.target.value)
                        }
                        onBlur={(e) => checkDuplicateCode(e.target.value)}
                        className={
                            clientError.code || errors.department_code
                                ? 'border-destructive'
                                : ''
                        }
                    />
                    {(clientError.code || errors.department_code) && (
                        <p className="text-sm text-destructive">
                            {clientError.code || errors.department_code}
                        </p>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                            reset();
                            setClientError({});
                            setIsEditOpen(false);
                        }}
                    >
                        Cancel
                    </Button>

                    <Button type="submit" disabled={processing}>
                        {processing ? 'Updating...' : 'Update Department'}
                    </Button>
                </div>
            </form>
        </DialogContent>
    );
}
