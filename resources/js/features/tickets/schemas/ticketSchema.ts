import { z } from 'zod';

export const ticketSchema = z.object({
    id: z.number().optional(),

    ticket_form_id: z.number().min(1, 'Ticket form is required'),

    title: z.string().min(1, 'Title is required').max(255, 'Title is too long'),

    description: z.string().min(1, 'Description is required'),

    priority: z.string().min(1, 'Priority is required'),

    status: z.string().min(1, 'Status is required'),

    created_at: z.string().optional(),

    updated_at: z.string().optional(),
});

export type TicketFormData = z.infer<typeof ticketSchema>;
