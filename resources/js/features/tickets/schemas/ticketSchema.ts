import { z } from 'zod';

const ticketFormFieldSchema = z.object({
    id: z.number(),
    ticket_form_id: z.number(),
    label: z.string(),
    name: z.string(),
    type: z.string(),
    required: z.union([z.boolean(), z.number()]),
    options: z.array(z.string()),
});

export const ticketFormStructureSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    fields: z.array(ticketFormFieldSchema),
});

export const ticketSchema = z.object({
    id: z.number().optional(),
    ticket_form_id: z.number().min(1, 'Ticket form is required'),
    title: z.string().min(1, 'Title is required').max(255, 'Title is too long'),
    description: z.string().min(1, 'Description is required'),
    priority: z.string().min(1, 'Priority is required'),
    status: z.string().min(1, 'Status is required').optional(),
    custom_fields: z.record(z.string(), z.any()).optional(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
});

export type TicketFormData = z.infer<typeof ticketSchema>;

export type TicketFormStructure = z.infer<typeof ticketFormStructureSchema>;
