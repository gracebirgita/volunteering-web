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


class EventRegist extends Model
{
    //

    // RELATIONS
    public function event(){
        return $this->belongsTo(Event::class, 'event_id', 'event_id');
    }

    // 1 user profile -> punya 1 registevent id tsb
    public function userProfile(){
        return $this->belongsTo(userProfile::class, 'user_id', 'user_id');
    }
}
