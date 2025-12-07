<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Account extends Model
{
    //
    use HasFactory, Notifable;
    protected $fillable=[
        'email', 'password', 'role'
    ];

    // RELATIONS
    public function admins() : HasMany{
        return $this->hasMany(Admin::class, 'account_id');
    }

    public function users_profiles(): HasMany{
        return $this->hasMany(UserProfile::class, 'account_id');
    }
    public function institites(): HasMany{
        return $this->hasMany(Institute::class, 'account_id');
    }

    // role -> account id yg unik (role: institute, userprofile, admin)
    public function isAdmin(){
        return $this->role==='admin';
    }
    public function isUser(){
        return $this->role==='user';
    }
    public function isInstitute(){
        return $this->role==='institute';
    }
    
    // validasi role
    // $account = Account::find($account_id);
    // if($account->isAdmin()){

    // }
    // elseif($account->isUser()){

    // }
    // elseif($account->isInstitute()){

    // }

}
