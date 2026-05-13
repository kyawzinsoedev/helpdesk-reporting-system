import { useForm } from '@inertiajs/react';
import { useState, type Dispatch, type SetStateAction } from 'react';
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
interface CreateReportProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    departments: Department[];
}

export default function CreateDepartment({
    setIsOpen,
    departments,
}: CreateReportProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        department_code: '',
    });

    // type FormData = {
    //     name: string;
    //     code: string;
    // };

    // type ClientError = Partial<Record<keyof FormData, string>>;  Record<string, string>

    const [clientError, setClientError] = useState<{
        name?: string;
        code?: string;
    }>({});

    // const validateForm = () => {
    //     const nameExists = departments.some(
    //         (d) =>
    //             d.name.toLowerCase().trim() === data.name.toLowerCase().trim(),
    //     );

    //     const codeExists = departments.some(
    //         (d) =>
    //             d.department_code.toLowerCase().trim() ===
    //             data.department_code.toLowerCase().trim(),
    //     );

    //     if (nameExists || codeExists) {
    //         setClientError({
    //             name: nameExists
    //                 ? 'This department name already exists.'
    //                 : undefined,
    //             code: codeExists
    //                 ? 'This department code already exists.'
    //                 : undefined,
    //         });

    //         return false;
    //     }

    //     return true;
    // };

    const checkDuplicateName = (val: string) => {
        const exists = departments.some(
            (d) => d.name.toLowerCase().trim() === val.toLowerCase().trim(),
        );
        setClientError((prev) => ({
            ...prev,
            name: exists ? 'This department name already exists.' : undefined,
        }));
    };

    const checkDuplicateCode = (val: string) => {
        const exists = departments.some(
            (d) =>
                d.department_code.toLowerCase().trim() ===
                val.toLowerCase().trim(),
        );
        setClientError((prev) => ({
            ...prev,
            code: exists ? 'This department code already exists.' : undefined,
        }));
    };

    const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setClientError({});

        post('/departments', {
            onSuccess: () => {
                reset();
                setIsOpen(false);
            },
        });
    };

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Create Department</DialogTitle>
                <DialogDescription>
                    Fill in the details below to create a new department. Click
                    save when you're done.
                </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmitForm} className="mt-4 space-y-5">
                {/* Department Name Field */}
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="name">Department Name</Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Enter department name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        onBlur={(e) => checkDuplicateName(e.target.value)}
                        className={
                            clientError.name || errors.name
                                ? 'border-destructive focus-visible:ring-destructive'
                                : ''
                        }
                    />
                    {(clientError.name || errors.name) && (
                        <p className="text-[0.8rem] font-medium text-destructive">
                            {clientError.name || errors.name}
                        </p>
                    )}
                </div>

                {/* Department Code Field */}
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="department_code">Department Code</Label>
                    <Input
                        id="department_code"
                        type="text"
                        placeholder="Enter department code (e.g. IT-001)"
                        value={data.department_code}
                        onChange={(e) =>
                            setData('department_code', e.target.value)
                        }
                        onBlur={(e) => checkDuplicateCode(e.target.value)}
                        className={
                            clientError.code || errors.department_code
                                ? 'border-destructive focus-visible:ring-destructive'
                                : ''
                        }
                    />
                    {(clientError.code || errors.department_code) && (
                        <p className="text-[0.8rem] font-medium text-destructive">
                            {clientError.code || errors.department_code}
                        </p>
                    )}
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-3 pt-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                            reset();
                            setClientError({});
                            setIsOpen(false);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={processing}>
                        {processing ? 'Saving...' : 'Save Department'}
                    </Button>
                </div>
            </form>
        </DialogContent>
    );
}
