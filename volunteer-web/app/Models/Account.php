<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
// use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;


// class Account extends Model
class Account extends Authenticatable
{
    //
    use HasFactory, Notifiable;
    protected $table = 'accounts';
    protected $primaryKey = 'account_id';

    protected $fillable=[
        'email', 'password', 'role'
    ];
    protected $hidden=[
        'password',
        'remember_token'
    ];

    protected $casts=[
        'password'=>'hashed',
    ];

    // RELATIONS
    public function admin() : HasOne{
        return $this->hasOne(Admin::class, 'account_id');
    }

    public function userProfile(): HasOne{
        return $this->hasOne(UserProfile::class, 'account_id');
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
