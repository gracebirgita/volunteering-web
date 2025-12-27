<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Event extends Model
{
    use HasFactory;

    protected $table = 'events';
    protected $primaryKey = 'event_id';

    protected $fillable = [
        'institute_id',
        'event_name',
        'event_description',
        'event_start',
        'event_finish',
        'event_location', 
        'event_status',
        'event_quota'
    ];

    protected $casts = [
        'event_start' => 'date',
        'event_finish' => 'date'
    ];

    public function institute(){
        return $this->belongsTo(Institute::class, 'event_id', 'event_id');
    }
}

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
        return $this->hasMany(EventResgist::class);
    }
}
