import { Trash2Icon, Eye, Pencil, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import CreateDepartment from '@/components/departments/CreateDepartment';
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

interface Department {
    id: number;
    name: string;
    department_code: string;
}
interface Props {
    departments: Department[];
}
export default function Index({ departments }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="space-y-4">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Department Management
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Manage your organization's department.
                    </p>
                </div>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button>Create Department</Button>
                    </DialogTrigger>
                    <CreateDepartment
                        departments={departments}
                        setIsOpen={setIsOpen}
                    />
                </Dialog>
            </div>
            <div className="overflow-hidden rounded-md border bg-card shadow-sm">
                <Table>
                    {departments?.length > 0 && (
                        <TableCaption>A list of your departments.</TableCaption>
                    )}
                    <TableHeader>
                        <TableRow className="bg-muted/50">
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
                                <TableRow key={department.id}>
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
        </div>
    );
}
