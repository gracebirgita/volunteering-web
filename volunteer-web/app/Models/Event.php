<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Event extends Model
{
    //
    protected $primaryKey='event_id';
    protected $table = 'events';

    protected $fillable=[
        'institute_id',
        'category_id',
        'title',
        'description',
        'location',
        'start_date',
        'end_date',
        // 'thumbnail', //image 
    ];

    // RELATIONS
    public function institute(){
        return $this->belongsTo(Institute::class, 'institute_id', 'institute_id');
    }

    // 1 event -> byk eventregist
    public function registrations(){
        return $this->hasMany(EventRegist::class, 'event_id', 'event_id');
    }
}
