<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
}
