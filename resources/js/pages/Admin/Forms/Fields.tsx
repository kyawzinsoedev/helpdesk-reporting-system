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
        <div className="mx-auto max-w-5xl space-y-8">
            {/* HEADER */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    {form.name} Form Builder
                </h1>
                <p className="text-sm text-muted-foreground">
                    Create and manage dynamic form fields
                </p>
            </div>

            {/* BUILDER CARD */}
            <div className="rounded-xl border p-6 shadow-sm">
                <form onSubmit={submit} className="space-y-5">
                    {/* FIELD TYPE */}
                    <div className="space-y-2">
                        <Label>Field Type</Label>
                        <Select
                            value={data.type}
                            onValueChange={(value) => {
                                setData('type', value);

                                if (
                                    ['select', 'radio', 'checkbox'].includes(
                                        value,
                                    )
                                ) {
                                    setData('options', [
                                        { label: '', value: '' },
                                    ]);
                                } else {
                                    setData('options', []);
                                }
                            }}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select field type" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="text">Text</SelectItem>
                                <SelectItem value="textarea">
                                    Textarea
                                </SelectItem>
                                <SelectItem value="number">Number</SelectItem>
                                <SelectItem value="email">Email</SelectItem>
                                <SelectItem value="phone">Phone</SelectItem>
                                <SelectItem value="password">
                                    Password
                                </SelectItem>
                                <SelectItem value="select">Select</SelectItem>
                                <SelectItem value="radio">Radio</SelectItem>
                                <SelectItem value="checkbox">
                                    Checkbox
                                </SelectItem>
                                <SelectItem value="date">Date</SelectItem>
                                <SelectItem value="file">
                                    File Upload
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* LABEL + NAME GRID */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label>Label</Label>
                            <Input
                                value={data.label}
                                onChange={(e) =>
                                    setData('label', e.target.value)
                                }
                                placeholder="Email Address"
                            />
                            {errors.label && (
                                <p className="text-sm text-red-500">
                                    {errors.label}
                                </p>
                            )}
                        </div>

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
                    </div>

                    {/* OPTIONS */}
                    {showOptions && (
                        <div className="space-y-3 rounded-lg border bg-muted/30 p-4">
                            <Label className="font-semibold">Options</Label>

                            <div className="space-y-2">
                                {data.options.map((opt: any, index: number) => (
                                    <div
                                        key={index}
                                        className="grid grid-cols-2 gap-2"
                                    >
                                        <Input
                                            placeholder="Label"
                                            value={opt.label}
                                            onChange={(e) => {
                                                const updated = [
                                                    ...data.options,
                                                ];
                                                updated[index].label =
                                                    e.target.value;
                                                setData('options', updated);
                                            }}
                                        />

                                        <Input
                                            placeholder="Value"
                                            value={opt.value}
                                            onChange={(e) => {
                                                const updated = [
                                                    ...data.options,
                                                ];
                                                updated[index].value =
                                                    e.target.value;
                                                setData('options', updated);
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>

                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
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
                            onChange={(e) =>
                                setData('required', e.target.checked)
                            }
                        />
                        <Label>Required field</Label>
                    </div>

                    {/* SUBMIT */}
                    <div className="flex justify-end">
                        <Button disabled={processing} className="px-6">
                            Add Field
                        </Button>
                    </div>
                </form>
            </div>

            {/* FIELD LIST */}
            <div className="space-y-4">
                {form.fields.map((field: any) => (
                    <div
                        key={field.id}
                        className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md dark:bg-gray-900"
                    >
                        <div className="flex items-start justify-between">
                            {/* LEFT */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-base font-semibold">
                                        {field.label}
                                    </h3>

                                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-600 uppercase dark:bg-gray-800">
                                        {field.type}
                                    </span>
                                </div>

                                <div className="text-xs text-muted-foreground">
                                    {field.name} •{' '}
                                    {field.required ? 'Required' : 'Optional'}
                                </div>

                                {field.options?.length > 0 && (
                                    <div className="flex flex-wrap gap-1 pt-1">
                                        {field.options.map(
                                            (opt: any, i: number) => (
                                                <span
                                                    key={i}
                                                    className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] text-blue-600 dark:bg-blue-950"
                                                >
                                                    {opt.label}
                                                </span>
                                            ),
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* RIGHT */}
                            <div className="flex gap-2">
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
                                    onClick={() => handleDelete(field.id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
