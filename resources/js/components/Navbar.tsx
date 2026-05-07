import { Link } from '@inertiajs/react';
import React from 'react';
import { Button } from './ui/button';

// import user from '@/routes/user';

export default function Navbar() {
    return (
        <div className="flex items-center gap-2 border-y bg-background px-6 py-2">
            <Button variant="ghost" asChild>
                <Link href="/dashboard">Home</Link>
            </Button>

            <Button variant="ghost" asChild>
                <Link href="/users">User Admin</Link>
            </Button>

            <Button variant="ghost" asChild>
                <Link href="/departments">Departments</Link>
            </Button>

            <Button variant="ghost">Report</Button>
        </div>
    );
}
