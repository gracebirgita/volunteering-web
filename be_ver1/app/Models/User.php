<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',   
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // user bisa register banyak event
    public function registeredEvents()
    {
        return $this->belongsToMany(Event::class, 'event_registers', 'id_user', 'id_event')
                    ->withPivot(['regist_date', 'regist_status'])
                    ->withTimestamps();
    }
}
