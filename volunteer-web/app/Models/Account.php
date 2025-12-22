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
    protected $primaryKey = 'account_id';

    protected $fillable=[
        'email', 'password', 'role'
    ];

    protected $hidden=[
        'password',
        'remember_token'
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




    // protected function casts(): array
    // {
    //     return [
    //         'email_verified_at' => 'datetime',
    //         'password' => 'hashed',
    //     ];
    // }

    // BAWAAN USERS
    
    //     /**
    //  * The attributes that are mass assignable.
    //  *
    //  * @var array<int, string>
    //  */
    // protected $fillable = [
    //     'name',
    //     'email',
    //     'password',
    // ];

    // /**
    //  * The attributes that should be hidden for serialization.
    //  *
    //  * @var array<int, string>
    //  */
    // protected $hidden = [
    //     'password',
    //     'remember_token',
    // ];


    // protected function casts(): array
    // {
    //     return [
    //         'email_verified_at' => 'datetime',
    //         'password' => 'hashed',
    //     ];
    // }
}
