<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class Department extends Model
{
    use LogsActivity;
    protected $fillable = [
        'name',
        'department_code',
    ];

    public function users()
    {
        return $this->hasMany(User::class);
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
