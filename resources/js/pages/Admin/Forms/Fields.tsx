import { useForm } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import fields from '@/routes/forms/fields';

type Props = {
    form: any;
};

export default function Fields({ form }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        label: '',
        name: '',
        type: 'text',
        options: [] as any[],
        required: false,
    });

    const showOptions = ['select', 'radio', 'checkbox'].includes(data.type);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(fields.store({ form: form.id }).url, {
            onSuccess: () => reset(),
        });
    };

    const handleEdit = (field: any) => {
        setData({
            label: field.label,
            name: field.name,
            type: field.type,
            required: field.required,
            options: field.options || [],
        });
    };

    // const handleDelete = (id: number) => {
    //     if (!confirm('Are you sure you want to delete this field?')) return;

    //     delete(fields.delete({form: from.id}).url,{
    //         onSuccess:()=>reset(),
    //     });
    // };

    return (
        <div className="space-y-6 p-6">
            <h1 className="text-2xl font-bold">{form.name} Form Builder</h1>

            {/* FORM BUILDER */}
            <form onSubmit={submit} className="space-y-4 rounded-lg border p-4">
                {/* FIELD TYPE */}
                <div className="space-y-2">
                    <Label>Field Type</Label>

                    <Select
                        value={data.type}
                        onValueChange={(value) => {
                            setData('type', value);

                            // reset options when switching type
                            if (
                                ['select', 'radio', 'checkbox'].includes(value)
                            ) {
                                setData('options', [{ label: '', value: '' }]);
                            } else {
                                setData('options', []);
                            }
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select field type" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="text">Text</SelectItem>
                            <SelectItem value="textarea">Textarea</SelectItem>
                            <SelectItem value="number">Number</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="phone">Phone</SelectItem>
                            <SelectItem value="password">Password</SelectItem>

                            <SelectItem value="select">Select</SelectItem>
                            <SelectItem value="radio">Radio</SelectItem>
                            <SelectItem value="checkbox">Checkbox</SelectItem>

                            <SelectItem value="date">Date</SelectItem>
                            <SelectItem value="file">File Upload</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* LABEL */}
                <div className="space-y-2">
                    <Label>Label</Label>
                    <Input
                        value={data.label}
                        onChange={(e) => setData('label', e.target.value)}
                        placeholder="Enter label (e.g. Email Address)"
                    />
                    {errors.label && (
                        <p className="text-sm text-red-500">{errors.label}</p>
                    )}
                </div>

                {/* FIELD NAME */}
                <div className="space-y-2">
                    <Label>Field Name</Label>
                    <Input
                        value={data.name}
                        onChange={(e) =>
                            setData(
                                'name',
                                e.target.value
                                    .toLowerCase()
                                    .replace(/\s/g, '_'),
                            )
                        }
                        placeholder="email_address"
                    />
                </div>

                {/* OPTIONS BUILDER (REAL JSON STYLE) */}
                {showOptions && (
                    <div className="space-y-3 rounded-md border p-3">
                        <Label>Options</Label>

                        {data.options.map((opt: any, index: number) => (
                            <div key={index} className="flex gap-2">
                                <Input
                                    placeholder="Label"
                                    value={opt.label}
                                    onChange={(e) => {
                                        const updated = [...data.options];
                                        updated[index].label = e.target.value;
                                        setData('options', updated);
                                    }}
                                />

                                <Input
                                    placeholder="Value"
                                    value={opt.value}
                                    onChange={(e) => {
                                        const updated = [...data.options];
                                        updated[index].value = e.target.value;
                                        setData('options', updated);
                                    }}
                                />
                            </div>
                        ))}

                        <Button
                            type="button"
                            onClick={() =>
                                setData('options', [
                                    ...data.options,
                                    { label: '', value: '' },
                                ])
                            }
                        >
                            + Add Option
                        </Button>
                    </div>
                )}

                {/* REQUIRED */}
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={data.required}
                        onChange={(e) => setData('required', e.target.checked)}
                    />
                    <Label>Required</Label>
                </div>

                {/* SUBMIT */}
                <Button disabled={processing}>Add Field</Button>
            </form>

            {/* EXISTING FIELDS */}
            <div className="space-y-3">
                {form.fields.map((field: any) => (
                    <div
                        key={field.id}
                        className="flex items-center justify-between rounded-lg border p-4 shadow-sm transition hover:shadow-md"
                    >
                        {/* LEFT SIDE */}
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <h3 className="font-medium">{field.label}</h3>

                                <span className="rounded bg-gray-100 px-2 py-0.5 text-[10px] text-gray-600 uppercase">
                                    {field.type}
                                </span>
                            </div>

                            <div className="text-xs text-muted-foreground">
                                {field.name} •{' '}
                                {field.required ? 'Required' : 'Optional'}
                            </div>

                            {field.options?.length > 0 && (
                                <div className="mt-1 flex flex-wrap gap-1">
                                    {field.options.map(
                                        (opt: any, i: number) => (
                                            <span
                                                key={i}
                                                className="rounded bg-blue-50 px-2 py-0.5 text-[10px] text-blue-600"
                                            >
                                                {opt.label}
                                            </span>
                                        ),
                                    )}
                                </div>
                            )}
                        </div>

                        {/* RIGHT ACTIONS */}
                        <div className="flex items-center gap-2">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEdit(field)}
                            >
                                Edit
                            </Button>

                            <Button
                                size="sm"
                                variant="destructive"
                                // onClick={() => handleDelete(field.id)}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
