import { useForm } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { store as storeForm } from '@/routes/forms';
import Can from '@/features/permissions/Can';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(storeForm().url);
    };

    return (
        <div className="flex w-full items-center justify-center p-6">
            <form onSubmit={submit} className="max-w-2xl min-w-xl space-y-6">
                <div>
                    <h1 className="text-2xl font-bold">Create Ticket Form</h1>
                </div>

                {/* Name */}
                <div className="space-y-2">
                    <Label>Form Name</Label>

                    <Input
                        // className="w-100"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="IT Support Form"
                    />

                    {errors.name && (
                        <p className="text-sm text-red-500">{errors.name}</p>
                    )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <Label>Description</Label>

                    <Textarea
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        placeholder="Form description..."
                    />
                </div>
                <Can permission="ticket_forms.create">
                    {' '}
                    <Button disabled={processing}>Save Form</Button>
                </Can>
            </form>
        </div>
    );
}
