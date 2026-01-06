<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define categories with their specific colors to match your design
        $categories = [
            ['name' => 'Lingkungan',   'color' => '#22c55e'], // Green-500
            ['name' => 'Sosial',       'color' => '#f97316'], // Orange-500
            ['name' => 'Pendidikan',   'color' => '#3b82f6'], // Blue-500
            ['name' => 'Kesehatan',    'color' => '#06b6d4'], // Cyan-500
        ];

        foreach ($categories as $cat) {
            Category::create([
                'name' => $cat['name'],
                'slug' => Str::slug($cat['name']),
                'color' => $cat['color'], // <--- Now seeding the color!
                'is_active' => true,
            ]);
        }
    }
}