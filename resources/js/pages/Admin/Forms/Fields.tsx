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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

import fields from '@/routes/forms/fields';
import { toast } from 'sonner';
import Can from '@/features/permissions/Can';
import { useRef, useState } from 'react';
import { Pencil, Trash2, Asterisk } from 'lucide-react';

type Props = {
    form: any;
};

export default function Fields({ form }: Props) {
    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        processing,
        errors,
        reset,
    } = useForm({
        label: '',
        name: '',
        type: 'text',
        options: [] as any[],
        required: false,
    });

    const [editingFieldId, setEditingFieldId] = useState<number | null>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const showOptions = ['select', 'radio', 'checkbox'].includes(data.type);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingFieldId) {
            put(`/forms/${form.id}/fields/${editingFieldId}`, {
                onSuccess: () => {
                    toast.success('Field updated successfully.');
                    resetForm();
                },
            });
        } else {
            post(fields.store({ form: form.id }).url, {
                onSuccess: () => resetForm(),
            });
        }
    };

    const resetForm = () => {
        reset();
        setEditingFieldId(null);
    };

    const handleEdit = (field: any) => {
        setEditingFieldId(field.id);

        setData({
            label: field.label,
            name: field.name,
            type: field.type,
            required: field.required,
            options: field.options || [],
        });

        formRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };

    const handleDelete = (id: number) => {
        if (!confirm('Are you sure you want to delete this field?')) return;

        destroy(`/forms/${form.id}/fields/${id}`, {
            data: {},
            onSuccess: () => {
                toast.success('Field deleted successfully.');
                resetForm();
            },
        });
    };
    return (
        <div ref={formRef} className="space-y-8 p-6">
            {/* HEADER */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight">
                    {form.name} Form Builder
                </h1>
                <p className="text-sm text-muted-foreground">
                    Create and manage dynamic form fields
                </p>
            </div>

            {/* BUILDER CARD */}
            <div className="rounded-xl border bg-card p-6 shadow-sm">
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
                                <p className="text-sm text-destructive">
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
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <Label>Required field</Label>
                    </div>

                    {/* SUBMIT */}
                    <Can permission="ticket_forms.create">
                        <div className="flex justify-end gap-2">
                            {editingFieldId && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={resetForm}
                                >
                                    Cancel
                                </Button>
                            )}
                            <Button disabled={processing} className="px-6">
                                {editingFieldId ? 'Update Field' : 'Add Field'}
                            </Button>
                        </div>
                    </Can>
                </form>
            </div>

            {/* FIELD LIST (UPDATED DESIGN) */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold tracking-tight">
                        Form Fields
                    </h2>
                    <span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                        Total: {form.fields?.length || 0} fields
                    </span>
                </div>

                <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
                    {form.fields && form.fields.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[250px]">
                                        Label
                                    </TableHead>
                                    <TableHead className="w-[200px]">
                                        Field Name
                                    </TableHead>
                                    <TableHead className="w-[120px]">
                                        Type
                                    </TableHead>
                                    <TableHead>
                                        Options / Configuration
                                    </TableHead>
                                    <TableHead className="w-[120px] text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {form.fields.map((field: any) => (
                                    <TableRow key={field.id} className="group">
                                        {/* LABEL & REQUIRED */}
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-1">
                                                <span>{field.label}</span>
                                                {field.required && (
                                                    <Asterisk
                                                        className="h-3 w-3 text-destructive"
                                                        title="Required"
                                                    />
                                                )}
                                            </div>
                                        </TableCell>

                                        {/* FIELD NAME */}
                                        <TableCell className="font-mono text-xs text-muted-foreground">
                                            {field.name}
                                        </TableCell>

                                        {/* TYPE BADGE */}
                                        <TableCell>
                                            <Badge
                                                variant="secondary"
                                                className="text-[10px] font-semibold tracking-wider uppercase"
                                            >
                                                {field.type}
                                            </Badge>
                                        </TableCell>

                                        {/* OPTIONS OR EXTRA DETAILS */}
                                        <TableCell>
                                            {field.options?.length > 0 ? (
                                                <div className="flex max-w-xs flex-wrap gap-1">
                                                    {field.options.map(
                                                        (
                                                            opt: any,
                                                            i: number,
                                                        ) => (
                                                            <Badge
                                                                key={i}
                                                                variant="outline"
                                                                className="border-blue-100 bg-blue-50/50 text-[10px] text-blue-600 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-400"
                                                            >
                                                                {opt.label}
                                                            </Badge>
                                                        ),
                                                    )}
                                                </div>
                                            ) : (
                                                <span className="text-xs text-muted-foreground/60">
                                                    —
                                                </span>
                                            )}
                                        </TableCell>

                                        {/* ACTIONS */}
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-1 opacity-80 transition-opacity group-hover:opacity-100">
                                                <Can permission="ticket_forms.update">
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                                        onClick={() =>
                                                            handleEdit(field)
                                                        }
                                                        title="Edit Field"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </Can>

                                                <Can permission="ticket_forms.delete">
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                                        onClick={() =>
                                                            handleDelete(
                                                                field.id,
                                                            )
                                                        }
                                                        title="Delete Field"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </Can>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="flex flex-col items-center justify-center p-8 text-center">
                            <p className="text-sm text-muted-foreground">
                                No fields added yet.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
