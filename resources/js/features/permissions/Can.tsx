import { usePage } from '@inertiajs/react';

interface Props {
    permission: string;
    children: React.ReactNode;
}

export default function Can({ permission, children }: Props) {
    const { auth } = usePage().props as any;

    const permissions = auth?.user?.permissions ?? [];

    if (!permissions.includes(permission)) {
        return null;
    }

    return children;
}
