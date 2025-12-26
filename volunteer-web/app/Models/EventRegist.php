<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
