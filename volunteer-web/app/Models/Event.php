<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Event extends Model
{
    //
    protected $primaryKey='event_id';
    protected $table = 'events';

    protected $fillable=[
        'institute_id',
        'category_id',

        'event_name',
        'event_description',
        'event_location',
        'address',

        'event_start',
        'event_finish',
        'event_start_time',
        'event_end_time',
        'registration_deadline',

        'event_quota',
        'thumbnail',

        'benefit_consumption',
        'benefit_certificate',
        'benefit_jam_volunt',
        'other_benefit',

        //'divisions',
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
        return $this->hasMany(EventRegist::class, 'event_id', 'event_id');
    }
    
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'category_id');
    }

}
