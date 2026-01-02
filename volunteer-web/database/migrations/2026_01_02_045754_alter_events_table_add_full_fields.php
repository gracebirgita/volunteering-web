<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('events', function (Blueprint $table) {
            
            $table->string('category', 20) ->after('event_description');
            $table->string('thumbnail')->nullable()->after('category');
            $table->time('event_start_time')->after('thumbnail');
            $table->time('event_end_time')->after('event_start_time');
            $table->string('address')->after('event_location');

            $table->integer('quota')->after('address');

            $table->date('registration_deadline')->after('quota');

            $table->boolean('benefit_consumption')->default(false);
            $table->boolean('benefit_certificate')->default(false);
            $table->boolean('benefit_jam_volunt')->default(false);

            $table->string('contact_person', 50)->after('benefit_jam_volunt');
            $table->string('group_link')->nullable()->after('contact_person');

            $table->enum('status', ['active', 'closed'])->default('active');
        });
    }

    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {


            $table->dropColumn([
                'category',
                'thumbnail',
                'event_start_time',
                'event_end_time',
                'address',
                'quota',
                'registration_deadline',
                'benefit_consumption',
                'benefit_certificate',
                'benefit_jam_volunt',
                'contact_person',
                'group_link',
                'status',
            ]);
        });
    }
};
