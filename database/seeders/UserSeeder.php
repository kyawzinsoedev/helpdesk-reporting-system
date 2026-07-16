<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
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

        $admin->syncRoles(['Super Admin']);

        // ==========================
        // Manager User
        // ==========================
        $user1 = User::firstOrCreate(
            ['email' => 'admin@gmail.com'],
            [
                'name' => 'Admin',
                'username' => 'admin',
                'phone' => '09222222222',
                'birthday' => '2000-05-10',
                'gender' => 'male',
                'address' => 'Mandalay',
                'status' => 'active',
                'department_id' => 1,
                'password' => Hash::make('kyaw@123'),
            ]
        );

        $user1->syncRoles(['Admin']);

        // ==========================
        // Staff User
        // ==========================
        $user2 = User::firstOrCreate(
            ['email' => 'user@gmail.com'],
            [
                'name' => 'User',
                'username' => 'user',
                'phone' => '09333333333',
                'birthday' => '1999-08-20',
                'gender' => 'female',
                'address' => 'Naypyidaw',
                'status' => 'active',
                'department_id' => 1,
                'password' => Hash::make('kyaw@123'),
            ]
        );

        $user2->syncRoles(['User']);

        $user3 = User::firstOrCreate(
            ['email' => 'staff@gmail.com'],
            [
                'name' => 'Staff',
                'username' => 'staff',
                'phone' => '09333333333',
                'birthday' => '1999-08-20',
                'gender' => 'female',
                'address' => 'Naypyidaw',
                'status' => 'active',
                'department_id' => 1,
                'password' => Hash::make('kyaw@123'),
            ]
        );

        $user3->syncRoles(['Staff']);
    }
}
