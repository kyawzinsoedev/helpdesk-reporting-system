<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TicketAnswer extends Model
{
    protected $fillable = [
        'ticket_id',
        'ticket_form_field_id',
        // 'value',
    ];

    public function ticket()
    {
        return $this->belongsTo(Ticket::class);
    }

    public function field()
    {
        return $this->belongsTo(
            TicketFormField::class,
            'ticket_form_field_id'
        );
    }

    protected $casts = [
        'value' => 'array',
    ];
}