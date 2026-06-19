import { router } from '@inertiajs/react';
import { UserRound } from 'lucide-react';
import { useState } from 'react';
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
import { toast } from 'sonner';

interface AssignProps {
    ticket: Ticket;
    staffs: Staff[];
}

export default function AssignTicketDialog({ ticket, staffs }: AssignProps) {
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
                    setOpen(false);
                    setSelectedDeptId('');
                    setSelectedStaffId('');
                    toast.message('Ticket Assigned Successfully');
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
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Assign Ticket to Staff</DialogTitle>
                    <DialogDescription>
                        Select a staff from the department to handle Ticket #
                        {ticket.id}.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    {/* Department Dropdown  */}
                    <div className="flex flex-col gap-2">
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

                    {/* Staff Dropdown */}
                    <div className="flex flex-col gap-2">
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

                    {error && (
                        <p className="text-sm font-medium text-destructive">
                            {error}
                        </p>
                    )}
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleAssign}>Confirm Assignment</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
