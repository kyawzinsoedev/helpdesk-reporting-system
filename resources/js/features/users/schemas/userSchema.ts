import { z } from 'zod';

export const userSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, 'Name is required'),
    username: z.string().min(1, 'Username is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    birthday: z.string().optional(),
    gender: z.string().optional(),
    address: z.string().optional(),
    status: z.string().default('active'),
    department_id: z.number().optional(),
});

export type UserFormData = z.infer<typeof userSchema>;
