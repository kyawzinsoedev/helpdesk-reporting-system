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
        // Create roles if they don't exist
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $userRole = Role::firstOrCreate(['name' => 'user']);

        // ==========================
        // Admin User
        // ==========================
        $admin = User::firstOrCreate(
            ['email' => 'neednova69@gmail.com'],
            [
                'name' => 'Nova',
                'username' => 'nova',
                'phone' => '09111111111',
                'birthday' => '1998-01-01',
                'gender' => 'male',
                'address' => 'Yangon',
                'status' => 'active',
                'department_id' => 1,
                'password' => Hash::make('nova@123'),
            ]
        );

        $admin->syncRoles([$adminRole]);

        // ==========================
        // User 1
        // ==========================
        $user1 = User::firstOrCreate(
            ['email' => 'user1@example.com'],
            [
                'name' => 'User One',
                'username' => 'user1',
                'phone' => '09222222222',
                'birthday' => '2000-05-10',
                'gender' => 'male',
                'address' => 'Mandalay',
                'status' => 'active',
                'department_id' => 1,
                'password' => Hash::make('kyaw@123'),
            ]
        );

        $user1->syncRoles([$userRole]);

        // ==========================
        // User 2
        // ==========================
        $user2 = User::firstOrCreate(
            ['email' => 'user2@example.com'],
            [
                'name' => 'User Two',
                'username' => 'user2',
                'phone' => '09333333333',
                'birthday' => '1999-08-20',
                'gender' => 'female',
                'address' => 'Naypyidaw',
                'status' => 'active',
                'department_id' => 1,
                'password' => Hash::make('kyaw@123'),
            ]
        );

        $user2->syncRoles([$userRole]);
    }
}
