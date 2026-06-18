import { Link } from '@inertiajs/react';
import DropDownUserAdmin from './dropdown-user-admin/DropDownUserAdmin';
import { Button } from './ui/button';

export default function Navbar() {
    return (
        <div className="flex items-center justify-center gap-2 border-y bg-background px-6 py-2">
            <Button variant="ghost" asChild>
                <Link href="/dashboard">Home</Link>
            </Button>

            <DropDownUserAdmin />

            <Button variant="ghost" asChild>
                <Link href="/tickets">Tickets</Link>
            </Button>

            <Button variant="ghost" asChild>
                <Link href="/settings">Settings</Link>
            </Button>
        </div>
    );
}
