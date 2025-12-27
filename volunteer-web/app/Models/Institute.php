<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Institute extends Model
{
    //
    use HasFactory;
    protected $primaryKey='institute_id';
    protected $fillable = [
        'account_id',
        'institute_name',
        'institute_phone',
        'institute_pic_name',
        'institute_address',
        'institute_category'
    ];

    // RELATIONS
    public function account(): BelongsTo
    {
        return $this->belongsTo(Account::class, 'account_id', 'account_id');
    }

    // 1 institute -> many events
    public function events(){
        return $this->hasMany(Event::class);
    }

    public function events(): HasMany{
        return $this->hasMany(Event::class, 'institute_id', 'institute_id');
    }
}
