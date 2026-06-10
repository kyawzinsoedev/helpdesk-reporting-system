import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

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
import { Textarea } from '@/components/ui/textarea';

import tickets from '@/routes/tickets';

/**
 * FIELD TYPES
 */
interface Field {
    id: number;
    label: string;
    name: string;
    type: string;
    required: boolean;
    options: { label: string; value: string }[] | null;
    sort_order: number;
}

interface TicketForm {
    id: number;
    name: string;
    description: string;
    fields: Field[];
}

interface Props {
    ticketForms: TicketForm[];
}

/**
 * STRONG TYPE SYSTEM (NEW)
 */
type FieldValue = string | number | File | null;

interface FieldAnswer {
    field_id: number;
    value: FieldValue;
}

export default function TicketForm({
    mode = 'create',
    ticketForms,
    setOpen,
}: Props) {
    const [selectedForm, setSelectedForm] = useState<TicketForm | null>(null);

    const { data, setData, post, processing, errors } = useForm<{
        ticket_form_id: string;
        title: string;
        description: string;
        priority: string;
        fields: FieldAnswer[];
    }>({
        ticket_form_id: '',
        title: '',
        description: '',
        priority: '',
        fields: [],
    });

    useEffect(() => {
        if (ticketForms && mode === 'edit') {
            setData({});
        }
    }, [ticketForms, mode, setData]);

    /**
     * UPDATE FIELD VALUE (SAFE)
     */
    const handleFieldChange = (field_id: number, value: FieldValue) => {
        const updated = data.fields.filter((f) => f.field_id !== field_id);

        setData('fields', [...updated, { field_id, value }]);
    };

    /**
     * GET FIELD VALUE
     */
    const getFieldValue = (field_id: number) => {
        return data.fields.find((f) => f.field_id === field_id)?.value || '';
    };

    /**
     * RENDER FIELD
     */
    const renderField = (field: Field) => {
        switch (field.type) {
            case 'text':
                return (
                    <div className="space-y-2">
                        <Label>{field.label}</Label>
                        <Input
                            value={getFieldValue(field.id) as string}
                            onChange={(e) =>
                                handleFieldChange(field.id, e.target.value)
                            }
                        />
                    </div>
                );

            case 'date':
                return (
                    <div className="space-y-2">
                        <Label>{field.label}</Label>
                        <Input
                            type="date"
                            value={getFieldValue(field.id) as string}
                            onChange={(e) =>
                                handleFieldChange(field.id, e.target.value)
                            }
                        />
                    </div>
                );

            case 'textarea':
                return (
                    <div className="space-y-2">
                        <Label>{field.label}</Label>
                        <Textarea
                            value={getFieldValue(field.id) as string}
                            onChange={(e) =>
                                handleFieldChange(field.id, e.target.value)
                            }
                        />
                    </div>
                );

            case 'select':
                return (
                    <div className="space-y-2">
                        <Label>{field.label}</Label>
                        <Select
                            value={getFieldValue(field.id) as string}
                            onValueChange={(value) =>
                                handleFieldChange(field.id, value)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue
                                    placeholder={`Select ${field.label}`}
                                />
                            </SelectTrigger>

                            <SelectContent>
                                {field.options?.map((opt) => (
                                    <SelectItem
                                        key={opt.value}
                                        value={opt.value}
                                    >
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                );

            case 'number':
                return (
                    <div className="space-y-2">
                        <Label>{field.label}</Label>
                        <Input
                            type="number"
                            value={getFieldValue(field.id) as number}
                            onChange={(e) =>
                                handleFieldChange(
                                    field.id,
                                    e.target.value === ''
                                        ? ''
                                        : Number(e.target.value),
                                )
                            }
                        />
                    </div>
                );

            case 'file':
                return (
                    <div className="space-y-2">
                        <Label>{field.label}</Label>
                        <Input
                            type="file"
                            onChange={(e) =>
                                handleFieldChange(
                                    field.id,
                                    e.target.files?.[0] || null,
                                )
                            }
                        />
                    </div>
                );

            default:
                return null;
        }
    };

    /**a
     * SUBMIT
     */
    const handleTicketForm = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Before post ', data);
        post(tickets.store().url, {
            forceFormData: true,
        });
        console.log('After post ', data);
    };

    return (
        <form onSubmit={handleTicketForm}>
            <div className="space-y-6 rounded-2xl border p-6 shadow-sm">
                {/* FORM SELECT */}
                <div className="space-y-2">
                    <Label>Ticket Form</Label>

                    <Select
                        onValueChange={(value) => {
                            const form = ticketForms.find(
                                (t) => t.id.toString() === value,
                            );

                            setSelectedForm(form || null);

                            setData('ticket_form_id', value);
                            setData('fields', []);
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Choose Ticket Form" />
                        </SelectTrigger>

                        <SelectContent>
                            {ticketForms?.map((t) => (
                                <SelectItem key={t.id} value={t.id.toString()}>
                                    {t.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* PRIORITY */}
                <div className="space-y-2">
                    <Label>Priority</Label>

                    <Select
                        value={data.priority}
                        onValueChange={(value) => setData('priority', value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select Priority" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* TITLE */}
                <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                    />
                </div>

                {/* DESCRIPTION */}
                <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    />
                </div>

                {/* DYNAMIC FIELDS */}
                {selectedForm && (
                    <div className="space-y-5 rounded-xl border p-5">
                        {selectedForm.fields.map((field) => (
                            <div key={field.id}>{renderField(field)}</div>
                        ))}
                    </div>
                )}

                {/* SUBMIT */}
                {selectedForm && (
                    <div className="flex justify-end">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Processing...' : 'Submit Ticket'}
                        </Button>
                    </div>
                )}
            </div>
        </form>
    );
}
