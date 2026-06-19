import type { Department } from './departments';
import type { Role } from './roles';

export interface User {
    id: number;

    name: string;

    username: string;

    email: string;

    phone?: string;

    birthday?: string;

    gender?: 'male' | 'female';

    address?: string;

    status: 'active' | 'inactive';

    department_id?: number;

    department?: Department;

    roles?: Role[];

    created_at: string;

    updated_at: string;
}
