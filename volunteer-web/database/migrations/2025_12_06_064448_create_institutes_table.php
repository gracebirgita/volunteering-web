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
        Schema::create('institutes', function (Blueprint $table) {
            $table->id('institute_id');
            $table->foreignId('account_id')
            ->constrained('accounts', 'account_id')
            ->cascadeOnDelete(); //FK
            $table->string('institute_name', 50);
            $table->string('institute_phone', 20)->nullable();
            $table->string('institute_pic_name', 50)->nullable();
            $table->string('institute_address', 255)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('institutes');
    }
};
