import { Link } from '@inertiajs/react';
import DropDownReport from './dropdown-reports/DropDownReport';
import { Button } from './ui/button';
import DropDownUserAdmin from './dropdown-user-admin/DropDownUserAdmin';

export default function Navbar() {
    return (
        <div className="flex items-center justify-center gap-2 border-y bg-background px-6 py-2">
            <Button variant="ghost" asChild>
                <Link href="/dashboard">Home</Link>
            </Button>

            {/* <Button variant="ghost" asChild>
                <Link href="/users">User Admin</Link>
            </Button> */}

            <DropDownUserAdmin />

            <Button variant="ghost" asChild>
                <Link href="/departments">Departments</Link>
            </Button>

            <DropDownReport />

            <Button variant="ghost" asChild>
                <Link href="/forms">Forms</Link>
            </Button>

            <Button variant="ghost" asChild>
                <Link href="/tickets">Tickets</Link>
            </Button>

            <Button variant="ghost" asChild>
                <Link href="/settings">Settings</Link>
            </Button>
        </div>
    );
}
