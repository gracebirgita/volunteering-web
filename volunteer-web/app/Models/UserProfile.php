<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserProfile extends Model
{
    //
    use HasFactory;
    protected $table = 'users_profiles';
    protected $primaryKey= 'user_id';

    protected $fillable = [
        'account_id',
        'user_name',
        'user_phone',
        'user_domicile',
        'user_dob', // tanggal lahir
        'user_interest', //kategori volunteer
    ];

    // protected $hidden = [
    //     'remember_token',
    // ];

    public function account(): BelongsTo
    {
        return $this->belongsTo(Account::class, 'account_id', 'account_id');
    }

    // 1 user -> byk eventregist
    public function registrations(){
        return $this->hasMany(EventRegist::class, 'user_id', 'user_id');
    }
}
