<?php

namespace Database\Seeders;

use App\Models\TicketForm;
use Illuminate\Database\Seeder;

class TicketFormSeeder extends Seeder
{
    public function run(): void
    {
        $forms = [
            [
                'name' => 'IT Support',
                'description' => 'General IT support requests.',
                'fields' => [
                    [
                        'label' => 'Employee ID',
                        'name' => 'employee_id',
                        'type' => 'text',
                        'required' => true,
                        'options' => null,
                    ],
                    [
                        'label' => 'Issue Category',
                        'name' => 'issue_category',
                        'type' => 'select',
                        'required' => true,
                        'options' => [
                            'Hardware',
                            'Software',
                            'Network',
                            'Email',
                        ],
                    ],
                    [
                        'label' => 'Description',
                        'name' => 'description',
                        'type' => 'textarea',
                        'required' => true,
                        'options' => null,
                    ],
                ],
            ],

            [
                'name' => 'Leave Request',
                'description' => 'Employee leave application.',
                'fields' => [
                    [
                        'label' => 'Leave Type',
                        'name' => 'leave_type',
                        'type' => 'select',
                        'required' => true,
                        'options' => [
                            'Annual',
                            'Medical',
                            'Casual',
                        ],
                    ],
                    [
                        'label' => 'Start Date',
                        'name' => 'start_date',
                        'type' => 'date',
                        'required' => true,
                        'options' => null,
                    ],
                    [
                        'label' => 'End Date',
                        'name' => 'end_date',
                        'type' => 'date',
                        'required' => true,
                        'options' => null,
                    ],
                    [
                        'label' => 'Reason',
                        'name' => 'reason',
                        'type' => 'textarea',
                        'required' => false,
                        'options' => null,
                    ],
                ],
            ],

            [
                'name' => 'Purchase Request',
                'description' => 'Request to purchase items.',
                'fields' => [
                    [
                        'label' => 'Item Name',
                        'name' => 'item_name',
                        'type' => 'text',
                        'required' => true,
                        'options' => null,
                    ],
                    [
                        'label' => 'Quantity',
                        'name' => 'quantity',
                        'type' => 'number',
                        'required' => true,
                        'options' => null,
                    ],
                    [
                        'label' => 'Estimated Cost',
                        'name' => 'estimated_cost',
                        'type' => 'number',
                        'required' => false,
                        'options' => null,
                    ],
                    [
                        'label' => 'Justification',
                        'name' => 'justification',
                        'type' => 'textarea',
                        'required' => true,
                        'options' => null,
                    ],
                ],
            ],
        ];

        foreach ($forms as $data) {

            $fields = $data['fields'];
            unset($data['fields']);

            $form = TicketForm::updateOrCreate(
                ['name' => $data['name']],
                $data
            );

            // reset old fields
            $form->fields()->delete();

            foreach ($fields as $field) {
                $form->fields()->create($field);
            }
        }
    }
}
