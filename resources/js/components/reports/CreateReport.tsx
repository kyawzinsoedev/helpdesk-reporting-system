import { useForm } from '@inertiajs/react';
import type { Dispatch, SetStateAction } from 'react';
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import reports from '@/routes/reports';
import { Button } from '../ui/button';

interface CreateReportProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}
export default function CreateReport({ setIsOpen }: CreateReportProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
    });

    const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(reports.store().url, {
            onSuccess: () => {
                reset();
                setIsOpen(false);
            },
        });
        // console.log('hit');
    };

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create Reports</DialogTitle>
                <DialogDescription>
                    Fill in the details below to create a new report.
                </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmitForm} className="mt-3 space-y-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-5">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            type="text"
                            placeholder="Enter Report Name"
                            className={errors.name ? 'border-red-500' : ''}
                        />
                    </div>
                    {/* Validation Error*/}
                    {errors.name && (
                        <p className="ml-[65px] text-sm text-red-500">
                            {errors.name}
                        </p>
                    )}
                </div>

                <div className="flex items-center justify-end gap-3">
                    <Button
                        variant="outline"
                        type="button"
                        onClick={() => reset()}
                    >
                        Clear
                    </Button>

                    <Button type="submit" disabled={processing}>
                        {processing ? 'Creating...' : 'Create'}
                    </Button>
                </div>
            </form>
        </DialogContent>
    );
}
