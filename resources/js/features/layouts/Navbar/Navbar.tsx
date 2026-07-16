import { Link } from '@inertiajs/react';
import DropDownUserAdmin from '../../../components/dropdown-user-admin/DropDownUserAdmin';
import { Button } from '../../../components/ui/button';
import Can from '@/features/permissions/Can';

export default function Navbar() {
    return (
        <div className="flex items-center justify-center gap-2 border-y bg-background px-6 py-2">
            <Button variant="ghost" asChild>
                <Link href="/">Dashboard</Link>
            </Button>

            <Can
                permission={[
                    'users.view',
                    'departments.view',
                    'ticket_forms.view',
                ]}
            >
                <DropDownUserAdmin />
            </Can>

            <Can permission="tickets.view">
                <Button variant="ghost" asChild>
                    <Link href="/tickets">Tickets</Link>
                </Button>
            </Can>
        </div>
    );
}
