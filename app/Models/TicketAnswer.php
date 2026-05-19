<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TicketAnswer extends Model
{
    public function ticket()
    {
        return $this->belongsTo(Ticket::class);
    }

    public function field()
    {
        return $this->belongsTo(TicketFormField::class);
    }
}
