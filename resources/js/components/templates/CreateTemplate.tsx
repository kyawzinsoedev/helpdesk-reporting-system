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
import { Button } from '../ui/button';

interface Report {
    id: number;
    name: string;
}
interface CreateReportProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    reports: Report[];
}

export default function CreateTemplate({
    setIsOpen,
    reports,
}: CreateReportProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        report_id: '',
    });

    const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/templates', {
            onSuccess: () => {
                reset();
                setIsOpen(false);
            },
        });
    };

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create Template</DialogTitle>
                <DialogDescription>
                    Fill in the details below to create a new template.
                </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmitForm} className="mt-3 space-y-4">
                {/* Report Selection */}
                <div className="space-y-2">
                    <Label htmlFor="report_id">Select Report</Label>
                    <select
                        id="report_id"
                        value={data.report_id}
                        onChange={(e) => setData('report_id', e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-ring focus:outline-none"
                    >
                        <option value="">-- Choose a Report --</option>
                        {reports &&
                            reports.map((report) => (
                                <option key={report.id} value={report.id}>
                                    {report.name}
                                </option>
                            ))}
                    </select>
                    {errors.report_id && (
                        <p className="text-sm text-red-500">
                            {errors.report_id}
                        </p>
                    )}
                </div>

                {/* Template Name */}
                <div className="space-y-2">
                    <Label htmlFor="name">Template Name</Label>
                    <Input
                        id="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Enter Template Name"
                        className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && (
                        <p className="text-sm text-red-500">{errors.name}</p>
                    )}
                </div>

                <div className="flex items-center justify-end gap-3 pt-4">
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
                        {processing ? 'Creating...' : 'Create Template'}
                    </Button>
                </div>
            </form>
        </DialogContent>
    );
}
