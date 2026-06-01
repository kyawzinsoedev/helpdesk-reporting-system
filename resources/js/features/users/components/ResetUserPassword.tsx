import { useForm } from '@inertiajs/react';
import { UserKey } from 'lucide-react';

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

interface ResetUserDialogProps {
    user: {
        id: number;
        name?: string;
    };
}

export default function ResetUserPassword({ user }: ResetUserDialogProps) {
    const { put, processing } = useForm();

    const handleReset = () => {
        put(`/users/${user.id}/reset-password`);
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline" size="icon" title="Reset Password">
                    <UserKey className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Reset Password</AlertDialogTitle>

                    <AlertDialogDescription>
                        Are you sure you want to reset password for{' '}
                        <span className="font-semibold">
                            {user.name ?? 'name'}
                        </span>
                        ?
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                    <AlertDialogAction asChild>
                        <Button
                            variant="outline"
                            title="Reset Password"
                            onClick={handleReset}
                            disabled={processing}
                        >
                            Reset
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
