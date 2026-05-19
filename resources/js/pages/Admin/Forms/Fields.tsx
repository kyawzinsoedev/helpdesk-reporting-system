import { useForm } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import fields from '@/routes/forms/fields';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

type Props = {
    form: any;
};

export default function Fields({ form }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        label: '',
        name: '',
        type: 'text',
        options: '',
        required: false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(fields.store({ form: form.id }).url, {
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="space-y-6 p-6">
            <div>
                <h1 className="text-2xl font-bold">{form.name} Fields</h1>
            </div>

            {/* Create Field */}
            <form onSubmit={submit} className="space-y-4 rounded-lg border p-4">
                {/* Label */}
                <div className="space-y-2">
                    <Label>Label</Label>

                    <Input
                        value={data.label}
                        onChange={(e) => setData('label', e.target.value)}
                        placeholder="Subject"
                    />

                    {errors.label && (
                        <p className="text-sm text-red-500">{errors.label}</p>
                    )}
                </div>

                {/* Name */}
                <div className="space-y-2">
                    <Label>Name</Label>

                    <Input
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="subject"
                    />
                </div>

                {/* Type */}
                <div className="space-y-2">
                    <Label>Field Type</Label>

                    <Select
                        onValueChange={(value) => setData('type', value)}
                        defaultValue={data.type}
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="text">Text</SelectItem>

                            <SelectItem value="textarea">Textarea</SelectItem>

                            <SelectItem value="select">Select</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={data.required}
                        onChange={(e) => setData('required', e.target.checked)}
                    />

                    <Label>Required</Label>
                </div>

                {/* Options */}
                {data.type === 'select' && (
                    <div className="space-y-2">
                        <Label>Options</Label>

                        <Input
                            value={data.options}
                            onChange={(e) => setData('options', e.target.value)}
                            placeholder="low, medium, high (comma separated)"
                        />
                    </div>
                )}

                <Button disabled={processing}>Add Field</Button>
            </form>

            {/* Existing Fields */}
            <div className="space-y-3">
                {form.fields.map((field: any) => (
                    <div key={field.id} className="rounded-lg border p-4">
                        <div className="font-semibold">{field.label}</div>

                        <div className="text-sm text-muted-foreground">
                            {field.type}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
