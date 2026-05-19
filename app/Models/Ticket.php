<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    public function form()
    {
        return $this->belongsTo(TicketForm::class);
    }

    public function answers()
    {
        return $this->hasMany(TicketAnswer::class);
    }
}
