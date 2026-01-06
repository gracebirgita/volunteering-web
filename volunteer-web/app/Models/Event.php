<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Event extends Model
{
    //
    protected $primaryKey='event_id';

    protected $casts = [
        'benefit_consumption' => 'boolean',
        'benefit_certificate' => 'boolean',
        'benefit_jam_volunt'  => 'boolean',
    ];

    protected $fillable=[
        'institute_id',
        'event_name',
        'event_description',
        'category',
        'event_start',
        'event_finish',
        'event_start_time',
        'event_end_time',
        'event_location',
        'address',
        'quota',
        'registration_deadline',
        'benefit_consumption',
        'benefit_certificate',
        'benefit_jam_volunt',
        'contact_person',
        'group_link',
        'event_status',
        // 'thumbnail', //image 
    ];

    protected $casts = [
        //'divisions' => 'array',
        'benefit_consumption' => 'boolean',
        'benefit_certificate' => 'boolean',
        'benefit_other' => 'boolean',
    ];

    // RELATIONS
    public function institute(){
        return $this->belongsTo(Institute::class, 'institute_id', 'institute_id');
    }

    // 1 event -> byk eventregist
    public function registrations(){
        return $this->hasMany(EventRegistration::class, 'event_id', 'event_id');
    }

    public function agendas(){
        return $this->hasMany(EventAgenda::class, 'event_id')
            ->orderBy('order')
            ->orderBy('start_time');
    }

    public function divisions(){
        return $this->hasMany(EventDivision::class, 'event_id', 'event_id');
    }


}
