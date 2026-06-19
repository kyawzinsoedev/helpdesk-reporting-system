import { z } from 'zod';

export const userSchema = z.object({
    id: z.number().optional(),

    name: z.string().min(1, 'Name is required'),

    username: z.string().min(1, 'Username is required'),

    email: z.string().email('Invalid email'),

    phone: z.string().optional(),

    birthday: z.string().optional(),

    gender: z.enum(['male', 'female']).optional(),

    address: z.string().optional(),

    status: z.enum(['active', 'inactive']).default('active'),

    department_id: z.number().min(1, 'Department is required'),

    role: z.string().min(1, 'Role is required'),
});

export type UserFormData = z.infer<typeof userSchema>;
