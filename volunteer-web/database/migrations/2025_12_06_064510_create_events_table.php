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
            $table->foreignId('institute_id')->constrained('institutes', 'institute_id')->cascadeOnDelete();
            $table->string('thumbnail')->nullable();
            $table->string('event_name', 100);
            $table->text('event_description');
            $table->string('category', 50);
            $table->date('event_start');
            $table->date('event_finish');
            $table->time('event_start_time')->nullable();
            $table->time('event_end_time')->nullable();
            $table->string('event_location', 255);
            $table->string('address')->nullable();
            $table->integer('quota')->default(0);
            $table->date('registration_deadline');
            $table->boolean('benefit_consumption')->default(false);
            $table->boolean('benefit_certificate')->default(false);
            $table->boolean('benefit_jam_volunt')->default(false);
            $table->string('contact_person', 50)->nullable();
            $table->string('group_link')->nullable();
            $table->string('event_status', 20)->default('active');
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
