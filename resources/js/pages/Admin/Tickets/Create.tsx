import { useForm } from '@inertiajs/react';
import { useState } from 'react';

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
import fields from '@/routes/forms/fields';

interface Field {
    id: number;
    label: string;
    name: string;
    type: string;
    required: boolean;
    options: string[] | null;
    sort_order: number;
}
interface TicketForm {
    id: number;
    name: string;
    description: string;
    fields: {
        [Field: string]: any;
    };
}
interface Props {
    ticketForms: TicketForm[];
}
export default function CreateTicket({ ticketForms }: Props) {
    const [selectedForm, setSelectedForm] = useState<TicketForm | null>(null);

    const handleFieldChange = (name: string, value: any) => {
        setData('fields', (prev: Field) => ({
            ...prev,
            [name]: value,
        }));
    };

    const renderField = (field: Field) => {
        switch (field.type) {
            case 'text':
                return (
                    <div className="space-y-2">
                        <Label>{field.label}</Label>
                        <Input
                            type="text"
                            placeholder={field.name}
                            required={field.required}
                            value={data.fields[field.name]}
                            onChange={(e) => {
                                handleFieldChange(field.name, e.target.value);
                            }}
                        />
                    </div>
                );

            case 'date':
                return (
                    <div className="space-y-2">
                        <Label>{field.label}</Label>
                        <Input type="date" />
                    </div>
                );

            case 'textarea':
                return (
                    <div className="space-y-2">
                        <Label>{field.label}</Label>
                        <Textarea
                            placeholder={field.name}
                            value={data.fields[field.name] || ''}
                            onChange={(e) =>
                                handleFieldChange(field.name, e.target.value)
                            }
                        />
                    </div>
                );

            case 'select':
                return (
                    <div className="space-y-2">
                        <Label>{field.label}</Label>

                        <Select>
                            <SelectTrigger>
                                <SelectValue
                                    placeholder={`Select ${field.label}`}
                                />
                            </SelectTrigger>

                            <SelectContent>
                                {field.options?.map((opt) => (
                                    <SelectItem key={opt} value={opt}>
                                        {opt}
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
                            placeholder={field.name}
                            value={data.fields[field.name] || ''}
                            onChange={(e) =>
                                handleFieldChange(
                                    field.name,
                                    Number(e.target.value),
                                )
                            }
                        />
                    </div>
                );

            case 'file':
                return (
                    <div className="space-y-2">
                        <Label>{field.label}</Label>
                        <Input type="file" />
                    </div>
                );

            default:
                return null;
        }
    };

    type FormFields = Record<string, any>;

    const { data, setData, post, processing, errors } = useForm<{
        title: string;
        description: string;
        fields: FormFields;
    }>({
        title: '',
        description: '',
        fields: {},
    });

    const handleTicketForm = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('hit');
        console.log(data.fields[1]);
        post(tickets.store().url);
    };

    return (
        <div className="mx-auto max-w-4xl space-y-6 p-6">
            <div>
                <h1 className="text-3xl font-bold">Create Ticket</h1>

                <p className="text-muted-foreground">
                    Submit a new support request
                </p>
            </div>
            <form action="" onSubmit={handleTicketForm}>
                <div className="space-y-6 rounded-2xl border p-6 shadow-sm">
                    {/* Select Ticket Form */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between gap-5">
                            <div className="w-full space-y-2">
                                <Label>Ticket Form</Label>

                                <Select
                                    onValueChange={(value) => {
                                        const form = ticketForms.find(
                                            (t) => t.id.toString() === value,
                                        );

                                        setSelectedForm(form || null);
                                    }}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Choose Ticket Form" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {ticketForms.length > 0 &&
                                            ticketForms.map((t) => (
                                                <SelectItem
                                                    key={t.id}
                                                    value={t.id.toString()}
                                                >
                                                    {t.name}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="w-full space-y-2">
                                <Label>Priority</Label>

                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Priority" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="low">Low</SelectItem>

                                        <SelectItem value="medium">
                                            Medium
                                        </SelectItem>

                                        <SelectItem value="high">
                                            High
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Title</Label>

                            <Input
                                value={data.title}
                                onChange={(e) =>
                                    setData('title', e.target.value)
                                }
                                placeholder="Enter ticket title"
                            />
                            {errors.title && (
                                <p className="text-sm text-red-500">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Description</Label>

                            <Textarea
                                value={data.description}
                                placeholder="Describe your issue..."
                                className="min-h-[80px]"
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                            />
                            {errors.description && (
                                <p className="text-sm text-red-500">
                                    {errors.description}
                                </p>
                            )}
                        </div>
                    </div>

                    {selectedForm && (
                        <>
                            {/* Dynamic Fields UI */}
                            <div className="space-y-5 rounded-xl border p-5">
                                <div>
                                    <h2 className="text-lg font-semibold">
                                        Additional Information for{' '}
                                        {selectedForm.name}
                                    </h2>

                                    <p className="text-sm text-muted-foreground">
                                        Fill required form fields
                                    </p>
                                </div>

                                {/* Text Field */}
                                {selectedForm.fields.map((field) => (
                                    <div key={field.id}>
                                        {renderField(field)}
                                    </div>
                                ))}
                            </div>

                            {/* Submit */}
                            <div className="flex justify-end">
                                <Button type="submit">
                                    {processing
                                        ? 'Processing...'
                                        : 'Submit Ticket'}
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
}
