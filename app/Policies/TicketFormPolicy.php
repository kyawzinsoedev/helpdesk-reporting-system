<?php

namespace App\Policies;

use App\Models\TicketForm;
use App\Models\User;

class TicketFormPolicy
{
    /**
     * View ticket forms list (index)
     */
    public function viewAny(User $authUser): bool
    {
        return $authUser->can('ticket_forms.view');
    }

    /**
     * Create ticket form (create/store)
     */
    public function create(User $authUser): bool
    {
        return $authUser->can('ticket_forms.create');
    }

    /**
     * Manage form fields (fields/storeField)
     */
    public function manageFields(User $authUser, TicketForm $form): bool
    {
        return $authUser->can('ticket_forms.update');
    }
}
