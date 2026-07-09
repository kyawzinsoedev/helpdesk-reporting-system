import { useForm } from '@inertiajs/react'; // သို့မဟုတ် react state သုံးနိုင်ပါတယ်
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Permission, Role } from '@/pages/Admin/Roles/Index';
import { toast } from 'sonner';
import Can from '@/features/permissions/Can';

interface RoleFormProps {
    mode?: 'create' | 'edit';
    setOpen?: (open: boolean) => void;
    permissions: Permission[];
    role?: Role;
}

export default function RoleForm({
    mode = 'create',
    setOpen,
    permissions,
    role,
}: RoleFormProps) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: role?.name || '',
        permissions: role?.permissions.map((p) => p.id) || ([] as number[]),
    });

    const groupedPermissions = permissions.reduce(
        (groups, permission) => {
            const [module] = permission.name.split('.');
            if (!groups[module]) groups[module] = [];
            groups[module].push(permission);
            return groups;
        },
        {} as Record<string, Permission[]>,
    );

    const handlePermissionChange = (permissionId: number, checked: boolean) => {
        if (checked) {
            setData('permissions', [...data.permissions, permissionId]);
        } else {
            setData(
                'permissions',
                data.permissions.filter((id) => id !== permissionId),
            );
        }
    };

    const handleModuleChange = (
        modulePerms: Permission[],
        checked: boolean,
    ) => {
        const moduleIds = modulePerms.map((p) => p.id);
        if (checked) {
            const uniqueIds = Array.from(
                new Set([...data.permissions, ...moduleIds]),
            );
            setData('permissions', uniqueIds);
        } else {
            setData(
                'permissions',
                data.permissions.filter((id) => !moduleIds.includes(id)),
            );
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (mode === 'create') {
            post('/roles', {
                onSuccess: () => {
                    setOpen?.(false);
                    toast.success('Role & Permissions Create Successfully');
                },
                onError: () => {
                    setOpen?.(true);
                    toast.error('Something wrong!!');
                },
            });
        } else {
            put(`/roles/${role?.id}`, {
                onSuccess: () => {
                    setOpen?.(false);
                    toast.success('Role & Permissions Create Successfully');
                },
                onError: () => {
                    setOpen?.(true);
                    toast.error('Something wrong!!');
                },
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="name">Role Name</Label>
                <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="e.g. Editor"
                    required
                />
                {errors.name && (
                    <p className="text-sm text-red-500">{errors.name}</p>
                )}
            </div>

            <div className="space-y-4">
                <Label className="text-lg font-bold">Permissions</Label>
                {errors.permissions && (
                    <p className="text-sm text-red-500">{errors.permissions}</p>
                )}

                <div className="space-y-6 rounded-md border p-4">
                    {Object.entries(groupedPermissions).map(
                        ([module, perms]) => {
                            // လက်ရှိ module ထဲက permission အားလုံးကို select ပေးထားသလား စစ်တာ
                            const isAllModuleSelected = perms.every((p) =>
                                data.permissions.includes(p.id),
                            );

                            return (
                                <div
                                    key={module}
                                    className="space-y-3 border-b pb-4 last:border-b-0 last:pb-0"
                                >
                                    {/* Module Group Checkbox (Select All) */}
                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            id={`module-${module}`}
                                            checked={isAllModuleSelected}
                                            onCheckedChange={(checked) =>
                                                handleModuleChange(
                                                    perms,
                                                    !!checked,
                                                )
                                            }
                                        />
                                        <Label
                                            htmlFor={`module-${module}`}
                                            className="cursor-pointer text-base font-semibold capitalize"
                                        >
                                            {module}
                                        </Label>
                                    </div>

                                    {/* Children Permissions */}
                                    <div className="ml-8 grid grid-cols-2 gap-3 md:grid-cols-4">
                                        {perms.map((permission) => (
                                            <div
                                                key={permission.id}
                                                className="flex items-center gap-2"
                                            >
                                                <Checkbox
                                                    id={`perm-${permission.id}`}
                                                    checked={data.permissions.includes(
                                                        permission.id,
                                                    )}
                                                    onCheckedChange={(
                                                        checked,
                                                    ) =>
                                                        handlePermissionChange(
                                                            permission.id,
                                                            !!checked,
                                                        )
                                                    }
                                                />
                                                <Label
                                                    htmlFor={`perm-${permission.id}`}
                                                    className="cursor-pointer capitalize"
                                                >
                                                    {permission.name
                                                        .split('.')[1]
                                                        .replace('_', ' ')}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        },
                    )}
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
                <Can
                    permission={
                        mode === 'create' ? 'roles.create' : 'roles.update'
                    }
                >
                    <Button type="submit" disabled={processing}>
                        {processing
                            ? 'Saving...'
                            : mode === 'create'
                              ? 'Save'
                              : 'Update'}
                    </Button>
                </Can>
            </div>
        </form>
    );
}
