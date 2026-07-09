<?php

namespace App\Policies;

use App\Models\Department;
use App\Models\User;

class DepartmentPolicy
{
    /**
     * View department list (index)
     */
    public function viewAny(User $authUser): bool
    {
        return $authUser->can('departments.view');
    }

    /**
     * View single department (show/edit)
     */
    public function view(User $authUser, Department $department): bool
    {
        return $authUser->can('departments.view');
    }

    /**
     * Create department (create/store)
     */
    public function create(User $authUser): bool
    {
        return $authUser->can('departments.create');
    }

    /**
     * Update department (update)
     */
    public function update(User $authUser, Department $department): bool
    {
        return $authUser->can('departments.update');
    }

    /**
     * Delete department (destroy)
     */
    public function delete(User $authUser, Department $department): bool
    {
        return $authUser->can('departments.delete');
    }
}
