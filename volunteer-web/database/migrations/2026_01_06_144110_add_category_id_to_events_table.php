<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('events', function (Blueprint $table) {
            // 1. Add the column after institute_id
            // nullable() is important so existing events don't break immediately
            $table->foreignId('category_id')
                  ->nullable() 
                  ->after('institute_id')
                  ->constrained('categories', 'category_id') // Link to categories table
                  ->nullOnDelete(); // If category is deleted, event stays but has no category
            
            if (Schema::hasColumn('events', 'category')){
                $table->dropColumn('category');
            }
        
        
                });
    }

    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            // Drop the Foreign Key first, then the column
            $table->string('category')->nullable();
            
            $table->dropForeign(['category_id']);
            $table->dropColumn('category_id');
        });
    }
};