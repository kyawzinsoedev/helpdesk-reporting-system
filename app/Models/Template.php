<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use PhpParser\Node\Expr\FuncCall;

class Template extends Model
{
    protected $fillable = [
        'name',
        'report_id',
    ];

    public function report()
    {
        return $this->belongsTo(Report::class);
    }
}
