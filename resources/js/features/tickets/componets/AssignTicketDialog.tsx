import { router } from '@inertiajs/react';
import { UserX, UserRound } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import type { Staff } from '@/pages/Admin/Tickets/Index';
import type { Ticket } from '../types/tickets';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface AssignProps {
    ticket: Ticket;
    staffs: Staff[];
}

export default function AssignTicketDialog({ ticket, staffs }: AssignProps) {
    console.log('Ticket From Assign ticket dialog ', ticket);
    console.log('Staffs From Assign ticket dialog', staffs);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [selectedDeptId, setSelectedDeptId] = useState<string>('');
    const [selectedStaffId, setSelectedStaffId] = useState<string>('');

    const handleAssign = async () => {
        setError(null);

        const selectedStaff = staffs.find(
            (s) => s.id == Number(selectedStaffId),
        );

        if (!selectedStaff) {
            setError('Please select a staff member.');
            return;
        }

        if (
            !selectedStaff.department_id ||
            selectedStaff.department_id === '0'
        ) {
            setError('This staff does not belong to any department.');
            return;
        }

        router.patch(
            `/tickets/${ticket.id}/assign`,
            {
                assign_to: selectedStaff.id,
                ticket_name: ticket.title,
            },
            {
                onSuccess: () => {
                    setSelectedDeptId('');
                    setSelectedStaffId('');
                    toast.success('Ticket Assigned Successfully');
                },
                onError: (errors) => {
                    if (errors.assign_to) {
                        setError(errors.assign_to);
                    } else {
                        setError('Something went wrong. Please try again.');
                    }
                },
            },
        );
    };

    const handleRemoveAssign = (staffId: number) => {
        if (
            !confirm(
                'Are you sure you want to remove this staff from the ticket?',
            )
        )
            return;

        router.delete(`/tickets/${ticket.id}/assign/${staffId}`, {
            onSuccess: () => {
                toast.success('Staff removed from ticket successfully');
            },
            onError: () => {
                toast.error('Failed to remove staff. Please try again.');
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    title="Assign Staff"
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                >
                    <UserRound className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[900px]">
                <DialogHeader>
                    <DialogTitle>Assign Ticket to Staff</DialogTitle>
                    <DialogDescription>
                        Select a staff from the department to handle Ticket #
                        {ticket.id}.
                    </DialogDescription>
                </DialogHeader>

                {/* Dropdowns Row */}
                <div className="flex flex-col items-end gap-4 sm:flex-row">
                    <div className="flex w-full flex-col gap-2">
                        <Label className="text-sm font-medium">
                            Select Department
                        </Label>
                        <Select
                            onValueChange={(value) => {
                                setSelectedDeptId(value);
                                setSelectedStaffId('');
                                setError(null);
                            }}
                            value={selectedDeptId}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Choose a department..." />
                            </SelectTrigger>
                            <SelectContent>
                                {Array.from(
                                    new Map(
                                        staffs.map((s) => [
                                            s.department_id,
                                            s.department_name,
                                        ]),
                                    ).entries(),
                                ).map(([id, name]) => (
                                    <SelectItem key={id} value={String(id)}>
                                        {name ?? 'No Department'}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex w-full flex-col gap-2">
                        <label className="text-sm font-medium">
                            Select Staff
                        </label>
                        <Select
                            onValueChange={setSelectedStaffId}
                            value={selectedStaffId}
                            disabled={!selectedDeptId}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue
                                    placeholder={
                                        selectedDeptId
                                            ? 'Choose a staff member...'
                                            : 'Please select department first'
                                    }
                                />
                            </SelectTrigger>
                            <SelectContent>
                                {staffs
                                    .filter(
                                        (staff) =>
                                            String(staff.department_id) ===
                                            selectedDeptId,
                                    )
                                    .map((staff) => (
                                        <SelectItem
                                            key={staff.id}
                                            value={String(staff.id)}
                                        >
                                            {staff.name}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {error && (
                    <p className="mt-2 text-sm font-medium text-destructive">
                        {error}
                    </p>
                )}

                {/* Assigned Staffs Table */}
                <div className="mt-4 max-h-[250px] overflow-y-auto rounded-md border">
                    <Table>
                        <TableCaption>
                            A list of assigned staffs for this ticket.
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead className="w-[100px] text-center">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {ticket?.assigned_staff ? (
                                <TableRow key={ticket.assigned_staff.id}>
                                    <TableCell className="font-medium">
                                        {ticket.assigned_staff.name}
                                    </TableCell>
                                    <TableCell>
                                        {/* လက်ရှိ staff ရဲ့ department_id နဲ့ ကိုက်ညီတဲ့ department name ကို staffs list ထဲက ရှာပြတာပါ */}
                                        {staffs.find(
                                            (s) =>
                                                s.id ===
                                                ticket.assigned_staff?.id,
                                        )?.department_name ?? 'N/A'}
                                    </TableCell>
                                    <TableCell className="flex justify-center">
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() =>
                                                handleRemoveAssign(
                                                    ticket.assigned_staff!.id,
                                                )
                                            }
                                            title="Remove Assignment"
                                        >
                                            <UserX className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={3}
                                        className="py-4 text-center text-muted-foreground"
                                    >
                                        No staff assigned to this ticket yet.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Close
                    </Button>
                    <Button onClick={handleAssign}>Confirm Assignment</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
