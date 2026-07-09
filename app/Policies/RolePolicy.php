<?php

namespace App\Policies;

use App\Models\User;
use Spatie\Permission\Models\Role;

class RolePolicy
{
    /**
     * View roles list
     */
    public function viewAny(User $authUser): bool
    {
        return $authUser->can('roles.view');
    }

    /**
     * Create role
     */
    public function create(User $authUser): bool
    {
        return $authUser->can('roles.create');
    }

    /**
     * Update role
     */
    public function update(User $authUser, Role $role): bool
    {
        return $authUser->can('roles.update');
    }

    /**
     * Delete role
     */
    public function delete(User $authUser, Role $role): bool
    {
        if ($role->name === 'admin') {
            return false;
        }

        return $authUser->can('roles.delete');
    }
}
