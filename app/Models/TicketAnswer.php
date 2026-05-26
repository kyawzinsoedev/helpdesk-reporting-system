<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TicketAnswer extends Model
{
    protected $fillable = [
        'ticket_id',
        'answers',
    ];

    protected $casts = [
        'answers' => 'array',
    ];

    public function ticket()
    {
        return $this->belongsTo(Ticket::class);
    }
}