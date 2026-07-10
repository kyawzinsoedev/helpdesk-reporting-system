<?php

namespace App\Policies;

use App\Models\Ticket;
use App\Models\User;

class TicketPolicy
{
    /**
     * View ticket list
     */
    public function viewAny(User $authUser): bool
    {
        return $authUser->can('tickets.view');
    }

    /**
     * Create ticket
     */
    public function create(User $authUser): bool
    {
        return $authUser->can('tickets.create');
    }

    /**
     * Update ticket
     */
    public function update(User $authUser, Ticket $ticket): bool
    {
        return $authUser->id === $ticket->user_id
            || $authUser->can('tickets.update');
    }

    /**
     * Delete ticket
     */
    public function delete(User $authUser, Ticket $ticket): bool
    {
        return $authUser->can('tickets.delete');
    }

    /**
     * Assign ticket to staff
     */
    public function assign(User $authUser, Ticket $ticket): bool
    {
        return $authUser->can('tickets.assign');
    }

    /**
     * Remove assigned staff
     */
    public function removeAssign(User $authUser, Ticket $ticket): bool
    {
        return $authUser->can('tickets.assign');
    }

    /**
     * Process ticket
     */
    public function process(User $authUser, Ticket $ticket): bool
    {
        return $authUser->id === $ticket->assign_to
            || $authUser->can('tickets.process');
    }

    /**
     * Resolve ticket
     */
    public function resolve(User $authUser, Ticket $ticket): bool
    {
        return $authUser->id === $ticket->assign_to
            || $authUser->can('tickets.resolve');
    }

    /**
     * Close ticket
     */
    public function close(User $authUser, Ticket $ticket): bool
    {
        return $authUser->id === $ticket->assign_to
            || $authUser->can('tickets.close');
    }
}
