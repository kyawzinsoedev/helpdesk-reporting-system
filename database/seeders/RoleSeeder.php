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

        $manager = Role::firstOrCreate([
            'name' => 'Manager',
            'guard_name' => 'web',
        ]);

        $staff = Role::firstOrCreate([
            'name' => 'Staff',
            'guard_name' => 'web',
        ]);

        // Super Admin gets every permission
        $superAdmin->syncPermissions(Permission::all());

        // Manager
        $manager->syncPermissions([
            'users.view',
            'users.create',

            'tickets.view',
            'tickets.assign',

            'reports.view',
        ]);

        // Staff
        $staff->syncPermissions([
            'tickets.view',
            'tickets.resolve',
        ]);
    }
}
