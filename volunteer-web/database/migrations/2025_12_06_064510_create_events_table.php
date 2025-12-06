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
        Schema::create('events', function (Blueprint $table) {
            $table->id('event_id');
            $table->foreignId('institute_id')->constrained('institutes', 'institute_id')->cascadeOnDelete(); //FK
            $table->string('event_name', 100);
            $table->text('event_description');
            $table->date('event_start');
            $table->date('event_finish');
            $table->string('event_location', 255);
            $table->string('event_status', 20);
            $table->integer('event_quota')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
