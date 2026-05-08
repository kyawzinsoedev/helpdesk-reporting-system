import React from 'react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import departments from '@/routes/departments';

export default function Index() {
    const departments = [
        {
            id: 1,
            name: 'Information Technology',
            department_code: 'IT-001',
            total_users: 12,
            status: 'Active',
        },
        {
            id: 2,
            name: 'Human Resources',
            department_code: 'HR-002',
            total_users: 5,
            status: 'Active',
        },
        {
            id: 3,
            name: 'Finance & Accounting',
            department_code: 'FIN-003',
            total_users: 8,
            status: 'Active',
        },
        {
            id: 4,
            name: 'Marketing & Sales',
            department_code: 'MKT-004',
            total_users: 15,
            status: 'Active',
        },
        {
            id: 5,
            name: 'Operations Management',
            department_code: 'OPS-005',
            total_users: 20,
            status: 'Inactive',
        },
    ];

    return (
        <>
            <div className="flex items-center justify-between">
                <span className="text-xl font-bold">Department</span>
                <Button>Create</Button>
            </div>
            <div>
                <Table>
                    {departments?.length > 0 && (
                        <TableCaption>A list of your departments.</TableCaption>
                    )}
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID:</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Department Code</TableHead>
                            <TableHead className="text-center">
                                Action
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    {departments?.length > 0 ? (
                        <TableBody>
                            {departments?.map((department) => (
                                <TableRow>
                                    <TableCell className="font-medium">
                                        {department.id}
                                    </TableCell>
                                    <TableCell>{department.name}</TableCell>
                                    <TableCell>
                                        {department.department_code}
                                    </TableCell>
                                    <TableCell className="flex items-center justify-center gap-2 text-center">
                                        <Button>Edit</Button>
                                        <Button variant="destructive">
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    ) : (
                        <TableCaption>No Departments Found !</TableCaption>
                    )}
                </Table>
            </div>
        </>
    );
}
