<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TicketForm extends Model
{

    protected $fillable = [
        'name',
        'description'
    ];
    public function fields()
    {
        return $this->hasMany(TicketFormField::class);
    }
}
