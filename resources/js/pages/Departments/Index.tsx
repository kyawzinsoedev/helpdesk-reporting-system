import { Eye, Pencil, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

import CreateDepartment from '@/components/departments/CreateDepartment';
import EditDepartment from '@/components/departments/EditDepartment';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { Button } from '@/components/ui/button';

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface Department {
    id: number;
    name: string;
    department_code: string;
}

interface Props {
    departments: Department[];
}

export default function Index({ departments }: Props) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editingDepartment, setEditingDepartment] =
        useState<Department | null>(null);

    const handleEditClick = (department: Department) => {
        setEditingDepartment(department);
        setIsEditOpen(true);
    };

    const handleEditClose = () => {
        setIsEditOpen(false);
        setEditingDepartment(null);
    };

    const handleDelete = (id: number) => {
        console.log('Delete department:', id);
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Department Management
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Manage your organization's departments.
                    </p>
                </div>

                {/* Create */}
                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                        <Button>Create Department</Button>
                    </DialogTrigger>

                    <CreateDepartment
                        departments={departments}
                        setIsOpen={setIsCreateOpen}
                    />
                </Dialog>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-md border bg-card shadow-sm">
                <Table>
                    {departments.length > 0 && (
                        <TableCaption>A list of your departments.</TableCaption>
                    )}

                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Department Code</TableHead>
                            <TableHead className="text-center">
                                Action
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {departments.length > 0 ? (
                            departments.map((department) => (
                                <TableRow key={department.id}>
                                    <TableCell className="font-medium">
                                        {department.id}
                                    </TableCell>

                                    <TableCell>{department.name}</TableCell>

                                    <TableCell>
                                        {department.department_code}
                                    </TableCell>

                                    <TableCell className="flex items-center justify-center gap-2">
                                        {/* View */}
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline">
                                                    <Eye />
                                                </Button>
                                            </DialogTrigger>

                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Department Details
                                                    </DialogTitle>
                                                    <DialogDescription>
                                                        Full information about
                                                        this department.
                                                    </DialogDescription>
                                                </DialogHeader>

                                                <div className="space-y-2 text-sm">
                                                    <p>
                                                        <strong>ID:</strong>{' '}
                                                        {department.id}
                                                    </p>
                                                    <p>
                                                        <strong>Name:</strong>{' '}
                                                        {department.name}
                                                    </p>
                                                    <p>
                                                        <strong>Code:</strong>{' '}
                                                        {
                                                            department.department_code
                                                        }
                                                    </p>
                                                </div>

                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button variant="outline">
                                                            Close
                                                        </Button>
                                                    </DialogClose>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>

                                        {/* Edit */}
                                        <Button
                                            variant="outline"
                                            onClick={() =>
                                                handleEditClick(department)
                                            }
                                        >
                                            <Pencil />
                                        </Button>

                                        {/* Delete */}
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="destructive">
                                                    <Trash2 />
                                                </Button>
                                            </AlertDialogTrigger>

                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>
                                                        Delete {department.name}
                                                        ?
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be
                                                        undone. This will
                                                        permanently delete the
                                                        department.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>

                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>
                                                        Cancel
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() =>
                                                            handleDelete(
                                                                department.id,
                                                            )
                                                        }
                                                        className="bg-red-600 hover:bg-red-700"
                                                    >
                                                        Delete
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    className="text-center text-muted-foreground"
                                >
                                    No Departments Found!
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Edit Dialog */}
            <Dialog open={isEditOpen} onOpenChange={handleEditClose}>
                {editingDepartment && (
                    <EditDepartment
                        key={editingDepartment.id}
                        department={editingDepartment}
                        departments={departments}
                        setIsEditOpen={setIsEditOpen}
                    />
                )}
            </Dialog>
        </div>
    );
}
