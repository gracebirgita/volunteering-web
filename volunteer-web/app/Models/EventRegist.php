<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventRegist extends Model
{
    //
    protected $primaryKey='regist_id';
    protected $table = 'events_regists';

    protected $fillable=[
        'event_id',
        'user_id',
        'regist_status',
    ];

    // RELATIONS
    public function event(){
        return $this->belongsTo(Event::class, 'event_id', 'event_id');
    }

    // 1 user profile -> punya 1 registevent id tsb
    public function userProfile(){
        // relation, fk, own key
        return $this->belongsTo(UserProfile::class, 'user_id', 'user_id');
    }
}
