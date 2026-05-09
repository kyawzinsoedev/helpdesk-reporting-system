import { Trash2Icon, Eye, Pencil, Trash2 } from 'lucide-react';

import React from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

import { Field, FieldGroup } from '@/components/ui/field';

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
                {/* <Button>Create</Button> */}
                <Dialog>
                    <form>
                        <DialogTrigger asChild>
                            <Button>Create</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-sm">
                            <DialogHeader>
                                <DialogTitle>Create Department</DialogTitle>
                                <DialogDescription>
                                    Click save when you&apos;re done.
                                </DialogDescription>
                            </DialogHeader>
                            {/* <FieldGroup>
                                                        <Field>
                                                            <Label htmlFor="name-1">
                                                                Name
                                                            </Label>
                                                            <Input
                                                                id="name-1"
                                                                name="name"
                                                                defaultValue="Pedro Duarte"
                                                            />
                                                        </Field>
                                                        <Field>
                                                            <Label htmlFor="username-1">
                                                                Username
                                                            </Label>
                                                            <Input
                                                                id="username-1"
                                                                name="username"
                                                                defaultValue="@peduarte"
                                                            />
                                                        </Field>
                                                    </FieldGroup> */}
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">Save</Button>
                            </DialogFooter>
                        </DialogContent>
                    </form>
                </Dialog>
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
                                        {/* Show Details  */}
                                        <Dialog>
                                            <form>
                                                <DialogTrigger asChild>
                                                    <Button variant="outline">
                                                        <Eye />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-sm">
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            Details About
                                                            Department
                                                        </DialogTitle>
                                                        <DialogDescription>
                                                            Click save when
                                                            you&apos;re done.
                                                        </DialogDescription>
                                                    </DialogHeader>

                                                    <DialogFooter>
                                                        <DialogClose asChild>
                                                            <Button variant="outline">
                                                                Close
                                                            </Button>
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </form>
                                        </Dialog>
                                        {/* Edit Button */}
                                        <Dialog>
                                            <form>
                                                <DialogTrigger asChild>
                                                    <Button variant="outline">
                                                        <Pencil />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-sm">
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            Edit Department
                                                        </DialogTitle>
                                                        <DialogDescription>
                                                            Click save when
                                                            you&apos;re done.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    {/* <FieldGroup>
                                                        <Field>
                                                            <Label htmlFor="name-1">
                                                                Name
                                                            </Label>
                                                            <Input
                                                                id="name-1"
                                                                name="name"
                                                                defaultValue="Pedro Duarte"
                                                            />
                                                        </Field>
                                                        <Field>
                                                            <Label htmlFor="username-1">
                                                                Username
                                                            </Label>
                                                            <Input
                                                                id="username-1"
                                                                name="username"
                                                                defaultValue="@peduarte"
                                                            />
                                                        </Field>
                                                    </FieldGroup> */}
                                                    <DialogFooter>
                                                        <DialogClose asChild>
                                                            <Button variant="outline">
                                                                Cancel
                                                            </Button>
                                                        </DialogClose>
                                                        <Button type="submit">
                                                            Save changes
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </form>
                                        </Dialog>

                                        {/* Delete  */}
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="destructive">
                                                    <Trash2 />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent size="sm">
                                                <AlertDialogHeader>
                                                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                                                        <Trash2Icon />
                                                    </AlertDialogMedia>
                                                    <AlertDialogTitle>
                                                        Delete chat?
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This will permanently
                                                        delete this chat
                                                        conversation. View{' '}
                                                        <a href="#">Settings</a>{' '}
                                                        delete any memories
                                                        saved during this chat.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel variant="outline">
                                                        Cancel
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction variant="destructive">
                                                        Delete
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
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
