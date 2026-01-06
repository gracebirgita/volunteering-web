<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EventRegistration extends Model
{
    protected $table = 'events_registrations';
    protected $primaryKey = 'registration_id';

    protected $fillable = [
        'event_id',
        'user_id',
        'status',
    ];

    public function event()
    {
        return $this->belongsTo(Event::class, 'event_id', 'event_id');
    }

    public function userProfile()
    {
        return $this->belongsTo(UserProfile::class, 'user_id', 'user_id');
    }

    public function attendances()
    {
        return $this->hasMany(EventAttendance::class, 'registration_id', 'registration_id');
    }

    public function division(){
        return $this->belongsTo(EventDivision::class, 'division_id', 'division_id');
    }
}
