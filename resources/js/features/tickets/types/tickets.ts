export interface Staff {
    id: number;
    name: string;
    username: string;
}
export interface Ticket {
    id: number;

    assigned_staff?: Staff | null;

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

    user?: {
        id: number;
        name: string;
        email?: string;
    };

    remark?: string;
}
