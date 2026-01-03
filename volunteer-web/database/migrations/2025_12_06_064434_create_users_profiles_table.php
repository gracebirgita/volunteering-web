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
        Schema::create('users_profiles', function (Blueprint $table) {
            $table->id('user_id');
            $table->foreignId('account_id')
                  ->constrained('accounts', 'account_id')
                  ->cascadeOnDelete(); //FK

            $table->string('user_name', 50)->nullable();
            $table->string('user_phone', 20)->nullable();
            $table->string('user_domicile', 50)->nullable();
            $table->date('user_dob')->nullable();
            $table->string('user_interest', 50)->nullable();
            $table->string('profile_picture')->nullable();
            // $table->unsignedInteger('total_event_visited')->default(0);
            // $table->unsignedInteger('total_volunteer_hour')->default(0);
            // $table->unsignedInteger('total_certificate')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users_profiles');
    }
};
