<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [
            // Users
            'users.view',
            'users.create',
            'users.update',
            'users.delete',
            'users.reset-password',

            // Roles
            'roles.view',
            'roles.create',
            'roles.update',
            'roles.delete',

            // Departments
            'departments.view',
            'departments.create',
            'departments.update',
            'departments.delete',

            // Ticket Form
            'ticket_forms.view',
            'ticket_forms.create',
            'ticket_forms.update',
            'ticket_forms.delete',

            // Tickets
            'tickets.view',
            'tickets.create',
            'tickets.update',
            'tickets.delete',
            'tickets.assign',
            'tickets.process',
            'tickets.resolve',
            'tickets.close',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate([
                'name' => $permission,
                'guard_name' => 'web',
            ]);
        }
    }
}
