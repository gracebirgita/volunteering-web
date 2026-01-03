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
        Schema::create('event_registrations', function (Blueprint $table) {
            $table->id('registration_id');

            $table->foreignId('event_id')
                ->constrained('events', 'event_id')
                ->cascadeOnDelete();

            $table->foreignId('user_id')
                ->constrained('users_profiles', 'user_id')
                ->cascadeOnDelete();

            $table->enum('status', [
                'Pending',    // daftar, nunggu persetujuan
                'Approved',   // diterima institute
                'Rejected',   // ditolak
            ])->default('pending');

            $table->timestamp('applied_at')->useCurrent();
            $table->timestamp('approved_at')->nullable();
            $table->timestamp('rejected_at')->nullable();

            $table->text('note')->nullable(); // catatan dari institute

            // 1 relawan hanya bisa daftar 1x ke 1 event
            $table->unique(['event_id', 'user_id']);

            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events_registrations');
    }
};
