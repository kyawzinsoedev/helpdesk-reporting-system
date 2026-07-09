<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;

class UserPolicy
{
    /**
     * View user list
     */
    public function viewAny(User $authUser): bool
    {
        return $authUser->can('users.view');
    }


    /**
     * View single user
     */
    public function view(User $authUser, User $user): bool
    {
        return $authUser->can('users.view');
    }


    /**
     * Create user
     */
    public function create(User $authUser): bool
    {
        return $authUser->can('users.create');
    }


    /**
     * Update user
     */
    public function update(User $authUser, User $user): bool
    {
        return $authUser->can('users.update');
    }


    /**
     * Delete user
     */
    public function delete(User $authUser, User $targetUser): bool
    {
        if ($authUser->id === $targetUser->id) {
            return false;
        }

        return $authUser->can('users.delete');
    }
}
