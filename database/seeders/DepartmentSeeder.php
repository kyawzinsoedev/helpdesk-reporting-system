<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $departments = [
            [
                'name' => 'Human Resources',
                'department_code' => 'HR',
            ],
            [
                'name' => 'Information Technology',
                'department_code' => 'IT',
            ],
            [
                'name' => 'Finance',
                'department_code' => 'FIN',
            ],
            [
                'name' => 'Accounting',
                'department_code' => 'ACC',
            ],
            [
                'name' => 'Marketing',
                'department_code' => 'MKT',
            ],
            [
                'name' => 'Sales',
                'department_code' => 'SAL',
            ],
            [
                'name' => 'Procurement',
                'department_code' => 'PRC',
            ],
            [
                'name' => 'Operations',
                'department_code' => 'OPS',
            ],
            [
                'name' => 'Customer Service',
                'department_code' => 'CS',
            ],
            [
                'name' => 'Research & Development',
                'department_code' => 'RND',
            ],
        ];

        foreach ($departments as $department) {
            Department::updateOrCreate(
                ['department_code' => $department['department_code']],
                $department
            );
        }
    }
}
