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
import RoleForm from './RoleForm';
import type { Permission, Role } from '@/pages/Admin/Roles/Index';

interface RoleFormModalProps {
    mode?: 'create' | 'edit';
    permissions: Permission[];
    role?: Role;
}

export default function RoleFormModal({
    mode = 'create',
    permissions,
    role,
}: RoleFormModalProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {mode === 'create' ? (
                    <Button title="Add Role">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Role & Permissions
                    </Button>
                ) : (
                    <Button variant="outline" size="icon" title="Edit Role">
                        <Pencil className="h-4 w-4" />
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>
                        {mode === 'create' ? 'Create Role' : 'Edit Role'}
                    </DialogTitle>

                    <DialogDescription>
                        {mode === 'create'
                            ? 'Create new role information.'
                            : 'Update role information.'}
                    </DialogDescription>
                </DialogHeader>

                <RoleForm
                    permissions={permissions}
                    mode={mode}
                    role={role}
                    setOpen={setOpen}
                />
            </DialogContent>
        </Dialog>
    );
}
