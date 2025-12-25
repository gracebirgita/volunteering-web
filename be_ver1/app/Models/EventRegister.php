<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EventRegister extends Model
{
    use HasFactory;

    protected $table = 'event_registers';

    protected $fillable = [
        'id_user',
        'id_event',
        'regist_date',
        'regist_status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function event()
    {
        return $this->belongsTo(Event::class, 'id_event');
    }
}
