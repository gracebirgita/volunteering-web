<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Institute extends Model
{
    use HasFactory;

    protected $fillable = ['institute_name', 'city', 'institute_email', 'institute_phone'];

    public function events(){
        return $this->hasMany(Event::class, 'id_institutes');
    }
}
