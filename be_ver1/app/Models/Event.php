<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Event extends Model
{
    use HasFactory;

    protected $fillable = ['id_institute', 'event_name', 'description', 'start_date', 'finish_date', 'location', 'quota'];

    public function institute(){
        return $this->belongsTo(Institute::class, 'id_institute');
    }

    public function volunteers(){
        return $this->belongsToMany(User::class, 'event_registers', 'id_event', 'id_user')->withPivot(['regist_date', 'regist_status'])->withTimeStamps();
    }
}
