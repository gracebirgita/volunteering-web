<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Institute extends Model
{
    //
    use HasFactory, Notifiable;
    protected $fillable = [
        'institute_name',
        'institute_phone',
        'institute_pic_name',
        'institute_address',
        'institute_category'
    ];

    public function account(): BelongsTo
    {
        return $this->belongsTo(Account::class, 'account_id');
    }
}
