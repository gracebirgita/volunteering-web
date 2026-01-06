<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventDivision extends Model
{
    protected $primaryKey = 'division_id';

    protected $fillable = ['event_id', 'name', 'quota'];


    //Relation
    public function event()
    {
        return $this->belongsTo(Event::class, 'event_id', 'event_id');
    }

    public function registrations()
    {
        return $this->hasMany(EventRegistration::class, 'division_id', 'division_id');
    }
}
