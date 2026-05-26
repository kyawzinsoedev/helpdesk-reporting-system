import { z } from 'zod';

export const departmentSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, 'Name is required'),
    department_code: z.string().min(1, 'Code is required').max(10),
});

export type DepartmentFormData = z.infer<typeof departmentSchema>;

export interface Department extends DepartmentFormData {
    id: number;
}
