<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TicketFormField extends Model
{
    protected $fillable = [
        'ticket_form_id',
        'label',
        'name',
        'type',
        'required',
        'options',
        'sort_order',
    ];

    public function form()
    {
        return $this->belongsTo(TicketForm::class);
    }
}
