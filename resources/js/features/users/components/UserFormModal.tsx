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
import UserForm from '@/features/users/components/UserForm';
import type { Department } from '../types/departments';
import type { Role } from '../types/roles';
import type { User } from '../types/user';
interface UserFormModalProps {
    mode?: 'create' | 'edit';

    user?: User;
    departments?: Department[];
    roles?: Role[];
}

export default function UserFormModal({
    mode = 'create',
    user,
    departments,
    roles,
}: UserFormModalProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {mode === 'create' ? (
                    <Button title="Add User">
                        <Plus className="mr-2 h-4 w-4" />
                        Add User
                    </Button>
                ) : (
                    <Button variant="outline" size="icon" title="Edit User">
                        <Pencil className="h-4 w-4" />
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>
                        {mode === 'create' ? 'Create User' : 'Edit User'}
                    </DialogTitle>

                    <DialogDescription>
                        {mode === 'create'
                            ? 'Create new user information.'
                            : 'Update user information.'}
                    </DialogDescription>
                </DialogHeader>

                <UserForm
                    mode={mode}
                    departments={departments}
                    roles={roles}
                    user={user}
                    setOpen={setOpen}
                />
            </DialogContent>
        </Dialog>
    );
}
