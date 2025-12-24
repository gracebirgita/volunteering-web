<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Account extends Model
{
    use HasFactory, Notifiable;

    protected $table = 'accounts';
    protected $primaryKey = 'account_id';

    protected $fillable = [
        'email', 'password', 'role'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function admins(): HasMany
    {
        return $this->hasMany(Admin::class, 'account_id', 'account_id');
    }

    public function users_profiles(): HasMany
    {
        return $this->hasMany(UserProfile::class, 'account_id', 'account_id');
    }

    public function institutes(): HasMany
    {
        return $this->hasMany(Institute::class, 'account_id', 'account_id');
    }

    // Role helpers (optional, tapi aman)
    public function isAdmin(): bool { return $this->role === 'admin'; }
    public function isUser(): bool { return $this->role === 'user'; }
    public function isInstitute(): bool { return $this->role === 'institute'; }
}
