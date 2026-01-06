<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $primaryKey = 'category_id'; // Matching your migration
    protected $table = 'categories';

    protected $fillable = [
    'name',
    'slug',
    'color', 
    'is_active'
    ];

    // RELATIONSHIP: One Category has Many Events
    public function events()
    {
        return $this->hasMany(Event::class, 'category_id', 'category_id');
    }
}