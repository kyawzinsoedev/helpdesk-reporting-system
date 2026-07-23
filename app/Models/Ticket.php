<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Ticket extends Model
{

    protected $fillable = [
        'user_id',
        'ticket_form_id',
        'assign_to',
        'title',
        'description',
        'priority',
        'status',
        'remark',
    ];

    public function form()
    {
        return $this->belongsTo(TicketForm::class, 'ticket_form_id');
    }

    public function answers()
    {
        return $this->hasMany(TicketAnswer::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function histories()
    {
        return $this->hasMany(TicketHistory::class);
    }

    public function assignedStaff()
    {
        return $this->belongsTo(User::class, 'assign_to');
    }


    public function scopeSearch(Builder $query, ?string $search): Builder
    {
        return $query->when($search, function ($query, $search) {
            $query->where('title', 'like', "%{$search}%");
        });
    }

    public function scopeTicketForm(Builder $query, $ticketFormId): Builder
    {
        return $query->when($ticketFormId, function ($query, $ticketFormId) {
            $query->where('ticket_form_id', $ticketFormId);
        });
    }

    public function scopePriority(Builder $query, ?string $priority): Builder
    {
        return $query->when($priority, function ($query, $priority) {
            $query->where('priority', $priority);
        });
    }

    public function scopeStatus(Builder $query, ?string $status): Builder
    {
        return $query->when($status, function ($query, $status) {
            $query->where('status', $status);
        });
    }

    public function scopeDateBetween(
        Builder $query,
        ?string $from,
        ?string $to
    ): Builder {
        return $query
            ->when($from, function ($query, $from) {
                $query->whereDate('created_at', '>=', $from);
            })
            ->when($to, function ($query, $to) {
                $query->whereDate('created_at', '<=', $to);
            });
    }

    // public function scopeVisibleTo($query, User $user)
    // {
    //     // if ($user->hasRole('Super Admin' )) {
    //     //     return $query;
    //     // }

    //     if ($user->hasAnyRole(['Super Admin', 'Admin'])) {
    //         return $query;
    //     }

    //     return $query->where('user_id', $user->id);
    // }

    public function scopeVisibleTo($query, User $user)
    {
        if ($user->hasRole('Super Admin')) {
            return $query;
        }

        if ($user->hasRole('Admin')) {
            return $query->whereHas('user', function ($q) use ($user) {
                $q->where('department_id', $user->department_id);
            });
        }

        if ($user->hasRole('Staff')) {
            return $query->where('assign_to', $user->id);
        }

        return $query->where('user_id', $user->id);
    }
}
