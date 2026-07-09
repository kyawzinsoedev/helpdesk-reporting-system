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
import type { Department } from '../shcemas/departmentSchema';
import DepartmentForm from './DepartmentForm';

interface DepartmentFormModalProps {
    mode?: 'create' | 'edit';

    department?: Department;
}

export default function DepartmentFormModal({
    mode = 'create',
    department,
}: DepartmentFormModalProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {mode === 'create' ? (
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Department
                    </Button>
                ) : (
                    <Button variant="outline" size="icon">
                        <Pencil className="h-4 w-4" />
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent
                onOpenAutoFocus={(e) => e.preventDefault()}
                className="sm:max-w-2xl"
            >
                <DialogHeader>
                    <DialogTitle>
                        {mode === 'create'
                            ? 'Create Department'
                            : 'Edit Department'}
                    </DialogTitle>

                    <DialogDescription>
                        {mode === 'create'
                            ? 'Create new department information.'
                            : 'Update department information.'}
                    </DialogDescription>
                </DialogHeader>

                <DepartmentForm
                    mode={mode}
                    department={department}
                    setOpen={setOpen}
                />
            </DialogContent>
        </Dialog>
    );
}
