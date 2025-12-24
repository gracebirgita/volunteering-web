<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserProfile extends Model
{
    use HasFactory, Notifiable;

    protected $table = 'users_profiles';
    protected $primaryKey = 'user_id';

    protected $fillable = [
        'account_id',      
        'user_name',
        'user_email',
        'user_phone',
        'user_domicile',
        'user_dob', // tanggal lahir
        'user_interest', //kategori volunteer
    ];

    protected $casts = [
        'user_dob' => 'date',
    ];

    public function account(): BelongsTo
    {
        return $this->belongsTo(Account::class, 'account_id', 'account_id');
    }
}
