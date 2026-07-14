import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ticketSchema } from '../schemas/ticketSchema';
import type {
    TicketFormData,
    TicketFormStructure,
} from '../schemas/ticketSchema';
import { useEffect } from 'react';
import Can from '@/features/permissions/Can';

interface Props {
    mode?: 'create' | 'edit';
    ticket?: TicketFormData;
    ticketForms?: TicketFormStructure[];
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TicketForm({
    mode = 'create',
    ticket,
    ticketForms,
    setOpen,
}: Props) {
    const {
        control,
        register,
        handleSubmit,
        // reset,
        formState: { errors, isSubmitting },
    } = useForm<TicketFormData>({
        defaultValues: {
            ticket_form_id: ticket ? Number(ticket.ticket_form_id) : undefined,
            title: ticket?.title ?? '',
            description: ticket?.description ?? '',
            priority: ticket?.priority ?? 'low',
            status: ticket?.status ?? undefined,
            custom_fields: ticket?.custom_fields ?? {},
        },
        resolver: zodResolver(ticketSchema),
    });

    const selectedFormId = useWatch({
        control,
        name: 'ticket_form_id',
    });

    const currentFormStructure = ticketForms?.find(
        (form) => Number(form.id) === Number(selectedFormId),
    );

    const onSubmit = async (data: TicketFormData) => {
        if (mode === 'edit' && ticket?.id) {
            router.put(`/tickets/${ticket.id}`, data, {
                onSuccess: () => {
                    toast.message('Ticket Updated Successfully');
                    setOpen(false);
                },
            });
        } else {
            router.post('/tickets', data, {
                onSuccess: () => {
                    toast.message('Ticket Created Successfully');
                    setOpen(false);
                },
            });
        }
    };

    // console.log('ticket', ticket);
    // console.log('selectedFormId', selectedFormId);
    // console.log('ticketForms', ticketForms);
    // console.log('currentFormStructure', currentFormStructure);
    // console.log('currentFormStructure?.fields', currentFormStructure?.fields);
    // console.log(
    //     'form ids',
    //     ticketForms?.map((f) => ({
    //         id: f.id,
    //         type: typeof f.id,
    //     })),
    // );
    // console.log(
    //     ticketForms?.find((form) => Number(form.id) === Number(selectedFormId)),
    // );

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto w-full max-w-3xl"
        >
            <div className="space-y-6">
                {/* PRIMARY INFORMATION CARD */}
                <div className="rounded-2xl border bg-background p-6 shadow-sm transition-all hover:shadow-md">
                    <div className="mb-4 flex items-center gap-3 border-b pb-3">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                            01
                        </span>
                        <div>
                            <h3 className="text-base font-semibold text-foreground">
                                Primary Information
                            </h3>
                            <p className="text-xs text-muted-foreground">
                                What is the main issue about?
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {/* TITLE */}
                        <div className="space-y-1.5">
                            <Label className="text-sm font-medium text-foreground">
                                Subject Title{' '}
                                <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                {...register('title')}
                                placeholder="e.g., Cannot access server repository"
                                className="h-10 border-muted-foreground/20 shadow-inner focus-visible:ring-primary"
                            />
                            {errors.title && (
                                <p className="mt-1 text-xs font-medium text-destructive">
                                    {errors.title.message}
                                </p>
                            )}
                        </div>

                        {/* DESCRIPTION */}
                        <div className="space-y-1.5">
                            <Label className="text-sm font-medium text-foreground">
                                Description{' '}
                                <span className="text-destructive">*</span>
                            </Label>
                            <Textarea
                                {...register('description')}
                                placeholder="Please detail your steps to reproduce the issue..."
                                className="min-h-[80px] border-muted-foreground/20 focus-visible:ring-primary"
                            />
                            {errors.description && (
                                <p className="mt-1 text-xs font-medium text-destructive">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* ⚙️ STEP 2: CLASSIFICATION CARD */}
                <div className="rounded-2xl border bg-background p-6 shadow-sm transition-all hover:shadow-md">
                    <div className="mb-4 flex items-center gap-3 border-b pb-3">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                            02
                        </span>
                        <div>
                            <h3 className="text-base font-semibold text-foreground">
                                Classification
                            </h3>
                            <p className="text-xs text-muted-foreground">
                                Categorize your ticket priority
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {/* TICKET TYPE */}
                        <div className="space-y-1.5">
                            <Label className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                                Ticket Category
                            </Label>
                            <Controller
                                name="ticket_form_id"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={(value) =>
                                            field.onChange(Number(value))
                                        }
                                        value={
                                            field.value
                                                ? String(field.value)
                                                : undefined
                                        }
                                    >
                                        <SelectTrigger className="h-10 w-full bg-background shadow-sm">
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {ticketForms?.map((form) => (
                                                <SelectItem
                                                    key={form.id}
                                                    value={form.id.toString()}
                                                >
                                                    {form.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.ticket_form_id && (
                                <p className="mt-1 text-xs font-medium text-destructive">
                                    {errors.ticket_form_id.message}
                                </p>
                            )}
                        </div>

                        {/* PRIORITY SELECTION */}
                        <div className="space-y-1.5">
                            <Label className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                                Urgency / Priority
                            </Label>
                            <Controller
                                name="priority"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <SelectTrigger className="h-10 w-full bg-background shadow-sm">
                                            <SelectValue placeholder="Select Priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="low">
                                                🟢 Low Priority
                                            </SelectItem>
                                            <SelectItem value="medium">
                                                🟡 Medium Priority
                                            </SelectItem>
                                            <SelectItem value="high">
                                                🔴 High Priority
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.priority && (
                                <p className="mt-1 text-xs font-medium text-destructive">
                                    {errors.priority.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* DYNAMIC FIELDS CARD (Conditional Rendering) */}
                {currentFormStructure &&
                    currentFormStructure.fields &&
                    currentFormStructure.fields.length > 0 && (
                        <div className="animate-in rounded-2xl border border-primary/20 bg-primary/[0.01] p-6 shadow-sm transition-all duration-300 fade-in slide-in-from-bottom-2">
                            <div className="mb-4 flex items-center justify-between border-b pb-3">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                                        03
                                    </span>
                                    <div>
                                        <h3 className="text-base font-semibold text-foreground">
                                            {currentFormStructure.name} Details
                                        </h3>
                                        <p className="text-xs text-muted-foreground">
                                            Specific details needed for this
                                            form
                                        </p>
                                    </div>
                                </div>
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                                </span>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {currentFormStructure.fields.map((field) => (
                                    <div
                                        key={field.id}
                                        className={`space-y-1.5 ${
                                            field.type === 'textarea'
                                                ? 'sm:col-span-2'
                                                : 'sm:col-span-1'
                                        }`}
                                    >
                                        {field.type !== 'checkbox' && (
                                            <Label className="text-sm font-medium text-foreground/90">
                                                {field.label}
                                                {!!field.required && (
                                                    <span className="ml-0.5 text-destructive">
                                                        *
                                                    </span>
                                                )}
                                            </Label>
                                        )}

                                        {(() => {
                                            const fieldRegister = register(
                                                `custom_fields.${field.name}` as const,
                                                {
                                                    required: !!field.required,
                                                },
                                            );

                                            switch (field.type) {
                                                case 'textarea':
                                                    return (
                                                        <Textarea
                                                            {...fieldRegister}
                                                            placeholder={`Provide ${field.label.toLowerCase()}`}
                                                            className="min-h-[100px] w-full resize-y bg-background shadow-sm"
                                                        />
                                                    );

                                                case 'select':
                                                    return (
                                                        <Controller
                                                            name={
                                                                `custom_fields.${field.name}` as const
                                                            }
                                                            control={control}
                                                            rules={{
                                                                required:
                                                                    !!field.required,
                                                            }}
                                                            render={({
                                                                field: controllerField,
                                                            }) => (
                                                                <Select
                                                                    onValueChange={
                                                                        controllerField.onChange
                                                                    }
                                                                    value={
                                                                        controllerField.value as string
                                                                    }
                                                                >
                                                                    <SelectTrigger className="h-10 w-full bg-background shadow-sm">
                                                                        <SelectValue
                                                                            placeholder={`Select ${field.label.toLowerCase()}`}
                                                                        />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {(
                                                                            field as any
                                                                        ).options?.map(
                                                                            (
                                                                                opt: any,
                                                                            ) => (
                                                                                <SelectItem
                                                                                    key={
                                                                                        opt.value
                                                                                    }
                                                                                    value={
                                                                                        opt.value
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        opt.label
                                                                                    }
                                                                                </SelectItem>
                                                                            ),
                                                                        )}
                                                                    </SelectContent>
                                                                </Select>
                                                            )}
                                                        />
                                                    );

                                                case 'radio':
                                                    return (
                                                        <Controller
                                                            name={
                                                                `custom_fields.${field.name}` as const
                                                            }
                                                            control={control}
                                                            rules={{
                                                                required:
                                                                    !!field.required,
                                                            }}
                                                            render={({
                                                                field: controllerField,
                                                            }) => (
                                                                // Shadcn RadioGroup Component
                                                                <RadioGroup
                                                                    onValueChange={
                                                                        controllerField.onChange
                                                                    }
                                                                    value={
                                                                        controllerField.value as string
                                                                    }
                                                                    className="flex flex-wrap gap-4 pt-1"
                                                                >
                                                                    {(
                                                                        field as any
                                                                    ).options?.map(
                                                                        (
                                                                            opt: any,
                                                                        ) => (
                                                                            <div
                                                                                key={
                                                                                    opt.value
                                                                                }
                                                                                className="flex items-center space-x-2"
                                                                            >
                                                                                <RadioGroupItem
                                                                                    value={
                                                                                        opt.value
                                                                                    }
                                                                                    id={`${field.name}-${opt.value}`}
                                                                                />
                                                                                <Label
                                                                                    htmlFor={`${field.name}-${opt.value}`}
                                                                                    className="cursor-pointer font-normal"
                                                                                >
                                                                                    {
                                                                                        opt.label
                                                                                    }
                                                                                </Label>
                                                                            </div>
                                                                        ),
                                                                    )}
                                                                </RadioGroup>
                                                            )}
                                                        />
                                                    );

                                                case 'checkbox':
                                                    return (
                                                        <Controller
                                                            name={
                                                                `custom_fields.${field.name}` as const
                                                            }
                                                            control={control}
                                                            rules={{
                                                                required:
                                                                    !!field.required,
                                                            }}
                                                            render={({
                                                                field: controllerField,
                                                            }) => {
                                                                const value: string[] =
                                                                    controllerField.value ||
                                                                    [];

                                                                return (
                                                                    <div className="space-y-2 pt-1">
                                                                        {(
                                                                            field as any
                                                                        ).options?.map(
                                                                            (
                                                                                opt: any,
                                                                            ) => {
                                                                                const isChecked =
                                                                                    value.includes(
                                                                                        opt.value,
                                                                                    );

                                                                                return (
                                                                                    <div
                                                                                        key={
                                                                                            opt.value
                                                                                        }
                                                                                        className="flex items-center space-x-2 rounded-md border bg-background/50 p-2"
                                                                                    >
                                                                                        <Checkbox
                                                                                            id={`${field.name}-${opt.value}`}
                                                                                            checked={
                                                                                                isChecked
                                                                                            }
                                                                                            onCheckedChange={(
                                                                                                checked,
                                                                                            ) => {
                                                                                                let newValue =
                                                                                                    [
                                                                                                        ...value,
                                                                                                    ];

                                                                                                if (
                                                                                                    checked
                                                                                                ) {
                                                                                                    newValue.push(
                                                                                                        opt.value,
                                                                                                    );
                                                                                                } else {
                                                                                                    newValue =
                                                                                                        newValue.filter(
                                                                                                            (
                                                                                                                v,
                                                                                                            ) =>
                                                                                                                v !==
                                                                                                                opt.value,
                                                                                                        );
                                                                                                }

                                                                                                controllerField.onChange(
                                                                                                    newValue,
                                                                                                );
                                                                                            }}
                                                                                        />

                                                                                        <Label
                                                                                            htmlFor={`${field.name}-${opt.value}`}
                                                                                            className="cursor-pointer font-normal"
                                                                                        >
                                                                                            {
                                                                                                opt.label
                                                                                            }
                                                                                        </Label>
                                                                                    </div>
                                                                                );
                                                                            },
                                                                        )}
                                                                    </div>
                                                                );
                                                            }}
                                                        />
                                                    );
                                                default:
                                                    return (
                                                        <Input
                                                            type={field.type}
                                                            {...fieldRegister}
                                                            placeholder={`Provide ${field.label.toLowerCase()}`}
                                                            className="h-10 w-full bg-background shadow-sm"
                                                        />
                                                    );
                                            }
                                        })()}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                <div className="flex items-center justify-end gap-3 rounded-2xl border bg-muted/30 p-4 shadow-sm">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setOpen(false)}
                        className="hover:bg-muted"
                    >
                        Dismiss
                    </Button>

                    <Can
                        permission={
                            mode === 'create'
                                ? 'tickets.create'
                                : 'tickets.update'
                        }
                    >
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="min-w-[140px] font-medium shadow-md transition-all hover:opacity-90"
                        >
                            {isSubmitting
                                ? 'Processing...'
                                : mode === 'create'
                                  ? 'Submit Ticket'
                                  : 'Save Update'}
                        </Button>
                    </Can>
                </div>
            </div>
        </form>
    );
}
