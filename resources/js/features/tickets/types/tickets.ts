export interface TicketPermission {
    update: boolean;
    delete: boolean;
    assign: boolean;
    removeAssign: boolean;
    process: boolean;
    resolve: boolean;
    close: boolean;
}
export interface Staff {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    gender: string;
    birthday: string;
    address: string;
    status: string;
    department_id: number | null;
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

    can: TicketPermission;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: PaginationLink[];
}
