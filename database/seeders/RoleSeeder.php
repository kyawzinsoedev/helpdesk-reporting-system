<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $superAdmin = Role::firstOrCreate([
            'name' => 'Super Admin',
            'guard_name' => 'web',
        ]);

        $admin = Role::firstOrCreate([
            'name' => 'Admin',
            'guard_name' => 'web',
        ]);

        $staff = Role::firstOrCreate([
            'name' => 'Staff',
            'guard_name' => 'web',
        ]);

        $user = Role::firstOrCreate([
            'name' => 'User',
            'guard_name' => 'web',
        ]);

        // Super Admin gets every permission
        $superAdmin->syncPermissions(Permission::all());

        // Manager
        $admin->syncPermissions([
            'users.view',
            'users.create',
            'users.update',
            'users.delete',
            'users.reset-password',

            'tickets.view',
            'tickets.create',
            'tickets.update',
            'tickets.delete',
            'tickets.assign',
            'tickets.process',
            'tickets.resolve',
            'tickets.close',

            'departments.view',
            'departments.create',
            'departments.update',
            'departments.delete',

        ]);

        // Staff
        $staff->syncPermissions([
            'tickets.view',
            'tickets.create',
            'tickets.update',
            'tickets.delete',
            'tickets.assign',
            'tickets.process',
            'tickets.resolve',
            'tickets.close',
        ]);

        $user->syncPermissions([
            'tickets.view',
            'tickets.create',
            'tickets.update',
            'tickets.delete',
        ]);
    }
}
