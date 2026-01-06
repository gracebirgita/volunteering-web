<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventAgenda extends Model
{
    //
    protected $fillable = [
        'event_id',
        'start_time',
        'end_time',
        'title',
        'description',
        'order',
    ];

    protected $casts = [
        'start_time' => 'datetime:H:i',
        'end_time'   => 'datetime:H:i',
    ];


    //Relasi
    public function event()
    {
        return $this->belongsTo(Event::class, 'event_id');
    }

}
