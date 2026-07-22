import { Head, Link } from '@inertiajs/react';
import { TriangleAlert } from 'lucide-react';

import { Button } from '@/components/ui/button';
import TextLink from '@/components/text-link';
import { login } from '@/routes';

export default function ForgotPassword() {
    return (
        <>
            <Head title="Forgot Password" />

            <div className="rounded-xl border bg-background p-8 shadow-sm">
                <div className="flex justify-center">
                    <div className="rounded-full bg-amber-100 p-4">
                        <TriangleAlert className="h-8 w-8 text-amber-600" />
                    </div>
                </div>

                <h2 className="mt-6 text-center text-2xl font-bold">
                    Password Reset Required
                </h2>

                <p className="mt-4 text-center text-muted-foreground">
                    Password resets are managed by your system administrator.
                </p>

                <p className="mt-2 text-center text-muted-foreground">
                    Please contact your administrator to request a password
                    reset.
                </p>

                <div className="mt-8 rounded-lg border bg-muted/40 p-4">
                    <p className="text-sm text-muted-foreground">
                        Administrator Email
                    </p>

                    <p className="mt-1 font-semibold">admin@company.com</p>
                </div>

                <Button asChild className="mt-8 w-full">
                    <Link href={login().url}>Back to Login</Link>
                </Button>
            </div>
        </>
    );
}

ForgotPassword.layout = {
    title: 'Forgot Password',
    description: 'Contact your system administrator to reset your password.',
};
