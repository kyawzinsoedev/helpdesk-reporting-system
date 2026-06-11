import { zodResolver } from '@hookform/resolvers/zod';
// import { router } from '@inertiajs/react';
import { useForm, Controller } from 'react-hook-form';
// import { toast } from 'sonner';
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
import { ticketSchema } from '../schemas/ticketSchema';
import type {
    TicketFormData,
    TicketFormStructure,
} from '../schemas/ticketSchema';
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
    // setOpen,
}: Props) {
    const {
        control,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<TicketFormData>({
        defaultValues: {
            ticket_form_id: ticket?.ticket_form_id ?? undefined,
            title: ticket?.title ?? '',
            description: ticket?.description ?? '',
            priority: ticket?.priority ?? 'low',
            status: ticket?.status ?? undefined,
        },
        resolver: zodResolver(ticketSchema),
    });

    console.log('Tickets ', ticket);

    console.log('Tickets Forms ', ticketForms);

    const onSubmit = async (data: TicketFormData) => {
        console.log('Ticket Form Data = ', data);
        // router.post('tickets', data, {
        //     onSuccess: () => {
        //         toast.message('Ticket Created Successfully');
        //         setOpen(false);
        //     },
        // });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6 scroll-auto rounded-2xl border p-6">
                {/* FORM SELECT */}
                {/* <div className="space-y-2">
                    <Label>Ticket Form</Label>

                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Choose Ticket Form" />
                        </SelectTrigger>

                        <SelectContent>
                            {[1, 2]?.map((t) => (
                                <SelectItem key={t} value="1">
                                    {t}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div> */}

                {/* PRIORITY */}
                <div className="space-y-2">
                    <Label>Priority</Label>

                    <Controller
                        name="priority"
                        control={control}
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Priority" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">
                                        Medium
                                    </SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.priority && (
                        <p className="text-sm text-red-500">
                            {errors.priority.message}
                        </p>
                    )}
                </div>

                {/* TITLE */}
                <div className="space-y-2">
                    <Label>Title</Label>
                    <Input {...register('title')} />
                </div>
                {errors.title && (
                    <p className="text-sm text-red-500">
                        {' '}
                        {errors.title.message}
                    </p>
                )}

                {/* DESCRIPTION */}
                <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea {...register('description')} />
                </div>
                {errors.description && (
                    <p className="text-sm text-red-500">
                        {' '}
                        {errors.description.message}
                    </p>
                )}

                {/* DYNAMIC FIELDS */}
                {/* <div className="space-y-5 rounded-xl border p-5">show some</div> */}

                {/* SUBMIT */}
                <div className="flex justify-end">
                    <Button type="submit" disabled={isSubmitting}>
                        {mode === 'create' ? 'Submit' : 'Update'}
                    </Button>
                </div>
            </div>
        </form>
    );
}
