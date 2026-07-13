<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class TicketFormField extends Model
{
    use LogsActivity;
    protected $fillable = [
        'ticket_form_id',
        'label',
        'name',
        'type',
        'required',
        'options',
        'sort_order',
    ];

    protected $casts = [
        'options' => 'array',
    ];
    public function form()
    {
        return $this->belongsTo(TicketForm::class);
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logFillable()
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs()
            ->setDescriptionForEvent(fn(string $eventName) => "Form field has been {$eventName}");
    }
}
