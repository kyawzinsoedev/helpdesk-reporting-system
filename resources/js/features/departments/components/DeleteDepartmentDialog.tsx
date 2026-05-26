import { useForm } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
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

interface DeleteDepartmentDialogProps {
    department: {
        id: number;
        name?: string;
        department_code?: string;
    };
}

export default function DeleteDepartmentDialog({
    department,
}: DeleteDepartmentDialogProps) {
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        destroy(`/departments/${department.id}`);
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Department </AlertDialogTitle>

                    <AlertDialogDescription>
                        Are you sure you want to delete{' '}
                        <span className="font-semibold">{department.name}</span>
                        ?
                        <br />
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={processing}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
