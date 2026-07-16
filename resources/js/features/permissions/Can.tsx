import { usePage } from '@inertiajs/react';

interface Props {
    permission: string | string[] | null;
    requireAll?: boolean;
    children: React.ReactNode;
}

export default function Can({
    permission,
    requireAll = false,
    children,
}: Props) {
    const { auth } = usePage().props as any;

    const permissions: string[] = auth?.user?.permissions ?? [];

    if (!permission) {
        return <>{children}</>;
    }

    const requiredPermissions = Array.isArray(permission)
        ? permission
        : [permission];

    const hasPermission = requireAll
        ? requiredPermissions.every((p) => permissions.includes(p))
        : requiredPermissions.some((p) => permissions.includes(p));

    if (!hasPermission) {
        return null;
    }

    return <>{children}</>;
}
