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
        Schema::create('event_registers', function (Blueprint $table) {
            $table->id('id_register');
            $table->foreignId('id_user')->constrained('users')->cascadeOnDelete();
            $table->foreignId('id_event')->constrained('events')->cascadeOnDelete();
            $table->dateTime('regist_date')->useCurrent();
            $table->string('regist_status', 10)->default('terdaftar');
            $table->timestamps();

            $table->unique(['id_user', 'id_event']); //1 user 1x daftar event
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_registers');
    }
};
