<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserProfile extends Model
{
    //
    use HasFactory, Notifiable;
    protected $fillable = [
        'user_name',
        'user_email',
        'user_phone',
        'user_domicile', 
        'user_dob', // tgl lahir
        'user_interest', // pilih kategori bidang volunteer
    ];

    protected $hidden = [
        'remember_token',
    ];

    public function account(): BelongsTo
    {
        return $this->belongsTo(Account::class, 'account_id');
    }
}
