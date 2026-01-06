<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id('category_id'); // Matching your convention of using explicit IDs
            $table->string('name', 50); // e.g. "Environment", "Health"
            $table->string('slug', 60)->unique(); // For URLs: "environment", "health"
            $table->boolean('is_active')->default(true); // So Admins can hide them later
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};