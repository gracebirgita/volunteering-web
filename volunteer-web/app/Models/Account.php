<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
// use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Models\UserProfile;


// class Account extends Model
class Account extends Authenticatable
{
    //
    use HasFactory, Notifiable;
    protected $table = 'accounts';
    protected $primaryKey = 'account_id';

    protected $fillable = [
        'email', 'password', 'role', 'is_active'
    ];


    protected $hidden=[
        'password',
        'remember_token',
    ];

    protected $casts = [
        'password' => 'hashed',
        'is_active' => 'boolean', // <--- Cast to boolean for React
    ];

    // RELATIONS
    public function admin() : HasOne{
        return $this->hasOne(Admin::class, 'account_id');
    }

    public function users_profiles(): HasOne{
        return $this->hasOne(UserProfile::class, 'account_id', 'account_id');
    }
    public function institute(): HasOne{
        return $this->hasOne(Institute::class, 'account_id');
    }

    // CHECK role -> account id yg unik (role: institute, userprofile, admin)
    public function isAdmin(): bool{
        return $this->role==='admin';
    }
    public function isUser(): bool{
        return $this->role==='user';
    }
    public function isInstitute(): bool{
        return $this->role==='institute';
    }

    public function roleLabel()
    {
        return match ($this->role) {
            'user' => 'Relawan',
            'institute' => 'Institusi',
            'admin' => 'Admin',
            default => 'Tidak diketahui',
        };
    }

    // role redirect
    public function dashRoute():string{
        return match($this->role){
            'admin'=>'dashboard.admin',
            'institute'=>'dashboard.institute',
            'user'=>'dashboard.user',
        };
    }
    
}
