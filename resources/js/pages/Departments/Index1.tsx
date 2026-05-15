import { Eye, Pencil, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

import CreateDepartment from '@/components/departments/CreateDepartment';
import EditDepartment from '@/components/departments/EditDepartment';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { Button } from '@/components/ui/button';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { router } from '@inertiajs/react';

interface Department {
    id: number;
    name: string;
    department_code: string;
}

interface Props {
    departments: Department[];
}

type ModalType = 'view' | 'edit' | null;

export default function Index({ departments }: Props) {
    const [createOpen, setCreateOpen] = useState(false);

    const [modal, setModal] = useState<{
        type: ModalType;
        data: Department | null;
    }>({
        type: null,
        data: null,
    });

    const openModal = (type: ModalType, department: Department) => {
        setModal({ type, data: department });
    };

    const closeModal = () => {
        setModal({ type: null, data: null });
    };

    const handleDelete = (id: number) => {
        console.log('delete:', id);
        router.delete(`/departments/${id}`);
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Department Management</h1>

                <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                    <Button onClick={() => setCreateOpen(true)}>
                        Create Department
                    </Button>

                    <CreateDepartment
                        departments={departments}
                        setIsOpen={setCreateOpen}
                    />
                </Dialog>
            </div>

            {/* Table */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Code</TableHead>
                        <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {departments.map((department) => (
                        <TableRow key={department.id}>
                            <TableCell>{department.id}</TableCell>
                            <TableCell>{department.name}</TableCell>
                            <TableCell>{department.department_code}</TableCell>

                            <TableCell className="flex justify-center gap-2">
                                {/* VIEW */}
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        openModal('view', department)
                                    }
                                >
                                    <Eye />
                                </Button>

                                {/* EDIT */}
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        openModal('edit', department)
                                    }
                                >
                                    <Pencil />
                                </Button>

                                {/* DELETE */}
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive">
                                            <Trash2 />
                                        </Button>
                                    </AlertDialogTrigger>

                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Delete {department.name}?
                                            </AlertDialogTitle>

                                            <AlertDialogDescription>
                                                This action cannot be undone.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>

                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Cancel
                                            </AlertDialogCancel>

                                            <AlertDialogAction
                                                onClick={() =>
                                                    handleDelete(department.id)
                                                }
                                            >
                                                Delete
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* VIEW MODAL */}
            <Dialog open={modal.type === 'view'} onOpenChange={closeModal}>
                {modal.data && modal.type === 'view' && (
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Department Details</DialogTitle>
                        </DialogHeader>

                        <div className="space-y-2 text-sm">
                            <p>
                                <b>ID:</b> {modal.data.id}
                            </p>
                            <p>
                                <b>Name:</b> {modal.data.name}
                            </p>
                            <p>
                                <b>Code:</b> {modal.data.department_code}
                            </p>
                        </div>

                        <DialogFooter>
                            <Button onClick={closeModal}>Close</Button>
                        </DialogFooter>
                    </DialogContent>
                )}
            </Dialog>

            {/* EDIT MODAL */}
            <Dialog open={modal.type === 'edit'} onOpenChange={closeModal}>
                {modal.data && modal.type === 'edit' && (
                    <EditDepartment
                        department={modal.data}
                        departments={departments}
                        setIsEditOpen={() => closeModal()}
                    />
                )}
            </Dialog>
        </div>
    );
}
