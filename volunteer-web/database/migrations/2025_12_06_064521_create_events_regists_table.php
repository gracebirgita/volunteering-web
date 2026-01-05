<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('events_regists', function (Blueprint $table) {
            $table->id('regist_id');
            $table->foreignId('user_id')->constrained('users_profiles', 'user_id')->cascadeOnDelete(); //FK
            $table->foreignId('event_id')->constrained('events', 'event_id')->cascadeOnDelete(); //FK
            $table->date('regist_date');
            $table->string('regist_status', 20)->default('Pending');
            $table->timestamps();

            // 1 user bs daftar 1x saja
            $table->unique(['user_id', 'event_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events_regists');
    }
};
