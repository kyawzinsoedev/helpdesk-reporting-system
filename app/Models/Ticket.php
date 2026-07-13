<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class Ticket extends Model
{
    use LogsActivity;
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

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logFillable()
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs();
        // ->setDescriptionForEvent(fn(string $eventName) => "Form field has been {$eventName}");
    }
}
