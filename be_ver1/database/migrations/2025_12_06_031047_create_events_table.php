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
            $table->id();
            $table->foreignId('id_institute')->constrained('institutes')->cascadeOnDelete();
            $table->string('event_name', 100);
            $table->text('description')->nullable();
            $table->dateTime('start_date');
            $table->dateTime('finish_date');
            $table->string('location', 200);
            $table->integer('quota')->default(0);
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
