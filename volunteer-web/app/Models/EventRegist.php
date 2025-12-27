<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EventsRegist extends Model
{
    protected $table = 'events_regists';
    protected $primaryKey = 'regist_id';

    protected $fillable = [
        'user_id',
        'event_id',
        'regist_date',
        'regist_status'
    ];

    public function event()
    {
        return $this->belongsTo(Event::class, 'event_id', 'event_id');
    }
}

