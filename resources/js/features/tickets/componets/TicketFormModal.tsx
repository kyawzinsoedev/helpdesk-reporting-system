import { Pencil, Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import type { Ticket } from '../types/tickets';

interface TicketFormModalProps {
    mode?: 'create' | 'edit';

    ticket?: Ticket;
}

export default function TicketFormModal({
    mode = 'create',
    ticket,
}: TicketFormModalProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {mode === 'create' ? (
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Ticket
                    </Button>
                ) : (
                    <Button variant="outline" size="icon">
                        <Pencil className="h-4 w-4" />
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>
                        {mode === 'create' ? 'Create Ticket' : 'Edit Ticket'}
                    </DialogTitle>

                    <DialogDescription>
                        {mode === 'create'
                            ? 'Create new ticket information.'
                            : 'Update ticket information.'}
                    </DialogDescription>
                </DialogHeader>

                {/* <TicketForm
                    mode={mode}
                    ticket={ticket}
                    setOpen={setOpen}
                /> */}
            </DialogContent>
        </Dialog>
    );
}
