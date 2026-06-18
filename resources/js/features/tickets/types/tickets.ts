export interface Ticket {
    id: number;

    ticket_form_id: number;

    form?: {
        id: number;
        name: string;
    };

    custom_fields?: Record<string, any>;

    title: string;

    description: string;

    priority: string;

    status: string;

    created_at: string;

    updated_at: string;
}
