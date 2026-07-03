<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $userRole = Role::firstOrCreate(['name' => 'user']);

        $admin = User::firstOrCreate(
            ['email' => 'neednova69@gmail.com'],
            [
                'username' => 'kyawzinsoe',
                'name' => 'Kyaw Zin Soe',
                'email' => 'neednova69@gmail.com',
                'password' => Hash::make('kyaw@123'), // default password
                'status' => 'active',
            ]
        );

        $admin->assignRole($adminRole);
    }
}
